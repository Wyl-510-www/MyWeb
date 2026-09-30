/**
 * 图片压缩脚本
 * 压缩 assets/images/life/ 目录下的图片
 */

const fs = require('fs-extra');
const path = require('path');
const sharp = require('sharp');

const INPUT_DIR = path.join(__dirname, '../assets/images/life');
const THUMB_WIDTH = 800;
const LARGE_WIDTH = 1920;
const THUMB_QUALITY = 80;
const LARGE_QUALITY = 85;

// 统计数据
let stats = {
  processed: 0,
  originalSize: 0,
  compressedSize: 0,
  errors: []
};

/**
 * 获取所有图片文件
 */
async function getAllImages(dir) {
  const images = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      const subImages = await getAllImages(fullPath);
      images.push(...subImages);
    } else if (/\.(jpg|jpeg|png)$/i.test(entry.name)) {
      images.push(fullPath);
    }
  }

  return images;
}

/**
 * 压缩单张图片
 */
async function compressImage(inputPath) {
  try {
    const stat = await fs.stat(inputPath);
    stats.originalSize += stat.size;

    const metadata = await sharp(inputPath).metadata();
    const ext = path.extname(inputPath);
    const dir = path.dirname(inputPath);
    const basename = path.basename(inputPath, ext);

    // 跳过已经压缩过的图片
    if (basename.endsWith('-thumb') || basename.endsWith('-large')) {
      console.log(`⊘ 跳过: ${path.basename(inputPath)} (已压缩)`);
      return;
    }

    // 如果图片宽度小于缩略图宽度，只压缩质量不改变尺寸
    if (metadata.width <= THUMB_WIDTH) {
      const outputPath = path.join(dir, `${basename}-optimized${ext}`);
      await sharp(inputPath)
        .jpeg({ quality: THUMB_QUALITY })
        .toFile(outputPath);

      const outputStat = await fs.stat(outputPath);
      stats.compressedSize += outputStat.size;
      stats.processed++;

      const savedKB = ((stat.size - outputStat.size) / 1024).toFixed(1);
      console.log(`✓ ${path.basename(inputPath)}: ${(stat.size/1024).toFixed(0)}KB → ${(outputStat.size/1024).toFixed(0)}KB (省 ${savedKB}KB)`);
      return;
    }

    // 生成缩略图（800px）
    const thumbPath = path.join(dir, `${basename}-thumb${ext}`);
    await sharp(inputPath)
      .resize(THUMB_WIDTH, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .jpeg({ quality: THUMB_QUALITY })
      .toFile(thumbPath);

    // 生成大图（1920px）
    const largePath = path.join(dir, `${basename}-large${ext}`);
    await sharp(inputPath)
      .resize(LARGE_WIDTH, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .jpeg({ quality: LARGE_QUALITY })
      .toFile(largePath);

    const thumbStat = await fs.stat(thumbPath);
    const largeStat = await fs.stat(largePath);

    stats.compressedSize += thumbStat.size + largeStat.size;
    stats.processed++;

    console.log(`✓ ${path.basename(inputPath)}:`);
    console.log(`  原图: ${(stat.size/1024).toFixed(0)}KB`);
    console.log(`  缩略图: ${(thumbStat.size/1024).toFixed(0)}KB`);
    console.log(`  大图: ${(largeStat.size/1024).toFixed(0)}KB`);

  } catch (error) {
    console.error(`✗ 压缩失败: ${path.basename(inputPath)} - ${error.message}`);
    stats.errors.push({ file: inputPath, error: error.message });
  }
}

/**
 * 主函数
 */
async function compress() {
  console.log('🚀 开始压缩生活记录图片...\n');

  try {
    const images = await getAllImages(INPUT_DIR);

    if (images.length === 0) {
      console.log('⚠️  未找到图片文件');
      return;
    }

    console.log(`📝 找到 ${images.length} 张图片\n`);

    for (const image of images) {
      await compressImage(image);
    }

    console.log('\n' + '='.repeat(50));
    console.log('📊 压缩统计');
    console.log('='.repeat(50));
    console.log(`处理图片: ${stats.processed} 张`);
    console.log(`原始大小: ${(stats.originalSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`压缩后: ${(stats.compressedSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`节省: ${((stats.originalSize - stats.compressedSize) / 1024 / 1024).toFixed(2)} MB (${((1 - stats.compressedSize / stats.originalSize) * 100).toFixed(1)}%)`);

    if (stats.errors.length > 0) {
      console.log(`\n⚠️  错误数量: ${stats.errors.length}`);
    }

    console.log('\n✅ 压缩完成！');

  } catch (error) {
    console.error('❌ 压缩失败:', error.message);
    process.exit(1);
  }
}

// 运行压缩
compress();
