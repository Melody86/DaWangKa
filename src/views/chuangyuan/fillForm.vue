<!-- 电信星卡-填写表单 -->
<template>
  <div class="infoFixed">
    <div class="close_infoFixed"><img :src="closeImg" alt="" /></div>
    <p class="info_text">
      已选择<span>靓号{{ chooseNum || '' }} </span>{{ numAddress }}
    </p>
    <p class="info_text2">根据国家手机号卡实名要求，请如实填写以下信息，以便我们及时为您送达。</p>
    <div class="info_write_info">
      <div>收货地址</div>
      <ul>
        <li class="border_none area_error input_text" id="areaInfo" @click="showAreaBox()">
          <div class="arr-DIV">
            <div class="fl tel_left">所在地区</div>
            <div>{{ cascaderValue || '请选择区/县' }}</div>
          </div>
          <img :src="pathImg" alt="" />
        </li>
        <li class="border_none tel_error address_detail_fill">
          <div class="info_mid">
            <input
              type="text"
              placeholder="请输入详细地址（*街道*门牌号*小区）"
              v-model="detailareaValue"
              maxlength="50"
              id="addreInfo"
            />
          </div>
          <img :src="helpImg" alt="" />
        </li>
      </ul>
    </div>
    <div class="info_write_info" id="info_fill">
      <div>收货人信息</div>
      <ul>
        <li class="border_none tel_error">
          <div class="fl info_left">联系电话</div>
          <div class="info_mid">
            <input
              class="tel-info"
              type="tel"
              maxlength="11"
              placeholder="请输入联系电话，并保持畅通"
              v-model="telValue"
              id="telInfo"
            />
          </div>
          <div class="clear"></div>
        </li>
        <li class="border_none tel_error" v-if="need_sms_code">
          <div class="fl info_left">验证码</div>
          <div class="info_mid tel-info-box">
            <input
              class="tel-info"
              type="number"
              maxlength="11"
              placeholder="请输入短信验证码"
              v-model="verifCode"
              id="verifCode"
            />
            <van-button class="verif-code" type="primary" @click="getCode" :disabled="verifCodeDisab">
              <span v-if="!verifCodeDisab">请输入验证</span>
              <span v-else>{{ count + 'S' }}</span>
            </van-button>
          </div>
          <div class="clear"></div>
        </li>
        <li class="border_none name_error" style="border-radius: 0.25rem 0.25rem 0 0">
          <div class="fl info_left">姓名</div>
          <div class="info_mid">
            <input type="text" placeholder="请输入姓名（已加密）" v-model="nameValue" id="nameInfo" maxlength="6" />
          </div>
        </li>
        <li class="border_none id_error" v-show="checkName && checkTel">
          <div class="fl info_left">身份证号</div>
          <div class="info_mid">
            <input
              type="text"
              maxlength="18"
              placeholder="请输入身份证号(已加密)"
              v-model="individualValue"
              id="idCardInfo"
            />
          </div>
        </li>
      </ul>
    </div>
    <div class="content_btn btnTj scale_div" @click="submit" id="tj_submit">0元领取，包邮到家</div>
    <p class="info_text2">
      本活动为阶段性优惠活动，发布数量有限，请保持联系号码畅通，我们可能随时与您联系，电话无人接听或恶意下单，将不予发货。
    </p>
    <p class="info_text2" style="margin-top: 10px">您的个人信息将受到保护，仅用于此次信息填写</p>
    <van-popup v-model="showChoiceArea" position="bottom">
      <van-area title="" :area-list="areaList" :value="defaultAreaCode" @confirm="choiceArea" />
    </van-popup>
  </div>
</template>

