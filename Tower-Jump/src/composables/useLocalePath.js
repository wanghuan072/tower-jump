import { computed } from 'vue'
import { useRoute } from 'vue-router'

/**
 * 路径型多语言：默认英语无前缀，其它语言使用 /<lang>/ 前缀（如 /de/...）。
 */
export function useLocalePath() {
  const route = useRoute()
  const getPrefixFromPath = (p) => {
    if (p === '/de' || p.startsWith('/de/')) return '/de'
    if (p === '/fr' || p.startsWith('/fr/')) return '/fr'
    if (p === '/ja' || p.startsWith('/ja/')) return '/ja'
    if (p === '/ko' || p.startsWith('/ko/')) return '/ko'
    return ''
  }

  const localePrefix = computed(() => {
    const p = route.path || '/'
    return getPrefixFromPath(p)
  })

  const withLocale = (path) => {
    const prefix = localePrefix.value
    if (!prefix) return path
    if (path === '/') return `${prefix}/`
    return `${prefix}${path}`
  }

  return { localePrefix, withLocale }
}

