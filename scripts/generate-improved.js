const https = require('https'), fs = require('fs'), path = require('path')
function env() { if (process.env.GOOGLE_AI_API_KEY) return; const t = fs.readFileSync(path.join(__dirname, '..', '.env.local'), 'utf8'); const m = t.match(/GOOGLE_AI_API_KEY\s*=\s*(.+)/); if (m) process.env.GOOGLE_AI_API_KEY = m[1].trim() }
env(); const KEY = process.env.GOOGLE_AI_API_KEY
const OUT = path.join(__dirname, '..', 'public', 'generated', 'mocks'); fs.mkdirSync(OUT, { recursive: true })

const STYLE = 'Ultra realistic, crisp high-resolution UI screenshot. Light theme, pure white background, soft blue (#0071e3) accents, clean modern premium minimal design (Apple-like), generous whitespace, rounded cards, subtle soft shadows, sharp legible typography, lots of detail. Flat front view that fills the entire frame edge to edge. No device frame, no browser chrome, no window border, no drop shadow around the whole thing.'

const items = [
  {
    name: 'saas-platform',
    prompt: 'A WIDE 16:9 landscape screenshot of a beautiful premium SaaS analytics dashboard, fully in SPANISH. Left sidebar with menu items (Panel, Clientes, Ventas, Informes, Ajustes). Main area: a header with title "Panel de control", a big area/line chart labeled "Ingresos" trending up, a row of 4 KPI cards with euro amounts written in Spanish format with the euro symbol on the RIGHT (for example "48.500 €", "1.250", "22,30 €", "4,5%"), and a clean data table with several rows and small colored status badges (Activo, Prueba). Premium, airy, blue accents. 16:9 landscape.',
  },
  {
    name: 'web-landing',
    prompt: 'A 4:3 screenshot of a beautiful modern corporate LANDING PAGE website, fully in SPANISH, designed to convert. Top: a clean navbar with a logo and menu. Big hero with a bold short Spanish headline, a one-line subheadline, and a solid blue primary button that says "Empieza ahora". To the side a tasteful product illustration or app preview. Below the hero, a row of grey client logos and the beginning of a 3-column features section with icons. Premium, lots of whitespace, modern typography, blue #0071e3 accents. 4:3 aspect.',
  },
]

function gen(it) {
  return new Promise(r => {
    const body = JSON.stringify({ contents: [{ parts: [{ text: it.prompt + '\n\n' + STYLE }] }] })
    const req = https.request({ hostname: 'generativelanguage.googleapis.com', path: `/v1beta/models/gemini-3-pro-image:generateContent?key=${KEY}`, method: 'POST', headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) } }, res => {
      let d = ''; res.on('data', c => d += c); res.on('end', () => {
        try { const p = (JSON.parse(d)?.candidates?.[0]?.content?.parts || []).find(x => x.inlineData?.data); if (p) { const ext = p.inlineData.mimeType.includes('png') ? 'png' : 'jpg'; fs.writeFileSync(path.join(OUT, it.name + '.' + ext), Buffer.from(p.inlineData.data, 'base64')); console.log('OK', it.name, ext) } else console.log('NOIMG', it.name, d.slice(0, 200)) } catch (e) { console.log('ERR', it.name, e.message) } r()
      })
    }); req.on('error', e => { console.log('REQERR', e.message); r() }); req.write(body); req.end()
  })
}
(async () => { for (const it of items) { await gen(it) } console.log('done') })()
