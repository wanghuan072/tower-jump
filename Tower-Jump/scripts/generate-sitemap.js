import { games } from '../src/data/games.js'
import fs from 'fs'
import path from 'path'

// 生成站点地图
function generateSitemap() {
  const baseUrl = 'https://towerjump.org'
  const currentDate = new Date().toISOString()
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`

  // 静态页面
  const staticPages = [
    'about-us',
    'contact',
    'copyright',
    'privacy-policy',
    'terms-of-service'
  ]

  staticPages.forEach(page => {
    sitemap += `  <url>
    <loc>${baseUrl}/${page}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
`
  })

  // 游戏页面
  games.forEach(game => {
    const url = game.addressBar === 'tower-jump' ? baseUrl : `${baseUrl}/${game.addressBar}`
    const priority = game.addressBar === 'tower-jump' ? 1.0 : 0.8
    const changefreq = game.addressBar === 'tower-jump' ? 'daily' : 'weekly'
    const lastmod = game.publishDate ? new Date(game.publishDate).toISOString() : currentDate
    
    sitemap += `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>
`
  })

  sitemap += `</urlset>`

  // 写入文件到 dist 目录 (构建后)
  const distPath = path.join(process.cwd(), 'dist')
  if (!fs.existsSync(distPath)) {
    fs.mkdirSync(distPath, { recursive: true })
  }
  fs.writeFileSync(path.join(distPath, 'sitemap.xml'), sitemap)
  
  // 同时写入到 public 目录 (开发/源码)
  const publicPath = path.join(process.cwd(), 'public')
  if (fs.existsSync(publicPath)) {
    fs.writeFileSync(path.join(publicPath, 'sitemap.xml'), sitemap)
  }

  console.log('✅ 站点地图生成成功！')
  console.log(`📄 包含 ${games.length + staticPages.length} 个页面`)
  console.log('🔗 游戏页面:', games.map(g => g.addressBar === 'tower-jump' ? baseUrl : `${baseUrl}/${g.addressBar}`))
  console.log('🔗 静态页面:', staticPages.map(p => `${baseUrl}/${p}`))
}

generateSitemap()
