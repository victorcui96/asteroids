<template>
	<div id="game-container">
		<LivesCounter></LivesCounter>
		<Score></Score>
		<Level></Level>
	</div>
</template>

<script>
import LivesCounter from './LivesCounter'
import Score from './Score'
import Level from './Level'

export default {

  name: 'Game',
  components: {
    LivesCounter,
    Score,
    Level
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
    var asteroidsGroup

    var states = {
      game: 'game',
      main: 'main'
    }

    // var mainState = function (game) {
    //   console.log('dead')
    //   create () {
    //     console.log('restart the game')
    //   },
    //   startGame () {
    //     game.state.start(states.game)
    //   }
    // }

    var myGame = new window.Phaser.Game(800, 600, window.Phaser.AUTO, 'game-container', {
      preload: preload, create: create, update: update, render: render
    })
    // Use Phaser's built in State Manager
    // states.main is used for when the player loses all his lives

    // myGame.state.add(states.main, mainState)
    // myGame.state.add(states.game, gameState)
    // Start the game in the main state
    myGame.state.start(states.main)

    var gameProperties = {
      delayToStartLevel: 3
    }

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

    var asteroidProperties = {
      startingAsteroids: 8,
      // max number of asteroids that appear no matter what level
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
    var numAsteroids = asteroidProperties.startingAsteroids

    // var shipLives = shipProperties.startingLives

    // preload (), create(), and update() are essential Phaser functions

    function preload () {
      myGame.load.image('background', '../../static/background.png')
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

    function initAsteroidsGroup (game) {
      // groups allow me to group together similar objects & control them as one single unit
      // you can also check for collision between two different Groups
      asteroidsGroup = game.add.group()
      // Enables the physics body
      asteroidsGroup.enableBody = true
      asteroidsGroup.physicsBodyType = window.Phaser.Physics.ARCADE
      // game.physics.arcade.enable(asteroidsGroup)
    }

    function initAsteroid (game, x, y, imageURL) {
      // adds the asteroid to the asteroidsGroup group
      var asteroid = asteroidsGroup.create(x, y, 'asteroid')
      // sets anchor point to the center of the sprite
      asteroid.anchor.set(0.5, 0.5)
      // sets asteroid body to rotate at a random angular velocity b/t min & max angular velocity
      asteroid.body.angularVelocity = game.rnd.integerInRange(asteroidProperties.physicsProperties.minAngularVelocity, asteroidProperties.physicsProperties.maxAngularVelocity)
      // returns a value between -180 to 180 (in degrees), then converted into Radians
      var randomAngle = game.math.degToRad(game.rnd.angle())
      var randomVelocity = game.rnd.integerInRange(asteroidProperties.physicsProperties.minVelocity, asteroidProperties.physicsProperties.maxVelocity)
      game.physics.arcade.velocityFromRotation(randomAngle, randomVelocity, asteroid.body.velocity)
    }

    function createAsteroids (game) {
      // Creates a number of asteroidsGroup & randomly positions them on the screen
      for (var i = 0; i < numAsteroids; i++) {
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
        initAsteroid(game, x, y)
      }
    }
    // Check for a collision with either a bullet and as asteroid or the spaceship and the asteroid
    function asteroidCollision (target, asteroid) {
      // check if the player has 0 lives
      // $this.$evt.$on('playerDead', () => {

      // })
      target.kill()
      asteroid.kill()
      if (target.key === 'spaceship') {
        $this.destroyShip()
        shipProperties.startingLives--
        var numShipLives = shipProperties.startingLives
        if (numShipLives > 0) {
          myGame.time.events.add(window.Phaser.Timer.SECOND * 3, resetShip, this)
        } else {
          // spaceship.kill()
          // asteroidsGroup.callAll('kill')
          // myGame.clearCurrentState()
          myGame.time.events.add(window.Phaser.Timer.SECOND * 3, endGame, this)
        }
      }
      // update player's score
      $this.updateScore()
      gameState.score += 50

      // check if there are any asteroids left. If not, go to the next level
      if (!asteroidsGroup.countLiving()) {
        // add a timer event that calls the goToNextLevel() function after a delay of 3 seconds
        myGame.time.events.add(window.Phaser.Timer.SECOND * gameProperties.delayToStartLevel, goToNextLevel, this)
      }
    }

    function resetShip () {
      // Reset ship so it's visible & placed at original starting coordinates
      spaceship.reset(shipProperties.startX, shipProperties.startY)
      // Make spaceship face upwards. By default, at 0 degrees, all sprites face towards the right
      spaceship.angle = -90
    }

    function goToNextLevel (game) {
      // Although none of the asteroids are visible, still remove them from memory for efficiency
      asteroidsGroup.removeAll(true)
      numAsteroids += 4
      createAsteroids(myGame)
      // updat the <Level> component
      $this.updateLevel()
    }

    // Make sure our game objects wrap around the game world
    function checkBoundaries (game, sprite, padding) {
      game.world.wrap(sprite, padding)
    }

    function create () {
      // Add a space background
      myGame.add.sprite(0, 0, 'background')
      // enable the Arcade Physics system
      myGame.physics.startSystem(window.Phaser.Physics.ARCADE)

      initSpaceship(myGame)
      initWeapon(myGame)
      handleWeaponFire(myGame)
      initAsteroidsGroup(myGame)
      createAsteroids(myGame)

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
      // asteroidsGroup.forEachExists(console.log(this.body.angularVelocity))
      checkBoundaries(myGame, spaceship, 16)
      // wrap afound the asteroids
      asteroidsGroup.forEach((item) => {
        myGame.world.wrap(item, 16)
      }, this)
      // Collision detection between the bullet and an asteroid ->if there is a collision, destroy both the bullet and the asteroid
      myGame.physics.arcade.overlap(weapon.bullets, asteroidsGroup, asteroidCollision, null, this)
      // Collision detection between the spaceship and an asteroid
      myGame.physics.arcade.overlap(spaceship, asteroidsGroup, asteroidCollision, null, this)
    }

    function endGame () {
      myGame.state.start(states.main)
    }

    function render () {
      // weapon.debug()
    }
  },

  beforeDestroy () {
    // unregister custom event listeners
    this.$evt.$off('playerDead', this.clear)
  },

  methods: {
    destroyShip () {
      // emit an event to be captured by <LivesCounter> component. This should decrease the number of ship lives by 1
      this.$evt.$emit('decrementShipLife')
    },
    updateScore () {
      // emit an event to be captured by <Score> component. This should increase the player's score by 50
      this.$evt.$emit('updateScore')
    },
    updateLevel () {
      // emit an event to be captured by <Level> component. This should go to level 2
      this.$evt.$emit('updateLevel')
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
