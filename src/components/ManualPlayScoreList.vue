<style lang="less">
@import url('../assets/style/variable.less');
.score-container.component-manual-list { width: 40%; min-width: 500px; padding-bottom: 50%; font-size: 14px; overflow: hidden; background: rgba(255, 255, 255, .6); border-radius: 5px; border: solid 1px #ddd; position: relative;
  .list-view { width: 100%; height: 100%; position: absolute; top: 0; left: 0; padding: 20px 15px; overflow-y: scroll;  }
  .component-title { margin: 0 0 10px 0; font-size: 18px; font-weight: bold; position: relative;
    a.join { color: @c-red; font-size: 14px; margin-left: 5px; text-decoration: underline;
      &:hover { opacity: 0.8; }
    }
    .degree { width: 150px; float: right; text-align: left; }
  }
  .list { width: 100%; padding-left: 25px; padding-bottom: 10px; line-height: 32px;
    .list-item { height: 32px; line-height: 32px;  list-style: none;
      a { display: inline-block; min-width: 120px; cursor: pointer; }
      a:hover { color: @c-blue; text-decoration: underline; }
      .num { float:left; width: 35px; height: 32px; font-size: 16px; margin-left: -35px; text-align: center; color: @c-red; }
      .difficulty-degree { width: 150px; float: right; text-align: left;
        .icon-star { display: inline-block; transform: scale(.7); margin-left: -6px; }
      }
    }
   }
   .content-wrap { width: 100%;
      .info { font-size: 14px; margin: 5px 0; height: 28px; line-height: 28px; text-align: center; background: @c-blue; color: #fff; border-radius: 2px; }
      .return-btn { cursor: pointer; width: 80px; height: 32px; line-height: 32px; color: @c-blue-d;
        &:hover { text-decoration: underline; color: @c-blue; }
      }
      .author-info { float: right; line-height: 32px;
        a { color: @c-blue-d; margin-right: 7px;}
      }
     .score-item-content { word-wrap: break-word; font-size: 16px; letter-spacing: 0; line-height: 26px; }
     .score-item-lyrics { word-wrap: break-word; font-style: italic; margin-top: 20px; line-height: 26px; }
   }
}
</style>

<template>
  <div class="score-container component-manual-list">
    <div class="list-view">
      <p class="component-title">
        <span class="title">{{ sectionTitle }}</span>
        <a target="_blank" href="https://github.com/WarpPrism/AutoPiano/issues/9" class="join">我要参与贡献&nbsp;!</a>
        <span class="degree" v-show="listShow">困难度</span>
      </p>

      <ol class="list score-list" v-show="listShow">
        <li class="list-item score-item" v-for="(item, index) in scores" :key="index">
          <span class="num">{{ index + 1 }}</span>
          <a href="javascript:;" @click="clickScoreItem(item)">{{ item.name }}</a>
          <span class="difficulty-degree">
            <i class="icon-star" v-for="(star, sindex) in new Array(item.degree)" :key="sindex"></i>
          </span>
        </li>
      </ol>
      <div class="content-wrap" v-show="!listShow">
        <div class="section">
          <a href="javascript:;" class="return-btn" @click="toggleListShow()">&lt;&lt;&nbsp;返回列表</a>
          <span v-show="showItem.author" class="author-info"><a target="_blank"
              :href="showItem.authorLink || 'javascript:;'">&nbsp;{{showItem.author}}</a>提供</span>
        </div>
        <p class="info">在键盘上依次按以下键进行演奏，注意控制节奏。</p>
        <div class="score-item-content" v-html="showItem.content || ''"></div>
        <div class="score-item-lyrics" v-html="showItem.lyrics || ''"></div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import ScoreManual from '@/config/scoremanual'

const defaultTitle = '快速入门'
const scores = ref(ScoreManual)
const sectionTitle = ref(defaultTitle)
const showItem = ref({})
const listShow = ref(true)

// Initialize showItem with the first score
showItem.value = scores.value[0]

const clickScoreItem = (item) => {
  if (!item) return
  toggleListShow()
  showItem.value = item
  showItem.value.content = item.content.toUpperCase()
  sectionTitle.value = item.name || defaultTitle
}

const toggleListShow = () => {
  listShow.value = !listShow.value
  if (listShow.value) {
    sectionTitle.value = defaultTitle
  }
}
</script>