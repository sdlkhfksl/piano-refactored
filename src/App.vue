<template>
  <router-view />
</template>

<script setup>
</script>

<style lang="less">
@import url('./assets/style/normalize.css');
@import url('./assets/style/icon.css');
@import url('./assets/style/variable.less');
@import url('./assets/style/responsive.less');
@import url('./assets/style/sugar.less');
@import url('./assets/style/transition.less');

::-webkit-scrollbar {
  width: 0px;
  height: 0px;
  background-color: #F5F5F5;
  display: none;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-touch-callout: none;  /*系统默认菜单被禁用*/
  -webkit-user-select: none; /*webkit浏览器*/
  -khtml-user-select: none; /*早期浏览器*/
  -moz-user-select: none;/*火狐*/
  -ms-user-select: none; /*IE10*/
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  -webkit-overflow-scrolling: touch;
  /* 隐藏滚动条，宽度0 */
  scrollbar-width: none;
}

html, body {
  width: 100%;
  height: 100%;
  user-select: none;
  position: relative;
  overflow-x: scroll;
  overflow-y: hidden;
  color: @c-black;
}
#app {
  width: 100%;
  height: 100%;
}
a {
  text-decoration: none;
  color: @c-black;
}

</style>