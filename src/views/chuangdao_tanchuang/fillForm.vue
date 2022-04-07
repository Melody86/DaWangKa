<!-- 电信星卡-填写表单 -->
<template>
  <div class="infoFixed">
    <div class="close_infoFixed" @click="$emit('closePop')"><img :src="closeImg" alt="" /></div>
    <p class="info_text">
      已选择<span>靓号{{ chooseNum || '' }} </span>{{ numAddress }}
    </p>
    <p class="info_text2">根据国家手机号卡实名要求，请如实填写以下信息，以便我们及时为您送达。</p>
    <div class="info_write_info" id="info_fill">
      <div>收卡人信息</div>
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
              @click="callAddress"
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
    <div class="info_write_info">
      <div>收卡地址</div>
      <ul>
        <li class="border_none area_error input_text" id="areaInfo" @click="showAreaBox()">
          <div class="arr-DIV">
            <div class="fl tel_left">所在地区</div>
            <div>{{ cascaderValue || '请选择区/县' }}</div>
          </div>
          <img :src="pathImg" alt="" />
        </li>
        <li class="border_none tel_error address_detail_fill">
          <div class="info_mid" @click="callAddress">
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

    <div class="content_btn btnTj scale_div" @click="submit" id="tj_submit">免费领取 包邮到家</div>

    <div class="xieyi_box">
      <van-checkbox v-model="checked"
        ><a @click="ruwang_show = true">《入网服务及业务协议》</a
        ><a @click="baohu_show = true">《个人信息授权及保护声明》</a></van-checkbox
      >
    </div>
    <p class="info_text2">
      本活动为阶段性优惠活动，发布数量有限，请保持联系号码畅通，我们可能随时与您联系，电话无人接听或恶意下单，将不予发货。
    </p>
    <p class="info_text2" style="margin-top: 10px">您的个人信息将受到保护，仅用于此次信息填写</p>

    <van-popup
      v-model="ruwang_show"
      round
      position="center"
      :style="{ height: '80%', width: '90%' }"
      closeable
      close-icon="close"
    >
      <div class="xieyi_content">
        <div class="WordSection1" style="layout-grid:15.6pt">
          <p class="MsoNormal">
            个人信息授权及保护声明<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            甲方：<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><o:p>&nbsp;</o:p></span>
          </p>

          <p class="MsoNormal">
            乙方：中国联通号卡服务用户协议<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><o:p>&nbsp;</o:p></span>
          </p>

          <p class="MsoNormal">
            根据甲方与乙方中国联通（以下称<span lang="EN-US">“</span>运营商<span lang="EN-US">”</span>）签订的相关入网服
            务协议，甲乙双方在平等自愿、公平诚信的基础上，达成协议如下：<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><o:p>&nbsp;</o:p></span>
          </p>

          <p class="MsoNormal">
            提示：在甲方按照注册页面提示填写信息、阅读并勾选<span lang="EN-US">“</span>我已阅读同意《号卡服务用
            户协议》<span lang="EN-US">”</span>且提交订单后，或甲方以其他乙方允许的方式实际使用乙方提供的号卡服务时，
            即表示甲方已充分阅读、理解并同意接受本协议的全部内容的约束。甲方承诺接受并遵守
            本协议的约定，届时甲方不应以未阅读本协议的内容或未获得乙方对甲方问询的解答等理
            由，主张本协议无效，或要求撤销本协议。<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><o:p>&nbsp;</o:p></span>
          </p>

          <p class="MsoNormal">
            一、协议范围<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><o:p>&nbsp;</o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US">1.</span>本协议由甲方（或称<span lang="EN-US">“</span>用户<span lang="EN-US">”</span
            >）与乙方中国联通共 同缔结，本协议具有合同效力。<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><o:p>&nbsp;</o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US">2.</span>乙方作为相关运营商的产品推广商，为甲方提供运营商产品办理接口及服务，甲方通
            过乙方的接口及服务，办理运营商产品。甲乙双方享有本协议约定之权利，履行本协议约定 之义务。<span lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><o:p>&nbsp;</o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US">3.</span>除另行明确声明外，乙方提供的相关服务均受本协议约束。如果甲方不同意本协议的
            约定，甲方应立即停止确认程序或停止使用乙方的服务。<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><o:p>&nbsp;</o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US">4.</span>本协议内容包括协议正文、法律声明，以及所有乙方已经发布或将来可能发布的各类
            服务内容、服务标准、使用规则、公告或通知（以下简称<span lang="EN-US">“</span>规则<span lang="EN-US">”</span
            >）。所有规则为本协议不可 分割的组成部分，与本协议具有同等法律效力。<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><o:p>&nbsp;</o:p></span>
          </p>

          <p class="MsoNormal">
            二、入网要求与账户<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><o:p>&nbsp;</o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US">1.</span>主体资格<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><o:p>&nbsp;</o:p></span>
          </p>

          <p class="MsoNormal">
            甲方确认，甲方办理入网、变更手续时，应提供甲方本人真实有效的身份证件原件，不
            得冒用他人证件或者使用伪造、变造的证件，否则应自行承担相关后果并赔偿因此给乙方造
            成的损失。如甲方在办理入网手续时未通过实名认证，乙方有权拒绝为甲方提供服务且本协 议自始未生效。<span
              lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><o:p>&nbsp;</o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US">2.</span>用户信息<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><o:p>&nbsp;</o:p></span>
          </p>

          <p class="MsoNormal">
            （<span lang="EN-US">2</span>）甲方同意乙方及第三方业务合作机构仅为实现本协议合作之目的收集甲方的个人
            信息（包括但不限于甲方姓名、身份证号、联系方式等），乙方及第三方业务合作机构收集、
            存储的甲方个人信息有错误的，甲方有权要求更正，乙方及第三方业务合作机构应当采取
            措施予以删除或者更正，如乙方及第三方业务合作机构违反法律、行政法规的规定或者双
            方的约定收集、使用甲方个人信息的，甲方有权要求删除其个人信息。乙方及第三方业务
            合作机构对甲方的个人信息依法保密，但为了与甲方建立沟通渠道，改善服务质量，甲方
            授权并同意乙方及第三方业务合作机构可以依法使用甲方的信息与甲方联系。<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><o:p>&nbsp;</o:p></span>
          </p>

          <p class="MsoNormal">
            三、甲方的权利和义务<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><o:p>&nbsp;</o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US">1.</span>在甲方完成注册程序或以其他乙方允许的方式实际使用乙方服务时，甲方应当具备
            完全民事权利能力和完全民事行为能力。若甲方不具备前述主体资格，则甲方及甲方的监护
            人应承担因此而导致的一切后果，且乙方有权向甲方及甲方的监护人索偿因此遭受的相应损 失。<span lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><o:p>&nbsp;</o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US">2.</span>甲方同一身份证限购同一类号卡业务的<span lang="EN-US">1</span
            >单套餐，并保持联系电话畅通，如甲方电话
            无人接听或恶意下单，甲方自行承担运营商不予发货的后果，乙方对此不承担责任。<span lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><o:p>&nbsp;</o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US">3.</span>甲方申请办理号卡业务，应如实填写申请页面相应信息，订单生成后，相关信息不可
            更改，因填写内容不实、不尽造成运营商审核不通过的，由甲方承担全部责任。<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><o:p>&nbsp;</o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US">4.</span>甲方申请办理号卡业务，应当在申请审核通过并收到相关号卡之后及时激活，逾期未
            激活的，甲方自行承担号卡过期的后果，乙方对此不承担责任。<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><o:p>&nbsp;</o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US">5.</span>甲方申请办理号卡业务，甲方在号卡到货后拒收的，甲方自行承担运营商予以退单的
            后果，乙方对此不承担责任。<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><o:p>&nbsp;</o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US">6.</span>甲方申请办理号卡业务，提交申请单后，乙方即转送至上游运营商处理，后续甲方所
            选号码均为乙方上游运营商确定并邮寄，乙方不承担甲方所选号码与收到号码不一致的责任。<span lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><o:p>&nbsp;</o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US">7.</span>根据运营商要求，部分号卡需收取一定金额的预付费，该预付费为号卡购买费用，不
            代表预充话费，具体号卡说明以号卡申请的宣传页面为准。甲方承诺，申请号卡时甲方已仔
            细阅读宣传界面上载明的号卡说明且无异议。<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><o:p>&nbsp;</o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US">8.</span>甲方应当按照约定的时间和方式及时、足额地向运营商交纳电信费用。甲方逾期不交
            纳电信费用的，乙方有权督促甲方补交电信费用，并可按照有关规定向征信机构提供甲方的
            欠费信息。甲方应依据与运营商签订的相关入网服务协议承担责任，乙方因甲方逾期不交纳
            电信费用的受到运营商处罚的，甲方应当承担与乙方处罚金额等额的赔偿责任。<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><o:p>&nbsp;</o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US">9.</span>甲方不得利用乙方渠道、利用本次申请的号卡制作、复制、发布、传播含有以下内
            容的信息或从事下列违法活动，否则乙方有权暂停或限制向甲方提供的服务，直至终止所有
            服务，并有权向运营商通报，涉嫌违法犯罪的，乙方将报警处理。由此产生的后果，乙方不 承担责任：<span
              lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><o:p>&nbsp;</o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US">10.</span>依据《征信业管理条例》及相关法律法规，为确保甲方手机号码、姓名、身份证号
            三要素一致，符合办理相应号卡业务条件，甲方授权乙方向第三方支付<span lang="EN-US">/</span>征信<span
              lang="EN-US"
              >/</span
            >金融机构或 通过上述机构向其他拥有合法资质的第三方（具有资质的征信机构、电信运营商及其代理
            商和关联公司、公安部身份信息查询中心）合法了解、获取、核实甲方的信用信息及个人 信息。<span lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><o:p>&nbsp;</o:p></span>
          </p>

          <p class="MsoNormal">
            四、乙方的权利和义务<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><o:p>&nbsp;</o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US">1.</span>乙方严格遵守国家法律法规关于用户个人信息保护、网络安全等规定。乙方收集、
            使用甲方个人信息，应当遵循合法、正当、必要的原则。甲方理解并同意，乙方及第三方
            业务合作机构可以通过业务受理系统登记、纸质返档，通过网络接收、读取并记录等方式，
            以提供电信服务为目的，在业务活动中收集、使用甲方提供的和甲方使用服务过程中形成
            的个人信息。乙方有权依法对包含甲方在内的整体用户数据进行分析并加以利用。未经甲
            方同意，乙方不向除乙方关联公司外的第三方提供甲方个人信息。乙方不得侵害甲方的通
            信自由和通信秘密，对甲方的客户资料负有保密义务。但根据法律法规规定，乙方有义务
            配合法定机关对客户通信、资料、数据的调查取证等工作。<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><o:p>&nbsp;</o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US">2.</span>乙方有权根据运营商对其产品的说明、资费方案、计费规则、收取方式的变动，调
            整其申请页面的相应宣传内容，相关产品宣传内容如有调整，乙方将提前公告。调整后方案
            的具体执行时间以乙方公示为准。<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><o:p>&nbsp;</o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US">3.</span>乙方有义务采取公布监督电话等形式受理甲方投诉，并在接到投诉之日起<span
              lang="EN-US"
              >15</span
            >日内答 复甲方。<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><o:p>&nbsp;</o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US">4.</span>乙方承诺自身不向甲方发送违法信息或骚扰信息（不包括乙方为甲方提供业务服务
            而发送的信息）。<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><o:p>&nbsp;</o:p></span>
          </p>

          <p class="MsoNormal">
            五、特殊情况的责任承担<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><o:p>&nbsp;</o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US">1.</span>甲方如出现违法使用、违规外呼、呼叫频次异常、超约定用途使用、转租转售、发
            送违法违规信息、未经接收用户同意发送商业广告信息给他人造成骚扰、被公安机关通报以
            及用户就上述问题投诉较多等情况的，经乙方核实确认后，乙方有权向运营商通报，终止业
            务接入。因此给甲方造成的损失，乙方不承担责任。甲方知悉并同意：本卡仅做甲方正常
            通信使用，不私自转售、不用于违法犯罪活动，甲方使用本卡不得违反甲乙双方的约定以
            及甲方与运营商的约定、不得违反法律法规及公序良俗，否则甲方将承担由此产生的全部 法律责任。<span lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><o:p>&nbsp;</o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US">2.</span>甲方名下的移动电话号码逾期未交清费用的，乙方有权拒绝甲方以自己名义提出的
            其他新的号卡业务开办申请。根据国家相关规定，甲方在指定运营商办理有效使用的移动电 话卡达到<span lang="EN-US"
              >5</span
            >张的，乙方不予为其开办新的号卡。<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><o:p>&nbsp;</o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US">3.</span>在甲方欠费时，乙方可配合运营商采取信函、委托第三方等形式追缴欠费，并可按照
            有关规定向征信机构提供甲方的欠费信息。<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><o:p>&nbsp;</o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US">4.</span>甲方应妥善保管自己的号卡避免被他人非法使用，如甲方发现号卡被盗用，甲方应
            尽可能迅速告知乙方及相关运营商，办理停机或补卡手续，乙方应予配合并依法采取相应措
            施。甲方可向公安部门报案，乙方应在技术上协助公安部门进行调查，但乙方对上述情形造
            成甲方的任何损失不承担责任。<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><o:p>&nbsp;</o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US">5.</span>因甲方提供的客户资料不详、不实或变更后未通知乙方等原因，使乙方无法将服务提
            供给甲方，乙方不承担由此对甲方所造成的不良后果。甲方未完全履行本协议约定义务，所
            提供客户资料不真实、不准确、不完整、超过有效期或无效的，乙方有权暂时中止履行本协
            议并催告甲方补充提供相关资料。甲方在接到乙方催告后<span lang="EN-US">30</span>天内拒不补充提供到位的，乙
            方有权终止本协议。<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><o:p>&nbsp;</o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US">6.</span>当不可抗力的情形发生时，甲乙双方可根据不可抗力的影响，部分或者全部免除责任，
            但法律另有规定的除外。甲方或乙方迟延履行后发生不可抗力的，不能免除责任。<span lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><o:p>&nbsp;</o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US">7.</span>一方违约给对方造成损失的，应当依法承担赔偿责任。<span lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><o:p>&nbsp;</o:p></span>
          </p>

          <p class="MsoNormal">
            六、协议的变更、转让与终止<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><o:p>&nbsp;</o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US">1.</span>甲方办理各类业务所签署的表单、乙方以公告等书面形式公开做出的服务承诺均为本
            协议的补充协议，与本协议冲突部分以补充协议为准，补充协议中未约定部分以本协议为准。
            但补充协议不得规避和降低乙方的法定义务和服务标准。同时不一致条款应向客户明示（如
            字体加黑、划线或变换字体等）。<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><o:p>&nbsp;</o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US">2.</span>乙方承诺资费方案有效期为一年（双方有特殊约定的除外）。乙方有权在有效期截止
            后修改资费方案。如需修改，乙方应在有效期届满前两个月通知甲方。如无需修改，则原资
            费方案顺延一年，顺延次数不限。如甲方不接受修改，则甲方可到期取消该资费方案。如甲
            方对乙方调整后的资费方案未提出异议，则视为甲方同意乙方调整后的全部内容，本协议继 续有效。<span lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><o:p>&nbsp;</o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US">3.</span>如甲方要将协议项下的手机号码及附属权利义务转让给第三人（过户），应与第三人
            共同到乙方营业网点协商，在三方就权利义务转移等问题达成一致后，共同签订过户协议，
            本协议同时自动终止。因甲方私自转让而造成的欠费、停机等后果，由甲方自行承担。<span lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><o:p>&nbsp;</o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US">4.</span>如甲方要求终止本协议项下的服务内容，应在缴清相关费用后办理销户手续。下列情
            况下乙方有权解除协议，终止提供服务。由此给甲方造成的损失，乙方不承担责任，并有权
            要求甲方承担乙方因此遭受的全部损失：<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><o:p>&nbsp;</o:p></span>
          </p>

          <p class="MsoNormal">
            （<span lang="EN-US">1</span>）移动电话被用于违法犯罪活动或其他不正当用途，或甲方严重违约致使乙方遭受
            较大损失；<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><o:p>&nbsp;</o:p></span>
          </p>

          <p class="MsoNormal">
            （<span lang="EN-US">2</span>）乙方收到法定机关要求停止为甲方提供通信服务的通知；<span lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><o:p>&nbsp;</o:p></span>
          </p>

          <p class="MsoNormal">
            （<span lang="EN-US">3</span>）甲方欠费停机超过<span lang="EN-US">60</span>天；<span lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><o:p>&nbsp;</o:p></span>
          </p>

          <p class="MsoNormal">
            （<span lang="EN-US">4</span>）甲方提交给乙方的资料信息及有效证明虚假不实，可能给乙方带来经营风险或损
            失，经乙方要求仍拒不更正；<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><o:p>&nbsp;</o:p></span>
          </p>

          <p class="MsoNormal">
            （<span lang="EN-US">5</span>）其他继续履行本协议将造成乙方损失的情形。<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><o:p>&nbsp;</o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US">5.</span>在法定终止条件或约定终止条件具备时，本协议终止。乙方继续保留配合运营商向甲
            方追缴所欠费用及违约金的权利。<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><o:p>&nbsp;</o:p></span>
          </p>

          <p class="MsoNormal">
            七、其他约定<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><o:p>&nbsp;</o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US">1.</span>乙方关联公司是指乙方现在或将来控制、受控制或与其处于共同控制下的任何公司、
            机构以及上述公司或机构的合法继承人。其中<span lang="EN-US">“</span>控制<span lang="EN-US">”</span
            >是指直接或间接地拥有影响所提及公
            司管理的能力，无论是通过所有权、有投票权的股份、合同或其他被人民法院认定的方式。<span lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><o:p>&nbsp;</o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US">2.</span>双方的联系方式位于签章处，一方如有变更，应及时通知另一方，未及时通知的，。
            一方按照原有地址发送文件的（包括但不限于欠费催缴通知），发出后即视为送达。<span lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><o:p>&nbsp;</o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US">3.</span>本协议项下发生的争议，双方可协商解决，协商不成的，双方可选择向电信管理部
            门申诉，或向消费者协会投诉；仍无法解决争议的，双方均有权向乙方所在地的人民法院提 起诉讼。<span lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><o:p>&nbsp;</o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US">4.</span>本协议自甲方确认阅读并勾选后生效。<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><o:p>&nbsp;</o:p></span>
          </p>

          <p class="MsoNormal">
            （甲方承诺：本人已经充分、完整阅读并理解本协议所述全部条款及条件。）<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><o:p>&nbsp;</o:p></span>
          </p>

          <p class="MsoNormal">
            甲方：（签字或盖章）<span lang="EN-US">____________<o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><o:p>&nbsp;</o:p></span>
          </p>

          <p class="MsoNormal">
            甲方用户号码：<span lang="EN-US">__________________<o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><o:p>&nbsp;</o:p></span>
          </p>

          <p class="MsoNormal">
            甲方送达地址：<span lang="EN-US">__________________<o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><o:p>&nbsp;</o:p></span>
          </p>

          <p class="MsoNormal">
            签署日期：<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><o:p>&nbsp;</o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><o:p>&nbsp;</o:p></span>
          </p>

          <p class="MsoNormal">
            乙方：（盖章）中国联通<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><o:p>&nbsp;</o:p></span>
          </p>

          <p class="MsoNormal">
            送达地址：<span lang="EN-US">________________________<o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><o:p>&nbsp;</o:p></span>
          </p>

          <p class="MsoNormal">签署日期：</p>
        </div>
      </div>
    </van-popup>
    <van-popup
      v-model="baohu_show"
      round
      position="center"
      :style="{ height: '80%', width: '90%' }"
      closeable
      close-icon="close"
    >
      <div class="xieyi_content">
        <div class="WordSection1" style="layout-grid:15.6pt">
          <p class="MsoNormal">
            中国联通客户入网服务协议<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            甲方：<span lang="EN-US"> ____________<o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            乙方：中国联合网络通信有限公司<span lang="EN-US"> ____________</span>公司<span lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            根据《中华人民共和国合同法》、《中华人民共和国电信条例》等有关法律法规的规定，甲乙双方在平等、自愿、公平、诚信的基础上，基于对乙方通信服务的了解和需求，甲方自愿申请成为乙方客户，并达成协议如下：<span
              lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            第一条 入网要求及业务办理<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            （一）甲方办理入网、变更手续时，应提交以下登记资料：<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US">1</span
            >、个人客户：提供个人有效身份证件原件，委托他人办理的应同时提交本人及代理人有效身份证件原件及授权委托书。利用个人临时身份证件原件办理的，须同时提供公安部门出具的身份证领取凭证、身份信息辅助证件（驾照、医保卡或户口本等），不得委托他人办理。<span
              lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US">2</span
            >、单位客户：提供单位有效证件原件（或加盖公章的单位有效证件复印件）、经办人有效身份证件原件、加盖公章的单位介绍信等，单位客户办理移动电话（含无线上网卡）业务时，须同时提供实际使用人有效身份证件。<span
              lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US">3</span
            >、甲方户籍所在地（以有效身份证件的住址为准）或法定住所地（单位有效证件上单位注册地）不在本地的，应该按照乙方的要求办理相应的担保手续。<span
              lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            （二）甲方应使用国家给予入网许可标志的终端设备，终端设备应具备支持所选服务的相应功能，如无法支持所选服务，甲方应自行承担后果，并向乙方全额支付其所选服务的全部费用。<span
              lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            （三）甲方欲将业务号码过户时，应先交清所有费用，过户时须由双方持有效身份证件原件办理。如有特殊情况，甲方可委托他人办理，但应同时提交本人及代理人有效身份证件原件及授权委托书。<span
              lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            （四）在甲方通过过户成为新机主的情形下，如因原机主未亲自到场办理过户而导致原机主就此提出异议，甲方应无条件放弃因过户产生的全部权益，并承担由此对原机主及对乙方造成的一切损失。过户代理人对此承担连带责任。<span
              lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            （五）甲方采用担保人方式入网的，办理过户业务时，甲方须提交担保人出具的书面文件，说明担保人同意继续担保或要求终止担保。新机主应符合本协议第一条第（一）款的条件。<span
              lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            （六）甲方本人未到场，由代理人、经办人办理各类业务的，甲方应承担由此产生的责任与义务；代理人、经办人承担连带责任。<span
              lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            （七）根据《中华人民共和国反恐怖主义法》第二十一条之规定以及六部委《关于防范和打击电信网络诈骗犯罪的通告》等文件要求，甲方持同一有效身份证件在乙方处办理入网，若甲方已有或本次办理后将超过<span
              lang="EN-US"
              >5</span
            >张及以上在网的移动号卡（含上网卡），乙方将按照规定不得为甲方办理涉及新增移动号卡（含上网卡）的相应业务。<span
              lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            第二条 费用标准和费用交纳<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            （一）乙方应在国家电信资费主管部门允许的范围内设定资费标准、向客户明码标价、公告交费期限信息；甲方应在乙方明示的期限内足额交纳各项通信费用。<span
              lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            （二）甲方使用乙方提供的资费套餐方案，套餐有效期为一年（双方特殊约定的除外）。套餐到期后，双方如无异议，有效期逐年自动顺延。如无特殊约定，甲方在有效期内或到期后可更换套餐。<span
              lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            （三）如遇国家统一调整通信费用标准，则按国家统一规定执行。如遇乙方发布、调整资费，自乙方公告确定的生效日起执行新的资费标准。在乙方公告确定的生效日前，甲方未提出异议的视为同意，协议继续履行；甲方提出异议且未能与乙方达成一致的，甲方向乙方结清全部未付款项后本协议自动终止。<span
              lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            （四）若甲方为后付费用户，甲方应按时交纳通信费用。甲方未在约定期限内足额交纳通信费用的，乙方每日加收所欠费用的３<span
              lang="EN-US"
              >‰</span
            >作为违约金，并有权暂停甲方服务；甲方交清欠费和违约金后，除甲方明确提出不开通或已销号外，乙方应在<span
              lang="EN-US"
              >24</span
            >小时内恢复甲方服务。对前述情形，乙方将保留追缴欠费、违约金及向征信机构提供用户欠费信息的权利，也可用通知单、委托第三方等形式追缴欠费。<span
              lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            （五）若甲方为预付费用户，则必须保证账户上有充足的款项。如甲方账户满足消费条件的余额不足，乙方有权限制或停止向甲方提供服务，且乙方可不再另行通知。<span
              lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            （六）甲方定制第三方增值业务或其它收费业务，乙方可以代第三方向甲方收取信息费、功能费等，甲方使用第三方提供的增值业务或其它收费业务由第三方制定收费标准并公布。<span
              lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            （七）甲方如需开通国际业务、港澳台业务，应按乙方规定交纳相应费用。<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            （八）甲方不应以不知晓终端产生网络流量的原因（例如终端软件自动升级）为由，拒绝支付或要求减免相应费用。<span
              lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            第三条 客户权益<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            （一）网络服务<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US">1</span>、乙方在现有技术条件下的网络覆盖范围内向甲方提供通信服务。<span lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US">2</span>、乙方提供的网络服务应符合国家规定的通信质量标准。<span lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            （二）客户服务<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US">1</span>、乙方在承诺的网络覆盖范围内按照不低于《电信服务规范》的标准向客户提供服务。<span
              lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US">2</span>、乙方向甲方提供客户服务电话<span lang="EN-US">10010</span>、网上营业厅<span
              lang="EN-US"
              >www.10010.com</span
            >等渠道，以便甲方了解乙方各项服务。乙方还应向甲方免费提供通话所在地（仅限大陆地区，不含港澳台）火警<span
              lang="EN-US"
              >119</span
            >、匪警<span lang="EN-US">110</span>、医疗急救<span lang="EN-US">120</span>、交通事故报警<span lang="EN-US"
              >122</span
            >等公益性电信服务。<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US">3</span
            >、乙方向甲方提供需要甲方支付月功能费的服务项目时，应征得甲方同意；乙方开通服务项目让甲方进行体验时，不收取体验服务项目月功能费。<span
              lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US">4</span>、对于甲方通信服务开通<span lang="EN-US">/</span
            >关闭申请，乙方应在承诺的时限内操作完成（双方另有约定的除外）。乙方超过时限未及时开通<span lang="EN-US"
              >/</span
            >关闭的，应减免甲方由此产生的通信费用。<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US">5</span
            >、甲方个人信息是指以电子或者其他方式记录的能够单独或者与其他信息结合识别甲方身份或者反映甲方活动情况的各种信息。乙方严格按照《中华人民共和国网络安全法》等法律法规的相关要求，对其在提供服务过程中收集、使用的甲方个人信息履行保护义务。在甲方使用乙方提供的服务时，乙方依据法律法规、监管政策和本协议约定收集、存储、使用、披露和保护甲方的个人信息。<span
              lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US">6</span
            >、甲方理解并同意，乙方可以通过业务受理系统登记、纸质返档，通过网络接收、读取并记录等方式，以提供服务为目的，在业务活动中收集、使用甲方提供的和甲方使用服务过程中形成的个人信息。甲方同意乙方可以为向甲方提供服务、改进和完善服务、提供个性化或定制化产品与服务、评估服务中的促销与推广活动效果、软件认证或升级等目的使用个人信息，乙方有权依法对包含甲方在内的整体用户数据进行分析并加以利用，以便于为甲方提供更好服务。<span
              lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US">7</span
            >、甲方理解并同意乙方将收集的甲方个人信息共享给乙方关联公司在其业务目的和范围内使用；甲方亦同意乙方为履行、改善和改进乙方在本协议项下的服务之目的将收集的必要的甲方个人信息共享给乙方的授权合作伙伴。除前述明确约定情形外，未经甲方同意，乙方不向其他第三方提供甲方个人信息。<span
              lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US">8</span
            >、甲方本人持有效证件可通过自有营业厅或乙方指定的其他渠道，对其个人信息进行查询、更正。<span lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US">9</span
            >、乙方依法保证甲方的信息资料安全、通信自由和通信秘密。但以下情形不应视为乙方违反个人信息保护义务：（<span
              lang="EN-US"
              >1</span
            >）因追缴欠费需要，向第三方机构和征信机构提供用户个人相应信息及欠费信息的；（<span lang="EN-US">2</span
            >）为向甲方提供更好的服务，通过短信、彩信、<span class="SpellE"><span lang="EN-US">wappush</span></span
            >、电话、电子邮件、信函、微博、微信等方式向甲方发送业务服务信息或进行互动沟通的；（<span lang="EN-US"
              >3</span
            >）司法、行政机关依法要求乙方提供协助与配合，乙方应给予协助与配合的；（<span lang="EN-US">4</span
            >）出于国家安全、国防安全、公共安全、公共卫生和重大公共利益目的而未经授权的披露行为；（<span lang="EN-US"
              >5</span
            >）出于维护甲方或其他个人生命、财产等重大合法权益但又难以得到甲方同意的；（<span lang="EN-US">6</span
            >）法律法规另有规定的。<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US">10</span
            >、乙方非常重视用户的隐私和个人信息保护，并会尽全力保护用户的个人信息安全可靠。关于乙方如何收集、存储、使用、披露和保护您的个人信息，请见乙方不时更新、修订并公布的《中国联通用户隐私政策》，网址为<span
              lang="EN-US"
              >www.10010.com</span
            >。<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            第四条 风险与责任<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            （一）甲方应保证入网、变更登记资料真实有效、准确完整，并有义务配合乙方对登记资料进行查验。甲方登记资料如有变更，应主动办理变更手续。因甲方提供的客户资料不详、不实或变更后未及时通知乙方等原因，使乙方无法向甲方提供服务或甲方无法享受到乙方提供的相关服务，乙方无需向甲方承担任何责任。如乙方发现因甲方登记资料失实或者甲方未配合及时更正，乙方有权暂停、终止甲方服务，且乙方无需向甲方承担任何责任。<span
              lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            （二）甲方应妥善保管自己的用户号码、通信卡、终端、宽带账号，若发现丢失或被盗用，可及时拨打客户服务电话或到乙方营业网点办理暂时停机或修改账号密码手续；并可向公安机关报案，乙方应配合公安机关调查，但乙方不承担上述情形对甲方所造成的后果；如甲方将名下号码交予他人使用，因此引起的义务与责任仍由甲方承担。<span
              lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            （三）甲方应妥善管理其服务密码。服务密码是甲方办理业务的重要凭证，甲方入网后应立即修改初始服务密码。凡使用服务密码定制、变更或终止业务的行为均被视为甲方或甲方授权的行为，因此引起的义务与责任均由甲方承担。<span
              lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            （四）乙方按照现有技术标准为甲方提供通信服务，但乙方无法控制第三方利用各种手段从事违法行为等情况的发生，如因第三方的恶意行为造成甲方的损失，乙方对此将不承担相关责任。<span
              lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            （五）甲方使用固网及宽带业务时，未经有关部门批准许可，不得自行更改其使用性质，不得开设各类服务站点，不得利用计算机互联网络进行任何经营性服务活动，否则乙方有权停止服务，依法追缴各项费用和违约金，并不承担任何责任。<span
              lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            （六）若非双方另行约定，乙方提供的宽带接入线路最多限定<span lang="EN-US">X</span
            >个终端上网使用，未经乙方书面同意，甲方不得私自组网连接其他终端设备。<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            （七）甲方退网时，甲方租赁或乙方免费提供给甲方使用的终端设备，应归还乙方或按照甲乙双方相关约定处理。<span
              lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            （八）甲方在欠费情况下，乙方有权拒绝为甲方开办其他业务（含移网、固网、宽带等所有业务），直至甲方补交全部欠费及违约金。<span
              lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            （九）乙方在受理业务（服务）后，将进行线路资源核查，对于不具备开通条件的，在乙方告知甲方后，本协议自动终止，乙方退还甲方已交纳费用，但不承担其他责任。<span
              lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            （十）在固定电话开通并正常使用前（含新装、移机、改号等），甲方不能将已选中号码通知他人或进行宣传，否则由此所造成的后果及损失，由甲方自行承担。<span
              lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            （十一）甲方所办理的数据业务下行速率标称值仅为乙方提供的数据业务下行速率最高值，乙方不能保证在任何情况下均能达到标称值，甲方对此表示知悉并认可。<span
              lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            （十二）按照公平使用原则，乙方将对甲方的移动数据流量进行降速或封顶限制。甲方每月的移动数据流量达到降速条件时，乙方可对甲方当月的上网服务降速，次月自动恢复；甲方每月的移动数据流量达到或超出流量封顶额度时，乙方可暂停甲方当月的上网服务，次月自动恢复。<span
              lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            （十三）甲方未付的通信费用达到信用额度时（信用额度是指用户可以用于透支消费的最高通信费用额度），应及时补充交纳通信费用；当甲方未付的通信费用超过信用额度时，乙方有权暂停甲方网络服务（超过信用额度停机不受约定交费期限的限制）。<span
              lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            （十四）甲方发送违法、违反公序良俗内容的信息，或未经接收客户同意大量发送商业广告等其他骚扰信息、拨打骚扰电话等不当行为，以及利用乙方提供的服务从事违法犯罪活动的，乙方有权依据行业主管部门、有关行政、司法机关的指令、客户等第三方举报或投诉，以及乙方制定的为保障公众利益的规范，关闭甲方信息发送功能，或暂停直至服务，由此造成的后果由甲方承担。<span
              lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            （十五）因甲方原因造成的通信卡密码丢失、锁卡或被他人获取造成的损失，乙方不承担责任，甲方不能以此为由拒绝按本协议约定支付通信费用。<span
              lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            （十六）为了更好地为甲方提供与本套餐相关的服务，甲方同意由乙方将甲方的电话号码等信息提供给乙方合作的第三方。<span
              lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            第五条 违约责任<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            （一）一方违约给对方造成损失的，应当依法承担赔偿责任，但违约方应承担的赔偿损失的责任范围不包括守约方未实现的预期利润或利益、商业信誉的损失、丢失的数据本身及因数据丢失引起的损失、守约方对第三方的责任及其他间接损失。<span
              lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            （二）因不可抗力导致本协议部分或全部不能履行的，双方可部分或全部免除责任。<span lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            第六条 协议的变更与解除<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            （一）乙方在本协议外以公告、使用手册、资费单页等书面形式公开做出的服务承诺，甲方办理各类业务所签署的表单、业务协议、须知等均自动成为本协议的补充协议；与本协议冲突部分以补充协议为准，补充协议中未约定部分以本协议为准。<span
              lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            （二）甲方要求终止服务（双方另有约定的除外）申请办理拆机或销户的，如甲方预存费用不足，则应按照乙方要求预存一定数额的通信费，次月按照乙方业务规定和双方约定结清相关费用。<span
              lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            （三）有下列情形之一的，乙方有权单方解除协议，收回号码或账号并终止服务，并保留追究甲方违约责任的权利：<span
              lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US">1</span>、甲方提供的有效证件（包括代理人<span lang="EN-US">/</span
            >经办人提供的有效身份证件）虚假、不实；<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US">2</span>、甲方自行安装未取得入网许可或可能影响网络安全或网络服务质量设备的；<span
              lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US">3</span
            >、甲方以担保等方式取得号码使用权的，如担保人违反保证条款或有确切证据证明担保人无能力履行保证责任的；<span
              lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US">4</span>、甲方未办理相关手续，自行改变电信业务使用性质或私自转让租用权的；<span
              lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US">5</span>、甲方欠费停机后<span lang="EN-US">3</span>个月仍未交清通信费用和违约金的<span
              lang="EN-US"
              >;<o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US">6</span>、业务（服务）超过约定有效期的；<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US">7</span>、该号码被国家司法机关认定用于违法犯罪活动或其它不当用途的；<span lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US">8</span>、乙方收到国家行政管理部门通知要求停止甲方服务的；<span lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US">9</span>、产品在约定期限内未开通、激活的；<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US">10</span>、违规外呼、呼叫频次异常的；<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US">11</span>、法律法规规定的其他情形。<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            （四）因技术进步或国家政策等原因导致本协议（部分或全部）无法继续履行的，乙方保留对电信业务（服务）做出调整的权利，调整前乙方应按照有关规定发布公告并提出相应解决方案。甲方可就解决方案与乙方协商，但不得要求乙方继续履行本协议。<span
              lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            第七条 协议争议<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            有关协议争议，双方可沟通协商解决；协商不成的，甲方可向当地通信管理局或消费者协会申请进行调解；任何一方均可向乙方住所地的人民法院起诉。<span
              lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            第八条 协议生效<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            在本协议签约页面点击确认签署本协议前，请确保您已充分阅读并完全同意本协议内容，一旦您点击确认签署本协议，即表明您已充分阅读并完全同意本协议内容，本协议即在您与乙方（中国联合网络通信有限公司<span
              lang="EN-US"
              >____________</span
            >分公司）之间产生法律效力。如果您不同意本协议的任意内容，或者无法准确理解乙方（中国联合网络通信有限公司<span
              lang="EN-US"
              >____________</span
            >分公司）对条款的解释，请不要进行后续操作。本协议一式两份，甲乙双方各执一份，有效期一年。协议到期后，双方如无异议，有效期以一年为周期自动顺延。<span
              lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            中国联通客户腾讯王卡移网业务优惠活动业务协议<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            甲方：<span lang="EN-US"> ____________<o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            乙方：中国联合网络通信有限公司<span lang="EN-US"><span style="mso-spacerun:yes"> </span>____________</span
            >分公司<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            本协议作为《中国联通客户入网服务协议》的补充协议，甲乙双方在平等自愿、公平诚信的基础上，基于对乙方腾讯王卡移网通信服务的了解和需求，达成协议如下：<span
              lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            第一条
            甲方所选择的腾讯王卡移网业务套餐及相关资费、移网业务优惠活动及协议期限等内容详见腾讯王卡电子业务受理单和腾讯王卡的<span
              lang="EN-US"
              >“</span
            >王卡助手<span lang="EN-US">”</span>官方微信公众号。<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            第二条
            甲方自愿参加乙方的腾讯王卡（卡内套餐包含大王卡、地王卡、天王卡和小王卡）移网业务优惠活动。腾讯王卡移网业务优惠活动是指乙方通过<span
              lang="EN-US"
              >“</span
            >提供专属优惠权益、存费送费、赠送业务或礼品<span lang="EN-US">”</span
            >等方式向甲方提供各类优惠通信产品。专属优惠权益包括阶段性免费体验、存费送费、存费送业务、乙方与第三方合作活动、特定条件下专属流量免费、靓号免预存款等。只有甲方在协议期内（协议期详见腾讯王卡电子业务受理单）连续在网使用乙方通信服务的情况下，甲方方可享受乙方提供的各项优惠政策、免费体验活动及优惠权益赠送。甲方参加乙方与第三方合作活动、特定条件下赠送流量等专属优惠权益活动等，需遵守乙方与第三方有关活动规则。腾讯王卡有上网流量<span
              lang="EN-US"
              >“40GB</span
            >封顶限制<span lang="EN-US">”</span>，甲方每月套餐内、外上网流量累计使用到达<span lang="EN-US">40GB</span
            >时，乙方将自动关闭上网功能，次月自动打开。如已<span lang="EN-US">“</span>解除流量封顶<span lang="EN-US"
              >”</span
            >业务，当月超过<span lang="EN-US">40G</span
            >的所有流量（包括免费专属流量）均按照超出套餐流量计费（流量日租宝）。<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            第三条 使用条件<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            （一）乙方提供的阶段性免费体验，以新入网首月赠款等方式实现。新入网赠款可抵扣首月月费，免费体验套餐内包含的内容，超出套餐内容按实际业务收费（不含国际业务、港澳台业务和第三方合作<span
              lang="EN-US"
              >SP</span
            >业务所产生的费用）。因本产品为阶段性体验产品，新入网当月及次月内不能使用话费订购或点播<span lang="EN-US"
              >SP</span
            >业务，新入网第三个月<span lang="EN-US">1</span>日起，可以订购和点播<span lang="EN-US">SP</span
            >业务。新入网首月内不能办理停机保号业务、不能办理更换为非腾讯王卡卡内套餐的套餐变更，新入网次月<span
              lang="EN-US"
              >1</span
            >日起，可以办理停机保号、更换为非腾讯王卡卡内套餐的套餐变更。<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            （二）本协议中甲方预存款可延期消费。乙方赠送的话费用于抵扣甲方消费的通信费用（不含国际业务、港澳台业务和第三方合作<span
              lang="EN-US"
              >SP</span
            >业务所产生的费用），可延期消费，不可退还。<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            （三）如甲方因新入网首次充值获得乙方赠送的话费，实际话费将先按首次充值的话费与首次充值赠送的话费进行<span
              lang="EN-US"
              >1:1</span
            >扣费。赠送的话费不含国际业务、港澳台业务和第三方合作<span lang="EN-US">SP</span
            >业务所产生的费用。腾讯王卡新入网首次充值因获得了赠费或权益，首次预存款、首月赠送的话费均不可退还。<span
              lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            （四）甲方须按时缴清当月的通信费。<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            （五）甲方需按照乙方提供的使用说明对专属号卡进行激活、绑定和使用，如未按使用说明操作造成甲方无法享受特定条件下专属流量
            免费活动，责任由甲方承担。<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            （六）甲方参加乙方的特定条件下专属流量免费活动时，需保证通信服务处于正常使用的状态。如因逾期欠费停机等原因造成甲方通讯服务中断期间，无法参与特定条件下专属流量免费活动；甲方如申请办理停机保号业务，乙方停止专属赠送流量活动，收取停机保号费，不再收取套餐月费。甲方当月办理恢复开机业务后，乙方当月恢复提供的特定条件下专属流量免费活动；如甲方在次月或次月之后办理恢复开机业务，仅从甲方办理恢复开机业务所在月起开始恢复特定条件下专属流量免费活动权益。
            甲方停机保号期间的专属赠送流量活动不再追补。<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            （七）甲方若没有使用靓号，在有套餐变更为非腾讯王卡卡内套餐（含携号转网）的需求时，则视为甲方放弃本协议中约定的套餐的专属优惠权益。甲方如使用靓号，在靓号协议期内不允许办理停机保号、不降低月承诺通信费。若靓号月承诺通信费与套餐有差异，以<span
              lang="EN-US"
              >“</span
            >就高<span lang="EN-US">”</span>原则处理。如甲方办理靓号过户，新客户需重新签订靓号入网协议。<span
              lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            （八）如甲方互转腾讯王卡卡内套餐（卡内套餐包含大王卡、地王卡、天王卡），将不享受转后的套餐的入网首月免月费、入网赠送国内通话分钟数、入网充值赠费的优惠服务。具体套餐变更限制，以<span
              lang="EN-US"
              >“</span
            >王卡助手<span lang="EN-US">”</span>官方微信公众号公布为准。<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            （九）腾讯应用专属流量免费范围以<span lang="EN-US">“</span>王卡助手<span lang="EN-US">”</span
            >官方微信公众号公布为准。<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            第四条 违约责任及承担<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            （一）甲方违约责任<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US">1</span>、甲方在协议期内发生欠费行为，则甲方构成违约。<span lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US">2</span>、对于因逾期欠费导致停机满<span lang="EN-US">3</span
            >个月的，乙方有权对甲方用户号码进行销户。<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US">3</span
            >、甲乙双方一致确认，甲方出现本协议所述的违约情形时，甲方应向乙方支付违约金以补偿乙方的损失，乙方保留对甲方追缴欠费和违约金的权利。违约金包括但不限于：因用户欠费发生的逾期付款违约金，以及乙方在本协议中所给予甲方的优惠等。<span
              lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            （二）乙方违约责任<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            乙方构成违约的，应按《中华人民共和国电信条例》及其他有关规定，承担违约责任。<span lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            第五条 协议生效<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            本协议自业务受理之日起生效，有效期一年。本协议到期时，如甲乙双方均未提出对套餐资费的修改要求，将继续执行本协议约定的套餐资费。<span
              lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            关于客户个人信息收集、使用规则的公告<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            尊敬的客户：<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            根据《中华人民共和国反恐怖主义法》、《全国人民代表大会常务委员会关于加强网络信息保护的决定》、《电信和互联网用户个人信息保护规定》（工业和信息化部令第<span
              lang="EN-US"
              >24</span
            >号）和《电话用户真实身份信息登记规定》（工业和信息化部令第<span lang="EN-US">25</span
            >号）等国家法律法规的要求，客户在中国联合网络通信有限公司各类营业网点（含自有营业厅、手机营业厅、网上营业厅、授权合作代理商等）办理固定电话、移动电话（含无线上网卡）入网、过户以及需要出示客户证件的有关业务时，客户应配合出示有效证件原件并进行查验、登记，登记信息包括姓名、证件类型、号码及地址等。同时，为更好地提供服务，需要客户提供如联系人、联系电话、通信地址、电子邮箱等信息。客户本人持有效证件可通过自有营业厅查询和<span
              lang="EN-US"
              >/</span
            >或更正本人信息，或登录手机营业厅查询本人信息。<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            如客户拒绝依法提供个人有效证件及真实信息，我公司有权不提供服务或终止服务。<span lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            为向客户提供优质、个性化的服务，包括但不限于提供通信服务、保障通信服务安全、改善服务质量、推介个性化产品等，我公司将遵循合法、正当、必要的原则，按照法律法规规定和<span
              lang="EN-US"
              >/</span
            >或协议约定使用留存客户个人信息，并妥善保管，严格保密，依法保护客户个人信息，非因下列事由，不对外泄露客户个人信息：<span
              lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US">a)<span style="mso-spacerun:yes"> </span></span>事先获得客户的明确授权；<span
              lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US">b)<span style="mso-spacerun:yes"> </span></span>根据有关的法律法规要求；<span
              lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US">c)<span style="mso-spacerun:yes"> </span></span>按照相关司法机关和<span lang="EN-US"
              >/</span
            >或政府主管部门的要求；<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US">d)<span style="mso-spacerun:yes"> </span></span>为维护社会公众的利益所必需且适当；<span
              lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US">e)<span style="mso-spacerun:yes"> </span></span
            >为维护我公司或客户的合法权益所必需且适当。<span lang="EN-US"><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            （甲方承诺：本人已经充分、完整阅读并理解本协议所述全部条款及条件。如申请或使用乙方提供的业务，即视为您已阅读并同意受本协议的约束。）<span
              lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            甲方：<span lang="EN-US"> ____________<o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            乙方：中国联合网络通信有限公司<span lang="EN-US"> ____________</span>分公司<span lang="EN-US"
              ><o:p></o:p
            ></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            甲方用户号码：<span lang="EN-US"> ____________<o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            <span lang="EN-US"><span style="mso-spacerun:yes"> </span><o:p></o:p></span>
          </p>

          <p class="MsoNormal">
            签署日期：<span lang="EN-US"> 2019</span>年<span lang="EN-US"><span style="mso-spacerun:yes"> </span></span
            >月<span lang="EN-US"><span style="mso-spacerun:yes"> </span></span>日<span lang="EN-US"
              ><span style="mso-spacerun:yes"> </span></span
            >签署日期：<span lang="EN-US"> 2019</span>年<span lang="EN-US"><span style="mso-spacerun:yes"> </span></span
            >月<span lang="EN-US"><span style="mso-spacerun:yes"> </span></span>日
          </p>
        </div>
      </div>
    </van-popup>
    <van-popup v-model="showChoiceArea" position="bottom">
      <van-area
        title=""
        :area-list="areaList"
        :value="defaultAreaCode"
        @confirm="choiceArea"
        visible-item-count="10"
        @cancel="cancelAreaSel"
      />
    </van-popup>
  </div>
