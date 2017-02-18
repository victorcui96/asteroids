<template>
    <div class="title-page">
      <div class="row">
        <div class="col-sm-12">
          <h1 id="game-title"> Space <span>Shooter</span></h1>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12 col-md-5">
            <h3>Press Arrow Keys to Move</h3>
            <div>
              <h3>Press <span>Spacebar</span> to Shoot </h3>
            </div>
        </div>
        <div class="col-sm-12 col-md-7">
          <PlayButton class="audio-btn"> Start with Audio</PlayButton>
          <PlayButton> Start without Audio</PlayButton>
        </div>
      </div>
    </div>
</template>

<script>
import PlayButton from './PlayButton'

export default {
  name: 'TitlePage',
  components: {
    PlayButton
  },
  data () {
    return {
      title: 'Space Shooter'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
/*-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale; */


.title-page {
  background-image: url('../../static/starfield.png');
  background-repeat: no-repeat;
  background-position: center center;
  font-family: "videoGame", Times, serif;
}
#game-title {
  text-align: center;
  span {
    color: #f7401c;
  }
}

h1, h2, h3, h4, h5, h6 {
  color: white;
  font-weight: normal;
}

.col-md-5 {
  h3 {
    padding: 0 15px;
  }
}

.play-button {
  margin-top: 25px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
