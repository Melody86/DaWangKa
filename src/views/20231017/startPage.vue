<!-- 联通大王卡 -->

<template>
  <div class="unicom-index">
    <div class="top-box">
      <div class="logo"></div>
      <div class="banner"></div>
      <div class="side-btn">
        <div>在线客服</div>
        <div>活动规则</div>
        <div>奖品概率</div>
      </div>
    </div>
    <div class="main-box">
      <div class="banner-bottom">全网通双卡 超强续航 6999</div>
      <div class="">元气盒子 最高抽 国行正品</div>
      <div class="">
        <div>【盲盒福利购】华为Mate 60 Pro 12GB 512GB【遥遥领先】</div>
        <div>开盒价 ¥99</div>
        <div>倒计时</div>
      </div>
      <div class="input-box">
        收件人手机号：*注意: 手机号填错可能导致订单无法发货
        <div>
          <input type="text" value="15888888888" placeholder="15877889997" />
        </div>
        <div>已阅读并同意 《用户服务协议》 和 《隐私保护协议》</div>
        <div class="khbtn">¥99 开盒价</div>
        <div>名额有限 立即抢购</div>
      </div>
    </div>
    <div class="pay-box">
      <div class="">支付宝支付</div>
    </div>
    <div class="comment-box">
      <div class="">宝贝评价</div>
      <ul>
        <li>
          <div>
            <div>158****8888</div>
            <div>2021-10-17</div>
          </div>
        </li>
      </ul>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script>
// axios
import request from '@/utils/request'
// user api

export default {
  name: 'StartPage',
  components: {},
  data() {
    return {}
  },

  computed: {},

  destroyed() {},
  created() {},
  mounted() {
    // 此处true需要加上，不加滚动事件可能绑定不成功
    window.addEventListener('scroll', this.handleScroll, true)
  },

  methods: {
    handleScroll(e) {
      const scrolltop = e.target.scrollTop
      scrolltop > 30 ? (this.gotop = true) : (this.gotop = false)
    },
    toTop() {
      let top = document.documentElement.scrollTop || document.body.scrollTop
      // 实现滚动效果
      const timeTop = setInterval(() => {
        document.body.scrollTop = document.documentElement.scrollTop = top -= 50
        if (top <= 120) {
          clearInterval(timeTop)
        }
      }, 10)
    }
  }
}
</script>

<style lang="scss" scoped>
.main-box {
  .banner-bottom {
    width: 100%;
    height: 0;
    padding-bottom: 20%;
    background: url('../../assets/images/20231017/spage/header-bar.a180d460.png') no-repeat;
    background-size: 100% 100%;
  }

  .input-box {
    .khbtn {
      width: 100%;
      height: 0;
      padding-bottom: 20%;
      background: url('../../assets/images/20231017/spage/coupon-bg.3bd5a817.png') no-repeat;
      background-size: 100% 100%;
    }
  }
}
</style>
