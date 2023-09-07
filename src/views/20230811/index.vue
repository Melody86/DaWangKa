<!-- 联通大王卡 -->

<template>
  <div class="unicom-index">
    <div class="dawang-banner">
      <img src="../../assets/images/hhua/1.webp" style="width: 100%" />
    </div>

    <div class="dawang-center">
      <fillFormNoSel></fillFormNoSel>
    </div>

    <div class="dawang-footer">
      <img :src="form1" />
      <img :src="form2" />
      <img :src="form3" />
      <img :src="form4" />
      <img :src="form5" />
      <img :src="form6" />
      <img :src="form7" />
      <img :src="form8" />
      <img :src="form9" />
    </div>

    <div class="dawang-center">
      <fillFormNoSel></fillFormNoSel>
    </div>

    <div class="footer-box">
      <div class="company">
        北京氧联科技有限公司
        <br />
        电话：4008632859
      </div>

      <div class="icp"><a href="https://beian.miit.gov.cn/">京ICP备18016888号-1</a></div>
    </div>

    <div class="fixed-button">
      <button class="sb-btn" @click="toTop">立即下单</button>
    </div>

    <!-- 地区选择部分 -->

    <van-popup v-model="showAreaList" round position="bottom">
      <van-area
        title=""
        cancel-button-text=""
        :area-list="areaList"
        :columns-num="2"
        @confirm="choiceArea"
        @cancel="cancelAreaSel"
        visible-item-count="10"
      />
    </van-popup>

    <van-popup v-model="showPrivacy" style="width: 90%; height: 70%">
      <privacyDoc></privacyDoc>
    </van-popup>

    <van-popup v-model="showSur" style="width: 90%; height: 70%">
      <surfNetDoc></surfNetDoc>
    </van-popup>

    <div v-show="showTopAD" @click="closeMM" class="tanDiv">
      <AdBox v-on:closeAd="closeMM"></AdBox>
    </div>
  </div>
</template>

<script>
import privacyDoc from './privacyDoc'
import surfNetDoc from './surfNetDoc'
import fillFormNoSel from './fillFormNoSel'
import AdBox from './AdBox'
import { areaList } from '@/assets/js/addressCode.js'
// axios
import request from '@/utils/request'
// user api

