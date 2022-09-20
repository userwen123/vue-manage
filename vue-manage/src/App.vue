<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  
}
</script>

<style>
html,body{
  margin: 0;
  padding: 0;
}
#app {
  /* 
    vh : viewport height
    1vh = 1 / 100 视口高度 
    100vh : 一屏的高度
  */
  height: 100vh;
}
</style>
