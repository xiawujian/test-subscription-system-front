<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
}
</script>

<style>
html, body, #app {
  margin: 0;
  height: 100%;
}
::-webkit-scrollbar {
  width: 8px;

}
::-webkit-scrollbar-thumb {
  background-color: #909399;
  border-radius: 3px;
}
</style>
