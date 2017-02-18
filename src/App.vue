<template>
  <div id="app" class="container-fluid">
    <Game id="game" v-if="activeGame"></Game>
    <TitlePage id="title-page" v-else></TitlePage>
    <div class="is-mobile">
      <div class="row">
        <div class="col-md-12">
          <h2>This game is best played on a wider screen with a keyboard.</h2>
        
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <h2>Please play on a laptop, tablet, or desktop. </h2>
        </div>
      </div>
    </div>
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
  // computed () {
  //   isMobile
  // }
}
</script>

<style lang="scss">
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #000;
  /*margin: 0;*/
  /*padding: 0;*/
  max-height: 600px;
  max-width: 800px;
  margin-top: 20px;
  /*max-width: 700px;*/
}

.is-mobile {
  display: none;
}

.is-mobile {
  .col-md-12 {
    h1, h2, h3, h4 {
      padding: 100px 20px;  
    }
    
  }
}

@media screen and (max-device-width: 500px) and (max-device-height: 800px) {
  #title-page {
    display: none;
  }
  .is-mobile {
    display: block;
    
  }
}




</style>
