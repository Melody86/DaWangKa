<template>
  <div class="ling-ka">
    <div><img :src="top" /></div>
    <div class="form">
      <div class="swipe">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" vertical :show-indicators="false">
          <van-swipe-item><img :src="laba" />1分钟前 赵** 177****9696 领取了此卡</van-swipe-item>
          <van-swipe-item><img :src="laba" />1分钟前 王** 177****7862 领取了此卡</van-swipe-item>
          <van-swipe-item><img :src="laba" />1分钟前 李** 177****5374 领取了此卡</van-swipe-item>
          <van-swipe-item><img :src="laba" />1分钟前 姚* 177****3875 领取了此卡</van-swipe-item>
        </van-swipe>
      </div>
      <div class="choose"><img :src="choose" /></div>
      <div class="search-list">
        <div class="content-div">
          <div class="search-input">
            <div class="car-search">
              <div class="search-button" @click="searchNumber">搜一搜</div>
              <div class="search-text">
                <input
                  type="number"
                  v-model="searchNum"
                  οninput="if(value.length>5)value=value.slice(0,5)"
                  placeholder="生日、爱情、幸运数字"
                />
              </div>
            </div>
            <div class="next-button" @click="searchNumber">换一换</div>
          </div>
          <div class="hot-search">
            <img :src="zhu" />
          </div>
          <div class="card-list">
            <van-grid :column-num="3" :border="false" :gutter="2">
              <van-grid-item v-for="(item, index) in list" :key="index" @click="chooseItemNum(item)">
                <div>{{ item.mdn }}</div>
                <div class="text">{{ item.feature }}</div>
              </van-grid-item>
            </van-grid>
          </div>
        </div>
      </div>
      <div class="form-list">
        <img :src="head" />
        <div class="banner">
          <div>
            <div class="banner-inner">
              <div class="banner-form">
                <div class="banner-border">
                  <span class="banner-text">免费靓号<span>*</span></span>
                  <span class="banner-text2"
                    ><input class="banner_input" readonly="readonly" placeholder="免费靓号" v-model="chooseNumber"
                  /></span>
                </div>
                <div class="banner-border">
                  <span class="banner-text">证件姓名<span>*</span></span>
                  <span class="banner-text2"
                    ><input class="banner_input" placeholder="请输入身份证件姓名（已加密）" v-model="nameValue"
                  /></span>
                </div>
                <div class="banner-border">
                  <span class="banner-text">联系号码<span>*</span></span>
                  <span class="banner-text2"
                    ><input class="banner_input" placeholder="请输入收件人联系电话（已加密）" v-model="telValue"
                  /></span>
                </div>
                <div class="banner-border" v-show="checkName && checkTel">
                  <span class="banner-text">身份证号<span>*</span></span>
                  <span class="banner-text2"
                    ><input class="banner_input" placeholder="请输入身份证号码（已加密）" v-model="individualValue"
                  /></span>
                </div>
                <div class="banner-border">
                  <span class="banner-text">收货省市<span>*</span></span>
                  <span class="banner-text2"
                    ><input
                      class="banner_input"
                      placeholder="请选择省/市/区（县）"
                      v-model="cascaderValue"
                      readonly="readonly"
                      @click="showAreaBox"
                  /></span>
                </div>
                <div class="banner-border">
                  <span class="banner-text">详细地址<span>*</span></span>
                  <span class="banner-text2"
                    ><input class="banner_input" placeholder="请选择省/市/区（县）" v-model="detailareaValue"
                  /></span>
                </div>
              </div>
              <div class="formbox-btm">
                <van-checkbox v-model="docChecked" shape="square" icon-size="14px"></van-checkbox>
                <span class="btm-text">我已阅读并同意:</span>
                <div class="policy-name" @click="showPersonal = true">
                  《中国电信入网协议及翼支付服务协议&隐私政策》
                </div>
                <div class="policy-name" @click="showInfo = true">《关于客户个人信息收集、使用规则公告》</div>
              </div>
              <div class="button-btm" @click="submit">
                <img :src="button" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div><img :src="middle" /></div>
    <div><img :src="bottom" /></div>
    <div class="question-tips" @click="showQuestion = true">常见问题</div>
    <div class="question-tips" @click="showTips = true">温馨提示</div>
    <div @click="toTop"><img :src="button" /></div>
    <van-popup v-model="showChoiceArea" position="bottom">
      <van-picker show-toolbar title="标题" :columns="areaList" @confirm="choiceArea" ref="pickarea" />
    </van-popup>
    <van-popup v-model="showPersonal" style="width: 90%; height: 70%">
      <personalAccess></personalAccess>
    </van-popup>
    <van-popup v-model="showInfo" style="width: 90%; height: 70%">
      <info></info>
    </van-popup>
    <van-popup v-model="showQuestion" style="width: 90%; height: 70%; border-radius: 15px">
      <question @closeValue="closeValue"></question> </van-popup
    ><van-popup v-model="showTips" style="width: 90%; height: 70%; border-radius: 15px">
      <tips @closeValue1="closeValue1"></tips>
    </van-popup>
  </div>
