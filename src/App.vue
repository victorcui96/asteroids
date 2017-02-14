<template>
  <div id="app" class="container-fluid">
    <TitlePage></TitlePage>
  </div>
</template>

<script>
import TitlePage from './components/TitlePage'

export default {
  name: 'app',
  components: {
    TitlePage
  }
}
</script>

<style>
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #000;
  /*margin: 0;*/
  /*padding: 0;*/
}
</style>
