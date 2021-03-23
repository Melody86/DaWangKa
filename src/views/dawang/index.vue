<!-- 联通大王卡 -->
<template>
  <div class="unicom-index">
    <div class="dawang-banner"><img :src="banner"></img></div>
    <div class="dawang-center">
      <div class="swipe">
        <img :src="voice" class="voice"></img>
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" vertical :show-indicators="false">
          <van-swipe-item>张**抢得靓号132<span>2999</span>****</van-swipe-item>
          <van-swipe-item>王**抢得靓号130<span>666</span>****1</van-swipe-item>
          <van-swipe-item>钟**抢得靓号155<span>999</span>6****</van-swipe-item>
          <van-swipe-item>潘**抢得靓号1<span>666789</span>****</van-swipe-item>
        </van-swipe>
      </div>
      <div class="center-search">
        <div class="address">
          <div class="choice-address" @click="showAreaList=true">
            <div>归属地(可选择):<span>{{area}}</span></div>
            <img class="address-icon" :src="address"></img>
          </div>
          <div class="tip" v-show="!showAreaList && area == ''">
            <div class="triangle"></div>
            <img class="baijiuGray" :src="baijiuGray"></img>
            <div class="text">请选择您的归属地哦！</div>
            <img class="close" :src="close"></img>
          </div>
          <div class="search-input">
            <van-search
              v-model="inputValue"
              show-action
              label=""
              placeholder="请输入您喜欢的数字"
              @search="onSearch"
              shape="round"
              left-icon=""
            >
            <template #action>
              <div @click="onSearch" class="search-right"><img :src="searchIcon"></img>搜索</div>
            </template>
            </van-search>
          </div>
          <div class="choice-list">
            <van-grid :column-num="3" :border="false">
              <van-grid-item v-for="(item,index) in typeArr" :key="index" :text="item"  :class="choiceListIndex == index?'show-deep':''" @click="choiceType(index)"/>
            </van-grid>
          </div>
        </div>
      </div>
      <div class="show-list">
        <div v-show="list.length == 0"><img :src="loading"></img></div>
        <div class="num-list" v-show="list.length != 0">
          <van-grid :border="false" :column-num="2" :gutter="10">
            <van-grid-item v-for="(item,index) in list" :key="index">
              <div class="num-list-item" @click="selNum(item.number)">
                <div class="num"><span>{{item.number}}</span></div>
                <div class="num-bottom"><span class="price">{{item.price}}</span><span class="text">限时免费</span></div>
              </div>
            </van-grid-item>
          </van-grid>
        </div>
        <p class="icon-text"><i>*</i>靓号名额有限，具体情况以实际为准</p>
        <div class="agreement" v-if="showAgreement">
          <img :src="checkIcon"></img>
          我已阅读并同意
          <span @click="showPrivacy=true">《个人隐私协议》</span>
          <span @click="showSur=true">《入网协议》</span>
        </div>
        <div class="list-button">
          <img :src="before" @click="beforeButton" :class="clickButton?'opacity-button':''"></img>
          <img :src="after" @click="afterButton" :class="clickButton?'':'opacity-button'"></img>
        </div>
      </div>
    </div>
    <div class="dawang-footer">
      <img :src="form1"></img>
      <img :src="form2"></img>
      <img :src="form3"></img>
      <img :src="form4"></img>
    </div>
    <div class="fixed-button">
      <img :src="fixedButton" @click="toTop"></img>
    </div>
    <!-- 地区选择部分 -->
    <van-popup v-model="showAreaList" round position="bottom">
      <van-area
        title=""
        cancel-button-text=""
        :area-list="areaList"
        :columns-num="2"
        @confirm="choiceArea"/>
    </van-popup>
    <van-popup v-model="showPrivacy" style="width:90%;height:70%;">
      <privacyDoc></privacyDoc>
    </van-popup>
    <van-popup v-model="showSur" style="width:90%;height:70%;">
      <surfNetDoc></surfNetDoc>
    </van-popup>
    <van-popup v-model="showForm" position="bottom" :style="{ height: '80%' }">
      <fillForm :chooseNum="chooseNum" :numAddress="area" :area="codeList"></fillForm>
    </van-popup>
  </div>
</template>

<script>
import privacyDoc from './privacyDoc'
import surfNetDoc from './surfNetDoc'
import fillForm from './fillForm'
import { areaList } from '@/assets/js/addressCode.js'
import qs from 'qs'
// axios
import request from '@/utils/request'
// user api

