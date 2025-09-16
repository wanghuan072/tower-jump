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

  // 写入文件
  const distPath = path.join(process.cwd(), 'dist')
  if (!fs.existsSync(distPath)) {
    fs.mkdirSync(distPath, { recursive: true })
  }
  
  fs.writeFileSync(path.join(distPath, 'sitemap.xml'), sitemap)
  console.log('✅ 站点地图生成成功！')
  console.log(`📄 包含 ${games.length} 个页面`)
  console.log('🔗 页面列表:', games.map(g => g.addressBar === 'tower-jump' ? baseUrl : `${baseUrl}/${g.addressBar}`))
}

generateSitemap()
