<template>
  <div class="boxT" style="">
    <!-- 滚动消息 -->

    <form class="form_box">
      <!-- 选号 -->
      <label for="numberPhone" class="numberPhone">
        <span>
          <div style="display: inline-block;" class="xing">怎么称呼您*</div>
        </span>
        <input v-model="nameValue" type="text" placeholder="请输入" />
      </label>
      <!-- 姓名 -->
      <label for="username">
        <span>
          <div style="display: inline-block;" class="xing">您的联系方式</div>
        </span>
        <input v-model="telValue" type="text" placeholder="请输入" />
      </label>
      <!-- 联系电话 -->
      <label for="usertel">
        <span>
          <div style="display: inline-block;" class="xing">您的公司名称</div>
        </span>

        <input v-model="companyValue" type="tel" maxlength="11" placeholder="请输入手机号码（已加密）" />
      </label>

      <div class="agreement" v-if="false">
        <span style="color:#000000">我已阅读并同意</span>
        <span style="color:#1e96fa" @click="showTishiKuang = !showTishiKuang">《入网协议、个人信息收集使用公告》 </span
        ><br />
        <span style="color:#1e96fa;display: none;" id="agreement1">《个人信息收集证明》</span>
      </div>

      <div class="loginchecking" @click="submit">立即定制</div>
    </form>

    <div class="modal-bg" id="tishikuang" v-show="showTishiKuang">
      <div class="wrapper">
        <div class="modal-container" id="modal1" v-show="showTishiKuang">
          <div class="modal-header">《入网协议及隐私保护协议》</div>
          <div class="modal-main"></div>
          <div class="c_bottom">
            <div class="dialog_btn2" @click="showTishiKuang = !showTishiKuang">
              我已阅读
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-bg" v-if="disable_submit">
      <div class="topLevel ">
        <div class="loading-box">
          <div class="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div>订单提交中 请耐心等待</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { areaList } from '@/assets/js/addressCode.js'
