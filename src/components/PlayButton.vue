<template>
	<div>
		<button class="play-button" @click="playGame">Start With Audio</button>
	</div>
</template>

<script>
export default {
  name: 'PlayButton',
  props: [
  ],
  data () {
    return {
      // Test: 'test'
    }
  },
  methods: {
    playGame () {
      // This is when the <App> grandparent should be notified to play the <Game>
      this.$evt.$emit('playGame')
    }
  }
}

</script>

<style lang='scss' scoped>
  .play-button {
  	background: lightgreen;
  	border: 1px solid darkslategrey;
  	border-radius: 2px;
  	color: white;
  	display: flex;
	float: right;
  	height: 50px;
  	/*text-align: center;*/
  	font-size: 150%;
  	/*width: 100px;*/
  	

  }
</style>
