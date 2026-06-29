/**
 * Recorta el fondo blanco de las piezas (public/generated/parts/*.png)
 * usando relleno por inundación desde los bordes: solo se vuelve transparente
 * el blanco conectado con el borde (el fondo), preservando el interior.
 * Salida: public/generated/parts-cut/<name>.png (RGBA con transparencia)
 *
 * Uso: node scripts/remove-bg.js
 */
const fs = require('fs')
const path = require('path')
const { PNG } = require('pngjs')
const jpeg = require('jpeg-js')

const SRC = path.join(__dirname, '..', 'public', 'generated', 'parts')
const OUT = path.join(__dirname, '..', 'public', 'generated', 'parts-cut')

const T = 232 // umbral de "casi blanco" (R,G,B todos por encima)

function isWhite(d, i) {
  return d[i] >= T && d[i + 1] >= T && d[i + 2] >= T
}

// Lee PNG o JPEG → {width,height,data:RGBA}
function decode(buf) {
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    const j = jpeg.decode(buf, { useTArray: true, formatAsRGBA: true })
    return { width: j.width, height: j.height, data: j.data }
  }
  return PNG.sync.read(buf)
}

function process(file) {
  const { width: w, height: h, data } = decode(fs.readFileSync(path.join(SRC, file)))
  const idx = (x, y) => (y * w + x) * 4
  const bg = new Uint8Array(w * h) // 1 = fondo
  const stack = []

  const pushIf = (x, y) => {
    if (x < 0 || y < 0 || x >= w || y >= h) return
    const p = y * w + x
    if (bg[p]) return
    if (isWhite(data, p * 4)) { bg[p] = 1; stack.push(p) }
  }

  // Sembrar desde todos los bordes
  for (let x = 0; x < w; x++) { pushIf(x, 0); pushIf(x, h - 1) }
  for (let y = 0; y < h; y++) { pushIf(0, y); pushIf(w - 1, y) }

  // Inundar
  while (stack.length) {
    const p = stack.pop()
    const x = p % w, y = (p - x) / w
    pushIf(x + 1, y); pushIf(x - 1, y); pushIf(x, y + 1); pushIf(x, y - 1)
  }

  // Aplicar transparencia + feather (suavizar borde)
  for (let p = 0; p < w * h; p++) {
    const i = p * 4
    if (bg[p]) { data[i + 3] = 0; continue }
    // Si un píxel opaco casi-blanco toca el fondo, lo hacemos semi-transparente
    const x = p % w, y = (p - x) / w
    const touchesBg =
      (x > 0 && bg[p - 1]) || (x < w - 1 && bg[p + 1]) ||
      (y > 0 && bg[p - w]) || (y < h - 1 && bg[p + w])
    if (touchesBg) {
      const lum = (data[i] + data[i + 1] + data[i + 2]) / 3
      if (lum > 232) data[i + 3] = Math.round(data[i + 3] * 0.4)
      else if (lum > 215) data[i + 3] = Math.round(data[i + 3] * 0.75)
    }
  }

  // Recortar al bounding box de lo visible para reducir tamaño y centrar
  let minX = w, minY = h, maxX = 0, maxY = 0
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    if (data[idx(x, y) + 3] > 10) {
      if (x < minX) minX = x; if (x > maxX) maxX = x
      if (y < minY) minY = y; if (y > maxY) maxY = y
    }
  }
  if (maxX < minX) { minX = 0; minY = 0; maxX = w - 1; maxY = h - 1 }
  const pad = 8
  minX = Math.max(0, minX - pad); minY = Math.max(0, minY - pad)
  maxX = Math.min(w - 1, maxX + pad); maxY = Math.min(h - 1, maxY + pad)
  const cw = maxX - minX + 1, ch = maxY - minY + 1
  const out = new PNG({ width: cw, height: ch })
  for (let y = 0; y < ch; y++) for (let x = 0; x < cw; x++) {
    const s = idx(minX + x, minY + y), dst = (y * cw + x) * 4
    out.data[dst] = data[s]; out.data[dst + 1] = data[s + 1]
    out.data[dst + 2] = data[s + 2]; out.data[dst + 3] = data[s + 3]
  }
  fs.writeFileSync(path.join(OUT, file), PNG.sync.write(out))
  return { file, cw, ch }
}

function main() {
  fs.mkdirSync(OUT, { recursive: true })
  const files = fs.readdirSync(SRC).filter((f) => f.endsWith('.png'))
  if (!files.length) { console.log('No hay piezas en', SRC); return }
  for (const f of files) {
    try { const r = process(f); console.log(`  ✓ ${f} → ${r.cw}x${r.ch}`) }
    catch (e) { console.log(`  ✗ ${f}: ${e.message}`) }
  }
  console.log('\nListo. Transparentes en public/generated/parts-cut/')
}
main()
