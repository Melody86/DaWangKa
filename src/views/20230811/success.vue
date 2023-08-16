<template>

  <div class="unicom-index">

    <div class="pic-box">

      <img src="../../assets/images/20230811/succ/1.webp" alt="" />

      <img src="../../assets/images/20230811/succ/2.webp" alt="" />

      <img src="../../assets/images/20230811/succ/3.webp" alt="" />

      <img src="../../assets/images/20230811/succ/4.webp" alt="" />

      <img src="../../assets/images/20230811/succ/5.webp" alt="" />

      <img src="../../assets/images/20230811/succ/6.webp" alt="" />

    </div>

    <div class="footer-box">

      <div class="company">
         北京氧联科技有限公司
        <br />
         电话：4008632859
      </div>

      <div class="icp"><a href="https://beian.miit.gov.cn/">京ICP备18016888号-1</a></div>

    </div>

  </div>

</template>

<script>
export default {
  data() {
    return {
      langjie: parseInt(localStorage.getItem('lanjie')) === 1
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
    setTimeout(() => {
      this.goAdUrl()
      // console.log(232323)
    }, 3000)
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
        window.location.href = localStorage.getItem('lanjie_url')
      }
    },
    goAdUrl() {
      window.location.href = localStorage.getItem('succ_url')
    }
  }
}
</script>

<style scoped lang="scss">
.unicom-index {
  text-align: center;
  .pic-box {
    // background-color: red;
    line-height: 0px;
    img {
      width: 100%;
      margin: 0;
      padding: 0;
      border: 0;
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
    background-color: #eee;
  }
}
</style>

