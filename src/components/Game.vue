<template>
	<div id="game-container">
		<!-- <img src="../assets/sky.png" alt=""> -->
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
    var myGame = new window.Phaser.Game(800, 600, window.Phaser.AUTO, 'game-container', {
      preload: preload, create: create, update: update, render: render
    })

    // var coachKProperties = {
    //   startingHeads: 4,
    //   // max number of heads that appear no matter what level
    //   maxHeads: 10,
    //   // after each rounc, increase # of heads by 2
    //   incrementHeads: 2,
    //   physicsProperties: {
    //     minVelocity: 50,
    //     maxVelocity: 200,
    //     minAngularVelocity: 0,
    //     maxAngularVelocity: 200,
    //     score: 50
    //   }
    // }

    // preload (), create(), and update() are essential Phaser functions

    function preload () {
      // game.load.image('sky', '../../static/sky.png')
      myGame.load.image('bullet', '../../static/bullet.png')
      myGame.load.image('spaceship', '../../static/spaceship.png')
      myGame.load.start()
    }
    var spaceship
    var weapon
    var fireButton
    var cursors
    function initSpaceship (game) {

    }

    function initWeapon (game) {
      //  Creates 30 bullets, using the 'bullet' graphic
      weapon = game.add.weapon(30, 'bullet')
      // The bullet will be automatically killed when it leaves the world bounds
      weapon.bulletKillType = window.Phaser.Weapon.KILL_WORLD_BOUNDS
      // The speed at which the bullet is fired
      weapon.bulletSpeed = 300
      // Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
      weapon.fireRate = 100
      // Tell the Weapon to track the 'ship' Sprite with no offsets from the position
      // 'true' argument tells the weapon to track sprite rotation
      weapon.trackSprite(spaceship, 0, 0, true)
    }
     /* Handles user keyboard presses and the weapon fire event through pressing the spacebar */
    function handleWeaponFire (game) {
      cursors = game.input.keyboard.createCursorKeys()
      fireButton = game.input.keyboard.addKey(window.Phaser.KeyCode.SPACEBAR)
    }
    function create () {
      // enable the Arcade Physics system
      myGame.physics.startSystem(window.Phaser.Physics.ARCADE)

      // Add a sprite to the game
      // The spaceship and its settings
      spaceship = myGame.add.sprite(400, 300, 'spaceship')
      spaceship.anchor.set(0.5)
      // enable physics on the spaceship
      myGame.physics.arcade.enable(spaceship)
      // Set a max velocity for the spaceship
      spaceship.body.drag.set(70)
      spaceship.body.maxVelocity.set(200)

      initSpaceship(myGame)
      initWeapon(myGame)
      handleWeaponFire(myGame)

      // game world has no fixed size and extends infinitely in all directions, with (0, 0) being the center

      // var gameHeight = game.world.height

      // spaceship physics properties
      // body property is an instance of 'ArcadePhysics.body'
      // spaceship.body.collideWorldBounds = true
    }
    /* This function is called by the core game loop every frame */
    /* Use the Physics.collide function to test for collision between two objects/groups & perform separation against them */
    function update () {
      //  Reset the spaceship's velocity (movement)
      // spaceship.body.velocity.x = 0
      if (cursors.up.isDown) {
        myGame.physics.arcade.accelerationFromRotation(spaceship.rotation, 300, spaceship.body.acceleration)
      } else {
        spaceship.body.acceleration.set(0)
      }
      if (cursors.left.isDown) {
        // Move to the left
        spaceship.body.angularVelocity = -300
      } else if (cursors.right.isDown) {
        // Move to the right
        spaceship.body.angularVelocity = 300
      } else {
        spaceship.body.angularVelocity = 0
      }
      if (fireButton.isDown) {
        weapon.fire()
      }
      myGame.world.wrap(spaceship, 16)
    }

    function render () {
      weapon.debug()
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
	max-width: 800px;
	max-height: 600px;
}
</style>	
