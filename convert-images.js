
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const publicDir = path.join(process.cwd(), 'public');
const files = fs.readdirSync(publicDir);

files.forEach(file => {
    if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')) {
        const inputPath = path.join(publicDir, file);
        const outputPath = path.join(publicDir, file.replace(/\.(png|jpg|jpeg)$/, '.webp'));

        sharp(inputPath)
            .toFile(outputPath)
            .then(() => console.log(`Converted ${file} to WebP`))
            .catch(err => console.error(`Error converting ${file}:`, err));
    }
});
