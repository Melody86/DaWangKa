<template>

  <div style="">

    <div style="position: relative;" v-show="showMM">

      <img src="../../assets/images/20230811/light_190805.png" alt="" style="width: 100%;opacity:0;" />

      <div class="mm-bg"></div>

      <canvas id="canvas" class="mm-main"></canvas>

      <div class="mm-btn" @click="closeMM">立即领取</div>

    </div>

  </div>

</template>

<script>
import { Parser, Player } from 'svga'
export default {
  components: {
    // svga
  },
  data() {
    return {
      showMM: false,
      parser: new Parser(),
      player: null,
      svgimg: require('../../assets/images/20230811/1682242491.svga')
    }
  },
  mounted() {
    // console.log('mounted', simg)
    this.initMachineSVGA()
  },
  methods: {
    closeMM() {
      this.$emit('closeAd')
    },
    startAAA() {
      this.player.start()
    },
    async initMachineSVGA() {
      const svga = await this.parser.load(this.svgimg)

      this.player = new Player({
        container: document.getElementById('canvas'),
        loop: 0
      })
      // console.log('4', this.player)
      await this.player.mount(svga)
      // console.log('5', this.player)

      this.player.onStart = () => console.log('onStart')
      this.player.onResume = () => console.log('onResume')
      this.player.onPause = () => console.log('onPause')
      this.player.onStop = () => console.log('onStop')
      // this.player.onProcess = () => console.log('onProcess', this.player.progress)
      this.player.onEnd = () => {
        this.$emit('closeAd')
      }
      this.showMM = true
      this.player.start()
    }
  }
}
</script>

<style scoped lang="scss">
.mm-btn {
  width: 80%;
  line-height: 40px;
  background-color: #e20101;
  border-radius: 5px;
  margin: 50px auto;
  z-index: 100;
  position: relative;
  font-size: 25px;
  font-weight: 900;
  color: white;
}
.mm-bg {
  background-image: url(../../assets/images/20230811/light_190805.png);
  background-repeat: no-repeat;
  background-size: 100%;
  position: absolute;
  width: 100%;

  height: 100%;
  animation: rotate 5s linear infinite;
  background-position-y: center;
  background-position-x: left;
  top: 15vh;
}
.mm-main {
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

