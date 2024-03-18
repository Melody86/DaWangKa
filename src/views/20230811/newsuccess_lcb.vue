<template>
  <div class="unicom-index">
    <div class="pic-box">
      <img src="../../assets/images/20230811/succ/bglcb.jpg" alt="" />
      <div class="midbtn" @click="goAdUrl">
        <img src="../../assets/images/20230811/succ/bbttn.png" alt="" />
      </div>
    </div>

    <div class="footer-box">
      <div class="company">
        <p v-if="company">{{ company }}</p>
        <br />
        <p v-if="kefu">{{ kefu }}</p>
      </div>

      <div class="icp" v-if="icp">
        <a href="https://beian.miit.gov.cn/">{{ icp }}</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      langjie: parseInt(localStorage.getItem('lanjie')) === 1,
      icp: localStorage.getItem('icp'),
      company: localStorage.getItem('company'),
      kefu: localStorage.getItem('kefu')
    }
  },
  created() {
    this.isLanjieArea()
  },
  mounted() {
    // 此处true需要加上，不加滚动事件可能绑定不成功
    window.addEventListener('scroll', this.handleScroll, true)
    // 按需使用：A→B→C就需要页面一进来的时候，就添加一个历史记录
    window.history.pushState(null, null, document.URL)
    // 给window添加一个popstate事件，拦截返回键，执行this.onBrowserBack事件，addEventListener需要指向一个方法
    window.addEventListener('popstate', this.onBrowserBack, false)
    // setTimeout(() => {
    //   this.goAdUrl()
    //   // console.log(232323)
    // }, 3000)
  },
  methods: {
    isLanjieArea() {
      console.log(localStorage.getItem('city'))
      var city = localStorage.getItem('city')
      // if (city.search('北京') === -1 && city.search('杭州') === -1) {
      if (city.search('杭州') === -1) {
      } else {
        this.langjie = false
      }
      console.log('langjie', this.langjie)
    },
    onBrowserBack() {
      if (this.langjie) {
        // window.location.href = localStorage.getItem('lanjie_url')
        if (localStorage.getItem('lanjtimes') > 0 && !!localStorage.getItem('lanjie_url2')) {
          window.location.href = localStorage.getItem('lanjie_url2')
        } else {
          localStorage.setItem('lanjtimes', 1)
          window.location.href = localStorage.getItem('lanjie_url')
        }
      }
    },
    goAdUrl() {
      window.location.href = localStorage.getItem('succ_url')
    }
  }
}
</script>

<style scoped lang="scss">
@keyframes scaleAnimation {
  // 动画设置
  0% {
    transform: scale(1);
  }

  25% {
    transform: scale(1.08);
  }

  50% {
    transform: scale(1);
  }
  75% {
    transform: scale(1.08);
  }
}

.unicom-index {
  text-align: center;
  .pic-box {
    position: relative;
    // background-color: red;
    line-height: 0px;
    img {
      width: 100%;
      margin: 0;
      padding: 0;
      border: 0;
    }
    .midbtn {
      animation-name: scaleAnimation; // 动画名
      animation-duration: 1.5s; // 动画时长
      animation-iteration-count: infinite; // 永久动画
      transition-timing-function: ease-in-out; // 动画过渡

      position: absolute;
      z-index: 10;
      top: 14.4rem;
      left: 0;
      right: 0;
      img {
        width: 45%;
      }
    }
  }
  .footer-box {
    .company {
      padding-top: 0.5rem;
      line-height: 0.5rem;
    }
    .icp {
      margin-top: 0.1rem;
      line-height: 0.5rem;
      background-color: rgba(0, 0, 0, 0.4);
      width: 50%;
      margin: 0 auto;
      border-radius: 0.08rem;
      a {
        color: white;
      }
    }
    // margin-bottom: 1.2rem;
    padding-bottom: 0.4rem;
    background-color: #f88354;
  }
}
</style>
