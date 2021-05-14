<!-- 联通大王卡 -->
<template>
  <div class="unicom-index">
    <div class="dawang-banner" :style="BannerStyle"></div>

    <div class="dawang-center">
      <fillFormNoSel></fillFormNoSel>
    </div>
    <div class="dawang-footer">
      <div style="font-size: 0.4rem; font-weight: bold; color: #ffffff; text-align: center; margin-top: 0.4rem">
        热门评论
      </div>
      <div class="pingDiv" style="border-radius: 0.5rem; margin-top: 0.4rem">
        <div style="width: 90%; margin: auto">
          <div style="width: 100%; height: 12.5rem; overflow: hidden">
            <div class="Pinei" style="margin-top: 0.6rem">
              <vue-seamless-scroll class="warp" :data="pneiDList">
                <div id="autoscroll">
                  <div class="pneiD" v-for="(pd, index) in pneiDList" :key="index">
                    <img :src="pd.img" style="border-radius: 50%; width: 1rem" />
                    <p style="color: #000000; font-size: 0.4rem; padding-left: 0.4rem; text-align: left">
                      {{ pd.name }} <br />
                      <span style="color: #8a8a8a">{{ pd.desc }}</span>
                    </p>
                  </div>
                </div>
              </vue-seamless-scroll>
            </div>
          </div>
        </div>
      </div>
      <img :src="form1" />
    </div>
    <div class="fixed-button">
      <img :src="fixedButton" @click="toTop" />
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
    <div v-if="showTopAD" @click="showTopAD = false" class="tanDiv">
      <img
        class="tanImg"
        :src="require('@/assets/images/chuangyuan/topimg.png')"
        style="
          position: absolute;
          width: 78%;
          left: 50%;
          top: 50%;
          height: auto;
          transform: translate(-50%, -50%);
          -ms-transform: translate(-50%, -50%);
          -moz-transform: translate(-50%, -50%);
          -webkit-transform: translate(-50%, -50%);
          -o-transform: translate(-50%, -50%);
        "
      />
    </div>
  </div>
</template>

<script>
import privacyDoc from './privacyDoc'
import surfNetDoc from './surfNetDoc'
import fillFormNoSel from './fillFormNoSel'
import { areaList } from '@/assets/js/addressCode.js'
// axios
import request from '@/utils/request'
// user api

