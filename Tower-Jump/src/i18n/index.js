import { createI18n } from 'vue-i18n'
import en from '@/locales/en.js'
import de from '@/locales/de.js'
import fr from '@/locales/fr.js'
import ja from '@/locales/ja.js'
import ko from '@/locales/ko.js'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: en,
    de: de,
    fr: fr,
    ja: ja,
    ko: ko,
  },
})

/** 可选语言：code 与 messages 的 key 一致，label 为下拉中显示名称。新增语言时在此添加并在 messages 中加入对应 locale 文件。 */
export const localeOptions = [
  { code: 'en', label: 'English' },
  { code: 'de', label: 'Deutsch' },
  { code: 'fr', label: 'Français' },
  { code: 'ja', label: '日本語' },
  { code: 'ko', label: '한국어' },
]

export default i18n