</template>

<script>
import { areaList } from '@/assets/js/addressCode.js'
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
      checked: false,
      ruwang_show: false,
      baohu_show: false,
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
      price: 1,
      assets_id: process.env.VUE_APP_ASSETSID
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
  methods: {
    cancelAreaSel() {
      this.showChoiceArea = false
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
        }
      }
      // this.showChoiceArea = true
    },
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
      } else if (!this.checked) {
        this.$toast({
          message: '请同意协议信息'
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
        this.submit_order()
          .then(res => {
            if (res.errcode === 0) {
              _baq.track('form', { assets_id: this.assets_id, product_name: '联通王卡', product_price: 100 })
              // _baq.track('customer_effective', {
              //   assets_id: '1725970543551491',
              //   product_name: '联通王卡',
              //   product_price: 100
              // })

              if (typeof call_pay === 'function' && this.need_pay === 'true') {
                console.log(this.price)
                call_pay(this.price, res => {
                  if (res.status === 1) {
                    this.$toast({
                      message: '订单提交成功'
                    })
                    if (typeof navigateTo === 'function' && process.env.VUE_APP_NAVTO == 'true') {
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
                if (typeof navigateTo === 'function' && process.env.VUE_APP_NAVTO == 'true') {
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
<style lang="scss" scoped></style>
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

.xieyi_box {
  color: #4a6dfe;
  width: 90%;
  margin-left: 5%;
  font-size: 90%;
}

.xieyi_content {
  // width: 90%;
  padding: 10px;
  text-align: left;
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
  animation: warn 0.5s ease-in;
  -webkit-animation: warn 0.5s ease-in;
  -moz-animation: warn 0.5s ease-in;
  /*规定动画无限次播放*/
  -webkit-animation-iteration-count: infinite;
  -moz-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
}

@keyframes twinkle {
  0% {
    opacity: 0.8;
  }
  100% {
    opacity: 0;
  }
}
</style>
