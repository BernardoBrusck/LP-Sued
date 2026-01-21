
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const publicDir = path.join(process.cwd(), 'public');

import https from 'https';

async function download(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to download: ${response.statusCode}`));
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => { }); // Delete the file async. (But we don't check result)
            reject(err);
        });
    });
}

async function optimizeAssets() {
    // 0. Download Background (if not exists)
    if (!fs.existsSync(path.join(publicDir, 'background-hero.jpg'))) {
        console.log('Downloading background image...');
        try {
            await download("https://images.unsplash.com/photo-1505664194779?auto=format&fit=crop&q=80&w=2000", path.join(publicDir, 'background-hero.jpg'));
            console.log('Downloaded background-hero.jpg');
        } catch (e) {
            console.error('Download failed:', e);
            // Continue to fallback generation
            // return; 
        }
    }

    // 1. Optimize Background Image
    try {
        let inputPath = path.join(publicDir, 'background-hero.jpg');

        // If download failed or file is empty, generate a fallback
        if (!fs.existsSync(inputPath) || fs.statSync(inputPath).size < 1000) {
            console.log('Background download failed, generating premium fallback...');
            // Create a dark abstract background
            await sharp({
                create: {
                    width: 1920,
                    height: 1080,
                    channels: 4,
                    background: { r: 5, g: 5, b: 5, alpha: 1 }
                }
            })
                .composite([{
                    input: Buffer.from('<svg><rect x="0" y="0" width="1920" height="1080" fill="none" class="noise"/></svg>'),
                    blend: 'overlay'
                }])
                .webp({ quality: 80 })
                .toFile(path.join(publicDir, 'background-hero.webp'));

            // Mobile fallback
            await sharp({
                create: {
                    width: 800,
                    height: 1200,
                    channels: 4,
                    background: { r: 5, g: 5, b: 5, alpha: 1 }
                }
            })
                .webp({ quality: 70 })
                .toFile(path.join(publicDir, 'background-hero-mobile.webp'));

            console.log('Generated premium fallback backgrounds');
        } else {
            await sharp(inputPath)
                .resize(1920, 1080, { fit: 'cover', position: 'center' }) // Max 1920px
                .webp({ quality: 80 })
                .toFile(path.join(publicDir, 'background-hero.webp'));
            console.log('Optimized background-hero.webp');

            // Mobile version
            await sharp(inputPath)
                .resize(800, 1200, { fit: 'cover', position: 'center' })
                .webp({ quality: 70 })
                .toFile(path.join(publicDir, 'background-hero-mobile.webp'));
            console.log('Optimized background-hero-mobile.webp');
        }

    } catch (e) {
        console.error('Error optimizing background:', e);
    }

    // 2. Generate PWA Icons (Brand Gold Square with Texture)
    try {
        const size192 = 192;
        const size512 = 512;
        const brandGold = '#B4975A';

        // Create base buffer
        const createIcon = (size) => sharp({
            create: {
                width: size,
                height: size,
                channels: 4,
                background: { r: 180, g: 151, b: 90, alpha: 1 } // #B4975A
            }
        })
            .png()
            .toFile(path.join(publicDir, `pwa-${size}x${size}.png`));

        await Promise.all([createIcon(size192), createIcon(size512)]);
        console.log('Generated PWA icons');
    } catch (e) {
        console.error('Error generating icons:', e);
    }
}

optimizeAssets();
