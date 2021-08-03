<template>
  <div class="boxT" style="">
    <!-- 滚动消息 -->
    <div class="history" v-if="false">
      <img src="../../assets/images/sound.png" style="width: 20px;height: 20px;" />
      <ul class="history-list" style="height: 20px; top: -8rem;">
        <li style="height: 2rem;">
          <span style="display: inline-block;padding-right: 10px;">广东</span
          ><span style="display: inline-block;padding-right: 10px;">深圳</span><span><b>张**已领取</b></span
          ><span style="display: inline-block;padding-left: 10px;">电信星卡</span>
        </li>
        <li style="height: 2rem;">
          <span style="display: inline-block;padding-right: 10px;">广东</span
          ><span style="display: inline-block;padding-right: 10px;">广州</span><span><b>潘**已领取</b></span
          ><span style="display: inline-block;padding-left: 10px;">电信星卡</span>
        </li>
        <li style="height: 2rem;">
          <span style="display: inline-block;padding-right: 10px;">广东</span
          ><span style="display: inline-block;padding-right: 10px;">河源</span><span><b>王**已领取</b></span
          ><span style="display: inline-block;padding-left: 10px;">电信星卡</span>
        </li>
        <li style="height: 2rem;">
          <span style="display: inline-block;padding-right: 10px;">广东</span
          ><span style="display: inline-block;padding-right: 10px;">东莞</span><span><b>董**已领取</b></span
          ><span style="display: inline-block;padding-left: 10px;">电信星卡</span>
        </li>
        <li style="height: 2rem;">
          <span style="display: inline-block;padding-right: 10px;">广东</span
          ><span style="display: inline-block;padding-right: 10px;">深圳</span><span><b>周**已领取</b></span
          ><span style="display: inline-block;padding-left: 10px;">电信星卡</span>
        </li>
        <li style="height: 2rem;">
          <span style="display: inline-block;padding-right: 10px;">广东</span
          ><span style="display: inline-block;padding-right: 10px;">广州</span><span><b>李**已领取</b></span
          ><span style="display: inline-block;padding-left: 10px;">电信星卡</span>
        </li>
        <li>
          <span style="display: inline-block;padding-right: 10px;">广东</span
          ><span style="display: inline-block;padding-right: 10px;">深圳</span><span><b>张**已领取</b></span
          ><span style="display: inline-block;padding-left: 10px;">电信星卡</span>
        </li>
      </ul>
    </div>
    <form class="form_box">
      <!-- 选号 -->
      <label for="numberPhone" class="numberPhone">
        <span>
          <div style="display: inline-block;" class="xing">免费选号</div>
        </span>
        <input id="numberPhone" type="text" readonly="readonly" placeholder="请选择号码" />
      </label>
      <!-- 姓名 -->
      <label for="username">
        <span>
          <div style="display: inline-block;" class="xing">客户姓名</div>
        </span>
        <input id="username" type="text" placeholder="请填写办理人真实姓名（已加密）" />
      </label>
      <!-- 联系电话 -->
      <label for="usertel">
        <span>
          <div style="display: inline-block;" class="xing">手机号</div>
        </span>

        <input id="usertel" type="tel" maxlength="11" placeholder="请输入手机号码（已加密）" />
      </label>

      <!-- 身份证号 -->
      <label id="idcardLabel" for="idcard">
        <span>
          <div style="display: inline-block;" class="xing">身份证</div>
        </span>
        <input style="  width: 68%;" id="idcard" maxlength="18" type="text" placeholder="请输入身份证号码（已加密）" />
      </label>
      <!-- 选择号码 -->

      <label for="location" id="xzgsd">
        <span>
          <div style="display: inline-block;" class="xing">收货省市</div>
        </span>
        <input
          type="text"
          name=""
          disabled="disabled"
          style="color:#000000 !important; opacity:1 !important;"
          id="location"
          placeholder="请选择省市区"
        />
      </label>

      <label for="detail" id="address">
        <span>
          <div style="display: inline-block;" class="xing">详细地址</div>
        </span>
        <input type="text" name="" id="detail" placeholder="请输入收货地址（已加密）" />
      </label>

      <div class="agreement">
        <span style="color:#000000">我已阅读并同意</span>
        <span style="color:#1e96fa" id="agreement2">《入网协议、个人信息收集使用公告》 </span><br />
        <span style="color:#1e96fa;display: none;" id="agreement1">《个人信息收集证明》</span>
      </div>

      <div class="loginchecking">免费领取 全国包邮</div>
      <div style="text-align: center;font-size:11px;color:#FF0000;margin-top:5px;">（每位用户限领一张)</div>
    </form>
  </div>
</template>
<script>
export default {}
</script>
<style lang="scss" scoped>
.boxT {
  font-size: 16px;
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
  }
  .agreement {
    width: 100%;
    text-align: start;
    margin-left: 42px;
    margin-top: 12px;
    font-size: 16px;
  }
  .loginchecking {
    margin: 10px 5% 0px;
    font-size: 20px;
    width: 92%;
    border: 0;
    height: 3.4rem;
    line-height: 3.4rem;
    margin: 1.5rem 5% 1.5rem;
    padding: 0.8rem 0;
    border-radius: 2rem;
    text-align: center;
    font-family: '思源黑体';
    font-size: 1.6rem;
    font-weight: 600;
    color: #ffffff;
    background: url(../../assets/images/banner14.png) no-repeat center;
    background-size: 100% 100%;
    animation: btn 1s ease-in-out 0s infinite;
    animation: breath-kf 1s ease 0s infinite normal none running;
    -webkit-animation: breath-kf 1s ease 0s infinite normal none running;
  }

  form > label {
    box-sizing: border-box;
    width: 93%;
    padding: 0.9rem 1.5rem;
    border-radius: 2rem;
    background: #f1f4f9;
    color: #8f8f8f;
    display: flex;
    position: relative;
    margin-bottom: 0.5rem;
    font-family: 黑体;
    display: flex;
    span {
      color: #313131;
      width: 6rem;
      font-weight: 600;
      display: inline-block;
    }
    input {
      /* flex: 0.5; */
      border: none;
      width: 76%;
      margin-left: 5%;
      font-size: inherit;
      color: #313131;
      background: #f1f4f9;
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
}
</style>
