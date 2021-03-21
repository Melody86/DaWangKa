<!-- 常见问题 -->
<template>
<div class="question">
<div class="zifei question" id="question" style="background-color: rgb(255, 255, 255); line-height: 20px; width: 100%; height: 100%; border-radius: 15px; overflow: auto; z-index: 201;">
  <div class="vip-desc">
    <div class="vip-desc-div">
        <p class="vip-desc-title">常见问题</p>
        <!-- <img class="close1" src="/template/pc/images/close.png" onclick="closes()"> -->
    </div>
    <p class="q_title">1、怎么报名,报名后怎么查询订单？</p>
    <p class="q_content">在线填写报名资料即可,报名后12小时内能收到订单物流短信。</p><br>
    <p class="q_title">2、包邮吗,多久能收到？</p>
    <p class="q_content">全国免费包邮到家,一般24-48小时内可以收到。</p><br>
    <p class="q_title">3、月租一直是39吗？</p>
    <p class="q_content">不是的,套餐49元/月,激活即送60元话费,相当于首月0元使用，次月起月租实交39元/月。</p><br>
    <p class="q_title">4、免流app是激活后就能直接使用吗？</p>
    <p class="q_content">是的,激活后自带的;使用免流app是不收取流量费的。</p><br>
    <p class="q_title">5、地址填写错误能更改吗？</p>
    <p class="q_content">地址填写错误不能更改,由于下单信息都是加密处理的,更改不了但是12小时内能收到订单物流短信,可自行查询物流,联系物流那边将地址进行更改。</p><br>
    <p class="q_title">6、营业厅有这个套餐吗？</p>
    <p class="q_content">营业厅没有的这个套餐,这个套餐是中国电信官方在线发放的,数量有限,属于阶段性优惠,仅限在线领取。</p><br>
    <p class="q_title">7、需要办理新卡吗？</p>
    <p class="q_content">需要办理新卡的;不能直接使用原卡办理的。</p><br>
    <p class="q_title">8、为什么老客户没有优惠？</p>
    <p class="q_content">老客户不能直接转套餐的原因也是因为目前仅在线上开放了10000张属于阶段性优惠。</p><br>
    <p class="q_title">9、套餐外怎么收费？</p>
    <p class="q_content">套餐外通用流量超出前3GB按1G/5元收取,超出3G按1G/3元收取;全国无漫游,全国接听免费;套餐外前200分钟语音通话都是0.1元/分钟,达到200分钟时额外赠送100分钟;发短信0.1元/条;国内通话和接听免费范围不包括港澳台地区。</p>
    <div class="vip-desc-div1" @click="closePopup">
        <img class="close" :src="close" ></img>
    </div>
  </div>
</div>
</div>
</template>

<script>
// 请求接口

export default {
  name:'question',
  data() {
    return {
      close:require('@/assets/images/lingka/close.gif'),
    }
  },
  computed: {
    
  },
  mounted() {
  },
  methods: {
    closePopup(){
      this.$emit('closeValue',false);
    }
  }
}
</script>
<style lang="scss" scoped>
.question{
  background-color:#f83057 !important;
  .vip-desc{
    padding:10px;
    .vip-desc-div{
      width:100%;
      margin:0 auto;
      margin-bottom:10px;
      .vip-desc-title{
        color:#fff;
        width:100%;
        height:40px;
        font-size:22px;
        text-align:center;
        line-height:40px;
      }
    }
    .q_title{
      color:#f0ff00;
      font-size:16px;
      margin:0 16px 0 12px;
    }
    .q_content{
      font-size:14px;
      margin:0 14px 0 40px;
      color:#fff;
    }
  }
  .close{
    width:100%;
  }
}

</style>
