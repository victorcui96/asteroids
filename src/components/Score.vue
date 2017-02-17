<template>
	<span class="game-text" id="score">
		Score: {{ score }}
	</span>
</template>

<script>
export default {

  name: 'Score',

  mounted () {
    this.$evt.$on('updateScore', () => {
      this.score += 50
    })
  },

  beforeDestroy () {
    // unregister custom event listeners
    this.$evt.$off('updateScore', this.clear)
  },

  data () {
    return {
      score: 0
    }
  }
}
</script>

<style lang="scss" scoped>
  #score {
  	left: 0;
  	top: 5px;
  }
</style>