</template>

<script>
import personalAccess from './personalAccess'
import info from './info'
import question from './question'
import tips from './tips'
import { areaList } from '@/assets/js/addressCode.js'
import { pick_area } from '@/assets/js/acode.js'
import qs from 'qs'
// axios
import request from '@/utils/request'
// user api
export default {
  name: 'LingKa',
  components: {
    personalAccess,
    info,
    question,
    tips
  },
  data() {
    return {
      top: require('@/assets/images/lingka/top.png'),
      middle: require('@/assets/images/lingka/middle.png'),
      bottom: require('@/assets/images/lingka/bottom.png'),
      laba: require('@/assets/images/lingka/laba.png'),
      choose: require('@/assets/images/lingka/choose.png'),
      zhu: require('@/assets/images/lingka/zhu.png'),
      head: require('@/assets/images/lingka/head.png'),
      button: require('@/assets/images/lingka/button.gif'),
      searchNum: '', // 搜索的数字
      chooseNumber: '', // 选中的电话号码
      nameValue: '', // 姓名
      telValue: '', // 电话号码
      individualValue: '', // 身份证号码
      cascaderValue: '', // 选中省市区
      detailareaValue: '', // 详细地址
      docChecked: true,
      checkName: false,
      checkTel: false,
      showChoiceArea: false,
      defaultAreaCode: '',
      areaList: pick_area,
      areaList1: [],
      zfb_address: true,
      disable_submit: false,
      showPersonal: false,
      showInfo: false,
      showQuestion: false,
      showTips: false,
      area: '',
      list: [
        { mdn: 19938330130, feature: '爱情靓号' },
        { mdn: 19938330130, feature: '爱情靓号' },
        { mdn: 19938330130, feature: '爱情靓号' },
        { mdn: 19938330130, feature: '爱情靓号' },
        { mdn: 19938330130, feature: '爱情靓号' },
        { mdn: 19938330130, feature: '爱情靓号' },
        { mdn: 19938330130, feature: '爱情靓号' },
        { mdn: 19938330130, feature: '爱情靓号' },
        { mdn: 19938330130, feature: '爱情靓号' }
      ]
    }
  },
  created() {
    console.log(pick_area)
    // if (areaList.city_list[parseInt(returnCitySN['cid'])] === undefined) {
    //     this.area =
    //         areaList.province_list[returnCitySN['cid'].slice(0, 2) + '0000'] +
    //         ' ' +
    //         areaList.city_list[parseInt(returnCitySN['cid']) + 100]
    //     this.codeList.push({
    //         code: returnCitySN['cid'].slice(0, 2) + '0000',
    //         name: areaList.province_list[returnCitySN['cid'].slice(0, 2) + '0000']
    //     })
    //     this.codeList.push({
    //         code: parseInt(returnCitySN['cid']) + 100 + '',
    //         name: areaList.city_list[parseInt(returnCitySN['cid']) + 100]
    //     })
    //     console.log(this.codeList)
    // } else if (areaList.city_list[returnCitySN['cid']] === undefined) {
    //     this.area =
    //         areaList.province_list[returnCitySN['cid'].slice(0, 2) + '0000'] +
    //         ' ' +
    //         areaList.city_list[parseInt(returnCitySN['cid'])]
    //     this.codeList = [
    //         {
    //         code: returnCitySN['cid'].slice(0, 2) + '0000',
    //         name: areaList.province_list[parseInt(returnCitySN['cid'].slice(0, 2) + '0000')]
    //         },
    //         {
    //         code: returnCitySN['cid'],
    //         name: areaList.city_list[parseInt(returnCitySN['cid'])]
    //         }
    //     ]
    // } else {

    // }
    this.requireData({
      page: 1,
      pagesize: 9,
      keyword: this.searchNum,
      sohuip: returnCitySN
      // area: this.area
    })
  },
  mounted() {
    // 此处true需要加上，不加滚动事件可能绑定不成功
    window.addEventListener('scroll', this.handleScroll, true)
  },
  watch: {
    nameValue(newvalue, oldvalue) {
      var isName = /^[\u4e00-\u9fa5]{2,4}$/.test(newvalue)
      if (!isName) {
        this.checkName = false
      } else {
        this.checkName = true
      }
    },
    telValue(newValue, oldValue) {
      var isMob = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(newValue)
      if (!isMob) {
        this.checkTel = false
      } else {
        this.checkTel = true
      }
    }
  },
  methods: {
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
            // this.isLastPage = res.data.next_page
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
    searchNumber() {
      this.requireData({
        page: 1,
        pagesize: 9,
        keyword: this.searchNum,
        sohuip: returnCitySN
        // area: this.area
      })
    },
    // checkboxClicked(){

    //     this.docChecked = !this.docChecked;
    // },
    chooseItemNum(obj) {
      this.chooseNumber = obj.mdn
    },
    showAreaBox() {
      if (typeof call_address === 'function') {
        if (this.zfb_address === true) {
          this.zfb_address = false
          call_address(res => {
            // alert(JSON.stringify(res))
            // console.log(res)
            if (res.status === 1) {
              this.setAddress(res.data)
            }
          })
          return
        }
      }
      this.showChoiceArea = true
    },
    setAddress(data) {
      this.detailareaValue = data.address
      var county_arr = this.searchValue(areaList.county_list, data.area)
      if (county_arr.length === 1) {
        this.defaultAreaCode = county_arr[0]
      }
      if (county_arr.length > 1) {
        for (let i = 0; i < county_arr.length; i++) {
          var element = areaList.city_list[(county_arr[i] + '').slice(0, 4) + '00']
          if (data.city === element) {
            console.log(county_arr[i])
            this.defaultAreaCode = county_arr[i] + ''
            break
          }
        }
      }
      var new_arr = []
      new_arr.push({
        code: this.defaultAreaCode.slice(0, 2) + '' + '0000',
        name: areaList.province_list[parseInt(this.defaultAreaCode.slice(0, 2) + '' + '0000')]
      })
      new_arr.push({
        code: this.defaultAreaCode.slice(0, 4) + '' + '00',
        name: areaList.city_list[parseInt(this.defaultAreaCode.slice(0, 4) + '' + '00')]
      })
      new_arr.push({
        code: this.defaultAreaCode,
        name: areaList.county_list[parseInt(this.defaultAreaCode)]
      })
      console.log(new_arr)
      this.choiceArea(new_arr)
    },
    searchValue(object, value) {
      var adw = []
      for (var key in object) {
        if (object[key] === value) {
          adw.push(key)
        }
      }
      return adw
    },
    choiceArea(arr) {
      var arr2 = this.$refs.pickarea.getValues()
      var carr = []
      for (var i = 0; i < arr2.length; i++) {
        carr.push({
          name: arr2[i].text,
          code: arr2[i].value
        })
      }
      // console.log(this.$refs.pickarea.getValues())
      this.areaList1 = carr
      this.cascaderValue = ''
      for (var i = 0; i < arr2.length; i++) {
        var a = arr2[i].text
        if (a !== this.cascaderValue) {
          this.cascaderValue = this.cascaderValue + ' ' + a
        }
      }
      this.showChoiceArea = false
    },
    submit() {
      var isIndividual = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/.test(
        this.individualValue
      )
      if (this.chooseNumber === '') {
        this.$toast({
          message: '请选取想要的电话号码'
        })
        return
      } else if (!this.checkName) {
        this.$toast({
          message: '请输入名字'
        })
        return
      } else if (!this.checkTel) {
        this.$toast({
          message: '请输入电话号码'
        })
        return
      } else if (!isIndividual) {
        this.$toast({
          message: '请输入正确的身份证号'
        })
        return
      } else if (this.cascaderValue === '' || this.detailareaValue === '') {
        this.$toast({
          message: '请输入正确的地址'
        })
        return
      } else if (!this.docChecked) {
        this.$toast({
          message: '请选取协议'
        })
        return
      }
      if (this.disable_submit === false) {
        this.disable_submit = true
        if (typeof call_pay === 'function' && this.need_pay === true) {
          call_pay(1, res => {
            // alert(JSON.stringify(res))
            if (res.status === 1) {
              this.submit_order()
            } else {
              this.$toast({
                message: res.message
              })
              this.disable_submit = false
            }
          })
        } else {
          this.submit_order()
        }
      }
    },
    submit_order() {
      var Data = {
        name: this.nameValue,
        idcard: this.individualValue,
        mobile: this.telValue,
        address: this.detailareaValue,
        area: this.areaList1,
        sel_phone: this.chooseNumber
      }
      request({
        url: 'webview/submit',
        method: 'post',
        // params: qs.stringify(a),
        data: Data,
        hideloading: true // 隐藏 loading 组件
      })
        .then(res => {
          if (res.errcode === 0) {
            this.disable_submit = false
            this.$toast({
              message: '提交成功'
            })
            this.disable_submit = false
          } else {
            this.$toast({
              message: res.message
            })
            this.disable_submit = false
          }
        })
        .catch(() => {
          console.log(22)
        })
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
    },
    closeValue(val) {
      this.showQuestion = val
    },
    closeValue1(val) {
      this.showTips = val
    }
  }
}
</script>

