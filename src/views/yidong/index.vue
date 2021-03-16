<!-- 中国电信-电信星卡 -->
<template>
  <div class="yidong-index">
    <lucky-num></lucky-num>
    <fill-form></fill-form>

    <!-- 电信星卡-滚动部分 -->
    <div class="roll-notice">
      <div class="roll-content">
        <div class="notice-icon"></div>
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" vertical :show-indicators="false">
          <van-swipe-item>已有<span>373429</span>人免费领卡</van-swipe-item>
          <van-swipe-item>已有<span>373433</span>人免费领卡</van-swipe-item>
          <van-swipe-item>已有<span>373436</span>人免费领卡</van-swipe-item>
          <van-swipe-item>已有<span>373450</span>人免费领卡</van-swipe-item>
        </van-swipe>
        <!-- <p>已有<span>373219</span>人免费领卡</p> -->
      </div>
    </div>

    <!-- 电信星卡-底部图片部分 -->
    <div class="desc-box">
      <img src="../../assets/images/yidong/apply_preferential_policy.png">
      <img src="../../assets/images/yidong/apply_form_app_low2.png">
      <img src="../../assets/images/yidong/apply_form_verbose.png">
    </div>
    <img class="desc-box-zifei" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAABLCAMAAAAYjfKMAAAAOVBMVEUzRnT////k5ux3hKKSnLXW2uNOX4e7wdFca5Cgqb7y9PdAUn3JztpodpmttciFkKxHWYJvfZ6ao7oMp+hhAAAD9klEQVR42uzBgQAAAACAoP2pF6kCAAAAAAAAAAAAAAAAAGbPXpYUh2EogOrK8kt+APP/Hzt0bNIJndTUTMF0L3QWRClTrC6OIhtjjDHGGGOM+WchFHqBslYpFdrdGPNjMOSPf4jmpNdKUyk0XWqgoWl/lAy3/3VjfoyDQBa5yznHWL1nxSRz1ftAg0eloYLJ4m5+vKNAMjaYfezi1q4kKTjNEjPaAZBd3MUPAM/KkTHforlPiu4+NfrgRORyv4nAQWcfGNpGGcHLegfTLu4ZT2yXN9/F4wzTFqPS9Jz3tG7v62ViSC4lDAyZlb2ymre4uqhYaHWBDkQ/MQb/MOKd/QCo3wibvLvxjPDd3VXw/bN8rLTCiMgU0kKRRxHImDcQHVGfl190LjAioytqoa2IQ4ke0oWI/MGyg2c45vK8GMmYl2seQJUWrtfQpALgG51IDF8YkhQ+0EYJC0UPW7RXeQHoKBIRCSLDdTTJC6CO4kLGvJoD0ButWgdwErWLwhdiCCWGfv2SAOlvRzsdneEaLjaING8ngN5oxykOI1ciEB+BLBWoiYbqBwX8XiXKvGgnca8QhitOJkWUyd5VzWvd8OhKSvY+l0eDjtthhy+btAqAHmZ+z/A6YTw7SWI4hiM57PyNeaGrQq+jYtzxzLtCC20VYYDbLq2pAqit3KuFA2J6RpTcnY64t93gvozjpmVqk+ST7e7mLeK663Zo74q8NvSdNhIAlTS0libHgAaa6qgPMdxyORjMKDHsANX8B0Be89i3R50doC3RXIi/diqutu1bgN+pX+K+n8wscf/dzr3tqg0DURj2mviQg00o7/+wrSpkTMA7aQUtW/q/W3O5sJYmk4R0PSx2zwGvJaWax+RcUrjd1I/ruqY83WSZa5SnxX1/C6weDpJVs4g7Xm2SfL2bc64TyIt02dsN83eJHGdJQ2z4P467uWog7ni5pd3d+uVU5zW2PI17L85lls33FZy449OU24iwTNM1+WtnCGjdsrJKNppma8yUGXya9XHT9qJnY/cvunvMkkVnCqkRHuI+2WaJIG/iHioj7ngHLykPrhpyfc56tLsXKS3O2V6ZOWkjUGbwj/0wSZZ8OZ+LTyYpR1cd6u7rdag+DY3TNu4pbd8PKZu4x4q4402W090CcFhddaC794/v4+6DbKe7t4g73uXswzXxlorrSluu2r/dJSt7cU9VIO74bF909ygpLwwi8T2Mqac0qU1T56lrkibm7vguBvX4A909zhrc4bhHBpH4v6LvGY9096G443F3QZKxJImPtvroGqNfuz8cXav83nxf6n8i8hkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/lJ1FYIc06pK53AAAAAElFTkSuQmCC" alt="">
    <div @click="toTop" class="desc-box-bottom"><img src="../../assets/images/yidong/last-img.gif" alt="图片按钮" width="100%"></div>
  </div>
