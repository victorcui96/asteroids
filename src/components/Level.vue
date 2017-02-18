<template>
	<span class="game-text" id="level">
		Level: {{ level }}
	</span>
</template>

<script>
export default {

  name: 'Level',

  mounted () {
    this.$evt.$on('updateLevel', () => {
      this.level++
    })
  },

  beforeDestroy () {
    this.$evt.$off('updateLevel', this.clear)
  },

  data () {
    return {
      level: 1
    }
  }
}
</script>

<style lang="scss" scoped>
  #level {
    right: 50%;
    top: 5px;
  }
</style>
