<!-- 电信星卡-填写表单 -->

<template>
  <div style="background-color: #f4f4f4">
    <div class="fill-form-box">
      <!-- <img src="../../assets/images/chuangyuan_nosel/4.gif" /> -->

      <!-- 表单部分 -->

      <div class="form-box-content">
        <div class="box-content-item">
          <span>收卡人姓名：</span>

          <input placeholder="请填写真实姓名（已加密）" v-model="nameValue" />
        </div>

        <div class="box-content-item" @click="TelCallAddress">
          <span>联系电话：</span>

          <input placeholder="客服将确认订单请保持畅通（已加密）" v-model="telValue" />
        </div>

        <div class="box-content-item box-content-adderess" @click="callAddress" v-show="checkTel && checkName">
          <span>收货地址：</span>

          <input readonly placeholder="请选择省市区（已加密）" v-model="cascaderValue" />

          <label>选择</label>
        </div>

        <div class="box-content-item" v-show="checkTel && checkName">
          <span>详细地址：</span>

          <input placeholder="请输入**街道门牌号**小区**层**房号（已加密）" v-model="detailareaValue" />
        </div>

        <div class="box-content-item" v-show="checkTel && checkName && checkAddress">
          <span>身份证号：</span>

          <input placeholder="请输入身份证号码（已加密）" v-model="individualValue" />
        </div>

        <button class="sb-btn" @click="submit">免费领卡</button>

        <div class="box-content-item form-box-doc" v-if="showPrivacyBox">
          <van-checkbox v-model="docChecked" @click="checkboxClicked" checked-color="#a3783f"></van-checkbox>

          <div class="form-box-doc-link">
            <p>
              提交已视为阅读并同意
              <span @click="showXY">《个人信息授权与保护声明》</span>
            </p>
          </div>
        </div>
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

    <div
      style="
        background-color: white;
        font-size: 0.5rem;
        font-weight: bold;
        text-align: center;
        margin-top: 0.4rem;
        padding: 0.5rem;
        border-bottom: solid 1px #c8c8c8;
      "
    >
      成交记录
    </div>

    <div class="pingDiv" style="margin-top: 0rem">
      <div style="width: 90%; margin: auto">
        <div style="width: 100%; height: 12.5rem; overflow: hidden">
          <div class="Pinei" style="margin-top: 0rem">
            <vue-seamless-scroll class="warp" :data="pneiDList">
              <div id="autoscroll">
                <div class="pneiD" v-for="(pd, index) in pneiDList" :key="index">
                  <img :src="pd.img" style="border-radius: 50%; width: 1rem" />

                  <p style="color: #000000; font-size: 0.4rem; padding-left: 0.4rem; text-align: left">
                    {{ pd.name }}
                    <br />

                    <span style="color: #8a8a8a">{{ pd.desc }}</span>
                  </p>
                </div>
              </div>
            </vue-seamless-scroll>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { areaList } from '@/assets/js/addressCode.js'
import privacyDoc from './privacyDoc'
import surfNetDoc from './surfNetDoc'
// axios
import request from '@/utils/request'
// user api
export default {
  name: 'FillFormNoSel',
  components: {
    privacyDoc,
    surfNetDoc
  },
  data() {
    return {
      showPrivacyBox: true,
      docChecked: true,
      show: false,
      areaList: areaList, // 选择地址的地址数据
      checkName: false,
      checkAddress: false,
      checkTel: false,
      nameValue: '', // 姓名
      telValue: '', // 电话
      individualValue: '', // 身份证号码
      cascaderValue: '', // 省市区
      detailareaValue: '', // 详细地址
      areaList1: [],
      showNumber: 0,
      zfb_address: true,
      need_pay: false,
      price: 1,
      showPrivacy: false,
      showSur: false,
      defaultAreaCode: '',
      disable_submit: false,
      chooseNum: '',
      numAddress: '',
      verifCode: '',
      a_oId: '',
      t_id: '',
      t_type: '',
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
      ]
    }
  },
  mounted() {
    // 此处true需要加上，不加滚动事件可能绑定不成功
    window.addEventListener('scroll', this.handleScroll, true)
    this.a_oId = localStorage.getItem('a_oId')
    this.t_id = localStorage.getItem('t_id')
    this.t_type = localStorage.getItem('t_type')
  },
  watch: {
    nameValue(newvalue, oldvalue) {
      var isName = /^[\u4e00-\u9fa5]{2,4}$/.test(newvalue.trim())
      if (!isName) {
        this.checkName = false
      } else {
        this.checkName = true
      }
    },
    telValue(newValue, oldValue) {
      var isMob = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(newValue.trim())
      if (!isMob) {
        this.checkTel = false
      } else {
        this.checkTel = true
      }
    },
    detailareaValue(newValue, oldValue) {
      var isDetailarea = /^[\u4e00-\u9fa5|a-z|A-Z|0-9|\ ]{2,40}$/.test(newValue.trim())
      if (!isDetailarea) {
        this.checkAddress = false
      } else {
        this.checkAddress = true
      }
    }
  },
  created() {
    this.need_pay = process.env.VUE_APP_NEED_PAY
    this.price = process.env.VUE_APP_PRICE
    // console.log(this.need_pay)
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
      var isIndividual =
        /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/.test(
          this.individualValue.trim()
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
      } else if (this.cascaderValue === '' || this.detailareaValue === '') {
        this.$toast({
          message: '请输入正确的地址'
        })
        return
      } else if (!isIndividual) {
        this.$toast({
          message: '请输入正确的身份证号'
        })
        return
      } else if (!this.docChecked) {
        this.$toast({
          message: '请勾选下方协议和隐私政策'
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
              this.$toast({
                message: '订单提交成功',
                onClose: () => {
                  this.$router.push({ name: 'success' })
                }
              })
              this.$router.push({ name: 'success' })
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
        name: this.nameValue.trim(),
        idcard: this.individualValue.trim(),
        mobile: this.telValue.trim(),
        address: this.detailareaValue.trim(),
        area: this.areaList1,
        sel_phone: this.chooseNum.trim(),
        smscode: this.verifCode.trim(),
        sel_phone_area: this.numAddress.trim(),
        a_oId: this.a_oId,
        t_id: this.t_id,
        t_type: this.t_type
      }
      return request({
        url: 'h5/submit',
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
.pingDiv {
  width: 100%;
  padding: 0.2rem 0;
  background: #ffffff;
  // margin: auto;
  // border-radius: 0.5rem;
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
.fill-form-box {
  margin: 18px 0px 0 0px;
  // border-radius: 15px;
  background: #fff;
  width: 100%;
  img {
    width: 317.5px;
    // height: 71.984px;
  }
  .box-content-item {
    margin: 0 10px 0 30px;
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
        font-size: 10px;
        span {
          color: #a3783f;
        }
      }
    }
  }
  .box-content-btn {
    margin-top: 5px;
    margin-bottom: 25px;
    width: 90%;
    // height: 47.281px;
    text-align: center;
  }
  .sb-btn {
    color: white;
    background-color: #e7172b;
    border-radius: 0.08rem;
    border: none;
    width: 95%;
    padding: 0.2rem 0;
    font-size: 0.6rem;
    margin-bottom: 0.6rem;
    margin-top: 0.2rem;
  }
}
</style>
