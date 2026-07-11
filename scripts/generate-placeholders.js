#!/usr/bin/env node
import fs from 'fs/promises'
import path from 'path'
import sharp from 'sharp'

const targets = [
  { key: 'bg-image', file: 'public/images/bg-image.png' },
  { key: 'gametitle', file: 'public/images/gametitle.png' },
]

async function makePlaceholder(file) {
  const data = await sharp(file)
    .resize(20)
    .blur(2)
    .webp({ quality: 30 })
    .toBuffer()
  return `data:image/webp;base64,${data.toString('base64')}`
}

async function main() {
  const out = {}
  for (const t of targets) {
    try {
      out[t.key] = await makePlaceholder(t.file)
      console.log('placeholder created for', t.file)
    } catch (e) {
      console.warn('failed placeholder for', t.file, e.message)
    }
  }
  await fs.writeFile('src/placeholders.json', JSON.stringify(out, null, 2))
  console.log('wrote src/placeholders.json')
}

main().catch(e => { console.error(e); process.exit(1) })
