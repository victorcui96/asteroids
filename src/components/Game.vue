<template>
	<div id="game-container">
		
	</div>
</template>

<script>
export default {

  name: 'Game',

  mounted () {
    // create phaser game here
    console.log('Game ->mounted')
    // Create an instace of a Phaser.Game object
    // First two parameters are the width & height of the <canvas> element that Phaser creates
    // Third parameter = rendering context, either WEBGL or Cnvas
    // var test = new window.Phaser.Game()
    var game = new window.Phaser.Game(800, 800, window.Phaser.AUTO, 'game-container', {
      preload: preload, create: create, update: update
    })

    // preload (), create(), and update() are essential Phaser functions

    function preload () {
      // game.load.image('logo', '../assets/logo.png')
    }
    function create () {
      console.log('hey')
      game.add.sprite(0, 0, 'star')
    }
    function update () {

    }
  },

  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
</style>	
