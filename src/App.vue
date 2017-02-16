<template>
  <div id="app" class="container-fluid">
    <Game v-if="activeGame"></Game>
    <TitlePage v-else></TitlePage>
  </div>
</template>

<script>
import TitlePage from './components/TitlePage'
import Game from './components/Game'
export default {
  name: 'app',
  components: {
    TitlePage,
    Game
  },
  mounted () {
    console.log('App ->mounted')
    this.$evt.$on('playGame', () => {
      this.activeGame = true
    })
  },

  beforeDestroy () {
    console.log('App -> before destroy')
    // unregister custom event listeners
    this.$evt.$off('playGame', this.clear)
  },
  data () {
    return {
      activeGame: false
    }
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
  max-height: 600px;
  max-width: 800px;
  /*max-width: 700px;*/
}
</style>
