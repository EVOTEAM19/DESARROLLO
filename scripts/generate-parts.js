/**
 * Genera las PIEZAS individuales del ordenador, aisladas sobre blanco puro.
 * Monitor de FRENTE (puesto de trabajo) + muchos componentes sueltos.
 * Uso: node scripts/generate-parts.js [--force] [nombre...]
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
const DIR = path.join(__dirname, '..', 'public', 'generated', 'parts')

const ISO =
  'Single isolated object, centered, entire object fully visible with generous margin, on a completely flat pure white ' +
  '(#ffffff) background, NO shadow, NO reflection, no other objects. Ultra photorealistic, crisp high detail, studio ' +
  'lighting, 8k product render. No text, no watermark.'

const PARTS = [
  // Pantalla de FRENTE (puesto de trabajo)
  { name: 'monitor', prompt: 'The front of a modern all-in-one desktop computer monitor: a thin silver aluminum bezel around a glossy black powered-off screen, seen perfectly straight-on from the FRONT (not angled), rectangular 16:9, no stand.' },
  { name: 'backcover', prompt: 'The brushed silver aluminum back cover panel of an all-in-one computer, smooth rounded rectangle with a small round vent, rear view, straight-on.' },
  { name: 'board', prompt: 'A highly detailed green printed circuit motherboard seen from the top: empty CPU socket area, RAM slots, PCIe slots, capacitors, small chips, connectors and copper traces. Rich technical detail, top-down view.' },
  // Componentes sueltos
  { name: 'cpu', prompt: 'A computer CPU processor: a small square silver-topped chip with a green substrate and gold contacts on the edge, slight 3/4 top view.' },
  { name: 'heatsink', prompt: 'An aluminum CPU heatsink cooler with many thin fins and a copper core, no fan, slight 3/4 view.' },
  { name: 'ram', prompt: 'A single green computer RAM memory stick with gold contacts, a black heat-spreader strip and a small label, horizontal, slight 3/4 view.' },
  { name: 'battery', prompt: 'A silver round CR2032 coin cell battery, slight 3/4 view, shiny metallic.' },
  { name: 'usb', prompt: 'A motherboard rear I/O port block with stacked metallic USB ports and connectors, slight 3/4 view.' },
  { name: 'chip', prompt: 'A small square black microchip / integrated circuit with many tiny metal pins around it, slight 3/4 top view.' },
  { name: 'capacitor', prompt: 'A small group of three cylindrical computer capacitors (black and dark-blue with markings), standing upright, slight 3/4 view.' },
  { name: 'screw', prompt: 'A single small shiny metallic computer screw (philips head), slight 3/4 view.' },
  { name: 'gpu', prompt: 'A small green computer PCIe expansion card with a black chip and a row of gold edge connectors, slight 3/4 view.' },
  // Periféricos por piezas
  { name: 'keyboard', prompt: 'A slim modern silver and white wireless keyboard, full set of low-profile keys, top-down slight 3/4 view.' },
  { name: 'keycaps', prompt: 'A small scattered group of about eight loose white square keyboard keycaps, slight 3/4 view.' },
  { name: 'stand', prompt: 'A sleek silver aluminum monitor stand / foot with a curved neck and a flat oval base, straight-on front view.' },
  { name: 'mouse', prompt: 'A modern minimalist white wireless mouse, smooth seamless top, slight 3/4 view.' },
]

function gen(item, outPath) {
  return new Promise((resolve) => {
    const body = JSON.stringify({ contents: [{ parts: [{ text: `${item.prompt}\n\n${ISO}` }] }] })
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
          if (p) { fs.writeFileSync(outPath, Buffer.from(p.inlineData.data, 'base64')); console.log(`  ✓ ${item.name} (${((Date.now()-t)/1000).toFixed(1)}s)`); resolve(true) }
          else { console.log(`  ✗ ${item.name}: ${d.slice(0,160)}`); resolve(false) }
        } catch (e) { console.log(`  ✗ ${item.name}: ${e.message}`); resolve(false) }
      })
    })
    req.on('error', (e) => { console.log(`  ✗ ${e.message}`); resolve(false) })
    req.write(body); req.end()
  })
}

async function main() {
  fs.mkdirSync(DIR, { recursive: true })
  const args = process.argv.slice(2)
  const force = args.includes('--force')
  const only = args.filter((a) => !a.startsWith('--'))
  let list = PARTS
  if (only.length) list = PARTS.filter((p) => only.includes(p.name))
  console.log(`Piezas → ${DIR}\n`)
  for (const item of list) {
    const out = path.join(DIR, `${item.name}.png`)
    if (!force && fs.existsSync(out)) { console.log(`  • ${item.name} (existe)`); continue }
    console.log(`  … ${item.name}`)
    let ok = false
    for (let a = 0; a < 3 && !ok; a++) { ok = await gen(item, out); if (!ok) await new Promise(r => setTimeout(r, 1500)) }
  }
  console.log('\nListo.')
}
main()
