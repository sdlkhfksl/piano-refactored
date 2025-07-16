<template>
  <div class="page-pc">
    <div class="app-bg" :style="appBgStyle"></div>

    <div class="app-content">
      <!-- <VueLivere nodeBelowSelector=".blank-page-pc"/> -->
      <!-- <PageHeader></PageHeader> -->
      <!-- <RandomLyric></RandomLyric> -->
      <Piano></Piano>
      <div class="score-section responsive-section-a">
        <!-- <ManualPlayScoreList></ManualPlayScoreList> -->
        <!-- <AutoPlayScoreList></AutoPlayScoreList> -->
      </div>
      <div class="right-drawer" :class="{'show': rightDrawerShow}">
        <div class="trigger" @click="toggleRightDrawer">歌曲列表</div>
        <div class="close" @click="hideRightDrawer">X</div>
        <!-- <ManualPlayScoreList></ManualPlayScoreList> -->
      </div>
      <div class="blank-page-pc" style="height: 200px;"></div>
      <!-- <PageFooter></PageFooter> -->

      <button @click="playTestScore">播放小星星</button>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import Piano from '../components/Piano.vue'
import { OBEvent } from '@/config/constants'

const store = useStore()

const percent = ref(0)
const rightDrawerShow = ref(false)

const appBgStyle = computed(() => {
  return `background-image: url(${store.getters.$currentWallpaper});`
})

const toggleRightDrawer = () => {
  rightDrawerShow.value = !rightDrawerShow.value
}

const hideRightDrawer = () => {
  rightDrawerShow.value = false
}

const playTestScore = () => {
  window.dispatchEvent(new CustomEvent(OBEvent.AUTO_PLAY_NUM_SCORE, {
    detail: { scorename: '小星星' }
  }))
}
</script>

<style lang="less" scoped>
@import url('../assets/style/variable.less');
.page-pc { width: 100%; min-width: 1280px; height: 100%; padding: 1px; font-family: 'Avenir', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; color: #2c3e50; position: absolute; top: 0; left: 0; overflow-x: scroll;
  .app-bg { width: 100%; height: 100%; position: absolute; top: 0; left: 0; z-index: -100; opacity: 0.5; background-size: cover; background-repeat: no-repeat; transition: all .5s linear; }
  .app-content { width: 100%; height: 100%; overflow-y: scroll; position: relative;
    .piano-scroll-wrap { overflow: hidden; }
    .score-section { width: 100%; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; }
    .right-drawer { width: 500px; height: 100%; position: fixed; top: 0; right: -500px; z-index: 100; border-left: solid 1px #ccc; transition: all .3s ease-in-out;
      .trigger { width: 30px; height: 86px; font-size: 16px; text-align: center; padding-top: 7px;  position: absolute; top: 50%; left: -32px; background: @c-red; color: #fff; cursor: pointer; z-index: 101; }
      // .trigger::before { content: ''; width: 8px; height: 8px; background: #f00;; position: absolute; top: -2px; right: -2px; border-radius: 50%; }
      .close { width: 20px; height: 20px; line-height: 20px; text-align: center; position: absolute; top: 10px; right: 15px; background: @c-red; color: #fff; cursor: pointer; z-index: 101; }
      .component-manual-list { width: 100%; height: 100%; background: rgba(255, 255, 255, .9);  border-radius: 0; border: none;
        // .list-item a { color: #fff; }
      }
    }
    .right-drawer.show { right: 0; }
  }
}
</style>