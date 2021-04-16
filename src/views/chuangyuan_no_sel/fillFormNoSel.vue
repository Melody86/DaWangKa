<!-- 电信星卡-填写表单 -->
<template>
  <div class="fill-form-box">
    <img src="../../assets/images/yidong/form_top.png" />

    <!-- 表单部分 -->
    <div class="form-box-content">
      <div class="box-content-item">
        <span>收卡人姓名：</span><input placeholder="请填写真实姓名（已加密）" v-model="nameValue" />
      </div>
      <div class="box-content-item" v-show="checkName">
        <span>身份证号：</span><input placeholder="请输入身份证号码（已加密）" v-model="individualValue" />
      </div>
      <div class="box-content-item" @click="TelCallAddress">
        <span>联系电话：</span><input placeholder="客服将确认订单请保持畅通（已加密）" v-model="telValue" />
      </div>
      <div class="box-content-item box-content-adderess" @click="callAddress">
        <span>收货地址：</span><input readonly placeholder="请选择省市区（已加密）" v-model="cascaderValue" />
        <label>选择</label>
      </div>
      <div class="box-content-item">
        <span>详细地址：</span><input placeholder="请填写详细街道、小区信息（已加密）" v-model="detailareaValue" />
      </div>

      <div class="box-content-item form-box-doc" v-if="showPrivacyBox">
        <van-checkbox v-model="docChecked" @click="checkboxClicked" checked-color="#a3783f"></van-checkbox>
        <div class="form-box-doc-link">
          <p>我已阅读并同意<span @click="showXY">《客户入网服务协议》</span></p>
          <p>和<span @click="showGG">《关于客户个人信息收集使用规则公告》</span></p>
        </div>
      </div>
      <img class="box-content-btn" src="../../assets/images/yidong/form_bottom.gif" @click="submit" />
    </div>

    <!-- 地区选择部分 -->
    <van-popup v-model="show" round position="bottom">
      <van-area
        title=""
        :area-list="areaList"
        :value="defaultAreaCode"
        @confirm="choiceArea"
        visible-item-count="10"
        @cancel="cancelAreaSel"
      />
    </van-popup>
    <van-popup v-model="showPrivacy" style="width: 90%; height: 70%">
      <privacyDoc></privacyDoc>
    </van-popup>
    <van-popup v-model="showSur" style="width: 90%; height: 70%">
      <surfNetDoc></surfNetDoc>
    </van-popup>
  </div>
</template>

<script>
import { areaList } from '@/assets/js/addressCode.js'
import privacyDoc from './privacyDoc'
import surfNetDoc from './surfNetDoc'
import qs from 'qs'
// axios
import request from '@/utils/request'
// user api
export default {
  name: 'fillFormNoSel',
  components: {
    privacyDoc,
    surfNetDoc
  },
  data() {
    return {
      showPrivacyBox: false,
      docChecked: false,
      show: false,
      areaList: areaList, //选择地址的地址数据
      checkName: false,
      checkTel: false,
      nameValue: '', //姓名
      telValue: '', //电话
      individualValue: '', //身份证号码
      cascaderValue: '', //省市区
      detailareaValue: '', //详细地址
      areaList1: [],
      showNumber: 0,
      zfb_address: true,
      need_pay: false,
      price: 1,
      showPrivacy: false,
      showSur: false,
      defaultAreaCode: '',
      disable_submit: false
    }
  },
  components: {},
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
  mounted() {},
  created() {
    this.need_pay = process.env.VUE_APP_NEED_PAY
    this.price = process.env.VUE_APP_PRICE
    console.log(this.need_pay)
    // if (this.area[1]) {
    //   this.defaultAreaCode = this.area[1].code
    // }
  },
  methods: {
    showXY() {
      this.showPrivacy = true
    },
    showGG() {
      this.showSur = true
    },
    cancelAreaSel() {
      this.show = false
    },
    TelCallAddress() {
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
    },

    callAddress() {
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
        } else {
          console.log(23232323)
          this.showChoiceArea()
        }
      } else {
        this.showChoiceArea()
      }
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
    showChoiceArea() {
      this.show = true
    },
    setAddress(data) {
      this.detailareaValue = data.address
      this.telValue = data.mobilePhone
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
    checkboxClicked() {
      // console.log('this.docChecked', this.docChecked);
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
      this.show = false
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
      }
      // else if (!/^[0-9]*$/.test(Number(this.verifCode))) {
      //   this.$toast({
      //     message: '请输入正确的验证码'
      //   })
      //   return
      // }
      if (this.disable_submit === false) {
        this.disable_submit = true
        this.submit_order()
          .then(res => {
            if (res.errcode === 0) {
              if (typeof call_pay === 'function' && this.need_pay === 'true') {
                console.log(this.price)
                call_pay(this.price, res => {
                  if (res.status === 1) {
                    this.$toast({
                      message: '订单提交成功'
                    })
                    if (typeof navigateTo === 'function' && 'true' == process.env.VUE_APP_NAVTO) {
                      navigateTo(process.env.VUE_APP_NAVTO_PATH)
                    }
                  } else {
                    this.$toast({
                      message: '订单支付失败'
                    })
                    this.disable_submit = false
                  }
                })
              } else {
                if (typeof navigateTo === 'function' && 'true' == process.env.VUE_APP_NAVTO) {
                  navigateTo(process.env.VUE_APP_NAVTO_PATH)
                } else {
                  this.$toast({
                    message: '订单提交成功'
                  })
                }
              }
              // this.$toast({
              //   message: '提交成功'
              // })
              // this.disable_submit = false
            } else {
              this.$toast({
                message: res.message
              })
              this.disable_submit = false
            }
          })
          .catch(err => {
            this.disable_submit = false
            this.$toast({
              message: '订单提交错误'
            })
            console.log(err)
          })
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
      return request({
        url: 'webview/submit',
        method: 'post',
        // params: qs.stringify(a),
        data: Data,
        hideloading: true // 隐藏 loading 组件
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.fill-form-box {
  margin: 18px 15px 0 15px;
  border-radius: 15px;
  background: #fff;
  width: 340px;
  img {
    width: 317.5px;
    height: 71.984px;
  }
  .box-content-item {
    padding: 0 10px 0 11px;
    width: 310px;
    height: 45px;
    color: rgb(51, 51, 51);
    border-bottom: 1px solid #e5e5e5;
    text-align: left;
    line-height: 45px;
    font-size: 14px;
    font-weight: 400;
    display: flex;
    input {
      color: black;
    }
  }
  .box-content-item input::-webkit-input-placeholder {
    /* WebKit browsers */
    color: #999;
    font-size: 12px;
  }
  .box-content-item input {
    flex: 1;
    border: none;
    background: none;
  }
  .box-content-item span {
    margin-right: 15px;
  }
  .box-content-adderess {
    position: relative;
    label {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 0.266667rem;
      height: 0.586667rem;
      line-height: 0.586667rem;
      padding: 0 0.266667rem;
      font-size: 0.32rem;
      color: #fff;
      text-align: center;
      background-color: #ddae60;
      border-radius: 0.293333rem;
      pointer-events: none;
    }
  }
  .form-box-doc {
    display: flex;
    height: 54.98px;
    border: none;
    align-items: center;
    line-height: unset;
    .form-box-doc-link {
      font-size: 12px;
      p {
        margin: 0;
        height: 18px;
        margin-left: 7.5px;
        span {
          color: #a3783f;
        }
      }
    }
  }
  .box-content-btn {
    margin-top: 5px;
    margin-bottom: 25px;
    width: 100%;
    // height: 47.281px;
    text-align: center;
  }
}
</style>

