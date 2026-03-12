/**
 * 按语言获取 games 数据。data/games 下仅放数据文件，每文件 export default []。
 * 新增语言：在此添加 import 并加入 gamesByLocale 即可。
 */
import gamesEn from '@/data/games/en.js'
import gamesDe from '@/data/games/de.js'
import gamesFr from '@/data/games/fr.js'
import gamesJa from '@/data/games/ja.js'

const gamesByLocale = {
  en: gamesEn,
  de: gamesDe,
  fr: gamesFr,
  ja: gamesJa,
}

export const supportedGameLocales = Object.keys(gamesByLocale).sort()

export function getGames(locale) {
  if (locale && gamesByLocale[locale]) return gamesByLocale[locale]
  return gamesByLocale.en || Object.values(gamesByLocale)[0] || []
}
