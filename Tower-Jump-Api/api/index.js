/**
 * 游戏评论评分API - 统一表方案主入口
 */

import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import 'dotenv/config';
import unifiedFeedbackRouter from './unified-feedback.js';

const app = express();
const PORT = process.env.PORT || 3000;

// 获取项目前缀
const PROJECT_PREFIX = process.env.PROJECT_PREFIX || 'Tower-Jump';
console.log(`[API] 启动 Tower Jump 评论评分系统API - 项目前缀: ${PROJECT_PREFIX}`);

// 中间件配置
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// CORS配置
const allowedOrigins = [
  'http://localhost:5173',  // 本地开发前端
  'http://localhost:3000',  // 本地开发后端（如果需要）
  'https://tower-jump.vercel.app',  // Vercel部署的前端地址
  'https://towerjump.org',  // 生产环境前端地址
  process.env.FRONTEND_URL  // 环境变量中的前端地址
].filter(Boolean); // 过滤掉undefined值

// 开发环境允许所有来源，生产环境使用限制的域名
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' ? allowedOrigins : true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// 速率限制
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15分钟
  max: 100, // 限制每个IP 15分钟内最多100个请求
  message: '请求过于频繁，请稍后再试',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// 健康检查端点
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: '游戏评论评分API运行正常',
    project: PROJECT_PREFIX,
    timestamp: new Date().toISOString()
  });
});



// 公开API路由
app.post('/comments', async (req, res) => {
  try {
    const { pageId, name, email, text, rating } = req.body;
    
    // 要求所有字段必须填写
    if (!pageId) {
      return res.status(400).json({ message: '缺少必要字段 pageId' });
    }
    
    if (!name || !name.trim()) {
      return res.status(400).json({ message: '用户名不能为空' });
    }
    
    if (!text || !text.trim()) {
      return res.status(400).json({ message: '评论内容不能为空' });
    }
    
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: '评分必须在1-5之间' });
    }
    
    const sql = (await import('@neondatabase/serverless')).neon(process.env.DATABASE_URL);
    const PROJECT_PREFIX = 'tower_jump';
    
    // 验证并处理数据
    const validRating = parseInt(rating);
    const userName = name.trim();
    const commentText = text.trim();
    
    const newComment = await sql(`
      INSERT INTO ${PROJECT_PREFIX}_feedback (game_address_bar, name, email, text, rating, added_by_admin)
      VALUES ('${pageId}', '${userName}', ${email?.trim() ? `'${email.trim()}'` : 'NULL'}, '${commentText}', ${validRating}, FALSE)
      RETURNING id, name, email, text, rating, created_at as timestamp
    `);
    
    res.status(201).json(newComment[0]);
  } catch (error) {
    console.error('提交评论失败:', error);
    res.status(500).json({ message: '服务器错误' });
  }
});

app.get('/comments', async (req, res) => {
  try {
    const { pageId } = req.query;
    
    if (!pageId) {
      return res.status(400).json({ message: '缺少pageId参数' });
    }
    
    const sql = (await import('@neondatabase/serverless')).neon(process.env.DATABASE_URL);
    const PROJECT_PREFIX = 'tower_jump';
    
    const comments = await sql(`
      SELECT id, name, email, text, rating, created_at as timestamp
      FROM ${PROJECT_PREFIX}_feedback
      WHERE game_address_bar = '${pageId}' AND text IS NOT NULL
      ORDER BY created_at ASC
    `);
    res.json(comments);
  } catch (error) {
    console.error('获取评论失败:', error);
    res.status(500).json({ message: '服务器错误' });
  }
});

