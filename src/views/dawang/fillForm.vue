<!-- 电信星卡-填写表单 -->
<template>
  <div class="infoFixed">
    <div class="close_infoFixed"><img src="images/index29_1/cancel2.png" alt="" /></div>
    <p class="info_text">
      已选择<span>靓号{{ chooseNum }}</span
      >{{ numAddress }}
    </p>
    <!-- <p class="info_text">已选择<span>靓号15611393975</span>北京北京市</p> -->
    <p class="info_text2">根据国家手机号卡实名要求，请如实填写以下信息，以便我们及时为您送达。</p>
    <div class="info_write_info">
      <div>收货地址</div>
      <ul>
        <li @click="goods_address(2)" class="border_none area_error input_text" id="areaInfo">
          <div class="arr-DIV">
            <div class="fl tel_left">所在地区</div>
            <div
              class="tel_mid pro_mid info_address_choose"
              style="white-space: nowrap; overflow-x: scroll; color: rgb(118, 118, 118)"
              v-text="goods_addre"
              v-cloak
            ></div>
          </div>

          <img src="images/index29_1/path.png" alt="" />
        </li>
        <li class="border_none tel_error address_detail_fill">
          <div class="info_mid">
            <input
              type="text"
              placeholder="请输入详细地址（*街道*门牌号*小区）"
              v-model="sAddress"
              maxlength="50"
              id="addreInfo"
              @input="areaFill"
            />
          </div>
          <img src="images/index29_1/help.png" alt="" />
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
              type="tel"
              maxlength="11"
              placeholder="请输入联系电话，并保持畅通"
              v-model="tel"
              @input="infoFill(3)"
              id="telInfo"
            />
          </div>
          <div class="clear"></div>
        </li>
        <li class="border_none name_error" style="border-radius: 0.25rem 0.25rem 0 0">
          <div class="fl info_left">姓名</div>
          <div class="info_mid">
            <input
              type="text"
              placeholder="请输入姓名（已加密）"
              v-model="handleName"
              @input="infoFill(1)"
              id="nameInfo"
              maxlength="6"
            />
          </div>
        </li>
        <li class="border_none id_error" v-show="idCard_show">
          <div class="fl info_left">身份证号</div>
          <div class="info_mid">
            <input
              type="text"
              maxlength="18"
              placeholder="请输入身份证号(已加密)"
              v-model="idCard"
              @input="infoFill(2)"
              id="idCardInfo"
            />
          </div>
        </li>
      </ul>
    </div>
    <div class="content_btn btnTj scale_div" @click="enterPay" id="tj_submit">0元领取，包邮到家</div>
    <p class="info_text2">
      本活动为阶段性优惠活动，发布数量有限，请保持联系号码畅通，我们可能随时与您联系，电话无人接听或恶意下单，将不予发货。
    </p>
    <p class="info_text2" style="margin-top: 10px">您的个人信息将受到保护，仅用于此次信息填写</p>
  </div>
</template>

<script>
import { areaList } from '@/assets/js/addressCode.js'
export default {
  name: 'fillForm',
  data() {
    return {
      docChecked: false,
      cascaderValue: '', // 地址
      show: false,
      areaList: areaList, //选择地址的地址数据
      checkName: false,
      checkTel: false,
      nameValue: '', //姓名
      telValue: '', //电话
      individualValue: '', //身份证号码
      cascaderValue: '', //省市区
      detailareaValue: '', //详细地址
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
    }
  }
}
</script>
<style lang="scss" scoped>
.infoFixed {
  width: 100%;
  height: 90%;
  position: fixed;
  bottom: 0;
  left: 0;
  background: white;
  z-index: 100;
  background-color: #f7f8fa;
  overflow: scroll;
  display: none;
}

.infoFixed .close_infoFixed {
  position: absolute;
  top: 0.2rem;
  right: 0.2rem;
  width: 2rem;
  height: 2rem;
}

.infoFixed .close_infoFixed > img {
  width: 100%;
  height: 100%;
}

.infoFixed .info_text {
  display: flex;
  font-size: 0.6rem;
  display: flex;
  color: #6e6e6e;
  align-items: center;
  padding: 20px 20px 10px 20px;
}

.infoFixed .info_text > span {
  font-size: 0.7rem;
  color: #fc1d3a;
}

.infoFixed .info_text2 {
  font-size: 0.6rem;
  color: #6e6e6e;
  padding: 0px 20px;
}

.info_write_info {
  margin-top: 10px;
}

.info_write_info > div:nth-of-type(1) {
  width: 90%;
  height: 1.5rem;
  border-radius: 0.4rem;
  background-image: -webkit-gradient(linear, left top, right top, from(#4a6dfe), to(#3ff29d));
  background-image: linear-gradient(90deg, #4a6dfe, #3ff29d);
  line-height: 1.5rem;
  font-size: 0.7rem;
  text-align: left;
  color: #fff;
  padding-left: 2rem;
  margin: 20px auto;
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
  line-height: 1.8rem;
}

.info_write_info ul .arr-DIV {
  width: 90%;
}

.info_write_info ul img {
  width: 0.8rem;
  height: 0.8rem;
}

.info_write_info ul .tel_left {
  color: #323233;
  font-size: 0.6rem;
}

.info_write_info ul .info_mid {
  width: 80%;
}

.info_write_info ul .fl {
  width: 30%;
}
</style>

