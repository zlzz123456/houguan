<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

  export default {
    name: 'App'
  }
</script>

<style lang="scss">
  // Import Main styles for this application
  @import '@/styles/bootstrap.scss';
  @import '@/styles/app.scss';
  @import './css/styles.css';
</style>
