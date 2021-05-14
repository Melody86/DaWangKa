var commonCheck = window.commonCheckFill;
var Area = window.allAreaNew;
// 提交订单状态
var subStatus = true;
// 判断地市是否为新疆
var provinceXJ = '';
// 所在地区是否重置
var curCity = '';
// 保存初始化号码
var initNum;
// 获取成功返回后的tendencyId
var tendenceId = '';
var reqData = '';
// 主卡信息
var mainCardInfo;
// 成功弹框文案展示标识
var successFlag = true;
// 是否线上购现场购
var disFlag;
// 省份是否可切换号码归属
var changePflag;
// 是否小程序首页进入的订单
var smallRoutineFlag;
var req = {};
var needyzm=GetRequest()['needyzm'] || 1;

var clickQ=GetRequest()['clickQ'] || 1;

var agreeBoolBtn = GetRequest()['agreeBoolBtn'] || 1;
// 获取连接
var hasSmsCode = GetRequest()['hasSmsCode'] || 0;

req.postInfo = {};
req.postInfo.webProvince = 440000;


if($("#yeNum").val() != 'wkxhRed19'){
  $("#address").attr({'readonly':'readonly '});//选择地址默认无法输入
}else{
  $("#address").removeAttr('readonly')
}

if(GetRequest()['cityCode']==510){
  $('#apply-yzm').hide();
}

// var ceUrl='https://sandbox.scymob.com/weapp-pddk/';
var ceUrl='../';


// alert('下单链接--'+ ceUrl);
var goodsId="981610241535";
var postareal='';
var newNumer='';//选择的号码
var gd=GetRequest()['gd'] || 0;

var agreementBool=true;  //用户协议

$(".biY").on('click',function(){
  $("#mobilePhone").val('')
	$('.dingDiv').hide();
})
$(".dingDiv1").on('click',function(ev){
  $("#mobilePhone").val('')
	$('.dingDiv').hide();
	stopBubble(ev);
})
$(".xyDiv").on('click',function(ev){
	$('.xyDiv').hide();
})

if(needyzm == 0){
	$('#apply-yzm').hide();
}

// 判断是否默认勾选协议
if(agreeBoolBtn==0){
  agreementBool = false;
  $('.xieImg').hide();
  $('.yuan').addClass('inBorder');
  $('.btn').addClass('inColor');
  $('.yuan').css({'width':'0.95rem','height':'0.95rem'});
}




$('#mobilePhone').keyup(function(e){
  if ($("#mobilePhone").val().length >= 10) {
	$('.sapplyId').fadeIn();
  }
})


if(gd == 1){
  $('#post-province li').hide();
  $('#post-province li.selected').show();
}


// 红色页面不同选号样式
var yeStr='';
 if($("#yeNum").val() == 'wkxhRed19'){
  yeStr =$("#yeNum").val();
 }






$(".yuan").on('click',function(){
	// agreementBool =! agreementBool;
	if(agreementBool){
		$('.xieImg').hide();
		$('.yuan').addClass('inBorder');
		$('.btn').addClass('inColor');
		$('.yuan').css({'width':'0.95rem','height':'0.95rem'});
    agreementBool = false;
	}else{
		$('.xieImg').show();
		$('.yuan').removeClass('inBorder');
    $('.btn').removeClass('inColor');
    if(yeStr){
      $('.yuan').css({'width':'0.9rem','height':'0.9rem'});
    }else{
      $('.yuan').css({'width':'1.1rem','height':'1.1rem'});
    }
    agreementBool = true;
	}
})



$(".clickSuo").on('click',function(){
  $("#search").val($(this).html());
  $("#search-btn").click();
})

 

