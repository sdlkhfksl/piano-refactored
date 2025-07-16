<style lang="less">
@import url('../assets/style/variable.less');
.component-random-lyric { width: 100%; min-height: 40px; padding: 5px 0; margin: 0 auto; text-align: center;
  .lyric { display: inline; line-height: 30px; font-size: 18px; font-style: italic; color: @c-blue-d; cursor: pointer; text-shadow: 2px 2px 8px #fff;
    &:hover { color: @c-blue; }
  }
}
</style>

<template>
  <div class="component-random-lyric" ref="LyricComponent">
    <div class="lyric" id="randomLyric" @click="searchLyric" v-show="showLyric">{{ randomLyric }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Lyrics from '@/config/lyrics'

const randomLyric = ref('')
const randomIndex = ref(0)
let lyricTimer = null
const showLyric = ref(true)

const setRandomLyric = () => {
  if (lyricTimer) return;
  randomIndex.value = Math.floor(Math.random() * Lyrics.length)
  const set = () => {
    showLyric.value = false // Hide immediately
    if (randomIndex.value < Lyrics.length - 1) {
      ++randomIndex.value
    } else {
      randomIndex.value = 0
    }
    randomLyric.value = '"' + Lyrics[randomIndex.value] + '"'
    setTimeout(() => {
      showLyric.value = true // Show after a short delay to simulate fade-in
    }, 100) // Adjust this delay to control the fade-in speed
  }
  set()
  lyricTimer = setInterval(() => {
    set()
  }, 7e3)
}

const searchLyric = () => {
  let music163 = 'https://music.163.com/#/search/m/?s='
  let lyricSearchUrl = music163 + encodeURIComponent(Lyrics[randomIndex.value])
  window.open(lyricSearchUrl, '_blank')
}

onMounted(() => {
  setRandomLyric()
})

onBeforeUnmount(() => {
  clearInterval(lyricTimer)
  lyricTimer = null
})
</script>