app.post('/ratings', async (req, res) => {
  try {
    const { pageId, rating } = req.body;
    
    if (!pageId || !rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: '无效的评分数据' });
    }
    
    const sql = (await import('@neondatabase/serverless')).neon(process.env.DATABASE_URL);
    const PROJECT_PREFIX = 'tower_jump';
    
    await sql(`
      INSERT INTO ${PROJECT_PREFIX}_feedback (game_address_bar, name, rating, added_by_admin)
      VALUES ('${pageId}', 'Anonymous', ${rating}, FALSE)
    `);
    
    // 获取更新后的评分统计
    const stats = await sql(`
      SELECT 
        COUNT(rating) as count,
        ROUND(AVG(rating), 1) as average,
        COUNT(CASE WHEN rating = 1 THEN 1 END) as rating_1,
        COUNT(CASE WHEN rating = 2 THEN 1 END) as rating_2,
        COUNT(CASE WHEN rating = 3 THEN 1 END) as rating_3,
        COUNT(CASE WHEN rating = 4 THEN 1 END) as rating_4,
        COUNT(CASE WHEN rating = 5 THEN 1 END) as rating_5
      FROM ${PROJECT_PREFIX}_feedback 
      WHERE game_address_bar = '${pageId}' AND rating IS NOT NULL
    `);
    
    const result = stats[0] || { count: 0, average: 0, rating_1: 0, rating_2: 0, rating_3: 0, rating_4: 0, rating_5: 0 };
    
    res.json({
      message: '评分提交成功',
      count: result.count,
      average: result.average,
      ratings: {
        '1': result.rating_1,
        '2': result.rating_2,
        '3': result.rating_3,
        '4': result.rating_4,
        '5': result.rating_5
      }
    });
  } catch (error) {
    console.error('提交评分失败:', error);
    res.status(500).json({ message: '服务器错误' });
  }
});

app.get('/ratings', async (req, res) => {
  try {
    const { pageId } = req.query;
    
    if (!pageId) {
      return res.status(400).json({ message: '缺少pageId参数' });
    }
    
    const sql = (await import('@neondatabase/serverless')).neon(process.env.DATABASE_URL);
    const PROJECT_PREFIX = 'tower_jump';
    
    const stats = await sql(`
      SELECT 
        COUNT(rating) as count,
        ROUND(AVG(rating), 1) as average,
        COUNT(CASE WHEN rating = 1 THEN 1 END) as rating_1,
        COUNT(CASE WHEN rating = 2 THEN 1 END) as rating_2,
        COUNT(CASE WHEN rating = 3 THEN 1 END) as rating_3,
        COUNT(CASE WHEN rating = 4 THEN 1 END) as rating_4,
        COUNT(CASE WHEN rating = 5 THEN 1 END) as rating_5
      FROM ${PROJECT_PREFIX}_feedback 
      WHERE game_address_bar = '${pageId}' AND rating IS NOT NULL
    `);
    
    const result = stats[0] || { count: 0, average: 0, rating_1: 0, rating_2: 0, rating_3: 0, rating_4: 0, rating_5: 0 };
    
    res.json({
      count: result.count,
      average: result.average,
      ratings: {
        '1': result.rating_1,
        '2': result.rating_2,
        '3': result.rating_3,
        '4': result.rating_4,
        '5': result.rating_5
      }
    });
  } catch (error) {
    console.error('获取评分失败:', error);
    res.status(500).json({ message: '服务器错误' });
  }
});

