<template>
    <div>
      <div class="row">
        <div class="col-sm-12">
          <h1 id="game-title"> Space <span>Shooter</span></h1>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12 col-md-5">
            <h2>TO MOVE</h2>
            <h2>TO SHOOT</h2>
        </div>
        <div class="col-sm-12 col-md-7">
          <PlayButton> </PlayButton>
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
-moz-osx-font-smoothing: grayscale;
*//*background-color: #352C2B;*/
#game-title {
  text-align: center;
  span {
    color: red;    
  }
}

h1, h2 {
  color: white;
  font-weight: normal;
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
