/**
 * Genera la secuencia de fotogramas del ensamblaje fotorrealista del ordenador
 * (estilo Apple, fondo blanco) encadenando ediciones con nano banana pro para
 * mantener el MISMO ordenador en todos los fotogramas.
 *
 * Entrada (anclas ya validadas):
 *   public/generated/hero/frame-0.png  -> vista explotada (chips, placa) — pantalla apagada
 *   public/generated/hero/frame-5.png  -> montado, pantalla ENCENDIDA con dashboard
 *
 * Genera intermedios encadenando desde el montado hacia el explotado:
 *   frame-4 (montado, apagado) <- edita frame-5 (apaga pantalla)
 *   frame-3 (gaps pequeños)    <- edita frame-4
 *   frame-2 (medio explotado)  <- edita frame-3
 *   frame-1 (muy explotado)    <- edita frame-2
 *
 * Uso: GOOGLE_AI_API_KEY=xxx node scripts/generate-hero.js [--force]
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

const MODEL = 'gemini-3-pro-image'
const DIR = path.join(__dirname, '..', 'public', 'generated', 'hero')

const WHITE = 'Pure seamless white background (#ffffff), Apple-style photorealistic studio product photography, soft realistic shadows and reflections, ultra high detail, 8k. Same camera angle, same lighting, same exact computer parts. No text, no watermark, no logos.'

const STEPS = [
  {
    out: 'frame-4.png',
    from: 'frame-5.png',
    prompt: `Take this exact computer and turn the screen completely OFF (a dark, black, powered-off glossy screen), everything else identical and fully assembled. ${WHITE}`,
  },
  {
    out: 'frame-3.png',
    from: 'frame-4.png',
    prompt: `Take this exact assembled computer and show it slightly disassembled: the monitor's aluminum back panel detaches and floats a little behind, revealing a small hint of the internal circuit board. Parts only slightly separated with small gaps, still clearly recognizable. Screen OFF. ${WHITE}`,
  },
  {
    out: 'frame-2.png',
    from: 'frame-3.png',
    prompt: `Continue disassembling this exact computer into a moderate EXPLODED VIEW: the screen panel, the aluminum back cover and the internal green circuit motherboard with realistic chips and RAM are now clearly separated and floating apart; keyboard and mouse drift outward. Medium gaps between parts. Screen OFF. ${WHITE}`,
  },
  {
    out: 'frame-1.png',
    from: 'frame-2.png',
    prompt: `Continue into a strong EXPLODED VIEW: all components floating far apart in mid-air — detached screen panel, aluminum back cover, detailed motherboard with chips, RAM sticks, copper traces, stand, keyboard and mouse — wide gaps, dramatic technical exploded diagram. Screen OFF. ${WHITE}`,
  },
]

function edit(fromPath, prompt, outPath) {
  return new Promise((resolve) => {
    const img = fs.readFileSync(fromPath).toString('base64')
    const body = JSON.stringify({ contents: [{ parts: [{ text: prompt }, { inlineData: { mimeType: 'image/png', data: img } }] }] })
    const t = Date.now()
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
          if (p) {
            fs.writeFileSync(outPath, Buffer.from(p.inlineData.data, 'base64'))
            console.log(`  ✓ ${path.basename(outPath)} (${Math.round(fs.statSync(outPath).size / 1024)} KB, ${((Date.now() - t) / 1000).toFixed(1)}s)`)
            resolve(true)
          } else { console.log(`  ✗ ${path.basename(outPath)}: ${d.slice(0, 200)}`); resolve(false) }
        } catch (e) { console.log(`  ✗ ${path.basename(outPath)}: ${e.message}`); resolve(false) }
      })
    })
    req.on('error', (e) => { console.log(`  ✗ ${e.message}`); resolve(false) })
    req.write(body); req.end()
  })
}

async function main() {
  const force = process.argv.includes('--force')
  console.log(`nano banana pro → ${DIR}\n`)
  for (const s of STEPS) {
    const outPath = path.join(DIR, s.out)
    const fromPath = path.join(DIR, s.from)
    if (!force && fs.existsSync(outPath)) { console.log(`  • ${s.out} (existe, salto)`); continue }
    if (!fs.existsSync(fromPath)) { console.log(`  ! falta ${s.from}, abortando`); break }
    console.log(`  … ${s.out} (desde ${s.from})`)
    let ok = false
    for (let a = 0; a < 3 && !ok; a++) { ok = await edit(fromPath, s.prompt, outPath); if (!ok) await new Promise(r => setTimeout(r, 1500)) }
  }
  console.log('\nListo. Fotogramas frame-0..frame-5 en public/generated/hero/')
}
main()