$(function () {
	
	$.fn.GL = function (options) {
	    var dataop = {
	        ocolor:'red',
	        oshuru:'高亮',
	    };
	    var chuancan = $.extend(dataop,options);
	    $(this).each(function()//先遍历，清除上一次的样式
	    {
	        var _this = $(this)
	        _this.find($(".glnow")).each(function()//找到所有highlight属性的元素；
	        {
	            $(this).css({color:""});//将他们的属性去掉；
	        });
	    });
	    if(chuancan.oshuru==''){
	        return false;
	    }else{
	        var regExp = new RegExp("(" + chuancan.oshuru.replace(/[(){}.+*?^$|\\\[\]]/g, "\\$&") + ")", "ig");//创建正则表达式，g表示全局的，如果不用g，则查找到第一个就不会继续向下查找了；
	        $(this).each(function()//遍历文章；
	        {
	            var _this1 = $(this)
	            var html = _this1.html();
	            var newHtml = html.replace(regExp, '<span class="glnow" style="color:'+chuancan.ocolor+'">'+chuancan.oshuru+'</span>');//将找到的关键字替换，加上highlight属性；
	            _this1.html(newHtml);//更新文章；
	        });
	    }
	}
	
	
	
$("#delivery .p-content").text('广东' + ' ' + '深圳市');	
if(yeStr){
  $("#delivery .p-content").text('请选择区/县');	
}

$(".addcitcy").text('广东');	
$(".addcitcy1").text('广东');	

if(clickQ != 1){
  $('#delivery .p-content').text('请选择区/县').addClass('grey');
}
	
  // 姓名特殊字符转化
  $('#certName').keyup(function(e)  {
    var _this = $(e.currentTarget);
    _this.val($.wordChange(_this.val()));
  });
  $.resize();
  // 初始化参数
  var initParam = $.getUrlParam();
  // 判断是否有参数t,来自小程序的订单,如果有则提交订单的参数增加这两者
  if (initParam.t) {
    req.t = initParam.t;
    req.openId = initParam.openId;
  }
  initParam.goodsId = initParam.goodsId?initParam.goodsId:goodsId;
  
  
  // true为小程序首页进入, false为码上购小程序分享
  if (initParam.miniprogram) {
    smallRoutineFlag = true;
  } else {
    smallRoutineFlag = false;
  }
  // 腾讯王卡展示：选号别纠结，以后可以免费换号 提示
  var txGoods = $.isTest() ? ['981609180703', '981801120053', '981702226311'] : ['981802085690', '981702278573', '981610241535'];
  if(txGoods.indexOf(initParam.goodsId) >= 0){
    $('.numTips').show();
  } else {
    $('.search-btn,.search-close-btn').css({
      top:0
    });
  }
  // 判断是否是哔哩哔哩卡
  var isBili = ['981703130259', '981703130260', '981703130261', '981703239394', '981703239395', '981703239396'];
  if(isBili.indexOf(initParam.goodsId) >= 0){
    isBili = false;
  } else {
    isBili = false;
  }
  // popup弹框展示
  var popupShow = function(text){
    $('.numErrorTips').show().html(text);
    setTimeout(function () {
      $('.numErrorTips').hide();
      $.reScroll();
    }, 3000)
  };
  // if (initParam.sceneFlag.substr(0,2) == '02') {
  //   disFlag = false;
  //   req.snFlag = '0';
  //   $('#submit').html('立即提交');
  // } else if (initParam.sceneFlag.substr(0,2) == '03') {
    disFlag = true;
    // $('#submit').html('0元领取，包邮到家');
  // }
  if (!disFlag) {
    $('#postDistrict').hide();
  }
  // 主卡信息
  if(initParam.isMainSubFlag == '1'){
    mainCardInfo = JSON.parse(localStorage.getItem('mainCardInfo'));
    /*    var mainCardInfo = {
          province:'11',
          city:'110',
          mainCardNum: '18201695415',
          mainCardName: 'wzb',
          mainCardId: 'wzb'
        };*/
    $('.mainNum').text('（主卡号码：' + mainCardInfo.mainCardNum + '）');
  }
  // 号码查询参数
  var numberParam = {};
    numberParam.size = 10;//显示条数
  // 并发请求限制
  var requestFlag = false;
  // 有遮罩层时禁止滚动
  var noScroll = function () {
    $('html, body').addClass('no-scroll');
  };
  var reScroll = function () {
    $('html, body').removeClass('no-scroll');
  };
  // 顶部描述
  initParam.productName = GetRequest02()['productName'];
  var _topText = '根据国家实名制要求, 请准确提供身份证信息';
  var _fillDesc = initParam.productName || localStorage.getItem('product_name');
  $('#fill-desc').find('span').text(decodeURIComponent(_fillDesc));
  // 设置产品信息
  var setProduct = function () {
    $('#top-desc').show().text(_topText);
  };
  $('.privacy').css('width', ($(window).width() / 0.75) + 'px');
  // 请求参数初始化
  var setReq = function () {
    req.numInfo = {};
    // 如果链接没有省份地市,则初始化的省份地市为北京
    if (initParam.p) {
      req.numInfo.essProvince = initParam.p;
    } else {
      req.numInfo.essProvince = "11";
    }
    if (initParam.c) {
      req.numInfo.essCity = initParam.c;
    } else {
      req.numInfo.essCity = "110";
    }
    req.goodInfo = {};
    req.goodInfo.goodsId = initParam.goodsId;
    req.goodInfo.sceneFlag = initParam.sceneFlag.substr(0,2);
  };
  
  // 生成号码列表
  var listNumber = function () {
	 $(".haoDiv").empty();
    if (numberParam.list.length == 0) {
      $('.haoDiv').html('抱歉没有匹配的号码.<span class="error-code">'+number.code+'</span>').show();
      return;
    }
    var _start = (numberParam.current - 1) * numberParam.size;
    var _end = _start + numberParam.size;
    if (numberParam.current == numberParam.max) {
      _end = numberParam.list.length;
    }
	var priceArr=['39','69','79','89','99','49','29','89','79','39'];
    var numberHtml = [];
    for (var i = _start; i < _end; i += 1) {
		 
      var numberObj = numberParam.list[i];
	  numberObj.price=priceArr[Math.ceil(Math.random()*10)-1];
      if (numberObj.niceRule == 0) {
        if(!yeStr){
          $('.haoDiv').append(`
          <div class="xDiv"  data-phone='${numberObj.phone?numberObj.phone:numberObj.number}'>
            <div style="width: 100%;height: 100%;position: relative;display: flex;justify-content: center;align-items: center;flex-wrap: wrap;">
              <img src="https://cdn.scymob.com/weapp-pddk/weapp-wk02/images/bannel5.png" style="width: 13%;height: auto;position: absolute;top: 0;left: 4%;" />
             <div style="display: flex;justify-content: center;flex-wrap: wrap;">
             	<span style="font-size: 1.04rem;color: #000000;display: inline-block;padding-left: 1.2rem;" class="glTex">${numberObj.number}</span>
             	<div style="text-align: start;width:52%;">
             		<span style="font-size: 0.65rem;color: #FF0000;text-decoration:line-through;display: block;margin-left:0.1rem">靓号费:¥${numberObj.price}</span>
             	</div>
             </div>
              <img class="yinXuan" src="https://cdn.scymob.com/weapp-pddk/weapp-wk02/images/bannel6.png" style="width: 1.4rem;height: 1.4rem;position: absolute;bottom: 0;right: 0;display: none;" />
            </div>
          </div>
        `);
			var otext = $("#search").val();
			$('.glTex').GL({
			  ocolor:'red',   //设置关键词高亮颜色
			  oshuru:otext   //设置要显示的关键词
			});
        }else{
          $(".haoDiv").append(`<P class="haoNei" data-phone="${numberObj.phone?numberObj.phone:numberObj.number}">${numberObj.number}</p>`);
		  var otext = $("#searchNumber").val();
		  $('.haoNei').GL({
		    ocolor:'red',   //设置关键词高亮颜色
		    oshuru:otext   //设置要显示的关键词
		  });
        }
      } else {
        if(!yeStr){
          $('.haoDiv').append(`
            <div class="xDiv"  data-phone='${numberObj.phone?numberObj.phone:numberObj.number}'>
              <div style="width: 100%;height: 100%;position: relative;display: flex;justify-content: center;align-items: center;flex-wrap: wrap;">
                <img src="https://cdn.scymob.com/weapp-pddk/weapp-wk02/images/bannel5.png" style="width: 13%;height: auto;position: absolute;top: 0;left: 4%;" />
				<div style="display: flex;justify-content: center;flex-wrap: wrap;">
					<span style="font-size: 1.04rem;color: #000000;display: inline-block;padding-left: 1.2rem;" class="glTex">${numberObj.number}</span>
					<div style="text-align: start;width:52%;">
						<span style="font-size: 0.65rem;color: #FF0000;text-decoration:line-through;display: block;margin-left:0.1rem">靓号费:¥${numberObj.price}</span>
					</div>
				</div>
                <img class="yinXuan" src="https://cdn.scymob.com/weapp-pddk/weapp-wk02/images/bannel6.png" style="width: 1.4rem;height: 1.4rem;position: absolute;bottom: 0;right: 0;display: none;" />
              </div>
            </div>
        `);
			var otext = $("#search").val();
			$('.glTex').GL({
			  ocolor:'red',   //设置关键词高亮颜色
			  oshuru:otext   //设置要显示的关键词
			});
        }else{
          $(".haoDiv").append(`<P class="haoNei" data-phone="${numberObj.phone?numberObj.phone:numberObj.number}">${numberObj.number}</p>`);
		  var otext = $("#searchNumber").val();
		  $('.haoNei').GL({
		    ocolor:'red',   //设置关键词高亮颜色
		    oshuru:otext   //设置要显示的关键词
		  });
        }
        
      }   
	  
	  
	  if($('.newTan').is(':visible')){
		  $(".haoNei").eq(0).addClass("xuanBorder").siblings().removeClass('xuanBorder');
		  $("#numberPhone").attr("value",$(".haoNei").eq(0).data("phone"));
		  $("#numberPhone").text(newNumer);
		  newNumer=$(".haoNei").eq(0).data("phone");
	  }
    }

    // 选择号码
    $(".haoNei").on('click', function () {   
        $(".haoNei").eq($(this).index()).addClass("xuanBorder").siblings().removeClass('xuanBorder');
      newNumer=$(this).data("phone");
      console.log(newNumer)
      $("#numberPhone").text(newNumer);
    }) 
    
    // 选择号码
    $('.xDiv').on('click', function () {   
        if($('.deliveryTitle').text() =='请选择区/县'){
          return addConmentHtmlDome('请选择区/县')
        }
        $('.yinXuan').hide();
        $('.addphone').text($(this).data("phone"));
        $('.yinXuan').eq($(this).index()).show();
        $('.dingDiv ').fadeIn();
    })
    numberParam.current += 1;
    // $('.haoDiv').append(numberHtml);
  };
  
  // 隐藏选号弹框
  $('.xuanYing').click(function() {
    $('.newTan').fadeOut();
  });

  var getLocationNumberFalse = false;
  // 解析号码
  function decompress(number) {
    $('.number-loading').hide();
    var mlist = ['M2', 'M3', 'M4', 'M5'];
    var _key = $('#search').data('val');
    if (number.numArray.length == 0) {
      if ($.inArray(number.code, mlist) > -1) {
        $('.haoDiv').html('当前网络不给力，请在wifi或其他网络环境下重试！<span class="error-code">'+number.code+'</span>').show();
      } else if (($.inArray(number.code, mlist) == -1)) {
        if (commonCheck.isEmpty(_key)) {
          if(getLocationNumberFalse) {
            return $('.haoDiv').html('当前网络不给力，请在wifi或其他网络环境下重试！').show();
          }
          getLocationNumber();
        } else {
          $('.haoDiv').html('抱歉没有匹配的号码.<span class="error-code">'+number.code+'</span>').show();
          $('#refresh').text('换一批');
        }
      }
      return;
    }
    $('.haoDiv').show();
    numberParam.list = [];
    numberParam.current = 1;
    var numArray = number.numArray;
    for (var i = 0; i < numArray.length; i += 12) {
      var numberObj = {};
      numberObj.advanceLimit = numArray[i + 1];
      numberObj.niceRule = numArray[i + 5];
      numberObj.monthLimit = numArray[i + 6];
      if (commonCheck.isEmpty(_key)) {
        numberObj.number = numArray[i];
        numberParam.list.push(numberObj);
      } else {
        var len = 11 - _key.length;
        // if (numArray[i].toString().substring(len) == _key) {
          numberObj.number = numArray[i];
		      numberObj.phone =numArray[i];
          numberParam.list.push(numberObj);
        // }
      }
    }
    numberParam.max = Math.ceil(numberParam.list.length / numberParam.size);
    $.shuffle(numberParam.list);
    listNumber();
  }
  // 初始化号码查询参数
  var setNumberParam = function () {
    numberParam.list = [];
    numberParam.current = 1;
    numberParam.size = 10;
    numberParam.max = 1;
  };
  // 初始化号码
  var setNumber = function (isSearch) {
    $('.number-list, .no-number').hide();
    $('.number-loading').show();
    var setProvinceCode = selectPhoneCode.Scode || GetRequest()['provinceCode'] || 510,  // GetRequest()['p']
        setCityCode = selectPhoneCode.code || GetRequest()['cityCode'] || 540;  // GetRequest()['c']
	
	// 默认地址
	
	selectPhoneCode.s = '广东';
	selectPhoneCode.c = '深圳';
	
	
	
    var param = {
      provinceCode: setProvinceCode,
      cityCode: setCityCode,
      monthFeeLimit: 0,
      goodsId: selectPhoneCode.Scode + initParam.goodsId.substr(2),
      searchCategory: 3,
      net: '01',
      amounts: 200,
      codeTypeCode: '',
      searchValue: $('#search').data('val')?$('#search').data('val'):'',
      qryType: '02',
      goodsNet: 4,
      channel: 'msg-xsg'
    };
    if(isSearch){
      param.searchType = '02';
    } else{
      param.searchValue = '';
    }
	$(".haoDiv").empty();$('.haoDiv').html('加载中...');
    if (!commonCheck.isEmpty(param.goodsId)) {
	  $('.number-list, .no-number').hide();
	  $('.number-loading').show();
	  var _currentP_code = $('#post-province-phone li.selected').attr('pro-code');
    var _currentC_code = $('#post-city-phone li.selected').attr('data-code');
    
		var searchValuen=$('#search').val()?$('#search').val()+"":'';
		if($("#yeNum").val() == 'wkxhRed19'){
			console.log('12333',$('#searchNumber').val())
			searchValuen=$('#searchNumber').val()?$('#searchNumber').val()+"":'';
		}

     if(GetRequest()['cityCode']==510){
          var searchType = "";
          var searchValue = "";
          if(searchValuen!='' && searchValuen !=undefined){
            searchType = '02';
            searchValue = searchValuen+"";
          }
          $.post('../proxy/selectNum',{
            provinceCode:setProvinceCode+"",
            cityCode:setCityCode+"",
            qryType:'02',
            goodsId:selectPhoneCode.Scode + initParam.goodsId.substr(2)+"",
            searchType:searchType,
            searchValue:searchValue,
            amounts:200
          },
          function(res){
            if(res.body){
                var numberData = res.body;
                initNum = numberData;
                getLocationNumberFalse = false;
                decompress(numberData);
            }else{
               $('.haoDiv').html('抱歉没有匹配的号码.<span class="error-code">'+number.code+'</span>').show();
              $('#refresh').text('换一批');
              $('.number-list, .number-loading').hide();
            }
          });
     }else{
       $.post(ceUrl+'proxy1/selectNum',{
          provinceCode:_currentP_code+"",
          cityCode:_currentC_code+"",
          goodsId:selectPhoneCode.Scode + ($.getUrlParam().goodsId?($.getUrlParam().goodsId.substr(2)+""):goodsId.substr(2)+""),
          // initParam.goodsId?initParam.goodsId:goodsId
          searchValue:searchValuen,
          },
          function(res){
          if(res.body){
            var numberData = res.body;
            initNum = numberData;
            getLocationNumberFalse = false;
            decompress(numberData);
          }else{
             $('.haoDiv').html('抱歉没有匹配的号码.<span class="error-code">'+number.code+'</span>').show();
          }
          
          });
          
          }
     }
	  
  };

  $('#certNo').keyup(function(e){
    // $('.addphone').text($(this).data("phone"))
  
    var certName = $("#certName").val(),contractPhone = $("#mobilePhone").val(),wkData={};
    var u = GetRequest()['u']|| "";
    var number =$('.addphone').text();
  
    if(certName.length>=2 && contractPhone.length == 11 &&number.length!=0) {
        wkData.certName = certName;
        wkData.contractPhone = contractPhone;
        wkData.qkChannel = GetRequest()['qkc'] || GetRequest()['channel'];
        wkData.webid = GetRequest()['webid'] || 9;
        wkData.goodsId = goodsId;
        wkData.uuid = uuids;
        wkData.number = number;
        wkData.p = selectPhoneCode.Scode || GetRequest()['p'] || GetRequest()['provinceCode'];
        wkData.c = selectPhoneCode.code || GetRequest()['c'] || GetRequest()['cityCode'];
        wkData.cardName =  $(".addcitcy").text();
        wkData.u = u;
        $.ajax({
            type: 'post',
            url: '../ltWkApplicationNumberHistory/postMessage',
            data: wkData,
            dataType: 'json',
            success: function (res) {
                console.log(res)
            }
        })
    }
  
  
  })



  function getLocationNumber() {
    $.ajax({
        type: 'get',
        url: 'https://mini.scymob.com/weapp-pddk/ltTencentWk/getNumberRedisData',
        data: {
          goodsId: GetRequest()['goodsId'],
          pCode: selectPhoneCode.Scode || GetRequest()['p'] || GetRequest()['provinceCode'],
          cCode: selectPhoneCode.code || GetRequest()['c'] || GetRequest()['cityCode'],
        }, //参数 json格式
        dataType: 'jsonp',
        jsonp: 'callback',
        jsonpCallback: 'jsonp_queryMoreNums',
        success: function(numberData)  {
          getLocationNumberFalse = true;
          initNum = numberData;
          decompress(numberData);
        },
    });
}
  // 点击错误提示消失
  $('.p-content').find('input').click(function(e)  {
    var _this = $(e.currentTarget);
    var par = _this.parents('li');
    var isError = par.hasClass('error');
    if (isError) {
      par.removeClass('error');
      $('#top-desc').removeClass('error').text(_topText);
    }
  });
  $('.p-text-area').click(function () {
    if ($('#delivery-desc').hasClass('error')) {
      $('#delivery-desc').removeClass('error');
      $('#top-desc').removeClass('error').text(_topText);
    }
  });
  $('#delivery').click(function(e)  {
    if ($(e.currentTarget).hasClass('error')) {
      $('#delivery').removeClass('error');
      $('#top-desc').removeClass('error').text(_topText);
    }
  });
  // 提交前校验
  var verify = function () {
    $('li.error').removeClass('error');
    if (!commonCheck.CustCheck.checkReceiverName($('#certName').val())) {
      return false;
    } else if (!commonCheck.CustCheck.checkIdCard($('#certNo').val())) {
      return false;
    } else if (!commonCheck.CustCheck.checkPhone($('#mobilePhone').val())) {
      return false;
    } else if (!commonCheck.CustCheck.checkNumAddress($('#location .p-content').text())) {
      return false;
    } else if (!commonCheck.CustCheck.checkNumber($('#number .p-content').text())) {
      return false;
    } else if (disFlag) {
      if (!commonCheck.CustCheck.checkAddress($('#delivery .p-content').text())) {
        return false;
      } else if (!commonCheck.CustCheck.checkAddressInfo($('#address').val())) {
        return false;
      }
    }
    return true;
  };
  // 从缓存读取数据
  var loadDataFromCache = function () {
    var _cache = sessionStorage.getItem('ANT_CARD');
    if (!commonCheck.isEmpty(_cache)) {
      var _cacheObject = JSON.parse(_cache);
      if (commonCheck.isEmpty($('#certName').val())) {
        var _certInfo = _cacheObject.certInfo;
        $('#certName').val(_certInfo.certName);
        $('#certNo').val(_certInfo.certId);
        $('#mobilePhone').val(_certInfo.contractPhone);
      }
      var _post = _cacheObject.post;
      var _city = $('#post-city li[data-code='+_post.webCity+']');
      if (_city.length == 1) {
        cityChange(_post.webCity, _post.webCounty);
        $('#delivery .p-content').text('请选择区/县').addClass('grey');
        $('#address').val(_post.address);
        req.postInfo = _post;
      }
    }
  };
  // 现场受理省份地市初始化
  function sceneLocation(initReq) {
    var scenePro = [];
    scenePro = Area.PROVINCE_LIST.filter(function(p){
      return p.ESS_PROVINCE_CODE == initReq.numInfo.essProvince;
    })[0];
    var provinceList = [];
    provinceList.push('<li data-code='+scenePro.ESS_PROVINCE_CODE+' pro-code='+scenePro.PROVINCE_CODE+'>'+scenePro.PROVINCE_NAME+'</li>');
    $('#province').html(provinceList).find('li[data-code=' + initReq.numInfo.essProvince + ']').addClass('selected, org');
    var sceneCity = [];
    sceneCity = Area.PROVINCE_MAP[scenePro.PROVINCE_CODE].filter(function(c){
      return c.ESS_CITY_CODE == initReq.numInfo.essCity;
    })[0];
    var cityList = [];
    cityList.push('<li data-code='+sceneCity.ESS_CITY_CODE+' city-code='+sceneCity.CITY_CODE+'>'+sceneCity.CITY_NAME+'</li>');
    $('#city').html(cityList).find('li[data-code=' + initReq.numInfo.essCity + ']').addClass('selected, org');
  }
  // 邮寄信息初始化
  var setPost = function(initReq, data) {
    var postPro = [];
    if (data == undefined) {
      postPro = Area.PROVINCE_LIST.filter(function(p){return p.ESS_PROVINCE_CODE == initReq.numInfo.essProvince;})[0];
    } else {
      postPro = Area.PROVINCE_LIST.filter(function(p){return p.ESS_PROVINCE_CODE == data;})[0];
    }
    var _cityList = [];
    Area.PROVINCE_MAP[postPro.PROVINCE_CODE].forEach(function(c)  {
      _cityList.push('<li data-province-name='+postPro.PROVINCE_NAME+'  data-code='+c.CITY_CODE+' data-ess-code='+c.ESS_CITY_CODE+'>'+c.CITY_NAME+'</li>');
    });
    // $('#post-city').html(_cityList);
    var postCity = Area.PROVINCE_MAP[postPro.PROVINCE_CODE];
    if (postCity == undefined) {
      postCity = Area.PROVINCE_MAP[postPro.PROVINCE_CODE][0];
    }
    // console.log(Area.PROVINCE_MAP)
    var _districtList = [];
    // Area.CITY_MAP[postCity.CITY_CODE].forEach(function(d)  {
    //   _districtList.push('<li data-code=' + d.DISTRICT_CODE+'>' + d.DISTRICT_NAME+'</li>');
    // });
    // $('#post-district').html(_districtList);
    req.postInfo.webProvince = postPro.PROVINCE_CODE;
    req.postInfo.webCity = postCity.CITY_CODE?postCity.CITY_CODE:req.postInfo.webCity;

  };
  // 获取默认省份地市
  var getLocation = function(locations) {
    var defaultProvince = $('#province li[data-code=' + req.numInfo.essProvince + ']').text();
    var defaultCity = $('#city li[data-code=' + req.numInfo.essCity + ']').text();
    if(initParam.c == '713'){
      $('#location .p-content').text(defaultProvince +' 天门/仙桃/潜江市').removeClass('grey');
    }else{
      $('#location .p-content').text(defaultProvince + ' ' + defaultCity).removeClass('grey');
    }
    var postProvinceList = [];
    locations.PROVINCE_LIST.forEach(function(d) {
      postProvinceList.push('<li data-code=' + d.ESS_PROVINCE_CODE + '  pro-code='+d.PROVINCE_CODE + '>' + d.PROVINCE_NAME + '</li>');
    });
    $('#post-province').html(postProvinceList).find('li[data-code=' + req.numInfo.essProvince + ']').addClass('selected');
    // if (isBili) {
    //   $('#post-province li').hide();
    //   $('#post-province .selected').show();
    // }
  };
  var city = [];
  var province = [];
  // 省份切换
  function provinceChange(pCode, provinceCode, cityCode) {
    $('#province li, #city li').removeClass('selected org');
    $('#province').find('li[data-code=' + provinceCode + ']').addClass('selected org');
    var cityList = [];
    city[pCode].forEach(function(c) {
      cityList.push('<li data-code='+c.ESS_CITY_CODE+'>'+c.CITY_NAME+'</li>');
    });
    $('#city').html(cityList);
    if (!commonCheck.isEmpty(cityCode)) {
      $('#city').find('li[data-code=' + cityCode + ']').addClass('selected org');
    }
  }
  // 省份地市初始化
  function setLocation(locations, initReq) {
    city = locations.PROVINCE_MAP;
    var provinceList = [];
    locations.PROVINCE_LIST.forEach(function(p) {
      provinceList.push("<li data-code='"+p.ESS_PROVINCE_CODE+ "' pro-code=" + p.PROVINCE_CODE +">" + p.PROVINCE_NAME+"</li>");
    });
    $('#province').html(provinceList).find('li[data-code=' + initReq.numInfo.essProvince + ']').addClass('selected');
    var proCode = $('#province').find('.selected').attr('pro-code');
    provinceChange(proCode, req.numInfo.essProvince, req.numInfo.essCity);
  }
  // 改变邮寄省份
  var provincePostList = function (_coda) {
    var provinceList = [];
    if (province != '') {
      province.PROVINCE_LIST.forEach(function(p) {
        if (p.PROVINCE_CODE != '89' && p.PROVINCE_CODE != '79') {
          provinceList.push('<li data-code='+p.ESS_PROVINCE_CODE+'>'+p.PROVINCE_NAME+'</li>');
        }
      });
    }
    if (_coda == 89) {
      provinceList.length = 0;
      provinceList.push('<li data-code='+_coda+'>新疆</li>');
    } else if (_coda == 79) {
      provinceList.length = 0;
      provinceList.push('<li data-code='+_coda+'>西藏</li>');
    }
    $('#post-province').html(provinceList).find('li[data-code=' + _coda + ']').addClass('selected');
    // if (isBili) {
    //   $('#post-province li').hide();
    //   $('#post-province .selected').show();
    // }
  };
  // 改变邮寄省份
  function provinceChangePost(provinceCode, cityCode) {
    $('#post-province').find('li[data-code=' + provinceCode + ']').addClass('selected');
    var postPro = Area.PROVINCE_LIST.filter(function (p) {
      return p.ESS_PROVINCE_CODE === '' + provinceCode;
    })[0];
    var cityList = [];
    Area.PROVINCE_MAP[postPro.PROVINCE_CODE].forEach(function (c) {
      cityList.push('<li data-code=' + c.CITY_CODE + ' data-ess-code=' + c.ESS_CITY_CODE + '>' + c.CITY_NAME + '</li>');
    });
    $('#post-city').empty();
    $('#post-city').html(cityList);
    if (!commonCheck.isEmpty(cityCode)) {
      $('#post-city').find('li[data-code=' + cityCode + ']').addClass('selected');
    }
  }
  // 改变号码归属地省份
  function provinceChangePostPhone(provinceCode, cityCode) {
    $('#post-province-phone').find('li[data-code=' + provinceCode + ']').addClass('selected');
    var provinceName = $('#post-province-phone li.selected').text();
    var pCode = GetRequest()['p'] || GetRequest()['provinceCode'];
    var cCode = GetRequest()['c'] || GetRequest()['cityCode'];
    var postPro = Area.PROVINCE_LIST.filter(function (p) {
      return p.ESS_PROVINCE_CODE === '' + provinceCode;
    })[0];
    var cityList = [];
    
    if(pCode == provinceCode) {
      for(var i=0;i<Area.PROVINCE_MAP[postPro.PROVINCE_CODE].length;i++) {
        if(Area.PROVINCE_MAP[postPro.PROVINCE_CODE][i].ESS_CITY_CODE==cCode) {
          cityList.push('<li data-code=' + Area.PROVINCE_MAP[postPro.PROVINCE_CODE][i].CITY_CODE + ' data-ess-code=' + cCode + '>' + provinceName + '</li>');
        }
      }
    } else {
      Area.PROVINCE_MAP[postPro.PROVINCE_CODE].forEach(function (c) {
        cityList.push('<li data-code=' + c.CITY_CODE + ' data-ess-code=' + c.ESS_CITY_CODE + '>' + c.CITY_NAME + '</li>');
      });
    }
    $('#post-city-phone').empty();
    $('#post-city-phone').html(cityList);
    if (!commonCheck.isEmpty(cityCode)) {
      $('#post-city-phone').find('li[data-code=' + cityCode + ']').addClass('selected');
    }
  }
  // 归属地地市切换
  function cityChangePhone(cityCode, districtCode) {
    $('#post-city-phone li, #post-district-phone li').removeClass('selected');
    $('#post-city-phone').find('li[data-code=' + cityCode + ']').addClass('selected');
    console.log(cityCode)
    var _districtList = [];
    Area.CITY_MAP[cityCode].forEach(function (d) {
      _districtList.push('<li data-code=' + d.DISTRICT_CODE + '>' + d.DISTRICT_NAME + '</li>');
    });
    $('#post-district-phone').html(_districtList);
    if (!commonCheck.isEmpty(districtCode)) {
      $('#post-district-phone').find('li[data-code=' + districtCode + ']').addClass('selected');
    }
    $("#post-phone").removeClass("slip");
    // $(".mask").fadeOut();
  }
  // 邮寄地市切换
  function cityChange(cityCode, districtCode) {
    $('#post-city li, #post-district li').removeClass('selected');
    $('#post-city').find('li[data-code=' + cityCode + ']').addClass('selected');
    console.log(cityCode,'aaa',!commonCheck.isEmpty(districtCode),districtCode)
    
    var _districtList = [];
    Area.CITY_MAP[cityCode].forEach(function (d) {
      _districtList.push('<li data-code=' + d.DISTRICT_CODE + '>' + d.DISTRICT_NAME + '</li>');
    });
    $('#post-district').html(_districtList);
    if (!commonCheck.isEmpty(districtCode)) {
      $('#post-district').find('li[data-code=' + districtCode + ']').addClass('selected');
    }
  }
  var setProvince = function(data) {
    province = data;
  };
  // 页面初始化
  function init() {
    setReq();
    setProduct();
    setNumberParam();
    loadDataFromCache();
    setProvince(Area);
    if (disFlag&&changePflag) {
      setLocation(Area, req);
      $('#location .p-content').removeClass('arr');
    } else {
      sceneLocation(req);
    }
    getLocation(Area);
    setPost(req);
  }
  // 小程序填写页初始化
  function smallRoutineInit() {
    setReq();
    setProduct();
    setNumberParam();
    loadDataFromCache();
    setProvince(Area);
    setLocation(Area, req);
    $('#location .p-content').removeClass('arr');
    getLocation(Area);
    setPost(req);
  }
  // 页面初始化请求
  var pageInit = function () {
    var param = {
      provinceCode:initParam.p
    };
    var succCallback = function (data) {
      if (data.rspCode == '0000') {
        if (data.rspBody.provinceSwitch == '0') {
          changePflag = false;
        } else {
          changePflag = true;
        }
        init();
      } else {
        // $('#overtime,.mask').show();
      }
    };
    var errorCallback = function (error) {
      // $('#overtime,.mask').show();
    };
    console.log(req,'2000000000')
    // $._ajax('true','post', '/query-server/provinceswitch/queryProvinceSwitch', param, 'json', succCallback, errorCallback);
  };
  // 根据小程序的标记,判断页面初始化走哪个逻辑
  if (smallRoutineFlag) {
    smallRoutineInit();
  } else {
    pageInit();
  }
  // 省份切换
  $('#province').on('click', 'li', function(e)  {
    var _this = $(e.currentTarget);
    var _proCode = _this.attr('pro-code');
    var _code = _this.data('code');
    _this.addClass('selected org').siblings('li').removeClass('selected ord');
    // req.numInfo.essProvince = _this.data('code') + '';
    provinceChange(_proCode, _code);
  });
  // 地市切换
  $('#city').on('click', 'li', function(e) {
    var _currentP = $('#province li.selected');
    var _this = $(e.currentTarget);
    _this.addClass('selected, org').siblings('li').removeClass('selected, org');
    if(_this.data('code') == '713'){
      $('#location .p-content').text(_currentP.text()+' 天门/仙桃/潜江市').removeClass('grey');
    } else {
      $('#location .p-content').text(_currentP.text()+' '+_this.text()).removeClass('grey');
    }
    req.numInfo.essProvince = _currentP.data('code') + '';
    req.numInfo.essCity = _this.data('code') + '';
    $('#area').removeClass('slip');
    $('#number .p-content').text('');
    provinceXJ = _currentP.text();
    $('#delivery-desc').show();
    if (curCity != _this.text()) {
      $('#delivery .p-content').text('请选择区/县').addClass('grey');
      curCity = _this.text();
    }
    var _code = $('#province li.selected').data('code');
    provincePostList(_code);
    setPost(req);
    setTimeout(function () {
      $('.mask').unbind('click').hide();
      reScroll();
    }, 300);
    $('.numberTips').hide();
    if ($(e.currentTarget).hasClass('error')) {
      $('#location').removeClass('error');
      $('#top-desc').removeClass('error').text(_topText);
    }
  });

  $('#go-protocol').on('click', function (ev) {
	  
	  $('.xyDiv').show();
    // 查看协议
    // ev.preventDefault()
    // var urlName = window.location.href.split('.com/')[0] + '.com/';
    // if (window.location.href.indexOf('.cn/') !=-1) {
    //     urlName = window.location.href.split('.cn/')[0] + '.cn/';
    // }
    // window.location.href=  urlName + 'landing/txt/dwk.html'

  });
  // 关闭弹出层
  $('.popup-close').on('click', function(e) {
    var _this = $(e.currentTarget);
    var closeType = _this.attr('data-type');
    $('.popup, .mask').hide();
    reScroll();
    if (closeType == '4') {
      if(window.AGXB != undefined){
        if ($.isAndroid()) {
          AGXB.pushIn({ "url":location.origin +"/newMsg/sale/html/sale.html?type=1??showHomeButton=1"});
        } else {
          AGXB.pushIn({ "url":location.origin +"/newMsg/sale/html/sale.html?type=1??bleEnabled=1&facialEnabled=1&showHomeButton=1"});
        }
      } else {
        window.history.back(-1);
      }
    }
  });
  
  setNumber();
  // 号码弹出层
  $('#number').on('click', function () {

    console.log(yeStr,'2222')
    if(yeStr){
		if($('.deliveryTitle').html() != '请选择区/县'){
			$('.newTan').show();
			setNumber();
		}else{
			return addConmentHtmlDome('请选择所在地区');
		}
		console.log($('.deliveryTitle').html())
    }else{
      setNumber();
    }
  });
  // 刷新号码
  $('#refresh').on('click', function () {
    if (numberParam.current > numberParam.max) {

      // 重新获取号码
      setNumber();
      return;
    }
    listNumber();
  });
  // 号码搜索
  $('#search-btn').on('click', function () {
    var _key = $('#search').val().trim();
    $('#search').data('val', _key);
    // $('#search-btn').hide();
    $('#search-close-btn').show();
    if (!commonCheck.isEmpty(_key)) {
      setNumber(true);
    } else {
      setNumber();
    }
  });

  $('.huanList').click(function() {
    var _key = $('#searchNumber').val().trim();
    $('#searchNumber').data('val', _key);
    // $('#search-btn').hide();
    $('#search-close-btn').show();
    if (!commonCheck.isEmpty(_key)) {
      setNumber(true);
    } else {
      setNumber();
    }
  })
  // 关闭搜索
  $('#search-close-btn').on('click', function () {
    $('#search').data('val', '').val('');
    $('#search-btn').show();
    $('#search-close-btn').hide();
    setNumber();
  });
  // 搜索框监控
  $('#search').on('keyup', function(e) {
    var _this = $(e.currentTarget);
    var _preKey = _this.data('val');
    if ('' + _preKey != _this.val().trim()) {
      $('#search-btn').show();
      $('#search-close-btn').hide();
    }
    setNumber();
    // if (_this.val().trim() == '') {
    //   _this.data('val', '');
    //   setNumber();
    // }
  });
  
  
  // 2搜索框监控
  $('#searchNumber').on('keyup', function(e) {
    var _this = $(e.currentTarget);
    var _preKey = _this.data('val');
    if ('' + _preKey != _this.val().trim()) {
      $('#search-btn').show();
      $('#search-close-btn').hide();
    }
    setNumber();
    // if (_this.val().trim() == '') {
    //   _this.data('val', '');
    //   setNumber();
    // }
  });
  
  
  
  // 号码预占
  var occupyNumber = function(number, rule, month)  {
    $('.mask, #number-popup, .occupyTips').hide();
    reScroll();
    requestFlag = false;
    $('#number .p-content').text(number);
    // req.numInfo = {}
    // req.numInfo.number = number;
    if (rule == '1' && month != '0') {
      $('.numberTips').show().find('i').text(month);
    } else {
      $('.numberTips').hide();
    }
   
  };
  // 选择号码
  $('.number-list').on('click', 'a', function(e)  {
    var adLimit = parseInt($(this).attr('data-advancelimit')) || 0;
    if (adLimit > 0) {
      popupShow('对不起，您选择的号码已被预定，<br />请重新选择号码!');
      return;
    }
    var _number = $(e.currentTarget).text().replace('靓', '');
    var niceRule = $(e.currentTarget).attr('data-niceRule');
    var monthLimit = $(e.currentTarget).attr('data-monthLimit');
    if (!requestFlag) {
      occupyNumber(_number, niceRule, monthLimit);
    }
  });
  // 号码被预占,重新选择号码
  $('#reselect-number').on('click', function () {
    $('#search-btn').show();
    $('#search-close-btn').hide();
    setNumber();
    $('#error').hide();
    $('#number-popup').show();
  });
  // 配送地市弹出层
  $('#delivery').on('click', function () {
    

    if(!yeStr){  //选择号码两列
      $('#post-province').show();
      $('#post-city').show();
      $('#post-district').hide();
      $('#post').css({'width':'16.875rem'});
    }else{
      $('#post-district').show('');
    }


    if (commonCheck.CustCheck.checkNumAddress($('#location .p-content').text())) {
      // cityChange(req.postInfo.webCity, req.postInfo.webCounty);
      var _mask = $('.mask');
      _mask.show();
      noScroll();
      $('#post').addClass('slip');
      _mask.one('click', function () {
        $('#post').removeClass('slip');
        var pli = GetRequest()['p']  || GetRequest()['provinceCode'];
        var cli = GetRequest()['c'] || GetRequest()['cityCode'];
        var postdis = $('#post-district li.selected').attr('data-code');
		var postcity = $('#post-city li.selected').attr('data-code');
		if(!postdis || !postcity){
		  $('#post').removeClass('slip');
		  $('#post-province li').removeClass('selected')
		  $('#post-city li').removeClass('selected')
		  $('#post-district li').removeClass('selected')
		  $('#post-province-phone li').removeClass('selected')
		  $('#post-city-phone li').removeClass('selected')
		  $('#post-province li[data-code=' + pli + ']').click();
		  $('#post-city li[data-ess-code=' + cli + ']').click();
		  $('#delivery .p-content').text('请选择区/县').addClass('grey');
		  $("#location .p-content").text('请选择号码归属地')
		}else{
		  sentProvinceChangePost()
		}
		
		if($("#yeNum").val() == 'wkxhRed19'){
			if(!($("#searchNumber").val()) || $("#searchNumber").val()=='请选择号码'){
				$('#number .p-content').text('请选择号码').removeClass('grey');
			}
		}
        req.postInfo.webCounty = 0;
        setTimeout(function () {
          _mask.hide();
          reScroll();
        }, 300);
      });
    }
  });

  $('.delivery1').on('click', function () {

    if(!yeStr){  //选择号码两列
      $('#post').css({'width':'11.875rem'});
      $('#post-province').hide('');
      $('#post-city').hide('');
    }else{
      // $('#post-district').show('');
    }
    
    var _mask = $('.mask');
    _mask.show();
    noScroll();
    $('#post').addClass('slip');
    $('#post-district').show('');
    _mask.one('click', function () {
    $('#post').removeClass('slip');
      // req.postInfo.webCounty = 0;
        setTimeout(function () {
          _mask.hide();
          // reScroll();
        }, 300);
    })


  })


  

  // 号码归属地省份切换
  $('#post-province-phone').on('click', 'li', function(e)  {
    var _this = $(e.currentTarget);
    var _code = _this.data('code');
    _this.addClass('selected').siblings('li').removeClass('selected');
    provinceChangePostPhone(_code);
    // setPost(req, _code);
    selectPhoneCode.Scode = $("#post-province-phone li.selected").attr('data-code');
    selectPhoneCode.s = $("#post-province-phone li.selected").text();
	
    $('#number .p-content').text('');
  });
  $('#post-city-phone').on('click', 'li', function(e)  {
    var _this = $(e.currentTarget);
    var _code = _this.data('code');
    _this.addClass('selected').siblings('li').removeClass('selected');
    cityChangePhone(_code);
    selectPhoneCode.code = $("#post-city-phone li.selected").attr('data-ess-code');
    selectPhoneCode.c = $("#post-city-phone li.selected").text();
    $("#location .p-content").text(selectPhoneCode.s + ' ' + selectPhoneCode.c)
	  $(".addcitcy").text(selectPhoneCode.s);
	  $(".addcitcy1").text(selectPhoneCode.c);
    $('#number .p-content').text('');
    $('#top-desc').hide();
    $('#location').removeClass('error');
	setNumber();
  });
  // 邮寄省份切换
  $('#post-province').on('click', 'li', function(e)  {
    $('#post-city li, #post-district li').removeClass('selected');
    var _this = $(e.currentTarget);
    var _code = _this.data('code');
    _this.addClass('selected').siblings('li').removeClass('selected');
    provinceChangePost(_code);
    setPost(req, _code);
	  sentProvinceChangePost();
  });
  // 邮寄地市切换
  $('#post-city').on('click', 'li', function(e)  {
    // alert(111)

    var _this = $(e.currentTarget);
    var _code = _this.data('code');
    _this.addClass('selected').siblings('li').removeClass('selected');
    cityChange(_code);
    sentProvinceChangePost();
    setNumber();
    

    if(!yeStr){  //选择号码两列
      $('#post').removeClass('slip');
      setTimeout(function () {
        $('.mask').unbind('click').hide();
        reScroll();
      }, 300);
    }else{

    }

    var _currentP = $('#post-province li.selected');
    var _currentC = $('#post-city li.selected');
    $('#delivery .p-content').text(_currentP.text() + ' ' + _currentC.text()).removeClass('grey');

    
  });
  // 邮寄区县切换
  $('#post-district').on('click', 'li', function(e)  {
    var _currentP = $('#post-province li.selected');
    var _currentC = $('#post-city li.selected');
    var _this = $(e.currentTarget);
    if (_currentC.length != 0) {
      _this.addClass('selected').siblings('li').removeClass('selected');
      $('#delivery .p-content').text(_currentP.text() + ' ' + _currentC.text() + ' '+ _this.text()).removeClass('grey');
      if(!yeStr){//两列
        $('.deliveryTitle').text(_currentP.text() + ' ' + _currentC.text() + ' ').removeClass('grey');
      }else{
        $('.deliveryTitle').text(_currentP.text() + ' ' + _currentC.text() + ' '+ _this.text()).removeClass('grey');
      }
	  
	  if($("#yeNum").val() == 'wkxhRed19'){
		if(!($("#searchNumber").val()) || $("#searchNumber").val()=='请选择号码'){
				$('#number .p-content').text('请选择号码').removeClass('grey');
			}
		}
	  
      req.postInfo.webCity = _currentC.data('code') + '';
      req.postInfo.webCounty = _this.data('code') + '';
      $('#post').removeClass('slip');
      if ($('#post-district li.selected').length != 0) {
        $('#delivery').removeClass('error');
        $('#top-desc').text(_topText).removeClass('error');
      }
	  $('.guiDiv1').css("border","1px solid #E7CB98");
    $('.delivery1').css("border","0");
    sentProvinceChangePost();
    if($("#yeNum").val() != 'wkxhRed19'){
      $("#address").removeAttr('readonly').focus();
      setTimeout(function () {
        $('.mask').unbind('click').hide();
        $("#address").removeAttr('readonly').focus();
        reScroll();
      }, 300);
    }else{
      setTimeout(function () {
        $('.mask').unbind('click').hide();
        reScroll();
      }, 300);
    }

    
      
    }
  });
  // 同意入网协议
  $('#protocol').on('click', function(e)  {
    var _this = $(e.currentTarget);
    if (_this.hasClass('agree')) {
      $('#submit').addClass('disable');
      _this.removeClass('agree');
    } else {
      $('#submit').removeClass('disable');
      _this.addClass('agree');
    }
  });    
  
  
  // 选择邮寄地址自动选择选号地址
    function sentProvinceChangePost(){
      postareal='';
      var lpid = $('#post-province-phone li.selected').attr('data-code');
      var lcid = $('#post-city-phone li.selected').attr('data-ess-code');
      var postprovince = $('#post-province li.selected').attr('data-code');
      var postcity = $('#post-city  li.selected').attr('data-ess-code');
      var postarea = $('#post-district li.selected').attr('data-code');
      postareal = $('#post-district li.selected').attr('data-code');
      var locationarea = $('#location .p-content').text();

      $(".addcitcy").text($('#post-province-phone li.selected').text());	
      $(".addcitcy1").text($('#post-city-phone li.selected').text());	
      // console.log(`归属地前：${lpid} , ${lcid}`)
      // console.log(`归属地后：${postprovince} , ${postcity} , ${postarea}`)
      // console.log(`归属名称 ：${locationarea}`)
      if(postprovince == GetRequest()['p'] || postprovince == GetRequest()['provinceCode']){
         postcity = GetRequest()['c'] ||  GetRequest()['cityCode'];
      }
      if(postprovince && postcity){
        if(lpid != postprovince || postcity != lcid ){
          $('#post-province-phone li[data-code=' + postprovince + ']').click();
          $('#post-city-phone li[data-ess-code=' + postcity + ']').click();
        }
        if(lpid == postprovince && postcity == lcid && postarea && locationarea=='请选择号码归属地'){
          $('#post-province-phone li[data-code=' + postprovince + ']').click();
          $('#post-city-phone li[data-ess-code=' + postcity + ']').click();
        }
      }
      // console.log("----------------------");
    }
  
  
  // 自提点参数
  var reqSince = {};
  // 自提点弹框
  var getSince = function () {
    reqSince.provinceCode = req.postInfo.webProvince;
    reqSince.cityCode = req.postInfo.webCity;
    reqSince.countyCode = req.postInfo.webCounty;
    reqSince.goodsId = req.goodInfo.goodsId;
  };
 
  // 提交参数准备
  var preSubmit = function(state)  {
    if (state) {
      req.postInfo.selfFetchCode = $('.since-content').find('input:checked').val();
    }
    req.certInfo = {};
    req.certInfo.certTypeCode = '02';
    req.certInfo.certName = $('#certName').val().trim();
    req.certInfo.certId = $('#certNo').val().trim();
    req.certInfo.contractPhone = $('#mobilePhone').val().trim();
    req.postInfo.address = $('#address').val().trim();
    req.u = initParam.u;
    if(initParam.channel){
      req.channel = initParam.channel;
    }
    var _cache = {};
    _cache.certInfo = req.certInfo;
    _cache.post = req.postInfo;
    sessionStorage.setItem('ANT_CARD', JSON.stringify(_cache));
    if(initParam.isMainSubFlag == '1'){
      req.familyCardInfo = {};
      req.familyCardInfo.mainFlag = '0';
      req.familyCardInfo.familyCardNumber =  mainCardInfo.mainCardNum;
    }
  };
  // 提交请求
  function submit() {
    $('.mask').hide();
    $('.subLoad').show();
    var succHtml;
    reqData = JSON.stringify(req);
    $.ajax({
      type: 'post',
      url: '/scene-buy/scene/buy',
      data: reqData,
      contentType: 'application/json',
      success: function(data)  {
        $('.subLoad').hide();
        if (data.rspCode == '0000') {
          $('#success, .mask').show();
          tendenceId = data.orderId;
          noScroll();
          if (disFlag) {
            if (successFlag) {
              succHtml = '<p class="point">我们将尽快为您配送，请在收到卡后的10天内激活使用，过期将被回收哦！';
              $('#success .point-list').empty().append(succHtml);
            } else {
              succHtml = '<p class="point">您的卡已在营业厅等待领取，营业员将会与您电话联系，请保持手机畅通！';
              $('#success .point-list').empty().append(succHtml);
            }
          } else {
            if (successFlag) {
              succHtml = '<p class="point">请在现场工作人员的指导下完成激活，否则无法使用哦！如您不在现场，我们会有专人联系您，请保持电话畅通！';
              $('#success .point-list').empty().append(succHtml);
            } else {
              succHtml = '<p class="point">您的卡已在营业厅等待领取，营业员将会与您电话联系，请保持手机畅通！';
              $('#success .point-list').empty().append(succHtml);
            }
          }
        } else if (data.rspCode == '0005') {
          $('#error, .mask').show();
          noScroll();
          $('#reserved-number').html('<span>' + $('#number .p-content').text() + '</span>号码已被抢占。');
        } else if (data.rspCode == '0009') {
          $.noScroll();
          $('#errorAll,.mask').show();
          if (data.rspDesc.length>21) {
            $('#errorAll .popup-desc').html('该营业厅未绑定发展人，不具备推广权限<br>暂无法下单！');
          } else {
            $('#errorAll .popup-desc').html('该营业厅不具备此产品的推广权限<br>暂无法下单！');
          }
        } else {
          $('#errorAll, .mask').show();
          noScroll();
          $('#errorAll .popup-desc').text(data.rspDesc);
        }
        $('#since').hide();
        subStatus = true;
        requestFlag = false;
      },
      error: function () {
        $('.subLoad').hide();
        $('#overtime, .mask').show();
        noScroll();
        $('#since').hide();
        subStatus = true;
        requestFlag = false;
      },
    });
  }
  function ageNumber(UUserCard) {
      var myDate = new Date();
      var month = myDate.getMonth() + 1;
      var day = myDate.getDate();
      var age = myDate.getFullYear() -   UUserCard.substring(6, 10) - 1;
      if (UUserCard.substring(10, 12) < month || UUserCard.substring(10, 12) == month && UUserCard.substring(12, 14) <= day) {
          age++;
      }
      if(age <= 0){
          age = 1;
      }
      return age;
  }
  // 提交
  var channelC = channel = GetRequest()['qkc'] || GetRequest()['channel'];
  // function gotoTrick () {
  //   window.location.href= "https://mini.scymob.com/landing/hudong_ads/trickTreat/?channel="+channelC;
  // }
  $("#adClickTirck").on('click', function (ev) {
    window.location.href= "https://mini.scymob.com/landing/hudong_ads/trickTreat/?channel="+channelC+"&adid=9";
  })
  $('#submit').on('click', function () {
    channel = GetRequest()['qkc'] || GetRequest()['channel'] ;
    channelC = channel;
    $('.loadingMask').show();
    var certName = $("#certName").val() //姓名
    ,certNo = $("#certNo").val()  //身份证
    ,mobilePhone = $("#mobilePhone").val() //联系手机号
    ,phoneLocation = $("#location .p-content").text() //号码归属地
    ,number = $(".addphone").text()  //选择的号码
    ,delivery = $("#delivery .p-content").text()  //省市区
    ,cardId = $("#fill-desc span").text()
    ,address = $("#address").val() //详细地址

    var appplayone = GetRequest()['appplayone'] || 0;
	if(!agreementBool){
		$('.loadingMask').hide();
		return addConmentHtmlDome('请勾选同意用户协议')	
	}
	if(!address) {
	  $('.loadingMask').hide();
	  return addConmentHtmlDome('请填写详细地址')
	}
    if(!certName) {
      $('.loadingMask').hide();
      return addConmentHtmlDome('请填写姓名')
    }
	if(!$.idCheck(certNo)&&channel!="alliminiapp") {
	  $('.loadingMask').hide();
	  return addConmentHtmlDome('请填写正确的身份证号码')
	}
	if(!commonCheckFill.checkMobiles(mobilePhone)) {
	  $('.loadingMask').hide();
	  return addConmentHtmlDome('请填写正确的手机号')
  }
  if(!postareal){
      $('.delivery1').css("border","1px solid red");
      $('.loadingMask').hide();
      return addConmentHtmlDome('请选择完整所在地')
    }
    if(!delivery) {
      $('.loadingMask').hide();
      return addConmentHtmlDome('请选择地址')
    }
    
    req.numInfo = {}
    req.goodInfo = {}
    req.certInfo = {}
    req.numInfo.essProvince = GetRequest()['p'] || GetRequest()['provinceCode'] || 51;
    req.numInfo.essCity = GetRequest()['c'] ||  GetRequest()['cityCode'] || 540 ;
    req.s = {
      essProvince: selectPhoneCode.Scode || req.numInfo.essProvince,
      essCity: selectPhoneCode.code || req.numInfo.essCity,
    };//用户选择号码归属地
    

    req.cid_src = GetRequest()['cid_src'] || "";
    req.jlqk_link = GetRequest()['jlqk_link'] || "";

    req.numInfo.number = number?number:newNumer;
    req.goodInfo.goodsId = GetRequest()['goodsId'] || goodsId;
    req.goodInfo.sceneFlag = "03";
    req.postInfo.address = address;
    req.certInfo.certTypeCode = '02';
    req.certInfo.certName = certName;
    req.certInfo.certId = certNo;
    req.certInfo.contractPhone = mobilePhone;
    req.u = GetQueryString('u');
    req.channel = GetRequest()['channel'];
    req.webid = GetRequest()['webid'] || 9;
    req.qkChannel = channelC;
    req.uuid = uuids;
    req.click_id = GetRequest()['click_id'];
    req.captchaInfo = {};
    req.captchaInfo.type = "00";
    req.captchaInfo.captcha = $("#captchaText").val();
    req.marketingStatus = "0";
    // req.referrer = decodeURIComponent(initParam.productName || localStorage.getItem('product_name'));
    req.referrer = '大王卡';
	  req.iscaptcha = (needyzm == 1?true:false);
	  req.captchaId = "";
    var isNotNextHtml = GetRequest()['isNotNextHtml'];
    // console.log(productName,123,req.referrer)
    if(req.referrer.indexOf('宝卡') != -1) {
      productName = '阿里宝卡'
    } else if(req.referrer.indexOf('王卡') != -1)  {
      productName = "腾讯大王卡"
    }
    if(req.postInfo.webCounty==0){
      $('.loadingMask').hide();
      return addConmentHtmlDome('请选择地址')
    }
    window._hmt.push(['_trackEvent', '提表单', productName, '渠道_'+channel]);
    window._hmt.push(['_trackEvent', '提表单_总', '广告', '渠道_'+channel]);
    window._hmt.push(['_trackEvent', '提表单_总_样式', referrer, '渠道_'+channel]);
    window._hmt.push(['_trackEvent', '提表单_样式', productName, referrer+'_渠道_'+channel]);
	// return
   if(GetRequest()['cityCode']==510){
      $.post('../proxy/stateNum',{
          provinceCode:req.s.essProvince+"",
          cityCode:req.s.essCity+"",
          serialNumber:req.numInfo.number+"",
          certNo:req.certInfo.certId+"",
      },function(res){
          console.log(res)
          if(res.code ==  0 && res.data && res.data.rspCode=="0000"){
              req.proKey = res.proKey;
              // 下单
              $.post('../proxy/ordersync',req,function(res){
                if(res.msg == 'success') {
                  window.show_dwk = res.data.show_dwk;
                  window.url_dwk = res.data.url_dwk;
                  $('.loadingMask').fadeOut();
                  if(res.data.success) {
                    window.track_ok();
                    window._hmt.push(['_trackEvent', '转化', productName, '渠道_'+channel]);
                    window._hmt.push(['_trackEvent', '转化_总', '广告', '渠道_'+channel]);
                    window._hmt.push(['_trackEvent', '转化_总_样式', referrer, '渠道_'+channel]);
                    window._hmt.push(['_trackEvent', '转化_样式', productName, referrer+'_渠道_'+channel]);
                    if(isKyy==1){
                        $("#get-grep1").show();   
                    }else{
                        $("#get-grep").show();
                    }
                   if(appplayone==1){
                        $.post('../alipay/webPayPreOrder',{
                              productCode:channelC,
                              returnUrl:'https://vip.qukufun.com/weapp-pddk/h5/url?afid=1997&zoneid=10ccd-7168fa15-605d4954-dda6-a025efee&channel=xyfzfbdwk'
                            },function(res){
                                if(res.code==0){
                                  var appData = ""
                                  appData = res.data.url ;
                                  addConmentHtmlDome('提交成功!稍后请留意手机短信或者来电，方便为你提供配送便捷的配送服务');
                                    setTimeout(function () {
                                      window.location.href = appData
                                    }, 2000)
                                    
                                }else{
                                    addConmentHtmlDome(res.error);
                                }
                      })

                     }
                      addConmentHtmlDome('提交成功!稍后请留意手机短信或者来电，方便为你提供配送便捷的配送服务');
                    }else{
                      addConmentHtmlDome(res.data.rspDesc);
                    }
                }
              })
          }else{
                var HtmlDome = "预占号码失败";
                if(res.data && res.data.rspDesc){
                    HtmlDome = res.data.rspDesc
                }
              $('#number .p-content').text('');
              $('.loadingMask').fadeOut();
              addConmentHtmlDome(HtmlDome);  
          }
      })
    }else{
      if(req.iscaptcha){
        if(!$("#captchaText").val()){
          $('.loadingMask').hide();
          return addConmentHtmlDome('请填写验证码');
        }
        // 校验验证码
        $.post(ceUrl+'proxy1/checkSMS',{contactNum: mobilePhone,certNo:certNo,safeCode:$("#captchaText").val()},function(data){
            if(data.success &&  data.data && data.captchaId ){
              req.captchaId = data.captchaId;
                // 身份校验
                $.post(ceUrl+'proxy1/checkuser', req ,function(res){
                    if(res.success && res.code=="0"){
                      // 下单
                      $.post(ceUrl+'proxy1/createOrder',req,function(res){
                        if(res.msg == 'success') {
                          window.show_dwk = res.data.show_dwk;
                          window.url_dwk = res.data.url_dwk;
                          $('.loadingMask').fadeOut();
                          if(res.data.success) {
                            window.track_ok();
                            window._hmt.push(['_trackEvent', '转化', productName, '渠道_'+channel]);
                            window._hmt.push(['_trackEvent', '转化_总', '广告', '渠道_'+channel]);
                            window._hmt.push(['_trackEvent', '转化_总_样式', referrer, '渠道_'+channel]);
                            window._hmt.push(['_trackEvent', '转化_样式', productName, referrer+'_渠道_'+channel]);
                            if(isKyy==1){
                                $("#get-grep1").show();   
                            }else{
                                $("#get-grep").show();
                            }
                            $("#mobilePhone").val('');
                            addConmentHtmlDome('提交成功!稍后请留意手机短信或者来电，方便为你提供配送便捷的配送服务');
                          }else{
                            addConmentHtmlDome(res.data.rspDesc);
                          }
                        }
                      })
                    }else{
                      $('.loadingMask').fadeOut();
                      addConmentHtmlDome(res.message);
                      
                    }
                })
            }else{
              $("#captchaText").val("")
              $('.loadingMask').hide();
              return addConmentHtmlDome('验证码错误')
            }
            
        })
      }else{
        $.post(ceUrl+'proxy1/checkuser', req ,function(res){
          if(res.success && res.code=="0"){
              // 下单
              $.post(ceUrl+'proxy1/createOrder',req,function(res){
                if(res.msg == 'success') {
                  window.show_dwk = res.data.show_dwk;
                  window.url_dwk = res.data.url_dwk;
                  $('.loadingMask').fadeOut();
                  if(res.data.success) {
                    window.track_ok();
                    window._hmt.push(['_trackEvent', '转化', productName, '渠道_'+channel]);
                    window._hmt.push(['_trackEvent', '转化_总', '广告', '渠道_'+channel]);
                    window._hmt.push(['_trackEvent', '转化_总_样式', referrer, '渠道_'+channel]);
                    window._hmt.push(['_trackEvent', '转化_样式', productName, referrer+'_渠道_'+channel]);
                    if(isKyy==1){
                        $("#get-grep1").show();   
                    }else{
                        $("#get-grep").show();
                    }
                    addConmentHtmlDome('提交成功!稍后请留意手机短信或者来电，方便为你提供配送便捷的配送服务');
                  }else{
                    addConmentHtmlDome(res.data.rspDesc);
                  }
                }
              })
          }else{
            $('.loadingMask').fadeOut();
            addConmentHtmlDome(res.message);
          }
        })
      }
    }
  });
  // 营业厅自提
  $('.sinceBtn').on('click', function () {
    if (subStatus) {
      preSubmit(true);
      successFlag = false;
      submit();
    }
  });
  // 不自提，物流配送
  $('.noSince').on('click', function () {
    if (subStatus) {
      preSubmit(false);
      successFlag = true;
      submit();
    }
  });
  // 自适应
  $(window).resize(function () {
    $.resize();
  });
  // 地址输入获取焦点
  $("#address").click(function(){
    
    if(!($('#post-district li.selected').attr('data-code'))){
      $('.delivery1').click();
    }else{
      $("#address").removeAttr('readonly');
    }

  });
  // 地址输入
  $('#address').on({
    keydown: function(e)  {
      if (e.keyCode == 13) {
        e.preventDefault();
      }
    },
    input: function(e)  {
      var _this = $(e.currentTarget);
      var _address = _this.val();
      var _height = $('#address-temp').text(_address).height();
      _this.css('height', _height);
    },
  });

  // 根据share_openid判断是否有"填写推荐人"框
  if (initParam.share_id == '' || initParam.share_id == undefined) {
    $('.referee').show();
    // 提交推荐人状态
    var refereeStatus = true;
    // 推荐信息填写
    $('.to-referee').click(function () {
      $('.to-referee').hide();
      $('.referee-message').show();
      $('.submit-referee').show();
    });

    // 校验推荐人信息
    var refereeInfo = function(info)  {
      if (info.length > 25) {
        return false;
      } else if (info.length == 0) {
        return false;
      }
      return true;
    };
    $('.referee-message').keyup(function () {
      if ($('.referee-message').val().trim() == '') {
        $('.submit-referee').addClass('grey');
      } else {
        $('.submit-referee').removeClass('grey');
      }
    });

    $('.submit-referee').click(function () {
      var info = $('.referee-message').val().trim();
      if (!refereeInfo(info)) {
        return;
      }
      if (refereeStatus) {
        refereeStatus = false;
        $.ajax({
          url: '/king/kingCard/referrerInfo',
          type: 'POST',
          data: {
            kingOrderId: tendenceId,
            referrerInfo: info,
            type: '2',
          },
          success: function(data)  {
            if (data.resultCode == '0000') {
              $('.referee-message').hide();
              $('.submit-referee').hide();
              $('.referee-error').hide();
              $('.referee-success').show();
              refereeStatus = true;
            } else {
              $('.referee-error').show();
              refereeStatus = true;
            }
          },
          error: function () {
            $('.referee-error').show();
            refereeStatus = true;
          },
        });
      }
    });
  } else {
    $('.referee').hide();
  }
});
function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}

  function clicked(){
    event.stopPropagation()
  }
  
  function stopBubble(e) {
      //如果提供了事件对象，则这是一个非IE浏览器
     if ( e && e.stopPropagation )
        //因此它支持W3C的stopPropagation()方法
        e.stopPropagation();
    else
    //否则，我们需要使用IE的方式来取消事件冒泡
      window.event.cancelBubble = true;
  }


  