<script>
import { areaList } from '@/assets/js/addressCode.js'
import qs from 'qs'
import _ from 'lodash'
// axios
import request from '@/utils/request'
// user api
export default {
  name: 'FillForm',
  props: {
    chooseNum: String,
    numAddress: String,
    area: Array
  },
  data() {
    return {
      show: false,
      countyList: {}, // 选择地址的地址数据
      checkName: false,
      checkTel: false,
      nameValue: '', // 姓名
      telValue: '', // 电话
      individualValue: '', // 身份证号码
      cascaderValue: '', // 省市区
      detailareaValue: '', // 详细地址
      showChoiceArea: false,
      closeImg: require('@/assets/images/dawang/index29_1/cancel2.png'),
      helpImg: require('@/assets/images/dawang/index29_1/help.png'),
      pathImg: require('@/assets/images/dawang/index29_1/path.png'),
      obj: '',
      areaList: areaList,
      defaultAreaCode: '',
      areaList1: [],
      verifCodeDisab: false, // 是否禁用按钮
      verifCode: '',
      timer: null,
      count: 60,
      need_sms_code: false,
      disable_submit: false,
      zfb_address: true,
      need_pay: false,
      price: 1
    }
  },
  components: {},
  created() {
    this.need_pay = process.env.VUE_APP_NEED_PAY
    this.price = process.env.VUE_APP_PRICE
    if (this.area[1]) {
      this.defaultAreaCode = this.area[1].code
    }
  },
  mounted() {},
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
  mounted() {},
  methods: {
    showAreaBox() {
      // this.setAddress({
      //   address: '黄龙国际 不放自提柜 送到家 送到家 送到家 送到家',
      //   country: '中国',
      //   prov: '浙江省',
      //   city: '柳州市',
      //   area: '高新区',
      //   street: '西溪路',
      //   fullname: 'xxx',
      //   mobilePhone: '158***5632'
      // })
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

      // this.defaultAreaCode = '530800'
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
      this.areaList1 = arr
      this.show = false
      this.cascaderValue = ''
      for (var i = 0; i < arr.length; i++) {
        var a = arr[i].name
        if (a != this.cascaderValue) {
          this.cascaderValue = this.cascaderValue + ' ' + a
        }
      }
      this.showChoiceArea = false
    },
    submit() {
      var isIndividual = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/.test(
        this.individualValue
      )
      if (!this.checkName) {
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
      } else if (!/^[0-9]*$/.test(Number(this.verifCode))) {
        this.$toast({
          message: '请输入正确的验证码'
        })
        return
      }
      if (this.disable_submit === false) {
        this.disable_submit = true

        if (typeof call_pay === 'function' && this.need_pay === 'true') {
          console.log(this.price)
          call_pay(this.price, res => {
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
        sel_phone: this.chooseNum,
        smscode: this.verifCode,
        sel_phone_area: this.numAddress
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
            if (typeof navigateTo === 'function' && 'true' == process.env.VUE_APP_NAVTO) {
              navigateTo(process.env.VUE_APP_NAVTO_PATH)
            }
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
    getCode() {
      if (!this.checkTel) {
        this.$toast({
          message: '请输入电话号码'
        })
        return
      }
      this.verifCodeDisab = true
      const TIME_COUNT = 60
      if (!this.timer) {
        this.count = TIME_COUNT
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--
          } else {
            this.verifCodeDisab = false
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
      request({
        url: 'sendcode',
        method: 'post',
        params: { phone: this.telValue },
        hideloading: true // 隐藏 loading 组件
      })
        .then(res => {
          this.$toast({
            message: '已发送，请注意查收！'
          })
        })
        .catch(() => {
          console.log(22)
        })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
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
.infoFixed {
  width: 100%;
  height: 100%;
  position: relative;
  bottom: 0;
  left: 0;
  background: white;
  z-index: 100;
  background-color: #f7f8fa;
  overflow: scroll;
  // display: none;
  font-size: 14px;
}

.infoFixed .close_infoFixed {
  position: absolute;
  top: 0.2rem;
  right: 0.2rem;
  width: 2rem;
  height: 2rem;
}

.infoFixed .close_infoFixed > img {
  width: 46px;
  height: 46px;
}

.infoFixed .info_text {
  display: flex;
  font-size: 0.6rem;
  display: flex;
  color: #6e6e6e;
  align-items: center;
  padding: 20px 20px 10px 20px;
  font-size: 14px;
  margin: 0;
}

.infoFixed .info_text > span {
  font-size: 0.7rem;
  color: #fc1d3a;
  font-size: 16px;
}

.infoFixed .info_text2 {
  font-size: 14px;
  color: #6e6e6e;
  padding: 0px 20px;
  text-align: left;
}

.info_write_info {
  margin-top: 10px;
}

.info_write_info > div:nth-of-type(1) {
  width: 90%;
  height: 35px;
  border-radius: 9px;
  background-image: -webkit-gradient(linear, left top, right top, from(#4a6dfe), to(#3ff29d));
  background-image: linear-gradient(90deg, #4a6dfe, #3ff29d);
  line-height: 35px;
  font-size: 16px;
  text-align: left;
  color: #fff;
  padding-left: 46px;
  margin: 20px auto;
  box-sizing: border-box;
}

.info_write_info ul {
  width: 100%;
}

.info_write_info ul li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
  background-color: #fff;
  margin-bottom: 1px;
  line-height: 42px;
}

.info_write_info ul .arr-DIV {
  width: 90%;
  display: flex;
  justify-content: right;
}

.info_write_info ul img {
  width: 18px;
  height: 18px;
}

.info_write_info ul .tel_left {
  color: #323233;
  font-size: 14px;
}

.info_write_info ul .info_mid {
  width: 80%;
  input {
    border: none;
    display: block;
    width: 100%;
  }
}

.tel-info-box {
  position: relative;
  .tel-info {
    padding-right: 20px;
  }
  .verif-code {
    position: absolute;
    top: 50%;
    right: 0;
    height: 30px;
    width: 100px;
    font-size: 12px;
    transform: translateY(-50%);
  }
}

.info_write_info ul .fl {
  width: 30%;
  text-align: left;
}

.infoFixed .content_btn {
  color: white;
  width: 80%;
  height: 46px;
  background: #fe4365;
  border-color: #fe4365;
  line-height: 46px;
  text-align: center;
  font-size: 18px;
  border-radius: 9px;
  margin: 30px auto;
  animation: warn 2s ease-in;
  -webkit-animation: warn 2s ease-in;
  -moz-animation: warn 2s ease-in;
  /*规定动画无限次播放*/
  -webkit-animation-iteration-count: infinite;
  -moz-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
}
</style>