export default {
  name: 'DaWang',
  components: {
    privacyDoc,
    surfNetDoc,
    fillForm
  },
  data() {
    return {
      banner: require('@/assets/images/dawang/index29_1/banner2.png'),
      form1: require('@/assets/images/dawang/index29_1/form1.png'),
      form2: require('@/assets/images/dawang/index29_1/form2New.png'),
      form3: require('@/assets/images/dawang/index29_1/form3.png'),
      form4: require('@/assets/images/dawang/index29_1/form4.png'),
      voice: require('@/assets/images/dawang/index29_1/shengyin.png'),
      address: require('@/assets/images/dawang/index29_1/baijiu-.png'),
      baijiuGray: require('@/assets/images/dawang/index29_1/baijiuGray.png'),
      close: require('@/assets/images/dawang/index29_1/cancel.png'),
      searchIcon: require('@/assets/images/dawang/index29_1/search.png'),
      checkIcon: require('@/assets/images/dawang/num/checkIcon.png'),
      before: require('@/assets/images/dawang/index29_1/lastPage.png'),
      after: require('@/assets/images/dawang/index29_1/nextPage.png'),
      fixedButton: require('@/assets/images/dawang/index29_1/fixed_btn.png'),
      loading: require('@/assets/images/dawang/img3_6/loading.gif'),
      areaList: areaList, // 选择地址插件数据
      showAreaList: false, // 是否显示选择地址插件
      area: '', // 选择之后的确定值
      inputValue: '', // 搜索框内值
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
      showAgreement: false
    }
  },

  computed: {},
  created() {
    if (areaList.city_list[parseInt(returnCitySN['cid'])] === undefined) {
      this.area =
        areaList.province_list[returnCitySN['cid'].slice(0, 2) + '0000'] +
        ' ' +
        areaList.city_list[parseInt(returnCitySN['cid']) + 100]
      this.codeList.push({
        code: returnCitySN['cid'].slice(0, 2) + '0000',
        name: areaList.province_list[returnCitySN['cid'].slice(0, 2) + '0000']
      })
      this.codeList.push({
        code: parseInt(returnCitySN['cid']) + 100 + '',
        name: areaList.city_list[parseInt(returnCitySN['cid']) + 100]
      })
      console.log(this.codeList)
    } else if (areaList.city_list[returnCitySN['cid']] === undefined) {
      this.area =
        areaList.province_list[returnCitySN['cid'].slice(0, 2) + '0000'] +
        ' ' +
        areaList.city_list[parseInt(returnCitySN['cid'])]
      this.codeList = [
        {
          code: returnCitySN['cid'].slice(0, 2) + '0000',
          name: areaList.province_list[parseInt(returnCitySN['cid'].slice(0, 2) + '0000')]
        },
        {
          code: returnCitySN['cid'],
          name: areaList.city_list[parseInt(returnCitySN['cid'])]
        }
      ]
    } else {
    }
    this.requireData({
      page: 1,
      pagesize: 10,
      formattype: this.pageIndex,
      keyword: this.inputValue,
      area: this.area
    })
  },
  mounted() {
    // 此处true需要加上，不加滚动事件可能绑定不成功
    window.addEventListener('scroll', this.handleScroll, true)
  },

  methods: {
    selNum(number) {
      if (this.area == '') {
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
        if (a != this.area) {
          this.area = this.area + ' ' + a
        }
      }
      this.codeList = arr
      console.log(this.codeList)
    },
    requireData(a) {
      request({
        url: '/phone_list',
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
        area: this.area
      })
      console.log(this.inputValue)
    },
    choiceType(index) {
      this.choiceListIndex = index
      this.onSearch()
    },
    beforeButton() {
      this.clickButton = true
      if (this.pageIndex == 1) {
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
        if (top <= 0) {
          clearInterval(timeTop)
        }
      }, 10)
    }
  }
}
</script>
<style lang="scss" scoped>
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
  background-color: black;
  .dawang-banner {
    img {
      width: 100%;
      vertical-align: middle;
    }
  }
  .dawang-footer {
    img {
      width: 100%;
      vertical-align: middle;
    }
  }
  .dawang-center {
    padding-left: 18px;
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
        padding: 15px 17px;
        .van-swipe-item {
          color: #fff;
          font-size: 12px;
          line-height: 24px;
          text-align: left;
          // background-color: #39a9ed;
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
