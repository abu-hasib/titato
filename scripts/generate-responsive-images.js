#!/usr/bin/env node
import fs from 'fs/promises'
import path from 'path'
import sharp from 'sharp'

const dirs = ['public/images', 'src/assets']
const exts = ['.png', '.jpg', '.jpeg']
const widths = [320, 480, 768, 1024, 1600]

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  for (const e of entries) {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) await walk(full)
    else {
      const ext = path.extname(e.name).toLowerCase()
      if (exts.includes(ext)) await generate(full)
    }
  }
}

async function generate(file) {
  try {
    const img = sharp(file)
    const meta = await img.metadata()
    const dirname = path.dirname(file)
    const base = path.basename(file, path.extname(file))

    for (const w of widths) {
      if (meta.width && w > meta.width) continue
      const webpOut = path.join(dirname, `${base}-${w}.webp`)
      const avifOut = path.join(dirname, `${base}-${w}.avif`)
      await img.resize({ width: w }).webp({ quality: 75 }).toFile(webpOut)
      console.log('created', webpOut)
      await img.resize({ width: w }).avif({ quality: 50 }).toFile(avifOut)
      console.log('created', avifOut)
    }
  } catch (err) {
    console.error('error processing', file, err.message)
  }
}

async function main() {
  for (const d of dirs) {
    try {
      await walk(d)
    } catch (err) {
      // ignore missing folders
    }
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
