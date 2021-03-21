<!-- 客户信息收集 -->
<template>
<div class="info">
<div class="layui-layer layui-layer-page layui-layer-rim" type="page" contype="string" style="width: 100%; height: 100%;">
    <div class="layui-layer-title" style="cursor: move;">关于客户个人信息收集、使用规则公告</div>
    <div class="layui-layer-content">
    <div class="xieyis">
    <p>尊敬的客户</p>
    <p>根据《全国人民代表大会常务委员会关</p>
    <p>于加强网络信息保护的决定》、《电信和互联网用户个人信息保护规定》(工业和</p>
    <p>信息化部令第24号)和《电话用户真实身份信息登记规定》(工业和信息化部令</p>
    <p>第25号)等国家法律法规的要求,客户在中国联合网络通信有限公司各类营业网</p>
    <p>点(含自有营业厅、手机营业厅、网上营业厅、授权合作代理商等)办理固定电话</p>
    <p>移动电话(含无线上网卡)入网、过户以及需要出示客户证件的有关业务时,客</p>
    <p>户应配合出示有效证件原件并进行查验、登记,登记信息包括姓名、证件类型、号</p>
    <p>码及地址等。同时,为更好地提供服务,需要客户提供如联系人、联系电话、通</p>
    <p>地址、电子邮箱等信息。客户本人持有效证件可通过自有营业厅查询和/或更正本</p>
    <p>人信息,或登录手机营业厅查询本人信息。</p>
    <p>如客户拒绝依法提供个人有效证件及真实信息,我公司有权不提供服务或终</p>
    <p>止服务。</p>
    <p>为向客户提供优质、个性化的服务,包括但不限于提供通信服务、保障通信</p>
    <p>服务安全、改善服务质量、推介个性化产品等,我公司将遵循合法、正当、必要的</p>
    <p>原则,按照法律法规规定和/或协议约定使用留存客户个人信息,并妥善保管,严</p>
    <p>格保密,依法保护客户个人信息,非因下列事由,不对外泄露客户个人信息</p>
    <p>a)事先获得客户的明确授权</p>
    <p>b)根据有关的法律法规要求;</p>
    <p>(c)按照相关司法机关和/或政府主管部门的要求;</p>
    <p>d)为维护社会公众的利益所必需且适当</p>
    <p>e)为维护我公司或客户的合法权益所必需且适当。</p>
    </div>
    </div>
    </div>
</div>
</template>

<script>
// 请求接口

export default {
  name:'info',
  data() {
    return {
      
    }
  },
  computed: {
    
  },
  mounted() {
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
.info{
    .layui-layer-title{
        padding-left:20px;
        height:42px;
        line-height:42px;
        border-bottom:1px solid #eee;
        color:#333;
        font-size:14px;
        background-color:#f8f8f8;
        border-radius:2px 2px 0 0;
        text-overflow:ellipsis;
        white-space:break-spaces;
    }
    .xieyis{
        padding:15px;
        font-size:14px;
        p{
            margin:0;
            font-size:14px;
            line-height:1.4;
        }
    }
}
</style>