</template>

<script>
import luckyNum from './luckyNum';
import fillForm from './fillForm';
export default {
  name: 'YiDong',
  data() {
    return {}
  },
  components: {
    luckyNum,
    fillForm
  },
  methods: {
    handleScroll(e) {
      let scrolltop = e.target.scrollTop;
      scrolltop > 30 ? (this.gotop = true) : (this.gotop = false);
    },
    toTop() {
      let top = document.documentElement.scrollTop || document.body.scrollTop;
      // 实现滚动效果 
      const timeTop = setInterval(() => {
        document.body.scrollTop = document.documentElement.scrollTop = top -= 50;
        if (top <= 0) {
          clearInterval(timeTop);
        }
      }, 10);
    }
  }
}
</script>
<style lang="scss" scoped>
.yidong-index {
  text-align: center;
  background: #0b0b07;

  // 电信星卡-滚动部分
  .roll-notice{
    width: 100%;
    height: 75px;
    .roll-content{
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 25px;
      color: #fff;
      font-size: 15px;
      .notice-icon{
        width: 16.984px;
        height: 13.5px;
        margin-right: 5px;
        border: none;
        background-size: 100% 100%;
        background-position: center center;
        background-repeat: no-repeat;
        background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAbBAMAAADrHECUAAAAJFBMVEXWrnfWrnfWrnfWrnfWrnfWrnfWrnfWrnfWrnfWrnfWrnfWrnezzMu9AAAAC3RSTlMBYqpB9C2K4M5SGBfDmpAAAADISURBVBjTY4ABth0LgCSzugBMgLV7twEDA2f37gSYyJTdIBH23ZowgWW7nUAirKIIPTsWgkQQQGR3AiNCJDQ01Gi3JwNQBC4NBB4LgCKqUJHd7uXlRQIMQBGYxbsVQCRIxHsTuogRVBGUAplc7YWmxkB6J0OShhrDFoSI9Ubm3bu3oKkxlJyFYo4DmjmToJJbMNzjDXRzE8zNCH/tAPkrFeovLrDfK4EiuMIHMwzRwplhYgADalwweG+agBpfDDN2u6HFKYNRJwAsNlY7Yyup/wAAAABJRU5ErkJggg==');
      }
      .my-swipe{
        height: 20px;
        padding: 15px 17px;
        .van-swipe-item {
            color: #fff;
            font-size: 12px;
            line-height: 24px;
            text-align: left;
            // background-color: #39a9ed;
          }
      }
      // p{
        // color: #fff;
        // font-size: 15px;
      // }
      span{
        display: inline-block;
        margin: 0 5px;
        color: #d6ae77;
      }
    }
  }

  //电信星卡-底部图片部分
  .desc-box{
    padding: 0 15px;
    img{
      width: 92%;
    }
  }
  .desc-box-zifei{
    margin-top: 30px;
    width: 100%;
    padding-bottom:78px;
  }
  .desc-box-bottom{
    width:80%;
    height:46px;
    position:fixed;
    margin-left:-40%;
    left:50%;
    bottom:20px;
  }
}
</style>