export default {
  name: 'ChuangYuan',
  components: {
    privacyDoc,
    surfNetDoc,
    fillFormNoSel
  },
  data() {
    return {
      BannerStyle: {
        backgroundImage: 'url(' + require('@/assets/images/chuangyuan_nosel/2a.gif') + ')',
        height: '14rem',
        backgroundSize: '100%'
      },
      banner:
        parseInt(process.env.VUE_APP_SHENHE) === 0
          ? require('@/assets/images/chuangyuan_nosel/2a.gif')
          : require('@/assets/images/chuangyuan_nosel/2a.gif'),
      form1:
        parseInt(process.env.VUE_APP_SHENHE) === 0
          ? require('@/assets/images/chuangyuan_nosel/2aa.gif')
          : require('@/assets/images/chuangyuan_nosel/2aa.gif'),
      form2:
        parseInt(process.env.VUE_APP_SHENHE) === 0
          ? require('@/assets/images/chuangyuan/weapp-wk02/images/red19/bannel9.png')
          : require('@/assets/images/chuangyuan/shenhe/weapp-wk02/images/red19/bannel9.png'),
      form3:
        parseInt(process.env.VUE_APP_SHENHE) === 0
          ? require('@/assets/images/chuangyuan/weapp-wk02/images/red19/bannel10.png')
          : require('@/assets/images/chuangyuan/shenhe/weapp-wk02/images/red19/bannel10.png'),
      form4:
        parseInt(process.env.VUE_APP_SHENHE) === 0
          ? require('@/assets/images/chuangyuan/weapp-wk02/images/red19/bannel10.png')
          : require('@/assets/images/chuangyuan/shenhe/weapp-wk02/images/red19/bannel10.png'),
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
      showTopAD: parseInt(process.env.VUE_APP_HONGBAO_TANCHUANG),
      pneiDList: [
        {
          img: require('@/assets/images/chuangyuan/weapp-wk02/images/top1.jpg'),
          name: '钱****多',
          desc: '已经激活了，从下单到现在...'
        },
        {
          img: require('@/assets/images/chuangyuan/weapp-wk02/images/top2.jpg'),
          name: 'w***g',
          desc: '对于宿舍没WiFi的孩子，这是雪中...'
        },
        {
          img: require('@/assets/images/chuangyuan/weapp-wk02/images/top3.jpg'),
          name: 'C****n',
          desc: '最近知乎也免流啦～哈哈哈哈哈...'
        },
        {
          img: require('@/assets/images/chuangyuan/weapp-wk02/images/top4.jpg'),
          name: '粉***生',
          desc: '双卡双4g,当副卡来用最划算...'
        },
        {
          img: require('@/assets/images/chuangyuan/weapp-wk02/images/top5.jpg'),
          name: 'w***g',
          desc: '用了三年了，不用担心没有WiFi...'
        },
        {
          img: require('@/assets/images/chuangyuan/weapp-wk02/images/top6.jpg'),
          name: '见**',
          desc: '免流随便下，真的爽...'
        },
        {
          img: require('@/assets/images/chuangyuan/weapp-wk02/images/top7.jpg'),
          name: 'D***d',
          desc: '免去腾讯系的应用流量其实很好..'
        }
      ],
      showAgreement: parseInt(process.env.VUE_APP_SHENHE),
      shenHeStatus: parseInt(process.env.VUE_APP_SHENHE)
    }
  },

  computed: {},

  destroyed() {
    // 当页面销毁必须要移除这个事件，vue不刷新页面，不移除会重复执行这个事件
    window.removeEventListener('popstate', this.onBrowserBack, false)
  },
  created() {},
  mounted() {
    // 此处true需要加上，不加滚动事件可能绑定不成功
    window.addEventListener('scroll', this.handleScroll, true)
    // 按需使用：A→B→C就需要页面一进来的时候，就添加一个历史记录
    window.history.pushState(null, null, document.URL)
    // 给window添加一个popstate事件，拦截返回键，执行this.onBrowserBack事件，addEventListener需要指向一个方法
    window.addEventListener('popstate', this.onBrowserBack, false)
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
    width: 94%;
    margin: auto;
    margin-top: 0rem;
    padding-bottom: 2rem;
    img {
      width: 100%;
      vertical-align: middle;
      padding-top: 0.5rem;
    }
    .pingDiv {
      width: 100%;
      padding: 0.2rem 0;
      background: #ffffff;
      // margin: auto;
      border-radius: 0.5rem;
      margin-top: 1rem;
      .Pinei {
        width: 100%;
        // margin-top: 0.6rem;
        height: 100%;
        overflow: hidden;
        .pneiD {
          display: flex;
          align-items: center;
          /* border-radius: 1.2rem; */
          padding: 0.1rem 0;
          padding-left: 0.1rem;
          // margin-top: 0.85rem;
          border-bottom: 1px solid #e5e5e5;
          padding-bottom: 0.1rem;
        }
      }
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
  .fixed-button {
    width: 80%;
    height: 46px;
    position: fixed;
    margin-left: -40%;
    left: 50%;
    bottom: 20px;
    img {
      width: 100%;
      animation: warn 2s ease-in;
      -webkit-animation: warn 2s ease-in;
      -moz-animation: warn 2s ease-in;
      /*规定动画无限次播放*/
      -webkit-animation-iteration-count: infinite;
      -moz-animation-iteration-count: infinite;
      animation-iteration-count: infinite;
    }
  }
}
</style>