// 确保排行榜表存在的辅助函数
async function ensureLeaderboardTable() {
  const sql = (await import('@neondatabase/serverless')).neon(process.env.DATABASE_URL);
  const PROJECT_PREFIX = 'tower_jump';
  
  try {
    // 检查表是否存在，如果不存在则创建
    await sql(`
      CREATE TABLE IF NOT EXISTS ${PROJECT_PREFIX}_leaderboard (
        id SERIAL PRIMARY KEY,
        game_address_bar VARCHAR(255) NOT NULL,
        player_name VARCHAR(255) NOT NULL,
        score INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // 创建索引以提高查询性能
    await sql(`
      CREATE INDEX IF NOT EXISTS idx_leaderboard_game_score 
      ON ${PROJECT_PREFIX}_leaderboard (game_address_bar, score DESC)
    `);
  } catch (error) {
    console.error('创建排行榜表失败:', error);
    throw error;
  }
}

// 排行榜API路由
app.post('/leaderboard', async (req, res) => {
  try {
    const { pageId, playerName, score } = req.body;
    
    if (!pageId || !playerName || score === undefined || score === null) {
      return res.status(400).json({ message: '缺少必要字段：pageId, playerName, score' });
    }
    
    // 确保表存在
    await ensureLeaderboardTable();
    
    const sql = (await import('@neondatabase/serverless')).neon(process.env.DATABASE_URL);
    const PROJECT_PREFIX = 'tower_jump';
    
    const playerNameTrimmed = playerName.trim().substring(0, 50); // 限制长度
    const scoreInt = parseInt(score);
    
    if (isNaN(scoreInt) || scoreInt < 0) {
      return res.status(400).json({ message: '分数必须是有效的非负整数' });
    }
    
    // 插入分数记录
    const result = await sql(`
      INSERT INTO ${PROJECT_PREFIX}_leaderboard (game_address_bar, player_name, score)
      VALUES ('${pageId}', '${playerNameTrimmed.replace(/'/g, "''")}', ${scoreInt})
      RETURNING id, player_name, score, created_at
    `);
    
    res.status(201).json({
      message: '分数提交成功',
      data: result[0]
    });
  } catch (error) {
    console.error('提交分数失败:', error);
    res.status(500).json({ message: '服务器错误' });
  }
});

app.get('/leaderboard', async (req, res) => {
  try {
    const { pageId, limit = 10 } = req.query;
    
    if (!pageId) {
      return res.status(400).json({ message: '缺少pageId参数' });
    }
    
    // 确保表存在
    await ensureLeaderboardTable();
    
    const sql = (await import('@neondatabase/serverless')).neon(process.env.DATABASE_URL);
    const PROJECT_PREFIX = 'tower_jump';
    
    const limitInt = parseInt(limit) || 10;
    const maxLimit = Math.min(limitInt, 100); // 最多返回100条
    
    // 获取排行榜（按分数降序排列）
    const leaderboard = await sql(`
      SELECT 
        id,
        ROW_NUMBER() OVER (ORDER BY score DESC, created_at ASC) as rank,
        player_name,
        score,
        created_at
      FROM ${PROJECT_PREFIX}_leaderboard
      WHERE game_address_bar = '${pageId}'
      ORDER BY score DESC, created_at ASC
      LIMIT ${maxLimit}
    `);
    
    console.log(`[排行榜API] 查询结果:`, leaderboard);
    
    res.json({
      pageId,
      leaderboard: leaderboard || [],
      total: leaderboard?.length || 0
    });
  } catch (error) {
    console.error('获取排行榜失败:', error);
    res.status(500).json({ message: '服务器错误' });
  }
});

app.get('/leaderboard/best', async (req, res) => {
  try {
    const { pageId, playerName } = req.query;
    
    if (!pageId || !playerName) {
      return res.status(400).json({ message: '缺少pageId或playerName参数' });
    }
    
    // 确保表存在
    await ensureLeaderboardTable();
    
    const sql = (await import('@neondatabase/serverless')).neon(process.env.DATABASE_URL);
    const PROJECT_PREFIX = 'tower_jump';
    
    // 获取用户最佳分数
    const bestScore = await sql(`
      SELECT MAX(score) as best_score
      FROM ${PROJECT_PREFIX}_leaderboard
      WHERE game_address_bar = '${pageId}' AND player_name = '${playerName.replace(/'/g, "''")}'
    `);
    
    res.json({
      pageId,
      playerName,
      bestScore: bestScore[0]?.best_score || 0
    });
  } catch (error) {
    console.error('获取最佳分数失败:', error);
    res.status(500).json({ message: '服务器错误' });
  }
});

// 管理员API路由
app.use('/admin', unifiedFeedbackRouter);

// 404处理
app.use('*', (req, res) => {
  res.status(404).json({ 
    message: 'API端点不存在',
    availableEndpoints: [
      'GET /health - 健康检查',
      'GET /comments?pageId=xxx - 获取评论',
      'POST /comments - 提交评论',
      'GET /ratings?pageId=xxx - 获取评分统计',
      'POST /ratings - 提交评分',
      'POST /leaderboard - 提交分数',
      'GET /leaderboard?pageId=xxx&limit=10 - 获取排行榜',
      'GET /leaderboard/best?pageId=xxx&playerName=xxx - 获取用户最佳分数',
      'POST /admin/login - 管理员登录',
      'GET /admin/feedback - 获取所有反馈数据',
      'DELETE /admin/feedback/:pageId/:feedbackId - 删除反馈',
      'POST /admin/feedback/manual - 手动添加反馈',
      'PUT /admin/ratings/:pageId - 更新评分'
    ]
  });
});

// 错误处理中间件
app.use((error, req, res, next) => {
  console.error('[API] 服务器错误:', error);
  res.status(500).json({ 
    message: '服务器内部错误',
    error: process.env.NODE_ENV === 'development' ? error.message : '请稍后重试'
  });
});

// 启动服务器
    app.listen(PORT, () => {
  console.log(`🚀 游戏评论评分API已启动`);
  console.log(`📡 端口: ${PORT}`);
  console.log(`🌐 项目前缀: ${PROJECT_PREFIX}`);
  console.log(`🔗 健康检查: http://localhost:${PORT}/health`);
  console.log(`👤 管理员登录: http://localhost:${PORT}/admin/login`);
  console.log(`📊 反馈管理: http://localhost:${PORT}/admin/feedback`);
});

export default app;