import qs from 'qs'
import _ from 'lodash'
import request from '@/utils/request'
export default {
  props: {
    // chooseNum: String,
    numAddress: String,
    area: Array
  },
  data() {
    return {
      companyValue: '',
      chooseNum: '',
      chooseValue: '',
      numberId: '',
      nameValue: '', // 姓名
      telValue: '', // 电话
      individualValue: '', // 身份证号码
      cascaderValue: '', // 省市区
      detailareaValue: '', // 详细地址
      showTishiKuang: false,
      areaList: areaList,
      showChoiceArea: false,
      defaultAreaCode: '',
      showNewTan: false,
      haoList: [],
      checkName: true,
      checkTel: false,
      disable_submit: false,
      inputValue: ''
    }
  },
  watch: {},
  mounted() {},
  methods: {
    showTan() {
      this.showNewTan = true
      this.onSearch()
    },

    ch_num(num) {
      this.chooseNum = num.number
      this.numberId = num.numberId
    },
    ch_num_final() {
      this.showNewTan = false
    },

    submit() {
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
                  this.$toast({
                    message: '订单提交成功'
                  })
                  this.disable_submit = false
                  navigateTo(process.env.VUE_APP_NAVTO_PATH)
                } else {
                  this.$toast({
                    message: '订单提交成功'
                  })
                }
              }

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
        company: this.companyValue,
        mobile: this.telValue,
        choose: this.chooseValue
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
.boxT {
  font-size: 1rem;
  position: relative;
  width: 96%;
  border-radius: 8px;
  margin: auto;
  padding-top: 0px;
  padding-bottom: 12px;
  .history {
    height: 2.5rem;
  }
  .form_box {
    width: 98%;
    margin: 0 auto;
    font-size: 20px;
    border: 3px solid #81511c;
    border-radius: 20px;
    padding: 9px 0;
    margin-top: 10px;
    box-sizing: border-box;
    width: 95%;
    margin: 1rem 3%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    background: #ffffff;

    label {
      box-sizing: border-box;
      font-size: 0.4rem;
      width: 95%;
      padding: 0.2rem 0.3rem;
      border-radius: 2rem;
      background: #f1f4f9;
      color: #8f8f8f;
      display: flex;
      position: relative;
      margin-bottom: 0.2rem;
      font-family: 黑体;
      display: flex;
      span {
        color: #313131;
        width: 2rem;
        font-weight: 600;
        display: inline-block;
      }
      input {
        /* flex: 0.5; */
        border: none;
        width: 76%;
        margin-left: 3%;
        font-size: inherit;
        color: #313131;
        background: #f1f4f9;
      }
    }
  }
  .agreement {
    width: 100%;
    text-align: start;
    margin-left: 42px;
    margin-top: 12px;
    font-size: 0.3rem;
  }
  .loginchecking {
    margin: 10px 5% 0px;
    font-size: 0.6rem;
    width: 92%;
    border: 0;
    height: 0.2rem;
    line-height: 0.2rem;
    margin: 0.5rem 5% 0.5rem;
    padding: 0.8rem 0;
    border-radius: 2rem;
    text-align: center;
    font-family: '思源黑体';
    font-weight: 600;
    color: #ffffff;
    background: url(../../assets/images/banner14.png) no-repeat center;
    background-size: 100% 100%;
    animation: btn 1s ease-in-out 0s infinite;
    animation: breath-kf 1s ease 0s infinite normal none running;
    -webkit-animation: breath-kf 1s ease 0s infinite normal none running;
  }
  .newTan {
    font-size: 0.5rem;
    height: 812px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 9;
    .newBox {
      top: 40%;
      width: 83%;
      padding: 0.2rem;
      border-radius: 0.2rem;
      position: absolute;
      top: 50%;
      left: 50%;
      background-color: #36364e;
      transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
      -webkit-transform: translate(-50%, -50%);
      -o-transform: translate(-50%, -50%);
      .waiBox {
        width: 100%;
        margin: auto;
        margin-top: -34px;
        .soDiv {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .huanList {
            display: inline-block;
            background: linear-gradient(-90deg, #f8d9ad, #e9b87a);
            padding: 0.2rem 0.5rem;
            border-radius: 0.5rem;
            font-weight: bold;
            // font-size: 1.1rem;
            color: #22222e;
          }
          .juz {
            width: 60%;
            padding: 0 10px;
            border-radius: 40px;
            height: 38px;
            border: 1px solid #e9b87a;
            display: flex;
            align-items: center;
            position: relative;
            z-index: 9;
            .searchNumber {
              font-size: 0.34rem;
              border: none;
              margin-left: 6px;
              width: 86%;
              height: 90%;
              line-height: 90%;
              background-color: #36364e;
              color: #ffffff;
            }
          }
        }
        .haoDiv {
          width: 96%;
          margin: auto;
          margin-top: 0.4rem;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          .haoNei {
            width: 47%;
            height: 1rem;
            border-radius: 0.8rem;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 2px solid #474b62;
            font-size: 0.4rem;
            color: #dcdddf;
            margin-bottom: 0.2rem;
          }
          .xuanBorder {
            color: #e9b87a;
            border: 2px solid #e9b87a;
            position: relative;
          }
          .xuanBorder::after {
            content: '';
            width: 40%;
            height: 60%;
            position: absolute;
            top: -32%;
            left: -4%;
            background: url(../../assets/images/mianling.png) no-repeat center;
            animation: breath-kf 1s ease 0s infinite normal none running;
            -webkit-animation: breath-kf 1s ease 0s infinite normal none running;
            background-size: 100%;
          }
          .wuNei {
            width: 100%;
            font-size: 0.6rem;
            color: #666666;
            display: flex;
            justify-content: center;
            padding: 0.5rem 0;
            text-align: center;
            margin: auto;
          }
        }
        .xuanYing {
          width: 100%;
          height: 1rem;
          margin: auto;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 0.6rem;
          color: #22222e;
          background: linear-gradient(-90deg, #f8d9ad, #e9b87a);
          border-radius: 0.9rem;
          margin-top: 0.3rem;
          font-weight: bold;
        }
      }
    }
  }
  .modal-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 9999;
    .wrapper {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      height: 100%;
      .modal-container {
        position: relative;
        width: 88%;
        font-size: 14px;
        color: #262626;
        line-height: 30px;
        border-radius: 5px;
        overflow: hidden;
        padding: 15px 0 0;
        background-color: #fff;
        .modal-header {
          color: #333;
          font-size: 18px;
          text-align: center;
          margin: 0 auto 10px;
          font-weight: 600;
        }
        .modal-main {
          position: relative;
          height: 420px;
          overflow: scroll;
          padding: 0 15px;
          p {
            text-align: justify;
          }
        }
        .c_bottom {
          margin-top: 10px;
          .dialog_btn2 {
            font-size: 13px;
            color: #258cde;
            border-radius: 0px;
            border: none;
            border-top: 1px solid #e5e5e5;
            text-align: center;
            padding: 7px 0;
            font-size: 15px;
          }
        }
      }
    }
  }

  @keyframes btn {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(0.9);
    }
    100% {
      transform: scale(1);
    }
  }

  @-webkit-keyframes breath-kf {
    0% {
      transform: scale(0.9);
    }
    50% {
      transform: scale(1);
    }
    to {
      transform: scale(0.9);
    }
  }
  @keyframes breath-kf {
    0% {
      transform: scale(0.9);
    }
    50% {
      transform: scale(1);
    }
    to {
      transform: scale(0.9);
    }
  }
  .topLevel {
    width: 100%;
    height: 100vh;
    justify-content: center;
    display: flex;
    background-color: rgba(0, 0, 0, 0.6);
    .loading-box {
      text-align: center;
      padding-top: 8rem;
      font-size: 0.8rem;
      color: white;
    }
    .lds-roller {
      display: inline-block;
      position: relative;
      width: 80px;
      height: 80px;
    }
    .lds-roller div {
      animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
      transform-origin: 40px 40px;
    }
    .lds-roller div:after {
      content: ' ';
      display: block;
      position: absolute;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #fff;
      margin: -4px 0 0 -4px;
    }
    .lds-roller div:nth-child(1) {
      animation-delay: -0.036s;
    }
    .lds-roller div:nth-child(1):after {
      top: 63px;
      left: 63px;
    }
    .lds-roller div:nth-child(2) {
      animation-delay: -0.072s;
    }
    .lds-roller div:nth-child(2):after {
      top: 68px;
      left: 56px;
    }
    .lds-roller div:nth-child(3) {
      animation-delay: -0.108s;
    }
    .lds-roller div:nth-child(3):after {
      top: 71px;
      left: 48px;
    }
    .lds-roller div:nth-child(4) {
      animation-delay: -0.144s;
    }
    .lds-roller div:nth-child(4):after {
      top: 72px;
      left: 40px;
    }
    .lds-roller div:nth-child(5) {
      animation-delay: -0.18s;
    }
    .lds-roller div:nth-child(5):after {
      top: 71px;
      left: 32px;
    }
    .lds-roller div:nth-child(6) {
      animation-delay: -0.216s;
    }
    .lds-roller div:nth-child(6):after {
      top: 68px;
      left: 24px;
    }
    .lds-roller div:nth-child(7) {
      animation-delay: -0.252s;
    }
    .lds-roller div:nth-child(7):after {
      top: 63px;
      left: 17px;
    }
    .lds-roller div:nth-child(8) {
      animation-delay: -0.288s;
    }
    .lds-roller div:nth-child(8):after {
      top: 56px;
      left: 12px;
    }
    @keyframes lds-roller {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
}
</style>