<style lang="scss" scoped>
.ling-ka {
  background-color: #f73955;
  img {
    width: 100%;
    vertical-align: middle;
  }
  .form {
    background-color: #f73955;
    .swipe {
      font-size: 14px;
      height: 40px;
      width: 80%;
      border: 2px solid #fff5ba;
      border-radius: 20px;
      margin: 15px auto 0px;
      img {
        width: 20px;
        height: 20px;
      }
      .my-swipe {
        height: 40px;
        .van-swipe-item {
          color: #fff;
          font-size: 14px;
          line-height: 40px;
          text-align: center;
          // background-color: #39a9ed;
        }
      }
    }
    .choose {
      width: 68%;
      margin: 10px auto 0;
    }
    .search-list {
      width: 100%;
      height: auto;
      margin-top: -22px;
      .content-div {
        width: 92%;
        height: auto;
        border-radius: 15px;
        border: 3px solid #fff5ba;
        border-image: linear-gradient(#f4c86f, #fff5ba, #f4c86f) 20 20;
        margin: 0 auto 0;
        .search-input {
          width: 100%;
          height: 46px;
          padding-top: 10px;
          margin-top: 20px;
          .car-search {
            width: 64%;
            height: 40px;
            float: left;
            margin-left: 4%;
            border-radius: 15px;
            background-color: #fff;
            .search-button {
              width: 26%;
              height: 30px;
              line-height: 30px;
              float: right;
              text-align: center;
              margin: 5px 7px 5px 0;
              background-color: #e7ddec;
              border-radius: 5px;
              color: #b801fb;
              font-size: 12px;
            }
            .search-text {
              width: 70%;
              height: 35px;
              line-height: 40px;
              float: left;
              input {
                width: 100%;
                height: 100%;
                font-size: 12px;
                border-radius: 18px;
                padding: 4px 5px;
                text-indent: 10px;
                border: none;
                box-sizing: border-box;
              }
            }
          }
          .next-button {
            background-color: #ffeb92;
            border: 2px solid #fe4b04;
            width: 28%;
            text-align: center;
            height: 36px;
            line-height: 38px;
            font-size: 16px;
            border-radius: 18px;
            cursor: pointer;
            float: right;
            margin-right: 2%;
            color: #000;
          }
        }
      }
      .hot-search {
        width: 100%;
        margin: 16px auto 4px;
        img {
          margin: 0 auto;
        }
      }
      .card-list {
        width: 96%;
        margin: 0 auto 40px;
        min-height: 168px;
        /deep/ .van-grid-item__content {
          padding: 0;
          height: 40px;
          margin: 5px 0;
          color: #000;
          line-height: 20px;
          background-color: #fff;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
          padding: 6px 0;
          box-shadow: 1px -1px 6px 1px #888 inset;
          height: 40px;
          box-sizing: content-box;
          margin-right: 0.5%;
          font-size: 14px;
        }
        .text {
          color: #e2350d;
        }
      }
    }
    .form-list {
      margin-top: -30px;
      > img {
        width: 86%;
        margin: 0 7%;
      }
      .banner {
        margin-top: -28px;
        > div {
          margin: 0 auto;
          .banner-inner {
            border: 3px solid #fea811;
            border-radius: 15px;
            margin: 0 8%;
            background: #fff;
            padding-top: 20px;
            .banner-form {
              margin: 0;
              overflow: hidden;
              padding: 10px 15px;
              .banner-border {
                margin-top: 0;
                margin-bottom: 10px;
                border-bottom: 2px solid #fda811;
                line-height: 36px;
                background-color: #fff;
                border-radius: 0;
                display: flex;
                align-items: center;
                .banner-text {
                  font-size: 14px;
                  color: #141744;
                  width: 30%;
                  padding-left: 8px;
                  > span {
                    color: #e10012;
                    font-weight: 700;
                  }
                }
                .banner-text2 {
                  font-size: 14px;
                  color: #7b798f;
                  width: 69%;
                  overflow: hidden;
                  .banner_input {
                    border: 0;
                    background: none;
                    width: 100%;
                  }
                }
              }
            }
            .formbox-btm {
              padding: 10px;
              position: relative;
              /deep/ .van-checkbox {
                position: absolute;
              }
              .btm-text {
                padding-left: 20px;
              }
              .policy-name {
                font-size: 12px;
                margin-left: 5px;
                margin-top: 10px;
                color: #000;
              }
            }
            .button-btm {
              width: 100%;
              text-align: center;
              padding: 10px 0;
            }
          }
        }
      }
    }
  }
  .question-tips {
    color: #ffa3b6;
    width: 50%;
    height: 50px;
    float: left;
    line-height: 50px;
    font-size: 26px;
    font-weight: 700;
    text-align: center;
  }
}
</style>
