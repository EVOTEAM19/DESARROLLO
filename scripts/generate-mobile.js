const https = require('https'), fs = require('fs'), path = require('path')
function env() { if (process.env.GOOGLE_AI_API_KEY) return; const t = fs.readFileSync(path.join(__dirname, '..', '.env.local'), 'utf8'); const m = t.match(/GOOGLE_AI_API_KEY\s*=\s*(.+)/); if (m) process.env.GOOGLE_AI_API_KEY = m[1].trim() }
env(); const KEY = process.env.GOOGLE_AI_API_KEY
const OUT = path.join(__dirname, '..', 'public', 'generated', 'mocks'); fs.mkdirSync(OUT, { recursive: true })

const items = [
  {
    name: 'mobile-apps',
    prompt: 'A premium 4:3 product composition on a soft very-light grey-blue gradient background. A modern smartphone, slightly angled and floating with a soft realistic shadow beneath it, fills most of the frame. Its screen shows a beautiful SPANISH mobile finance app: a greeting header ("Hola, Alex"), a prominent balance card with a blue gradient showing "12.450,00 €", a row of four round blue action buttons labelled Pagar, Enviar, Ahorro and Más, and a "Movimientos recientes" list with three rows (shop/name, small date, and a euro amount on the RIGHT such as "-12,90 €", "+1.500,00 €", "-49,99 €"), green for income and red for expense. A second smaller phone is partially visible behind it. Apple-style, clean, generous whitespace, soft blue (#0071e3) accents, rounded UI, crisp sharp legible Spanish text, euro symbol on the RIGHT of every amount. Ultra realistic high-resolution render, light theme. 4:3 aspect, phones centered.',
  },
]

function gen(it) {
  return new Promise(r => {
    const body = JSON.stringify({ contents: [{ parts: [{ text: it.prompt }] }] })
    const req = https.request({ hostname: 'generativelanguage.googleapis.com', path: `/v1beta/models/gemini-3-pro-image:generateContent?key=${KEY}`, method: 'POST', headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) } }, res => {
      let d = ''; res.on('data', c => d += c); res.on('end', () => {
        try { const p = (JSON.parse(d)?.candidates?.[0]?.content?.parts || []).find(x => x.inlineData?.data); if (p) { const ext = p.inlineData.mimeType.includes('png') ? 'png' : 'jpg'; fs.writeFileSync(path.join(OUT, it.name + '.' + ext), Buffer.from(p.inlineData.data, 'base64')); console.log('OK', it.name, ext) } else console.log('NOIMG', it.name, d.slice(0, 200)) } catch (e) { console.log('ERR', it.name, e.message) } r()
      })
    }); req.on('error', e => { console.log('REQERR', e.message); r() }); req.write(body); req.end()
  })
}
(async () => { for (const it of items) { await gen(it) } console.log('done') })()
