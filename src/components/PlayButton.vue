<template>
	<div>
		<button class="play-button" @click="playGame">
      <slot> </slot>
    </button>
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
  	background: #35777d;
  	border: 1px solid darkslategrey;
  	border-radius: 2px;
  	color: white;
  	/*display: flex;*/
	  float: right;
  	height: 60px;
  	text-align: center;
  	font-size: 120%;
  	padding: 0 15px;
    width: 350px;
    transition: 0.4s ease-out;
    &:hover {
      background: rgba(#35777d, 0);
      font-weight: 900;
      letter-spacing: 1px;
    }
  	

  }
</style>
