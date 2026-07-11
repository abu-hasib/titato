#!/usr/bin/env node
import fs from 'fs/promises'
import path from 'path'
import sharp from 'sharp'

const dirs = ['public/images', 'src/assets']
const exts = ['.png', '.jpg', '.jpeg']

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  for (const e of entries) {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) await walk(full)
    else {
      const ext = path.extname(e.name).toLowerCase()
      if (exts.includes(ext)) await convert(full)
    }
  }
}

async function convert(file) {
  try {
    const dirname = path.dirname(file)
    const base = path.basename(file, path.extname(file))
    const webpOut = path.join(dirname, `${base}.webp`)
    const avifOut = path.join(dirname, `${base}.avif`)

    // create WebP
    await sharp(file).webp({ quality: 80 }).toFile(webpOut)
    console.log('created', webpOut)

    // create AVIF (smaller, experimental)
    await sharp(file).avif({ quality: 50 }).toFile(avifOut)
    console.log('created', avifOut)
  } catch (err) {
    console.error('error converting', file, err.message)
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
