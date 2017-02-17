<template>
	<div id="game-container">
		<LivesCounter></LivesCounter>
		<Score></Score>
	</div>
</template>

<script>
import LivesCounter from './LivesCounter'
import Score from './Score'

export default {

  name: 'Game',
  components: {
    LivesCounter,
    Score
  },

  mounted () {
    var $this = this
    // create phaser game here
    console.log('Game ->mounted')
    // Create an instace of a Phaser.Game object
    // First two parameters are the width & height of the <canvas> element that Phaser creates
    // Third parameter = rendering context, either WEBGL or Canvas
    // var winW = document.body.offsetWidth
    // var winH = document.body.offsetHeight
    var spaceship
    var weapon
    var fireButton
    var cursors
    var enemiesGroup
    var myGame = new window.Phaser.Game(800, 600, window.Phaser.AUTO, 'game-container', {
      preload: preload, create: create, update: update, render: render
    })

    var gameState = {
      level: 1,
      score: 0
    }

    var shipProperties = {
      startingLives: 3,
      // ship will always start im the center of the game world
      startX: myGame.width * 0.5,
      startY: myGame.height * 0.5
    }

    var enemyProperties = {
      startingHeads: 4,
      // max number of heads that appear no matter what level
      maxHeads: 10,
      // after each rounc, increase # of heads by 2
      incrementHeads: 2,
      physicsProperties: {
        minVelocity: 0,
        maxVelocity: 200,
        minAngularVelocity: 0,
        maxAngularVelocity: 200,
        score: 50
      }
    }
    var numEnemies = enemyProperties.startingHeads

    // var shipLives = shipProperties.startingLives

    // preload (), create(), and update() are essential Phaser functions

    function preload () {
      // game.load.image('sky', '../../static/sky.png')
      myGame.load.image('bullet', '../../static/bullet.png')
      myGame.load.image('spaceship', '../../static/spaceship.png')
      myGame.load.image('asteroid', '../../static/asteroid2.png')
      myGame.load.start()
    }

    function initSpaceship (game) {
      // Add a sprite to the game
      // The spaceship and its settings
      spaceship = game.add.sprite(shipProperties.startX, shipProperties.startY, 'spaceship')
      spaceship.anchor.set(0.5)
      // enable physics on the spaceship
      game.physics.arcade.enable(spaceship)
      // Set a max velocity for the spaceship
      spaceship.body.drag.set(70)
      spaceship.body.maxVelocity.set(200)
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

    // function initBulletGroup (game) {
    //   bulletGroup = game.add.group()
    //   Handles user keyboard presses and the weapon fire event through pressing the spacebar
    // }
    function handleWeaponFire (game) {
      cursors = game.input.keyboard.createCursorKeys()
      fireButton = game.input.keyboard.addKey(window.Phaser.KeyCode.SPACEBAR)
    }

    function initEnemies (game) {
      // groups allow me to group together similar objects & control them as one single unit
      // you can also check for collision between two different Groups
      enemiesGroup = game.add.group()
      // Enables the physics body
      enemiesGroup.enableBody = true
      enemiesGroup.physicsBodyType = window.Phaser.Physics.ARCADE
      // game.physics.arcade.enable(enemiesGroup)
    }

    function initEnemy (game, x, y, imageURL) {
      // adds the enemy to the enemiesGroup group
      var enemy = enemiesGroup.create(x, y, 'asteroid')
      // sets anchor point to the center of the sprite
      enemy.anchor.set(0.5, 0.5)
      // sets enemy body to rotate at a random angular velocity b/t min & max angular velocity
      enemy.body.angularVelocity = game.rnd.integerInRange(enemyProperties.physicsProperties.minAngularVelocity, enemyProperties.physicsProperties.maxAngularVelocity)
      // returns a value between -180 to 180 (in degrees), then converted into Radians
      var randomAngle = game.math.degToRad(game.rnd.angle())
      var randomVelocity = game.rnd.integerInRange(enemyProperties.physicsProperties.minVelocity, enemyProperties.physicsProperties.maxVelocity)
      game.physics.arcade.velocityFromRotation(randomAngle, randomVelocity, enemy.body.velocity)
    }

    function createEnemies (game) {
      // Creates a number of enemiesGroup & randomly positions them on the screen
      for (var i = 0; i < numEnemies; i++) {
        // determines which side of the screen (vertical or horizontal)
        var screenSide = Math.round(Math.random())
        var x, y
        if (screenSide) {
          // sets x either at 0 position or the full width of the game world
          x = Math.round(Math.random()) * game.width
          // random Y position
          y = Math.random() * game.height
        } else {
          x = Math.random() * game.width
          y = Math.round(Math.random()) * game.height
        }
        initEnemy(game, x, y)
      }
    }

    function asteroidCollision (target, asteroid) {
      target.kill()
      asteroid.kill()
      if (target.key === 'spaceship') {
        $this.destroyShip()
        shipProperties.startingLives--
        var numShipLives = shipProperties.startingLives
        if (numShipLives > 0) {
          myGame.time.events.add(window.Phaser.Timer.SECOND * 3, resetShip, this)
        }
      }
      // update player's score
      $this.updateScore()
      gameState.score += 50
    }

    function resetShip () {
      // Reset ship so it's visible & placed at original starting coordinates
      spaceship.reset(shipProperties.startX, shipProperties.startY)
      // Make spaceship face upwards. By default, at 0 degrees, all sprites face towards the right
      spaceship.angle = -90
    }

    // Make sure our game objects wrap around the game world
    function checkBoundaries (game, sprite, padding) {
      game.world.wrap(sprite, padding)
    }

    function create () {
      // enable the Arcade Physics system
      myGame.physics.startSystem(window.Phaser.Physics.ARCADE)

      initSpaceship(myGame)
      initWeapon(myGame)
      handleWeaponFire(myGame)
      initEnemies(myGame)
      createEnemies(myGame)

      // game world has no fixed size and extends infinitely in all directions, with (0, 0) being the center

      // var gameHeight = game.world.height

      // spaceship physics properties
      // body property is an instance of 'ArcadePhysics.body'
      // spaceship.body.collideWorldBounds = true
    }
    function checkPlayerInput (game, cursors) {
      if (cursors !== null) {
        if (cursors.up.isDown) {
          game.physics.arcade.accelerationFromRotation(spaceship.rotation, 300, spaceship.body.acceleration)
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
      }
    }
    /* This function is called by the core game loop every frame */
    /* Use the Physics.collide function to test for collision between two objects/groups & perform separation against them */
    function update () {
      //  Reset the spaceship's velocity (movement)
      // spaceship.body.velocity.x = 0
      checkPlayerInput(myGame, cursors)
      // enemiesGroup.forEachExists(console.log(this.body.angularVelocity))
      checkBoundaries(myGame, spaceship, 16)
      // wrap afound the asteroids
      enemiesGroup.forEach((item) => {
        myGame.world.wrap(item, 16)
      }, this)
      // Collision detection between the bullet and an asteroid ->if there is a collision, destroy both the bullet and the asteroid
      myGame.physics.arcade.overlap(weapon.bullets, enemiesGroup, asteroidCollision, null, this)
      // Collision detection between the spaceship and an asteroid
      myGame.physics.arcade.overlap(spaceship, enemiesGroup, asteroidCollision, null, this)
    }

    function render () {
      // weapon.debug()
    }
  },

  methods: {
    destroyShip () {
      // emit an event to be captured by <LivesCounter> component. This should decrease the number of ship lives by 1
      this.$evt.$emit('decrementShipLife')
    },
    updateScore () {
      // emit an event to be captured by <Score> component. This should increase the player's score by 50
      this.$evt.$emit('updateScore')
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
	position: relative;
}
</style>	
