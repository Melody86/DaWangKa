<!-- 电信星卡-填写表单 -->
<template>
  <div class="fill-form-box">
    <img src="../../assets/images/yidong/gift50-210.png" />

    <!-- 表单部分 -->
    <div class="form-box-content">
      <div class="box-content-item">
        <span>收卡人姓名：</span><input placeholder="请填写真实姓名（已加密）" v-model="nameValue" />
      </div>
      <div class="box-content-item">
        <span>联系电话：</span><input placeholder="客服将确认订单请保持畅通（已加密）" v-model="telValue" />
      </div>
      <div class="box-content-item" v-show="checkName && checkTel">
        <span>身份证号：</span><input placeholder="请输入身份证号码（已加密）" v-model="individualValue" />
      </div>
      <div class="box-content-item box-content-adderess">
        <span>收货地址：</span
        ><input readonly placeholder="请选择省市区（已加密）" v-model="cascaderValue" @click="show = true" />
        <label>选择</label>
      </div>
      <div class="box-content-item">
        <span>详细地址：</span><input placeholder="请填写详细街道、小区信息（已加密）" v-model="detailareaValue" />
      </div>

      <div class="box-content-item form-box-doc">
        <van-checkbox v-model="docChecked" @click="checkboxClicked" checked-color="#a3783f"></van-checkbox>
        <div class="form-box-doc-link">
          <p>我已阅读并同意<span>《客户入网服务协议》</span></p>
          <p>和<span>《关于客户个人信息收集使用规则公告》</span></p>
        </div>
      </div>
      <img
        class="box-content-btn"
        src="@/assets/images/chuangyuan/weapp-hndxxk/assets/index/banner14.png"
        @click="submit"
      />
    </div>

    <!-- 地区选择部分 -->
    <van-popup v-model="show" round position="bottom">
      <van-area title="" cancel-button-text="" :area-list="areaList" :columns-num="3" @confirm="choiceArea" />
    </van-popup>
  </div>
</template>

<script>
import { areaList } from '@/assets/js/addressCode.js'
import qs from 'qs'
// axios
import request from '@/utils/request'
// user api
export default {
  name: 'fillFormNoSel',
  data() {
    return {
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
      showNumber: 0
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
  methods: {
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
          this.cascaderValue = this.cascaderValue + a
        }
      }
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
      } else if (this.cascaderValue == '' || this.detailareaValue == '') {
        this.$toast({
          message: '请输入正确的地址'
        })
        return
      } else if (!this.docChecked) {
        this.$toast({
          message: '请勾选协议'
        })
        return
      }
      var Data = {
        name: this.nameValue,
        idcard: this.individualValue,
        mobile: this.telValue,
        address: this.detailareaValue,
        area: this.areaList1
      }
      request({
        url: ' api/submit',
        method: 'post',
        // params: qs.stringify(a),
        params: Data,
        hideloading: true // 隐藏 loading 组件
      })
        .then(res => {
          this.$toast({
            message: '提交成功'
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
      color: #01d8ae;
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
    width: 310px;
    height: 47.281px;
    text-align: center;
  }
}
</style>

