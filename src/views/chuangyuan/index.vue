<!-- 联通大王卡 -->
<template>
  <div class="unicom-index">
    <div class="dawang-banner"><img :src="banner" /></div>
    <div class="dawang-center">
      <div
        class="wkDiv"
        id="boxT"
        style="
          border: none;
          background-color: #ffffff;
          padding-top: 0.4rem;
          padding-bottom: 0.4rem;
          position: relative;
          z-index: 1;
          margin-top: -3rem;
        "
      >
        <div class="neiDiv">
          <div class="swipe">
            <img :src="voice" class="voice" />
            <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" vertical :show-indicators="false">
              <van-swipe-item><span style="color: red">张**抢得靓号132<span>2999</span>****</span></van-swipe-item>
              <van-swipe-item><span style="color: red">王**抢得靓号130<span>666</span>****1</span></van-swipe-item>
              <van-swipe-item><span style="color: red">钟**抢得靓号155<span>999</span>6****</span></van-swipe-item>
              <van-swipe-item><span style="color: red">潘**抢得靓号1<span>666789</span>****</span></van-swipe-item>
            </van-swipe>
          </div>

          <div class="guiDiv guiDiv1" style="margin-top: 0.2rem; background-color: #e5e5e5">
            <div style="display: flex; width: 100%">
              <li id="delivery" style="display: flex; padding-left: 0.4rem; padding-right: 0.4rem; width: 100%">
                <div class="p-title" style="font-size: 0.46rem; color: #000000; width: 40%">归属地：</div>
                <div class="p-content p-select grey newGrey deliveryTitle" style="color: #000000; font-size: 0.46rem">
                  请选择号码归属地
                </div>
              </li>
            </div>
            <img
              src="@/assets/images/chuangyuan/weapp-wk02/images/red19/bannel3.png"
              class="upDiv"
              style="width: 0.45rem; height: 0.7rem; margin-right: 0.4rem"
              height="100%"
            />
          </div>

          <div class="guiDiv" style="margin-top: 0.4rem; overflow: hidden; background-color: #e5e5e5">
            <input
              type="number"
              name=""
              id="search"
              value=""
              placeholder="王上请选择您喜欢的数字"
              style="
                height: 100%;
                padding-left: 0.4rem;
                width: 70%;
                border: none;
                color: #000000;
                background-color: #e5e5e5;
              "
            />
            <div class="dSuo" id="search-btn">立即搜索</div>
          </div>

          <div
            style="
              display: flex;
              justify-content: center;
              width: 90%;
              font-size: 0.45rem;
              margin: auto;
              margin-top: 0.35rem;
              height: 1rem;
              align-items: center;
              background-color: #e5e5e5;
              border-radius: 0.05rem;
              position: relative;
            "
            class="wkNum"
          >
            大家都在搜：
            <span style="display: inline-block; margin-left: 0.2rem; text-decoration: underline" class="clickSuo"
              >188</span
            >
            <span style="display: inline-block; margin-left: 0.2rem; text-decoration: underline" class="clickSuo"
              >88</span
            >
            <span style="display: inline-block; margin-left: 0.2rem; text-decoration: underline" class="clickSuo"
              >66</span
            >
            <span style="display: inline-block; margin-left: 0.2rem; text-decoration: underline" class="clickSuo"
              >123</span
            >
            <div
              style="
                border: 0.3rem solid #e5e5e5;
                border-color: transparent transparent #e5e5e5 transparent;
                position: absolute;
                top: -1rem;
                left: 0.41rem;
              "
            ></div>
          </div>

          <!-- 号码 -->
          <div class="haoDiv">
            <div class="xDiv">
              <div
                style="
                  width: 100%;
                  height: 100%;
                  position: relative;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                "
              >
                <img
                  src="@/assets/images/chuangyuan/weapp-wk02/images/bannel5.png"
                  style="width: 0.7rem; height: 0.7rem; position: absolute; top: 0; left: 4%"
                />
                <span style="font-size: 0.46rem; color: #000000">13751324427</span>
                <img
                  src="@/assets/images/chuangyuan/weapp-wk02/images/bannel6.png"
                  style="width: 0.7rem; height: 0.7rem; position: absolute; bottom: 0; right: 0; display: none"
                />
              </div>
              <div style="text-align: start; width: 52%">
                <span
                  style="
                    font-size: 0.31rem;
                    color: #ff0000;
                    text-decoration: line-through;
                    display: block;
                    margin-left: 0.05rem;
                  "
                  >靓号费:¥49</span
                >
              </div>
            </div>
            <div class="xDiv">
              <div
                style="
                  width: 100%;
                  height: 100%;
                  position: relative;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                "
              >
                <img
                  src="@/assets/images/chuangyuan/weapp-wk02/images/bannel5.png"
                  style="width: 0.7rem; height: 0.7rem; position: absolute; top: 0; left: 4%"
                />
                <span style="font-size: 0.46rem; color: #000000">13751324427</span>
                <img
                  src="@/assets/images/chuangyuan/weapp-wk02/images/bannel6.png"
                  style="width: 0.7rem; height: 0.7rem; position: absolute; bottom: 0; right: 0; display: none"
                />
              </div>
            </div>
            <div class="xDiv">
              <div
                style="
                  width: 100%;
                  height: 100%;
                  position: relative;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                "
              >
                <img
                  src="@/assets/images/chuangyuan/weapp-wk02/images/bannel5.png"
                  style="width: 0.7rem; height: 0.7rem; position: absolute; top: 0; left: 4%"
                />
                <span style="font-size: 0.46rem; color: #000000">13751324427</span>
                <img
                  src="@/assets/images/chuangyuan/weapp-wk02/images/bannel6.png"
                  style="width: 0.7rem; height: 0.7rem; position: absolute; bottom: 0; right: 0; display: none"
                />
              </div>
            </div>
            <div class="xDiv">
              <div
                style="
                  width: 100%;
                  height: 100%;
                  position: relative;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                "
              >
                <img
                  src="@/assets/images/chuangyuan/weapp-wk02/images/bannel5.png"
                  style="width: 0.7rem; height: 0.7rem; position: absolute; top: 0; left: 4%"
                />
                <span style="font-size: 0.46rem; color: #000000">13751324427</span>
                <img
                  src="@/assets/images/chuangyuan/weapp-wk02/images/bannel6.png"
                  style="width: 0.7rem; height: 0.7rem; position: absolute; bottom: 0; right: 0; display: none"
                />
              </div>
            </div>
            <div class="xDiv">
              <div
                style="
                  width: 100%;
                  height: 100%;
                  position: relative;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                "
              >
                <img
                  src="@/assets/images/chuangyuan/weapp-wk02/images/bannel5.png"
                  style="width: 0.7rem; height: 0.7rem; position: absolute; top: 0; left: 4%"
                />
                <span style="font-size: 0.46rem; color: #000000">13751324427</span>
                <img
                  src="@/assets/images/chuangyuan/weapp-wk02/images/bannel6.png"
                  style="width: 0.7rem; height: 0.7rem; position: absolute; bottom: 0; right: 0; display: none"
                />
              </div>
            </div>
          </div>
          <div style="display: flex; justify-content: center; margin-top: 0.1rem">
            <div class="huanDiv" id="number">换一换</div>
            <!-- <div class="huanDiv" style="margin-left: 1rem;">
							换一批
						</div> -->
          </div>
        </div>
      </div>

      <div class="center-search">
        <div class="address">
          <div class="choice-address" @click="showAreaList = true">
            <div>
              归属地(可选择):<span>{{ area }}</span>
            </div>
            <img class="address-icon" :src="address" />
          </div>
          <div class="tip" v-show="!showAreaList && area == ''">
            <div class="triangle"></div>
            <img class="baijiuGray" :src="baijiuGray" />
            <div class="text">请选择您的归属地哦！</div>
            <img class="close" :src="close" />
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
                <div @click="onSearch" class="search-right"><img :src="searchIcon" />搜索</div>
              </template>
            </van-search>
          </div>
          <div class="choice-list">
            <van-grid :column-num="3" :border="false">
              <van-grid-item
                v-for="(item, index) in typeArr"
                :key="index"
                :text="item"
                :class="choiceListIndex == index ? 'show-deep' : ''"
                @click="choiceType(index)"
              />
            </van-grid>
          </div>
        </div>
      </div>
      <div class="show-list">
        <div v-show="list.length == 0"><img :src="loading" /></div>
        <div class="num-list" v-show="list.length != 0">
          <van-grid :border="false" :column-num="2" :gutter="10">
            <van-grid-item v-for="(item, index) in list" :key="index" v-if="index < 10">
              <div class="num-list-item" @click="selNum(item.number)">
                <div class="num"><phonenum :pnum="item.number" :pkey="inputValue"></phonenum></div>
                <div class="num-bottom">
                  <span class="price">{{ item.price }}</span
                  ><span class="text" v-if="shenHeStatus == 0">限时免费</span>
                </div>
              </div>
            </van-grid-item>
          </van-grid>
        </div>
        <p class="icon-text"><i>*</i>靓号名额有限，具体情况以实际为准</p>
        <div class="agreement" v-if="showAgreement == 0">
          <img :src="checkIcon" />
          我已阅读并同意
          <span @click="showPrivacy = true">《个人隐私协议》</span>
          <span @click="showSur = true">《入网协议》</span>
        </div>
        <div class="list-button">
          <img :src="before" @click="beforeButton" :class="clickButton ? 'opacity-button' : ''" />
          <img :src="after" @click="afterButton" :class="clickButton ? '' : 'opacity-button'" />
        </div>
      </div>
    </div>
    <div class="dawang-footer">
      <div style="font-size: 0.4rem; font-weight: bold; color: #ffffff; text-align: center; margin-top: 0.4rem">
        热门评论
      </div>
      <div class="pingDiv" style="border-radius: 0.5rem; margin-top: 0.4rem">
        <div style="width: 90%; margin: auto">
          <div style="width: 100%; height: 12.5rem; overflow: hidden">
            <div class="Pinei" style="margin-top: 0.6rem">
              <div id="autoscroll">
                <div class="pneiD" v-for="(pd, index) in pneiDList" :key="index">
                  <img :src="pd.img" style="border-radius: 50%; width: 1rem" />
                  <p style="color: #000000; font-size: 0.4rem; padding-left: 0.4rem; text-align: left">
                    {{ pd.name }} <br />
                    <span style="color: #8a8a8a">{{ pd.desc }}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <img :src="form1" />
      <img :src="form2" />
      <img :src="form3" />
    </div>
    <div class="fixed-button">
      <img :src="fixedButton" @click="toTop" />
    </div>
    <!-- 地区选择部分 -->
    <van-popup v-model="showAreaList" round position="bottom">
      <van-area title="" cancel-button-text="" :area-list="areaList" :columns-num="2" @confirm="choiceArea" />
    </van-popup>
    <van-popup v-model="showPrivacy" style="width: 90%; height: 70%">
      <privacyDoc></privacyDoc>
    </van-popup>
    <van-popup v-model="showSur" style="width: 90%; height: 70%">
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
import phonenum from './phonenum'
// axios
import request from '@/utils/request'
// user api

