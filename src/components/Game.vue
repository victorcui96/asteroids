<template>
	<div id="game-container">
		<img src="../assets/sky.png" alt="">
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
    // Third parameter = rendering context, either WEBGL or Canvas
    // var winW = document.body.offsetWidth
    // var winH = document.body.offsetHeight
    var game = new window.Phaser.Game(1410, 800, window.Phaser.AUTO, 'game-container', {
      preload: preload, create: create, update: update
    })

    // preload (), create(), and update() are essential Phaser functions

    function preload () {
      game.load.image('sky', 'src/assets/sky.png')
      game.load.image('spaceship', '../assets/spaceship.jpg')
      game.load.image('logo', './logo.png')
      var loc = window.location.pathname
      // var dir = loc.substring(0, loc.lastIndexOf('/'))
      console.log(loc)
      game.load.start()
    }
    function create () {
      console.log('hey')
      // Add a sprite to the game
      game.add.sprite(0, 0, 'spaceship')
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
#game-container {
	background: gray;
}
</style>	
