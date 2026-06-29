/**
 * Generador de imágenes de marca con Google Gemini ("nano banana").
 *
 * Uso:
 *   GOOGLE_AI_API_KEY=xxx node scripts/generate-images.js          # genera las que falten
 *   GOOGLE_AI_API_KEY=xxx node scripts/generate-images.js --force  # regenera todas
 *   GOOGLE_AI_API_KEY=xxx node scripts/generate-images.js hero-ambient og-image  # solo algunas
 *
 * Las imágenes se guardan en public/generated/<name>.png
 * Todas comparten el mismo lenguaje visual: "Midnight Indigo" (negro premium + índigo/violeta).
 */
const https = require('https')
const fs = require('fs')
const path = require('path')

// Cargar GOOGLE_AI_API_KEY desde .env.local si no está en el entorno
function loadEnv() {
  if (process.env.GOOGLE_AI_API_KEY) return
  try {
    const envPath = path.join(__dirname, '..', '.env.local')
    const txt = fs.readFileSync(envPath, 'utf8')
    const m = txt.match(/^\s*GOOGLE_AI_API_KEY\s*=\s*(.+)\s*$/m)
    if (m) process.env.GOOGLE_AI_API_KEY = m[1].trim().replace(/^["']|["']$/g, '')
  } catch (_) {}
}
loadEnv()

const KEY = process.env.GOOGLE_AI_API_KEY
if (!KEY) {
  console.error('Falta GOOGLE_AI_API_KEY (en el entorno o en .env.local)')
  process.exit(1)
}

const MODEL = process.env.NANO_BANANA_MODEL || 'gemini-2.5-flash-image'
const OUT_DIR = path.join(__dirname, '..', 'public', 'generated')

// Estilo común a todas las imágenes para mantener coherencia de marca.
const STYLE =
  'Style: ultra-clean minimalist premium 3D render, deep near-black background (#0A0A0F), ' +
  'indigo and violet accent lighting (#6366F1, #8B5CF6, #A78BFA), subtle volumetric glow, ' +
  'soft studio shadows, crisp high detail, modern high-end tech aesthetic, generous negative space, ' +
  'cinematic lighting, 8k product render, photorealistic materials. ' +
  'Absolutely no text, no words, no letters, no watermark, no logos, no UI copy.'

const IMAGES = [
  {
    name: 'hero-ambient',
    prompt:
      'An abstract dark technological environment: a faint perspective floor grid of thin indigo light lines ' +
      'fading into pure black, scattered tiny glowing violet particles floating in deep space, soft atmospheric depth, ' +
      'a subtle indigo nebula glow in the distance. Empty, moody, elegant, lots of black negative space.',
  },
  {
    name: 'showcase-dashboard',
    prompt:
      'A sleek modern SaaS analytics dashboard interface rendered as floating frosted-glass panels in a dark studio void, ' +
      'abstract indigo and violet charts, graphs and data cards, glowing edges, soft reflections, slight 3/4 perspective, ' +
      'premium product visualization. Interface elements abstract and clean (no readable text).',
  },
  {
    name: 'showcase-mobile',
    prompt:
      'A single modern frameless smartphone floating upright on a dark studio background, screen showing a clean abstract ' +
      'mobile app layout with indigo accent cards and a violet gradient header, soft rim light, gentle floor reflection, ' +
      'premium product render, 3/4 angle.',
  },
  {
    name: 'showcase-web',
    prompt:
      'A thin modern laptop floating at a slight angle on a dark studio background, screen displaying a clean elegant ' +
      'website layout with an indigo hero and violet accents, soft glow around the screen, subtle reflection beneath, ' +
      'premium product shot.',
  },
  {
    name: 'showcase-automation',
    prompt:
      'An elegant abstract 3D visualization of an automated software workflow: glowing connected nodes and smoothly flowing ' +
      'data lines in indigo and violet, floating in a dark void, depth of field, particles of light, clean and futuristic, ' +
      'lots of negative space.',
  },
  {
    name: 'cta-orb',
    prompt:
      'A single luminous indigo-violet energy sphere floating in a pure black void, volumetric glow, faint orbiting light ' +
      'particles, smooth gradient from indigo core to violet halo, minimal and elegant, centered, cinematic.',
  },
  {
    name: 'texture-aurora',
    prompt:
      'A very subtle abstract dark gradient texture for a website background: mostly pure black with soft diffuse glows of ' +
      'indigo and violet bleeding in from the corners, smooth aurora-like haze, no objects, ultra minimal, seamless, moody.',
  },
  {
    name: 'process-assembly',
    prompt:
      'An exploded-view 3D render of a minimalist computer breaking apart into its floating clean components ' +
      '(monitor panel, slim chassis, keyboard, circuit board) suspended in a dark void with indigo edge lighting and ' +
      'violet glow, soft shadows, elegant and futuristic, sense of assembly in mid-air, generous negative space.',
  },
  {
    name: 'og-image',
    prompt:
      'A premium wide cinematic brand key visual on a deep near-black background: a sleek computer assembling itself from ' +
      'floating clean parts with glowing indigo and violet edges on the right side, large empty dark negative space on the ' +
      'left for a headline, atmospheric particles, soft volumetric light. Horizontal 16:9 composition.',
  },
  {
    name: 'avatar-team',
    prompt:
      'An abstract minimalist 3D emblem representing a team of software engineers: three smooth glowing indigo-violet ' +
      'geometric figures connected by thin light lines on a dark void, soft glow, elegant, symbolic, centered.',
  },
]

function generate(item) {
  return new Promise((resolve) => {
    const fullPrompt = `${item.prompt}\n\n${STYLE}`
    const body = JSON.stringify({
      contents: [{ parts: [{ text: fullPrompt }] }],
    })
    const req = https.request(
      {
        hostname: 'generativelanguage.googleapis.com',
        path: `/v1beta/models/${MODEL}:generateContent?key=${KEY}`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) },
      },
      (res) => {
        let data = ''
        res.on('data', (c) => (data += c))
        res.on('end', () => {
          try {
            const j = JSON.parse(data)
            const parts = j?.candidates?.[0]?.content?.parts || []
            const img = parts.find((p) => p.inlineData?.data)
            if (img) {
              const out = path.join(OUT_DIR, `${item.name}.png`)
              fs.writeFileSync(out, Buffer.from(img.inlineData.data, 'base64'))
              const kb = Math.round(fs.statSync(out).size / 1024)
              console.log(`  ✓ ${item.name}.png (${kb} KB)`)
              resolve(true)
            } else {
              console.log(`  ✗ ${item.name}: sin imagen -> ${data.slice(0, 220)}`)
              resolve(false)
            }
          } catch (e) {
            console.log(`  ✗ ${item.name}: parse error ${e.message}`)
            resolve(false)
          }
        })
      }
    )
    req.on('error', (e) => {
      console.log(`  ✗ ${item.name}: ${e.message}`)
      resolve(false)
    })
    req.write(body)
    req.end()
  })
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true })
  const args = process.argv.slice(2)
  const force = args.includes('--force')
  const only = args.filter((a) => !a.startsWith('--'))

  let list = IMAGES
  if (only.length) list = IMAGES.filter((i) => only.includes(i.name))

  console.log(`nano banana (${MODEL}) → ${OUT_DIR}`)
  console.log(`${list.length} imágenes${force ? ' (force)' : ''}\n`)

  let ok = 0
  for (const item of list) {
    const out = path.join(OUT_DIR, `${item.name}.png`)
    if (!force && fs.existsSync(out)) {
      console.log(`  • ${item.name}.png (ya existe, salto)`)
      ok++
      continue
    }
    process.stdout.write(`  … ${item.name}\n`)
    // Reintentos: la API ocasionalmente devuelve solo texto.
    let done = false
    for (let attempt = 0; attempt < 3 && !done; attempt++) {
      done = await generate(item)
      if (!done) await new Promise((r) => setTimeout(r, 1500))
    }
    if (done) ok++
  }
  console.log(`\nListo: ${ok}/${list.length} imágenes en public/generated/`)
}

main()
