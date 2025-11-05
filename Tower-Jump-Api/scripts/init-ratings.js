/**
 * 初始化游戏评分数据脚本
 * 为每个游戏添加初始评分数据（平均分4.5-5，总数几百个）
 */

import { neon } from '@neondatabase/serverless';
import 'dotenv/config';

const sql = neon(process.env.DATABASE_URL);
const PROJECT_PREFIX = 'tower_jump';

// 所有游戏的 addressBar 列表
const gameAddressBars = [
  'tower-jump',
  'escape-jump',
  'bottle-jump',
  'omnom-jump',
  'sprunki-jump',
  'mars-jump',
  'chicken-flip',
  'bird-up',
  'bumpy-jumpy',
  'jumping-shell',
  'helix-jump',
  'doodle-jumping',
  'mr-flip',
  'color-jump',
  'jump-boy-jack',
  'jump-the-wall',
  'jumping-man',
  'jumping-orbits',
  'jumper-cat-infinite-jump',
  'sky-hopper'
];

// 生成随机评分数据，确保平均分在4.5-5之间
function generateRatings(targetAverage, totalCount) {
  const ratings = { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 };
  
  // 计算需要多少5星和4星来达到目标平均分
  // 假设只有4星和5星，计算比例
  // targetAverage = (4 * count4 + 5 * count5) / totalCount
  // 且 count4 + count5 = totalCount
  
  // 简化：大部分是5星，少量4星，极少3星
  const count5 = Math.floor(totalCount * 0.85); // 85%是5星
  const count4 = Math.floor(totalCount * 0.12); // 12%是4星
  const count3 = Math.floor(totalCount * 0.02); // 2%是3星
  const remaining = totalCount - count5 - count4 - count3;
  
  ratings['5'] = count5;
  ratings['4'] = count4;
  ratings['3'] = count3;
  ratings['2'] = Math.floor(remaining / 2);
  ratings['1'] = remaining - ratings['2'];
  
  return ratings;
}

// 为单个游戏初始化评分
async function initGameRatings(pageId, targetAverage, totalCount) {
  try {
    console.log(`\n正在为游戏 ${pageId} 初始化评分数据...`);
    console.log(`目标平均分: ${targetAverage}, 总数量: ${totalCount}`);
    
    // 生成评分分布
    const ratings = generateRatings(targetAverage, totalCount);
    
    // 删除现有评分（只删除评分，不删除评论）
    await sql(`
      DELETE FROM ${PROJECT_PREFIX}_feedback 
      WHERE game_address_bar = '${pageId}' 
      AND rating IS NOT NULL 
      AND text IS NULL
      AND added_by_admin = TRUE
    `);
    
    // 批量插入评分数据
    let totalInserted = 0;
    for (let rating = 1; rating <= 5; rating++) {
      const count = ratings[String(rating)];
      if (count > 0) {
        // 分批插入，每批50个
        const batchSize = 50;
        for (let i = 0; i < count; i += batchSize) {
          const batch = [];
          const currentBatch = Math.min(batchSize, count - i);
          
          for (let j = 0; j < currentBatch; j++) {
            // 生成随机时间戳（过去30天内）
            const daysAgo = Math.floor(Math.random() * 30);
            const randomDate = new Date();
            randomDate.setDate(randomDate.getDate() - daysAgo);
            const timestamp = randomDate.toISOString().replace('T', ' ').replace('Z', '');
            
            batch.push(
              sql(`
                INSERT INTO ${PROJECT_PREFIX}_feedback 
                (game_address_bar, name, rating, added_by_admin, created_at)
                VALUES ('${pageId}', '系统评分', ${rating}, TRUE, '${timestamp}')
              `)
            );
          }
          
          await Promise.all(batch);
          totalInserted += currentBatch;
          console.log(`  已插入 ${totalInserted} / ${totalCount} 条评分`);
        }
      }
    }
    
    // 验证结果
    const stats = await sql(`
      SELECT 
        COUNT(rating) as count,
        ROUND(AVG(rating)::numeric, 1) as average,
        COUNT(CASE WHEN rating = 1 THEN 1 END) as rating_1,
        COUNT(CASE WHEN rating = 2 THEN 1 END) as rating_2,
        COUNT(CASE WHEN rating = 3 THEN 1 END) as rating_3,
        COUNT(CASE WHEN rating = 4 THEN 1 END) as rating_4,
        COUNT(CASE WHEN rating = 5 THEN 1 END) as rating_5
      FROM ${PROJECT_PREFIX}_feedback 
      WHERE game_address_bar = '${pageId}' AND rating IS NOT NULL
    `);
    
    const result = stats[0];
    console.log(`✅ 游戏 ${pageId} 初始化完成:`);
    console.log(`   总评分: ${result.count}`);
    console.log(`   平均分: ${result.average}`);
    console.log(`   分布: 1★(${result.rating_1}) 2★(${result.rating_2}) 3★(${result.rating_3}) 4★(${result.rating_4}) 5★(${result.rating_5})`);
    
  } catch (error) {
    console.error(`❌ 初始化游戏 ${pageId} 评分失败:`, error);
    throw error;
  }
}

// 主函数
async function main() {
  console.log('🚀 开始初始化游戏评分数据...\n');
  
  try {
    // 为每个游戏生成不同的评分数据
    const ratingConfigs = [
      { average: 4.6, count: 287 },
      { average: 4.7, count: 342 },
      { average: 4.8, count: 415 },
      { average: 4.9, count: 523 },
      { average: 4.5, count: 256 },
      { average: 4.8, count: 389 },
      { average: 4.7, count: 367 },
      { average: 4.6, count: 298 },
      { average: 4.9, count: 481 },
      { average: 4.8, count: 432 },
      { average: 4.7, count: 356 },
      { average: 4.6, count: 274 },
      { average: 4.8, count: 401 },
      { average: 4.9, count: 498 },
      { average: 4.7, count: 378 },
      { average: 4.8, count: 423 },
      { average: 4.6, count: 291 },
      { average: 4.9, count: 512 },
      { average: 4.7, count: 364 },
      { average: 4.8, count: 445 }
    ];
    
    for (let i = 0; i < gameAddressBars.length; i++) {
      const addressBar = gameAddressBars[i];
      const config = ratingConfigs[i % ratingConfigs.length];
      await initGameRatings(addressBar, config.average, config.count);
    }
    
    console.log('\n✅ 所有游戏评分数据初始化完成！');
    
  } catch (error) {
    console.error('❌ 初始化失败:', error);
    process.exit(1);
  }
}

// 运行脚本
main();

