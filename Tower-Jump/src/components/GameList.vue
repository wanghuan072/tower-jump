<template>
  <div class="game-list">
    <div class="grid">
      <a
        v-for="(game, idx) in displayedGames"
        :key="(game && (game.id || game.addressBar)) ?? idx"
        :href="getGameUrl(game)"
        class="card"
      >
        <div class="thumb">
          <img :src="game.imageUrl" :alt="game.imageAlt || game.title" />
        </div>
        <div class="meta">
          <h3 class="title">{{ game.title }}</h3>
          <p v-if="game.publishDate" class="date">{{ formatDate(game.publishDate) }}</p>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
// 通用游戏列表组件（可移植）
// 中文提示：如需跨项目自定义列数、卡片信息或点击行为，可在此组件扩展 props 与样式

import { getGames } from '@/composables/getGames'
import { useLocalePath } from '@/composables/useLocalePath'

const { locale } = useI18n()
const { withLocale } = useLocalePath()
const allGames = computed(() => getGames(locale.value))

const props = defineProps({
  games: {
    type: Array,
    default: null
  },
  limit: {
    type: Number,
    default: null
  }
})

// 计算显示的游戏列表
const displayedGames = computed(() => {
  const source = props.games || allGames.value
  const safe = Array.isArray(source) ? source.filter(Boolean) : []
  if (props.limit && props.limit > 0) {
    return safe.slice(0, props.limit)
  }
  return safe
})

// 生成游戏URL（根据当前路径自动带上 /de /fr /ja 等前缀）
function getGameUrl(game) {
  if (!game || !game.addressBar) return '#'

  const list = Array.isArray(allGames.value) ? allGames.value.filter(Boolean) : []
  const isFirstGame = list[0] && list[0].addressBar === game.addressBar

  if (isFirstGame) {
    return withLocale('/')
  }
  return withLocale(`/${game.addressBar}`)
}

function formatDate(dateString) {
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch (e) {
    return dateString
  }
}
</script>

<style scoped>
/* 中性样式（易于跨项目复用） */
.game-list {
  width: 100%;
}

.grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 16px;
  margin-bottom: 20px;
}

.card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: box-shadow 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
  text-decoration: none;
  color: inherit;
  display: block;
}

.card:hover {
  transform: translateY(-2px);
  border-color: #d1d5db;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  text-decoration: none;
  color: inherit;
}

.thumb {
  aspect-ratio: 1/1;
  background: #f9fafb;
  display: flex;
  align-items: center;
  justify-content: center;
}

.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.meta {
  padding: 5px;
}

.title {
  font-size: 12px;
  line-height: 1.4;
  color: #111827;
  margin: 0 0 6px 0;
  font-weight: 600;
}

.date {
  font-size: 12px;
  color: #6b7280;
  margin: 0;
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
}

@media (prefers-color-scheme: dark) {
  .card {
    background: #111215;
    border-color: #2a2b31;
  }
  .card:hover {
    border-color: #3a3b42;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.5);
  }
  .thumb {
    background: #16171b;
  }
  .title {
    color: #e5e7eb;
  }
  .date {
    color: #9ca3af;
  }
}
</style>


