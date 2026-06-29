/**
 * Regenera las imágenes de secciones en estilo "Apple Light" (fondo blanco,
 * UI clara, acento azul). Sobrescribe las versiones oscuras anteriores.
 * Uso: node scripts/generate-sections.js [--force]
 */
const https = require('https')
const fs = require('fs')
const path = require('path')

function loadEnv() {
  if (process.env.GOOGLE_AI_API_KEY) return
  try {
    const txt = fs.readFileSync(path.join(__dirname, '..', '.env.local'), 'utf8')
    const m = txt.match(/^\s*GOOGLE_AI_API_KEY\s*=\s*(.+)\s*$/m)
    if (m) process.env.GOOGLE_AI_API_KEY = m[1].trim().replace(/^["']|["']$/g, '')
  } catch (_) {}
}
loadEnv()
const KEY = process.env.GOOGLE_AI_API_KEY
if (!KEY) { console.error('Falta GOOGLE_AI_API_KEY'); process.exit(1) }

const MODEL = 'gemini-2.5-flash-image'
const OUT = path.join(__dirname, '..', 'public', 'generated')

const STYLE =
  'Style: ultra-clean Apple-style minimalist product render on a pure white (#ffffff) seamless background, ' +
  'soft realistic studio shadows, light and airy, subtle blue (#0071e3) accents, crisp high detail, 8k, ' +
  'lots of white negative space. No text, no words, no watermark, no logos.'

const IMAGES = [
  {
    name: 'showcase-dashboard',
    prompt:
      'A sleek modern SaaS analytics dashboard shown on a floating clean white device / glass panel, light UI with ' +
      'soft blue charts, cards and a sidebar, gentle drop shadow, slight 3/4 perspective, premium minimalist product shot.',
  },
  {
    name: 'showcase-mobile',
    prompt:
      'A single modern white smartphone floating upright, screen showing a clean light mobile app interface with ' +
      'blue accent buttons and cards, soft shadow and subtle reflection, Apple-style product render.',
  },
  {
    name: 'showcase-web',
    prompt:
      'A thin modern silver laptop floating at a slight angle, screen displaying a clean elegant light website with a ' +
      'blue accent, soft shadow beneath, premium minimalist product shot.',
  },
  {
    name: 'showcase-automation',
    prompt:
      'An elegant abstract 3D visualization of an automated workflow: smooth white and light-grey connected nodes and ' +
      'flowing soft-blue data lines floating, clean and minimal, soft shadows, plenty of white space.',
  },
  {
    name: 'avatar-team',
    prompt:
      'A minimalist abstract 3D emblem representing a small team of software engineers: three smooth light-grey and ' +
      'soft-blue geometric figures connected by thin lines, clean, symbolic, centered, soft studio shadow.',
  },
  {
    name: 'og-image',
    prompt:
      'A premium wide cinematic brand key visual: a sleek aluminum all-in-one computer (iMac style) with keyboard and ' +
      'mouse on a pure white background, the screen showing a clean light dashboard UI with blue accents, large empty ' +
      'white space on the left for a headline, soft realistic shadows. Horizontal 16:9 composition.',
  },
]

function gen(item) {
  return new Promise((resolve) => {
    const body = JSON.stringify({ contents: [{ parts: [{ text: `${item.prompt}\n\n${STYLE}` }] }] })
    const req = https.request({
      hostname: 'generativelanguage.googleapis.com',
      path: `/v1beta/models/${MODEL}:generateContent?key=${KEY}`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) },
    }, (res) => {
      let d = ''
      res.on('data', (c) => (d += c))
      res.on('end', () => {
        try {
          const p = (JSON.parse(d)?.candidates?.[0]?.content?.parts || []).find((x) => x.inlineData?.data)
          if (p) { fs.writeFileSync(path.join(OUT, `${item.name}.png`), Buffer.from(p.inlineData.data, 'base64')); console.log(`  ✓ ${item.name}.png`); resolve(true) }
          else { console.log(`  ✗ ${item.name}: ${d.slice(0, 180)}`); resolve(false) }
        } catch (e) { console.log(`  ✗ ${item.name}: ${e.message}`); resolve(false) }
      })
    })
    req.on('error', (e) => { console.log(`  ✗ ${e.message}`); resolve(false) })
    req.write(body); req.end()
  })
}

async function main() {
  console.log(`Apple-light sections → ${OUT}\n`)
  for (const item of IMAGES) {
    console.log(`  … ${item.name}`)
    let ok = false
    for (let a = 0; a < 3 && !ok; a++) { ok = await gen(item); if (!ok) await new Promise(r => setTimeout(r, 1500)) }
  }
  console.log('\nListo.')
}
main()
