<template>
  <span class="game-text" id="num-lives">
    Lives: {{ numLives }} 
  </span>
</template>

<script>
export default {

  name: 'LivesCounter',

  mounted () {
    this.$evt.$on('decrementShipLife', () => {
      this.numLives--
    })
  },

  beforeDestroy () {
    console.log('LivesCounter -> before destroy')
    // unregister custom event listeners
    this.$evt.$off('decrementShipLife', this.clear)
  },

  data () {
    return {
      numLives: 3

    }
  }
}
</script>

<style lang="scss">
  .game-text {
  	color: white;
  	font-weight: bolder;
  	position: absolute;
  	font-size: 120%;

  }
  #num-lives {
    right: 0;
    top: 5px;

  }
</style>
