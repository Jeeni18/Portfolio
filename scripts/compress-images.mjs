// One-off asset tool, not part of the build. Re-run after adding new
// achievement/certificate images (jpg/png) to generate matching .webp
// files at <=800px wide. Requires sharp, which is NOT a project
// dependency (kept out of package.json on purpose) -- install it
// first: npm install --no-save sharp
import sharp from 'sharp'
import { readdirSync, statSync } from 'fs'
import { join, extname, basename } from 'path'

const dirs = [
  'src/assets/achievements',
  'src/assets/certificates',
]

const MAX_WIDTH = 800

for (const dir of dirs) {
  const files = readdirSync(dir).filter((f) => /\.(jpe?g|png)$/i.test(f))
  for (const file of files) {
    const inPath = join(dir, file)
    const outPath = join(dir, basename(file, extname(file)) + '.webp')
    const before = statSync(inPath).size
    await sharp(inPath)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(outPath)
    const after = statSync(outPath).size
    console.log(
      `${inPath} -> ${outPath}  ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB`
    )
  }
}