export default {
  name: 'ChuangYuan',
  components: {
    privacyDoc,
    surfNetDoc,
    fillForm,
    phonenum
  },
  data() {
    return {
      banner:
        parseInt(process.env.VUE_APP_SHENHE) === 0
          ? require('@/assets/images/chuangyuan/diybanner1.png')
          : require('@/assets/images/dawang/index29_1/shenhe/banner2.png'),
      form1:
        parseInt(process.env.VUE_APP_SHENHE) === 0
          ? require('@/assets/images/chuangyuan/weapp-wk02/images/red19/bannel8.png')
          : require('@/assets/images/dawang/index29_1/shenhe/form1.png'),
      form2:
        parseInt(process.env.VUE_APP_SHENHE) === 0
          ? require('@/assets/images/chuangyuan/weapp-wk02/images/red19/bannel9.png')
          : require('@/assets/images/dawang/index29_1/shenhe/form2New.png'),
      form3:
        parseInt(process.env.VUE_APP_SHENHE) === 0
          ? require('@/assets/images/chuangyuan/weapp-wk02/images/red19/bannel10.png')
          : require('@/assets/images/dawang/index29_1/shenhe/form3.png'),
      form4:
        parseInt(process.env.VUE_APP_SHENHE) === 0
          ? require('@/assets/images/chuangyuan/weapp-wk02/images/red19/bannel10.png')
          : require('@/assets/images/dawang/index29_1/shenhe/form4.png'),
      voice: require('@/assets/images/dawang/index29_1/shengyin.png'),
      address: require('@/assets/images/dawang/index29_1/baijiu-.png'),
      baijiuGray: require('@/assets/images/dawang/index29_1/baijiuGray.png'),
      close: require('@/assets/images/dawang/index29_1/cancel.png'),
      searchIcon: require('@/assets/images/dawang/index29_1/search.png'),
      checkIcon: require('@/assets/images/dawang/num/checkIcon.png'),
      before: require('@/assets/images/dawang/index29_1/lastPage.png'),
      after: require('@/assets/images/dawang/index29_1/nextPage.png'),
      fixedButton: require('@/assets/images/chuangyuan/weapp-hndxxk/assets/index/banner14.png'),
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
      pneiDList: [
        {
          img: require('@/assets/images/chuangyuan/weapp-wk02/images/top1.jpg'),
          name: '钱****多',
          desc: '已经激活了，从下单到现在...'
        },
        {
          img: require('@/assets/images/chuangyuan/weapp-wk02/images/top2.jpg'),
          name: '钱****多',
          desc: '已经激活了，从下单到现在...'
        },
        {
          img: require('@/assets/images/chuangyuan/weapp-wk02/images/top3.jpg'),
          name: '钱****多',
          desc: '已经激活了，从下单到现在...'
        },
        {
          img: require('@/assets/images/chuangyuan/weapp-wk02/images/top4.jpg'),
          name: '钱****多',
          desc: '已经激活了，从下单到现在...'
        },
        {
          img: require('@/assets/images/chuangyuan/weapp-wk02/images/top5.jpg'),
          name: '钱****多',
          desc: '已经激活了，从下单到现在...'
        },
        {
          img: require('@/assets/images/chuangyuan/weapp-wk02/images/top6.jpg'),
          name: '钱****多',
          desc: '已经激活了，从下单到现在...'
        },
        {
          img: require('@/assets/images/chuangyuan/weapp-wk02/images/top7.jpg'),
          name: '钱****多',
          desc: '已经激活了，从下单到现在...'
        }
      ],
      showAgreement: parseInt(process.env.VUE_APP_SHENHE),
      shenHeStatus: parseInt(process.env.VUE_APP_SHENHE)
    }
  },

  computed: {},
  created() {
    // returnCitySN['cid'] = '110101'
    var cid = returnCitySN['cid'] + ''
    var cityId = cid.slice(0, 4) + '00'
    var provinceId = cid.slice(0, 2) + '0000'
    if (areaList.province_list[provinceId] !== undefined) {
      this.area += areaList.province_list[provinceId] + ' '
      this.codeList.push({
        code: provinceId,
        name: areaList.province_list[provinceId]
      })
    }
    if (areaList.city_list[cityId] !== undefined) {
      this.area += areaList.city_list[cityId]
      this.codeList.push({
        code: cityId,
        name: areaList.city_list[cityId]
      })
    } else if (areaList.city_list[parseInt(cityId) + 100 + ''] !== undefined) {
      this.area += areaList.city_list[parseInt(cityId) + 100 + '']
      this.codeList.push({
        code: parseInt(cityId) + 100 + '',
        name: areaList.city_list[parseInt(cityId) + 100 + '']
      })
    }
    console.log(this.codeList)
    this.requireData({
      page: 1,
      pagesize: 10,
      formattype: this.pageIndex,
      keyword: this.inputValue,
      area: this.area,
      codeList: JSON.stringify(this.codeList)
    })
  },
  mounted() {
    // 此处true需要加上，不加滚动事件可能绑定不成功
    window.addEventListener('scroll', this.handleScroll, true)
  },

  methods: {
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
  background-color: rgb(202, 35, 34);
  .dawang-banner {
    img {
      width: 100%;
      vertical-align: middle;
    }
  }
  .dawang-footer {
    width: 94%;
    margin: auto;
    margin-top: 1.4rem;
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
        height: 380px;
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
    padding-left: 18px;
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
