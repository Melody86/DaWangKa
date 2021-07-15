<template>
  <div class="liandong">
    <div class="cxdd-btn" @click="cxdd">订单查询</div>
    <div class="banner"><img :src="banner1" /></div>
    <!-- <div class="banner"><img :src="banner2" /></div> -->
    <div class="form"></div>
    <fill-form @showloading="showloading" @closeloading="closeLoading"></fill-form>
    <div class="gundong"></div>
    <gun-dong></gun-dong>
    <div class="banner"><img :src="banner3" /></div>
    <fill-form @showloading="showloading" @closeloading="closeLoading"></fill-form>
    <gun-dong></gun-dong>
    <fill-form @showloading="showloading" @closeloading="closeLoading"></fill-form>
    <div class="bottom-btn">0元领卡 包邮到家</div>
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
    <Tan-ceng v-if="false"></Tan-ceng>
  </div>
</template>
<script>
import gunDong from './gundong.vue'
import fillForm from './fillFormNoSel.vue'
import TanCeng from './tanceng.vue'
export default {
  components: {
    gunDong,
    fillForm,
    TanCeng
  },
  data() {
    return {
      banner1: require('../../assets/images/liandong_new/WechatIMG1867.png'),
      banner2: require('../../assets/images/liandong_new/topimg2.jpg'),
      banner3: require('../../assets/images/liandong_new/WechatIMG4462.jpeg'),
      banner4: require('../../assets/images/liandong_new/qy.jpg'),
      banner5: require('../../assets/images/liandong_new/content.jpg'),
      // banner3: require('../../assets/images/liandong_new/1.jpg'),
      // banner4: require('../../assets/images/liandong_new/2.jpg'),
      // banner5: require('../../assets/images/liandong_new/3.jpg'),
      showPayLoading: false
    }
  },

  mounted() {
    // 此处true需要加上，不加滚动事件可能绑定不成功
    window.addEventListener('scroll', this.handleScroll, true)
    // 按需使用：A→B→C就需要页面一进来的时候，就添加一个历史记录
    window.history.pushState(null, null, document.URL)
    // 给window添加一个popstate事件，拦截返回键，执行this.onBrowserBack事件，addEventListener需要指向一个方法
    window.addEventListener('popstate', this.onBrowserBack, false)
  },
  destroyed() {
    // 当页面销毁必须要移除这个事件，vue不刷新页面，不移除会重复执行这个事件
    window.removeEventListener('popstate', this.onBrowserBack, false)
  },
  methods: {
    onBrowserBack() {
      if (process.env.VUE_APP_NEED_LANJIE === 'true') {
        window.location.href = process.env.VUE_APP_RE_GAME_URL
      }

      console.log(3232323)
      // 这里写点击返回键时候的事件
      // 比如判断需求执行back()或者go(-2)或者PopupShow=false隐藏弹框
    },
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
      vertical-align: middle;
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
