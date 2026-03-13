<template>
  <header class="site-header">
    <div class="container">
      <div class="logo">
        <a href="/">
          <img src="/images/logo.webp" :alt="$t('header.logoAlt')" class="logo-image" />
          <span class="logo-text">{{ $t('header.logoText') }}</span>
        </a>
      </div>
      <div class="nav-row">
        <nav class="nav" :aria-label="$t('header.navAria')">
          <a class="nav-link" :href="withLocale('/')">{{ $t('header.navHome') }}</a>
          <a class="nav-link" :href="withLocale('/tower-jump-2')">{{ $t('header.navTowerJump2') }}</a>
          <a class="nav-link" :href="withLocale('/all-jump-games')">{{ $t('header.navAllGames') }}</a>
        </nav>
        <div class="lang-dropdown" ref="langDropdownRef">
          <button
            ref="langTriggerRef"
            type="button"
            class="lang-trigger"
            :aria-label="$t('header.langAria')"
            :aria-expanded="langOpen"
            @click="toggleLangMenu"
          >
            <span class="lang-label">{{ currentLangLabel }}</span>
            <svg class="lang-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          <Teleport to="body">
            <Transition name="lang-menu">
              <ul
                v-show="langOpen"
                ref="langMenuRef"
                class="lang-menu lang-menu-fixed"
                role="listbox"
                :style="langMenuStyle"
              >
                <li v-for="opt in localeOptions" :key="opt.code" role="option" class="lang-option-li">
                  <a
                    class="lang-option"
                    :class="{ active: currentPathLocale === opt.code }"
                    :aria-selected="currentPathLocale === opt.code"
                    :href="getLocaleHref(opt.code)"
                    @click="langOpen = false"
                  >
                    {{ opt.label }}
                  </a>
                </li>
              </ul>
            </Transition>
          </Teleport>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { localeOptions } from '@/i18n'
import { useLocalePath } from '@/composables/useLocalePath'

const { withLocale } = useLocalePath()

const langOpen = ref(false)
const langDropdownRef = ref(null)
const langTriggerRef = ref(null)
const langMenuRef = ref(null)
const langMenuStyle = ref({})

const currentLangLabel = computed(() => {
  const opt = localeOptions.find((o) => o.code === currentPathLocale.value)
  return opt ? opt.label : currentPathLocale.value
})

function updateMenuPosition() {
  if (!langTriggerRef.value || !langOpen.value) return
  const rect = langTriggerRef.value.getBoundingClientRect()
  langMenuStyle.value = {
    top: `${rect.bottom + 6}px`,
    left: `${rect.left}px`,
    minWidth: `${rect.width}px`,
  }
}

function toggleLangMenu() {
  langOpen.value = !langOpen.value
  if (langOpen.value) nextTick(updateMenuPosition)
}

const currentPathLocale = computed(() => {
  if (typeof window === 'undefined') return 'en'
  const p = window.location.pathname || '/'
  return p === '/de' || p.startsWith('/de/')
    ? 'de'
    : p === '/fr' || p.startsWith('/fr/')
      ? 'fr'
      : p === '/ja' || p.startsWith('/ja/')
        ? 'ja'
        : p === '/ko' || p.startsWith('/ko/')
          ? 'ko'
          : 'en'
})

function getLocaleHref(code) {
  if (typeof window === 'undefined') return '/'
  const { pathname, search, hash } = window.location
  const rest = pathname === '/de' || pathname === '/fr' || pathname === '/ja' || pathname === '/ko'
    ? '/'
    : pathname.startsWith('/de/')
      ? pathname.slice(3)
      : pathname.startsWith('/fr/')
        ? pathname.slice(3)
        : pathname.startsWith('/ja/')
          ? pathname.slice(3)
          : pathname.startsWith('/ko/')
            ? pathname.slice(3)
            : pathname

  const targetPath =
    code === 'de'
      ? (rest === '/' ? '/de/' : `/de${rest}`)
      : code === 'fr'
        ? (rest === '/' ? '/fr/' : `/fr${rest}`)
        : code === 'ja'
          ? (rest === '/' ? '/ja/' : `/ja${rest}`)
          : code === 'ko'
            ? (rest === '/' ? '/ko/' : `/ko${rest}`)
            : rest
  return `${targetPath}${search || ''}${hash || ''}`
}

function onClickOutside(e) {
  if (!langDropdownRef.value) return
  const menu = langMenuRef.value
  if (
    !langDropdownRef.value.contains(e.target) &&
    (!menu || !menu.contains(e.target))
  ) {
    langOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', onClickOutside)
  window.addEventListener('scroll', updateMenuPosition, true)
  window.addEventListener('resize', updateMenuPosition)
})

onUnmounted(() => {
  document.removeEventListener('click', onClickOutside)
  window.removeEventListener('scroll', updateMenuPosition, true)
  window.removeEventListener('resize', updateMenuPosition)
})

watch(langOpen, (open) => {
  if (open) nextTick(updateMenuPosition)
})
</script>

<style scoped>
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  overflow: visible;
  background: rgba(15, 15, 20, 0.95);
  backdrop-filter: saturate(180%) blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.site-header .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  overflow: visible;
}

.nav-row {
  display: flex;
  align-items: center;
  gap: 12px;
  overflow: visible;
}

.logo a {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-decoration: none;
}

.logo-image {
  width: 32px;
  height: 32px;
  border-radius: 6px;
}

.logo-text {
  font-size: 18px;
  background: linear-gradient(135deg, #ff6b6b, #ffd700);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav {
  display: flex;
  gap: 8px;
  background: rgba(255, 255, 255, 0.05);
  padding: 4px;
  border-radius: 99px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.nav-link {
  color: #cfd3ff;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 99px;
  transition: all 0.2s ease;
  cursor: pointer;
  white-space: nowrap;
}

.nav-link:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
}

/* 语言下拉 */
.lang-dropdown {
  position: relative;
  overflow: visible;
}

.lang-trigger {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  font-size: 14px;
  font-weight: 500;
  color: #cfd3ff;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 99px;
  cursor: pointer;
  transition: color 0.2s, background 0.2s, border-color 0.2s;
}

.lang-trigger:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.12);
}

.lang-chevron {
  flex-shrink: 0;
  opacity: 0.8;
  transition: transform 0.2s;
}

.lang-dropdown:has(.lang-trigger[aria-expanded="true"]) .lang-chevron {
  transform: rotate(180deg);
}

.lang-menu {
  margin: 0;
  padding: 6px 0;
  list-style: none;
  background: rgba(20, 20, 28, 0.98);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
  min-width: 120px;
}

.lang-menu-fixed {
  position: fixed;
  z-index: 10001;
}

.lang-option {
  padding: 8px 14px;
  font-size: 14px;
  color: #cfd3ff;
  cursor: pointer;
  transition: color 0.2s, background 0.2s;
}

.lang-option:hover,
.lang-option.active {
  color: #fff;
  background: rgba(255, 255, 255, 0.08);
}

.lang-menu-enter-active,
.lang-menu-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.lang-menu-enter-from,
.lang-menu-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

@media (max-width: 768px) {
  .logo-text {
    display: none;
  }

  .nav-row {
    gap: 8px;
  }

  .nav-link {
    padding: 6px 12px;
    font-size: 13px;
  }

  .lang-trigger {
    padding: 6px 10px;
    font-size: 13px;
  }
}
</style>
