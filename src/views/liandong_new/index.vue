<template>
  <div class="liandong">
    <div class="cxdd-btn" @click="cxdd">订单查询</div>
    <div class="banner"><img :src="banner1" /></div>
    <div class="banner"><img :src="banner2" /></div>
    <div class="form"></div>
    <fill-form @showloading="showloading" @closeloading="closeLoading"></fill-form>
    <div class="gundong"></div>
    <gun-dong></gun-dong>
    <div class="banner"><img :src="banner3" /></div>
    <div class="banner"><img :src="banner4" /></div>
    <div class="banner"><img :src="banner5" /></div>
    <fill-form @showloading="showloading" @closeloading="closeLoading"></fill-form>
    <gun-dong></gun-dong>
    <fill-form @showloading="showloading" @closeloading="closeLoading"></fill-form>
    <div class="bottom-btn">免费领卡</div>
    <div class="loading-level" v-show="showPayLoading">
      <div class="top-box">
        <div class="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <br />
        订单提交中
      </div>
    </div>
  </div>
</template>
<script>
import gunDong from './gundong.vue'
import fillForm from './fillFormNoSel.vue'
export default {
  components: {
    gunDong,
    fillForm
  },
  data() {
    return {
      banner1: require('../../assets/images/liandong_new/topimg.jpg'),
      banner2: require('../../assets/images/liandong_new/topimg2.jpg'),
      banner3: require('../../assets/images/liandong_new/tc.png'),
      banner4: require('../../assets/images/liandong_new/qy.jpg'),
      banner5: require('../../assets/images/liandong_new/content.jpg'),
      showPayLoading: false
    }
  },
  methods: {
    showloading() {
      this.showPayLoading = true
    },
    closeLoading() {
      this.showPayLoading = false
    },
    cxdd() {
      this.$router.push('/liandong_cxdd')
    }
  }
}
</script>

<style lang="scss" scoped>
.liandong {
  padding-bottom: 50px;
  .cxdd-btn {
    position: fixed;
    right: 0;
    top: 80px;
    width: 20%;
    background: #000000c7;
    color: white;
    padding: 7px 10px;
    font-size: 15px;
    border-radius: 3px;
    z-index: 1000;
  }
  .banner {
    margin: 0;
    img {
      width: 100%;
    }
  }
  .bottom-btn {
    color: white;
    background: red;
    text-align: center;
    padding: 10px;
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    font-size: 20px;
  }
  .loading-level {
    height: 100vh;
    width: 100%;
    background: #000000d9;
    position: fixed;
    top: 0;
    color: white;
    text-align: center;
    .top-box {
      padding-top: 200px;
      font-size: 30px;
      .lds-roller {
        display: inline-block;
        position: relative;
        width: 80px;
        height: 80px;
      }
      .lds-roller div {
        animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        transform-origin: 40px 40px;
      }
      .lds-roller div:after {
        content: ' ';
        display: block;
        position: absolute;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: #fff;
        margin: -4px 0 0 -4px;
      }
      .lds-roller div:nth-child(1) {
        animation-delay: -0.036s;
      }
      .lds-roller div:nth-child(1):after {
        top: 63px;
        left: 63px;
      }
      .lds-roller div:nth-child(2) {
        animation-delay: -0.072s;
      }
      .lds-roller div:nth-child(2):after {
        top: 68px;
        left: 56px;
      }
      .lds-roller div:nth-child(3) {
        animation-delay: -0.108s;
      }
      .lds-roller div:nth-child(3):after {
        top: 71px;
        left: 48px;
      }
      .lds-roller div:nth-child(4) {
        animation-delay: -0.144s;
      }
      .lds-roller div:nth-child(4):after {
        top: 72px;
        left: 40px;
      }
      .lds-roller div:nth-child(5) {
        animation-delay: -0.18s;
      }
      .lds-roller div:nth-child(5):after {
        top: 71px;
        left: 32px;
      }
      .lds-roller div:nth-child(6) {
        animation-delay: -0.216s;
      }
      .lds-roller div:nth-child(6):after {
        top: 68px;
        left: 24px;
      }
      .lds-roller div:nth-child(7) {
        animation-delay: -0.252s;
      }
      .lds-roller div:nth-child(7):after {
        top: 63px;
        left: 17px;
      }
      .lds-roller div:nth-child(8) {
        animation-delay: -0.288s;
      }
      .lds-roller div:nth-child(8):after {
        top: 56px;
        left: 12px;
      }
      @keyframes lds-roller {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    }
  }
}
</style>