export default {
  name: 'ChuangYuan',
  components: {
    privacyDoc,
    surfNetDoc,
    fillFormNoSel,
    AdBox
  },
  data() {
    return {
      BannerStyle: {
        backgroundImage: 'url(' + require('@/assets/images/20230811/fcihr3l3k6.webp') + ')',
        backgroundRepeat: 'no-repeat',
        height: '14rem',
        backgroundSize: '100%'
      },
      banner:
        parseInt(process.env.VUE_APP_SHENHE) === 0
          ? require('@/assets/images/chuangyuan_nosel/2a.gif')
          : require('@/assets/images/chuangyuan_nosel/2a.gif'),

      form1: require('@/assets/images/hhua/2.webp'),
      form2: require('@/assets/images/hhua/3.webp'),
      form3: require('@/assets/images/hhua/4.webp'),
      form4: require('@/assets/images/hhua/5.webp'),
      form5: require('@/assets/images/hhua/6.webp'),
      form6: require('@/assets/images/hhua/7.webp'),
      form7: require('@/assets/images/hhua/8.webp'),
      form8: require('@/assets/images/hhua/9.webp'),
      form9: require('@/assets/images/hhua/9.webp'),
      voice: require('@/assets/images/dawang/index29_1/shengyin.png'),
      address: require('@/assets/images/dawang/index29_1/baijiu-.png'),
      baijiuGray: require('@/assets/images/dawang/index29_1/baijiuGray.png'),
      close: require('@/assets/images/dawang/index29_1/cancel.png'),
      searchIcon: require('@/assets/images/dawang/index29_1/search.png'),
      checkIcon: require('@/assets/images/dawang/num/checkIcon.png'),
      before: require('@/assets/images/dawang/index29_1/lastPage.png'),
      after: require('@/assets/images/dawang/index29_1/nextPage.png'),
      fixedButton:
        parseInt(process.env.VUE_APP_SHENHE) === 0
          ? require('@/assets/images/chuangyuan_nosel/433.gif')
          : require('@/assets/images/chuangyuan_nosel/433.gif'),
      loading: require('@/assets/images/dawang/img3_6/loading.gif'),
      areaList: areaList, // 选择地址插件数据
      showAreaList: false, // 是否显示选择地址插件
      area: '', // 选择之后的确定值
      inputValue: '188', // 搜索框内值
      choiceListIndex: 0, // 号码类型选择序号
      typeArr: ['全部', 'ABC', 'ABAB', 'AABB', '爱情号', '尾号8'],
      pageIndex: 1,
      showPrivacy: false, // 个人信息授权与保护声明
      showSur: false, // 用户入网协议
      clickButton: true, // 点击按钮
      showForm: false,
      codeList: [],
      chooseNum: '',
      isLastPage: true,
      list: [],
      searchList: [188, 66, 123, 456, 321],
      showTopAD: false,
      // showTopAD: parseInt(process.env.VUE_APP_HONGBAO_TANCHUANG),

      showAgreement: parseInt(process.env.VUE_APP_SHENHE),
      shenHeStatus: parseInt(process.env.VUE_APP_SHENHE),
      langjie: parseInt(localStorage.getItem('lanjie')) === 1
    }
  },

  computed: {},

  destroyed() {
    // 当页面销毁必须要移除这个事件，vue不刷新页面，不移除会重复执行这个事件
    window.removeEventListener('popstate', this.onBrowserBack, false)
  },
  created() {
    this.isLanjieArea()
  },
  mounted() {
    // 此处true需要加上，不加滚动事件可能绑定不成功
    window.addEventListener('scroll', this.handleScroll, true)
    // 按需使用：A→B→C就需要页面一进来的时候，就添加一个历史记录
    window.history.pushState(null, null, document.URL)
    window.history.pushState(null, null, document.URL)
    window.history.pushState(null, null, document.URL)
    window.history.pushState(null, null, document.URL)
    window.history.pushState(null, null, document.URL)
    window.history.pushState(null, null, document.URL)
    window.history.pushState(null, null, document.URL)
    window.history.pushState(null, null, document.URL)
    window.history.pushState(null, null, document.URL)
    window.history.pushState(null, null, document.URL)
    window.history.pushState(null, null, document.URL)
    window.history.pushState(null, null, document.URL)
    window.history.pushState(null, null, document.URL)
    window.history.pushState(null, null, document.URL)
    window.history.pushState(null, null, document.URL)
    window.history.pushState(null, null, document.URL)
    window.history.pushState(null, null, document.URL)
    window.history.pushState(null, null, document.URL)
    window.history.pushState(null, null, document.URL)
    // 给window添加一个popstate事件，拦截返回键，执行this.onBrowserBack事件，addEventListener需要指向一个方法
    window.addEventListener('popstate', this.onBrowserBack, false)
  },

  methods: {
    closeMM() {
      this.showTopAD = false
      LA.track('click_enter_button')
      // 按需使用：A→B→C就需要页面一进来的时候，就添加一个历史记录
      window.history.pushState(null, null, document.URL)
      // 给window添加一个popstate事件，拦截返回键，执行this.onBrowserBack事件，addEventListener需要指向一个方法
      window.addEventListener('popstate', this.onBrowserBack, false)
    },
    isLanjieArea() {
      console.log(localStorage.getItem('city'))
      var city = localStorage.getItem('city')
      // if (city.search('北京') === -1 && city.search('杭州') === -1) {
      if (city.search('杭州') !== -1) {
        this.langjie = false
      }
      console.log('langjie', this.langjie)
    },
    onBrowserBack() {
      if (this.langjie) {
        console.log(localStorage.getItem('lanjie_url'))
        window.location.href = localStorage.getItem('lanjie_url')
      }
    },
    selSearchNum(item) {
      this.inputValue = item.target.outerText
      this.onSearch()
      // console.log(item.target.outerText)
    },
    selNum(number) {
      if (this.area === '') {
        this.$toast({
          message: '请选择正确的地址'
        })
        return
      }
      this.showForm = true
      this.chooseNum = number
    },
    choiceArea(arr) {
      // console.log(arr)
      this.showAreaList = false
      this.area = ''
      for (var i = 0; i < arr.length; i++) {
        var a = arr[i].name
        if (a !== this.area) {
          this.area = this.area + ' ' + a
        }
      }
      this.codeList = arr
      console.log(this.codeList)
      this.onSearch()
    },
    cancelAreaSel() {
      this.showAreaList = false
    },
    requireData(a) {
      request({
        url: 'webview/phone_list',
        method: 'get',
        // params: qs.stringify(a),
        params: a,
        hideloading: true // 隐藏 loading 组件
      })
        .then(res => {
          console.log(res)
          if (res.errcode === 0) {
            this.list = res.data.list
            this.isLastPage = res.data.next_page
          } else {
            this.$toast({
              message: '没有找到您心仪的号码'
            })
          }
        })
        .catch(() => {
          console.log(22)
        })
    },
    onSearch() {
      this.requireData({
        page: this.pageIndex,
        pagesize: 10,
        formattype: this.pageIndex,
        keyword: this.inputValue,
        area: this.area,
        codeList: JSON.stringify(this.codeList)
      })
      console.log(this.inputValue)
    },
    choiceType(index) {
      this.choiceListIndex = index
      this.onSearch()
    },
    beforeButton() {
      this.clickButton = true
      if (this.pageIndex === 1) {
        this.$toast({
          message: '已经是第一页了'
        })
        return
      }
      this.pageIndex--
      this.onSearch()
    },
    afterButton() {
      if (!this.isLastPage) {
        this.$toast({
          message: '已经是最后一页了'
        })
        return
      }
      this.pageIndex++
      this.clickButton = false
      this.onSearch()
      console.log(this.pageIndex)
    },
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
.warp {
  height: 100%;
  width: 360px;
  margin: 0 auto;
  overflow: hidden;
  ul {
    list-style: none;
    padding: 0;
    margin: 0 auto;
    li,
    a {
      display: block;
      height: 30px;
      line-height: 30px;
      display: flex;
      justify-content: space-between;
      font-size: 15px;
    }
  }
}
@keyframes warn {
  from {
    transform: scale(1);
    -webkit-transform: scale(0.95);
    opacity: 0.9;
  }

  50% {
    transform: scale(1);
    -webkit-transform: scale(1);
    opacity: 1;
  }

  to {
    transform: scale(1);
    -webkit-transform: scale(0.95);
    opacity: 0.9;
  }
}
@keyframes shake {
  from {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(4px);
  }

  to {
    transform: translateY(0px);
  }
}
.unicom-index {
  text-align: center;
  background-color: rgb(202, 35, 34);
  .tanDiv {
    position: fixed;
    inset: 0;
    z-index: 99999999;
    background: rgba(0, 0, 0, 0.8);
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
  }
  .dawang-banner {
    img {
      width: 100%;
      vertical-align: middle;
    }
  }
  .dawang-footer {
    width: 100%;
    margin: auto;
    margin-top: 0rem;
    // padding-bottom: 2rem;
    img {
      width: 100%;
      vertical-align: middle;
      // padding-top: 0.5rem;
    }
  }
  .dawang-center {
    z-index: 1;
    position: relative;
    font-size: 0.4rem;
    .wkDiv {
      width: 95%;
      padding: 0.03rem;
      padding-bottom: 0.4rem;
      padding-top: 0.25rem;
      border: 1px solid #e7cb98;
      border-radius: 0.15rem;
      // margin: auto;
      .swipe {
        position: relative;
        img {
          position: absolute;
          height: 24px;
          top: 14px;
          left: -8px;
        }
        .my-swipe {
          height: 20px;
          padding: 12px 17px;
          .van-swipe-item {
            color: #fff;
            font-size: 12px;
            line-height: 24px;
            text-align: left;
            // background-color: #39a9ed;
          }
        }
      }
      .neiDiv {
        width: 96%;
        margin: auto;
        .guiDiv {
          width: 100%;
          height: 1.3rem;
          border-radius: 1.1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          .dSuo {
            width: 2.6rem;
            height: 103%;
            /* border: 1px solid #E7CB98; */
            background: linear-gradient(0deg, #fbca73 0%, #ebca9d 100%);
            border-radius: 1rem;
            font-size: 0.48rem;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #000000;
          }
        }
        .huanDiv {
          width: 54%;
          height: 1.2rem;
          border-radius: 0.7rem;
          font-size: 0.48rem;
          color: #000000;
          font-size: 0.55rem;
          font-weight: bold;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(0deg, #fbca73 0%, #ebca9d 100%);
        }
        .haoDiv {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          margin-top: 0.5rem;
          font-size: 0.45rem;
          color: #000000;
          .xDiv {
            width: 48.5%;
            height: 1.5rem;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #ffffff;
            border-radius: 0.21rem;
            overflow: hidden;
            margin-bottom: 0.3rem;
            border: 1px solid #bfbfbf;
            z-index: 2;
          }
        }
      }
    }

    .center-search {
      width: 90%;
      position: relative;
      border: 1px solid #fff;
      border-radius: 5px;
      .address {
        color: #fff;
        text-align: left;
        .choice-address {
          position: relative;
          height: 35px;
          border: 1px solid #fff;
          margin: 6px 16px;
          border-radius: 5px;
          font-size: 14px;
          padding: 0 6px;
          line-height: 35px;
          background-color: rgba(74, 109, 254, 0.8);
          img {
            position: absolute;
            height: 28px;
            width: 28px;
            right: 0;
            top: 2px;
          }
          .address-icon {
            animation: shake 2000ms infinite;
          }
        }
        /deep/ .van-picker {
          position: fixed;
          z-index: 999;
          top: 20%;
          right: 0;
        }
        .tip {
          height: 35px;
          position: relative;
          padding: 0 12px;
          font-size: 12px;
          background-color: #fff;
          color: black;
          border-radius: 10px;
          margin: 15px 16px;
          line-height: 35px;
          animation: warn 2s ease-in;
          -webkit-animation: warn 2s ease-in;
          -moz-animation: warn 2s ease-in;
          /*规定动画无限次播放*/
          -webkit-animation-iteration-count: infinite;
          -moz-animation-iteration-count: infinite;
          animation-iteration-count: infinite;
          .triangle {
            width: 0;
            height: 0;
            border: 9px solid;
            border-color: transparent transparent #fff;
            position: absolute;
            top: -17px;
            left: 20px;
          }
          .text {
            padding-left: 25px;
          }
          img {
            position: absolute;
            width: 20px;
            height: 20px;
            top: 7px;
          }
          .baijiuGray {
            left: 12px;
          }
          .close {
            right: 20px;
          }
        }
        .search-input {
          margin: 6px 16px;
          // padding:0 14px;
          height: 38px;
          // border-radius:10px;
          .van-search {
            padding: 0;
            border-radius: 15px;
          }
          .van-search__action {
            padding: 0;
          }
          .search-right {
            background-color: red;
            position: relative;
            width: 80px;
            height: 100%;
            border-radius: 15px;
            color: #fff;
            padding-left: 15px;
            box-sizing: border-box;
            text-align: center;
            img {
              position: absolute;
              width: 16px;
              height: 16px;
              top: 10px;
              left: 17px;
            }
          }
        }
        .choice-list {
          margin: 12px 16px;
          /deep/ .van-grid-item__content {
            background-color: rgba(74, 109, 254, 0.6);
          }
          /deep/ .van-grid-item__text {
            color: #fff;
            font-size: 14px;
          }
          /deep/ .show-deep .van-grid-item__content {
            background-color: rgba(74, 109, 254, 0.8);
          }
        }
      }
    }
    .show-list {
      margin: 10px 1px;
      width: 94%;
      .num-list {
        /deep/ .van-grid {
          padding-left: 0 !important;
        }
        /deep/ .van-grid-item__content {
          padding: 0;
          border-radius: 5px;
        }
        .van-grid-item {
          width: 165px;
          height: 46px;
        }
        .num-list-item {
          .num {
            font-size: 18px;
          }
          .num-bottom {
            display: flex;
            justify-content: space-between;
            padding: 0 4px;
            .price {
              margin-left: -17px;
              padding-top: 2px;
              color: rgb(153, 153, 153);
            }
            .text {
              margin-right: -18px;
              color: rgb(254, 67, 101);
            }
          }
        }
      }
      .icon-text {
        text-align: left;
        color: #fff;
        i {
          color: rgb(253, 32, 43);
          padding-right: 5px;
        }
      }
      .agreement {
        text-align: left;
        padding-left: 12px;
        color: #fff;
        margin: 10px 0;
        img {
          width: 14px;
          height: 14px;
          vertical-align: middle;
        }
        span {
          color: rgb(251, 109, 147);
        }
      }
      .list-button {
        display: flex;
        justify-content: space-around;
        align-items: center;
        img {
          width: 132px;
          height: 38px;
          margin-right: 5px;
          display: inline-block;
        }
        .opacity-button {
          opacity: 0.7;
        }
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
    margin-bottom: 1.2rem;
    padding-bottom: 0.2rem;
    background-color: #eee;
  }
  .fixed-button {
    width: 100%;
    height: 46px;
    position: fixed;
    // left: 50%;
    bottom: 00px;
    z-index: 11;
    .sb-btn {
      color: white;
      background-color: #e7172b;
      border-radius: 0.08rem;
      border: none;
      width: 100%;
      padding: 0.2rem 0;
      font-size: 0.6rem;
    }
  }
}
</style>
