<template>

  <div style="">

    <div class="ad-bg"> </div>

    <div>

      <!-- <svga :src="svgimg" class="ad-main" ref="svga" :options="option" /> -->

      <canvas id="canvas" class="ad-main"></canvas>

    </div>

  </div>

</template>

<script>
// import SVGA from 'svgaplayerweb'
// import { svga } from 'vue-svga'
import { Parser, Player } from 'svga'
export default {
  components: {
    // svga
  },
  data() {
    return {
      svgimg: require('../../assets/images/20230811/1682242491.svga')
    }
  },
  mounted() {
    this.initMachineSVGA()
  },
  methods: {
    async initMachineSVGA() {
      const parser = new Parser()
      const svga = await parser.load(this.svgimg)

      const player = new Player({
        container: document.getElementById('canvas'),
        loop: 1
      })
      await player.mount(svga)

      player.onStart = () => console.log('onStart')
      // player.onResume = () => console.log('onResume')
      // player.onPause = () => console.log('onPause')
      // player.onStop = () => console.log('onStop')
      // player.onProcess = () => console.log('onProcess', player.progress)
      player.onEnd = () => {
        this.$emit('closeAd')
      }
      player.start()
      // this.$refs.svga.onStart = () => console.log('onStart')
      // this.$refs.svga.onStop = () => console.log('onStop')
      // this.$refs.svga.start()
    }
  }
}
</script>

<style scoped lang="scss">
.ad-bg {
  background-image: url(../../assets/images/20230811/light_190805.png);
  background-repeat: no-repeat;
  background-size: 100%;
  position: absolute;
  width: 365px;
  left: 2%;
  top: 16%;
  height: 365px;
  animation: rotate 5s linear infinite;
}
.ad-main {
  width: 100%;
  position: fixed;
  left: 0;
  top: 7%;
}
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

