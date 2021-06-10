<template>
  <div class="choujiang-dx">
    <div class="lottery-container" v-if="lotteryShow">
      <div class="dialog-box">
        <div class="dialog-main">
          <img class="cjbj" src="../../assets/images/liandong_new/assets/cjbj.png" />
          <div class="img-main">
            <div class="img-box">
              <div class="animate-01">
                <img v-for="(item, i) in imgsData" :key="i" :src="item.url" />
              </div>
            </div>
            <div class="img-box">
              <div class="animate-02">
                <img v-for="(item, i) in imgsData" :key="i" :src="item.url" />
              </div>
            </div>
            <div class="img-box">
              <div class="animate-03">
                <img v-for="(item, i) in imgsData" :key="i" :src="item.url" />
              </div>
            </div>
          </div>

          <div v-if="!isClick" class="btn-01"></div>
          <div v-else class="btn-02"></div>
        </div>
      </div>
      <div class="gift-content" v-if="giftShow">
        <div class="gift-sprite-light"></div>
        <div class="gift-light"></div>
        <div class="gift-box2"></div>
        <div class="gift gift-box3"></div>
        <div class="gift-num"></div>
        <div class="gift-box1"></div>
        <div class="gift-star star1"></div>
        <div class="gift-star star2"></div>
        <div class="gift-star star3"></div>
        <div class="gift-star star4"></div>
        <div
          class="gift-btn"
          @click="
            lotteryShow = false
            giftShow = false
          "
        ></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      giftShow: false,
      isClick: false,
      timer: null,
      lotteryShow: true,
      imgsData: [
        { title: '5', url: require('../../assets/images/liandong_new/assets/5.png') },
        { title: '10', url: require('../../assets/images/liandong_new/assets/10.png') },
        { title: '30', url: require('../../assets/images/liandong_new/assets/30.png') },
        { title: '40', url: require('../../assets/images/liandong_new/assets/40.png') }
      ]
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll, true)
    window.scrollTo(0, 0)
    for (var i = 0; i < 5; i++) {
      this.imgsData = this.imgsData.concat(this.imgsData)
    }
    this.timer = setInterval(() => {
      this.isClick = true
      setTimeout(() => {
        this.isClick = false
        clearInterval(this.timer)
      }, 5000)
    }, 10000)
    setTimeout(() => {
      this.imgsData = [{ title: '40', url: require('../../assets/images/liandong_new/assets/40.png') }].concat(
        this.imgsData
      )
    }, 20000)
    setTimeout(() => {
      this.giftShow = true
    }, 40000)
    setTimeout(() => {
      this.giftShow = false
      this.lotteryShow = false
    }, 700000)
  }
}
</script>

<style lang="scss" scoped>
.choujiang-dx {
  .dx-wrap {
    background: #f2f2f2;
    padding-bottom: 50px;
    img {
      display: block;
    }
    .img-w-full {
      width: 100%;
    }
    .cj-list {
      background: #fff;
      position: relative;
      .cj-list-opacity {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 2;
      }
      .cj-title {
        font-size: 16px;
        color: #000;
        text-align: center;
        border-bottom: 1px #ddd solid;
        line-height: 50px;
        background: #fff;
      }
      .cj-list {
        width: 100%;
        overflow: hidden;
        min-height: 300px;
        .van-cell {
          &::after {
            border-color: #ccc;
          }
        }
        .scroll-box {
          .title {
            font-size: 15px;
            color: #333;
            font-weight: bold;
            span {
              float: right;
              font-size: 12px;
              color: #888;
              font-weight: bold;
            }
          }
          .desc-box {
            display: flex;
            b {
              font-size: 15px;
              color: #333;
              flex: 2;
              white-space: nowrap;
            }
            span {
              float: right;
              font-size: 12px;
              color: #888;
              text-align: right;
              flex: 1;
            }
            .tip-box {
              flex-shrink: 1;
              text-align: center;
              font-size: 15px;
              color: #333;
              flex: 1;
              white-space: nowrap;
              font-weight: bold;
            }
          }
        }
      }
    }

    .fixed-btn {
      width: 100%;
      position: fixed;
      left: 0;
      bottom: 0;
      .van-button {
        height: 50px;
        line-height: 50px;
        border-radius: 0;
        font-size: 18px;
      }
    }
  }
  .lottery-container {
    width: 100%;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    z-index: 33;
  }
  .dialog-box {
    position: relative;
    width: 90%;
    height: 6.03rem;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position-x: 0;
    z-index: 1;
    -webkit-animation: lotteryShowAni 0.4s linear both, spriteXAnif 0.4s steps(2) infinite;
    animation: lotteryShowAni 0.4s linear both, spriteXAnif 0.4s steps(2) infinite;
    margin: 0 auto;
    .dialog-main {
      width: 100%;
      position: relative;
    }
    .cjbj {
      position: absolute;
      left: 0;
      top: 0.6rem;
      width: 100%;
      z-index: 5;
    }
    .img-main {
      display: flex;
      position: absolute;
      top: 3.985rem;
      left: 0;
      right: 0;
      margin: 0 auto;
      width: 80%;
      height: 3.6rem;
      overflow: hidden;
      z-index: 33;
      .img-box {
        position: relative;
        flex: 1;
        height: 3.6rem;
        margin: 3px;
        display: inline-block;
        overflow: hidden;
        overflow-y: scroll;
        &::-webkit-scrollbar {
          display: none;
        }
        img {
          width: 100%;
          margin: 0;
          height: 3.6rem;
        }
      }
    }
    .btn-01 {
      background: url('../../assets/images/liandong_new/assets/button01.png') no-repeat center center;
      background-size: 100% 100%;
      position: absolute;
      left: 0;
      right: 0;
      margin: 0 auto;
      top: 8.85rem;
      width: 50%;
      height: 1rem;
      background-repeat: no-repeat;
      background-size: auto 100%;
      // background-position-x: 0;
      -webkit-transform: scale(1.35);
      -ms-transform: scale(1.35);
      transform: scale(1.35);
      z-index: 33;
    }
    .btn-02 {
      background: url('../../assets/images/liandong_new/assets/button02.png') no-repeat;
      background-size: 100% 100%;
      position: absolute;
      left: 0;
      right: 0;
      margin: 0 auto;
      top: 3.85rem;
      width: 1.8rem;
      height: 0.495rem;
      background-repeat: no-repeat;
      background-size: auto 100%;
      background-position-x: 0;
      -webkit-transform: scale(1.35);
      -ms-transform: scale(1.35);
      transform: scale(1.35);
      z-index: 33;
    }
    .animate-01 {
      position: relative;
      animation-name: anim1;
      animation-duration: 1s;
      animation-delay: 2s;
      animation-fill-mode: backwards;
      animation-iteration-count: 1;
      -webkit-animation-iteration-count: 1; /* Safari 和 Chrome */
      animation-fill-mode: forwards;
    }
    .animate-02 {
      position: relative;
      animation-name: anim1;
      animation-duration: 1s;
      animation-delay: 2s;
      animation-fill-mode: backwards;
      animation-iteration-count: 1;
      -webkit-animation-iteration-count: 1; /* Safari 和 Chrome */
      animation-fill-mode: forwards;
    }
    .animate-03 {
      position: relative;
      animation-name: anim1;
      animation-duration: 1s;
      animation-delay: 2s;
      animation-fill-mode: backwards;
      animation-iteration-count: 1;
      -webkit-animation-iteration-count: 1; /* Safari 和 Chrome */
      animation-fill-mode: forwards;
    }

    @-webkit-keyframes anim1 {
      0% {
        top: 0px;
      }
      50% {
        top: -34.95rem;
      }
      100% {
        top: 0px;
      }
    }

    /* @media screen and (max-width: 330px) {
      @-webkit-keyframes anim1{
          0% {margin-top: 0px;}
          100%{margin-top:-14rem;}
      }
    }
    @media screen and (min-width: 330px) {
      @-webkit-keyframes anim1{
          0% {margin-top: 0px;}
          100%{margin-top:-14rem;}
      }
    }  */
  }

  .lottery-container .gift-content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9;
  }
  .lottery-container .gift-content .gift-sprite-light {
    position: absolute;
    top: 1.9rem;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 1.875rem;
    height: 3.015rem;
    background-image: url('../../assets/images/liandong_new/assets/light0.png');
    background-repeat: no-repeat;
    background-size: auto 100%;
    background-position-x: 0;
    -webkit-transform: scale(2);
    -ms-transform: scale(2);
    transform: scale(2);
    -webkit-animation: spriteXAni 0.6s steps(20) forwards;
    animation: spriteXAni 0.6s steps(20) forwards;
  }
  .lottery-container .gift-content .gift-light {
    position: absolute;
    top: 1.3rem;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 3.71rem;
    height: 3.73rem;
    background-image: url('../../assets/images/liandong_new/assets/light.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    opacity: 0;
    -webkit-animation: giftLightAni 8s linear 1.5s infinite;
    animation: giftLightAni 8s linear 1.5s infinite;
  }

  .lottery-container .gift-content .gift-box1,
  .lottery-container .gift-content .gift-box2 {
    position: absolute;
    top: 2rem;
    width: 80%;
    height: 9.75rem;
    margin: 0 auto;
    left: 0;
    right: 0;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    -webkit-animation: scaleAni 0.2s linear 1s both;
    animation: scaleAni 0.2s linear 1s both;
  }
  .lottery-container .gift-content .gift {
    position: absolute;
    top: 1.45rem;
    width: 3.75rem;
    height: 3.75rem;
    margin: 0 auto;
    left: 0;
    right: 0;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    -webkit-animation: giftShowAni 0.4s linear 0.4s both, giftShowAni1 0.4s linear 0.9s forwards;
    animation: giftShowAni 0.4s linear 0.4s both, giftShowAni1 0.4s linear 0.9s forwards;
  }
  .lottery-container .gift-content .gift-num {
    position: absolute;
    top: 2.9rem;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 2.13rem;
    height: 0.91rem;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    opacity: 0;
    -webkit-animation: giftNumShowAni 1.1s linear 0.2s forwards;
    animation: giftNumShowAni 1.1s linear 0.2s forwards;
  }
  .lottery-container .gift-content .gift-num {
    position: absolute;
    top: 2.9rem;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 2.13rem;
    height: 0.91rem;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    opacity: 0;
    -webkit-animation: giftNumShowAni 1.1s linear 0.2s forwards;
    animation: giftNumShowAni 1.1s linear 0.2s forwards;
  }
  .lottery-container .gift-content .gift-star.star1 {
    width: 0.64rem;
    height: 0.64rem;
    top: 2rem;
    left: 35%;
  }
  .lottery-container .gift-content .gift-star {
    position: absolute;
    background-image: url('../../assets/images/liandong_new/assets/star.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    opacity: 0;
    -webkit-animation: starShowAni 0.3s linear 0.7s infinite, starAni 0.4s linear 1s infinite;
    animation: starShowAni 0.3s linear 0.7s infinite, starAni 0.4s linear 1s infinite;
  }
  .lottery-container .gift-content .gift-star.star2 {
    width: 0.25rem;
    height: 0.25rem;
    top: 2.2rem;
    left: 29%;
  }
  .lottery-container .gift-content .gift-star.star3 {
    width: 0.25rem;
    height: 0.25rem;
    top: 3.8rem;
    left: 30%;
  }
  .lottery-container .gift-content .gift-star.star4 {
    width: 0.64rem;
    height: 0.64rem;
    top: 3.8rem;
    left: 30%;
  }
  .lottery-container .gift-content .gift-btn {
    position: absolute;
    top: 4.5rem;
    width: 3.75rem;
    height: 0.6rem;
    margin: 0 auto;
    left: 0;
    right: 0;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    opacity: 0;
    -webkit-animation: starShowAni 0.2s linear 1s forwards, breathAni 0.6s linear infinite;
    animation: starShowAni 0.2s linear 1s forwards, breathAni 0.6s linear infinite;
  }

  .gift-box2 {
    background-image: url('../../assets/images/liandong_new/assets/xlgsnxlqcw.png');
  }
  .gift-box3 {
    background-image: url('../../assets/images/liandong_new/assets/1ymju6dhoi.png');
  }
  .gift-num {
    background-image: url('../../assets/images/liandong_new/assets/rarmkpzwjh.png');
  }
  .gift-box1 {
    background-image: url('../../assets/images/liandong_new/assets/9p6hwuijqd.png');
  }
  .gift-btn {
    background-image: url('../../assets/images/liandong_new/assets/mj6gedgyzy.png');
  }

  @keyframes turn {
    0% {
      -webkit-transform: rotate(0deg);
    }
    25% {
      -webkit-transform: rotate(90deg);
    }
    50% {
      -webkit-transform: rotate(180deg);
    }
    75% {
      -webkit-transform: rotate(270deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }
  @keyframes starShowAni {
    0% {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes starAni {
    0%,
    to {
      opacity: 1;
      -webkit-transform: scale(1);
      transform: scale(1);
    }
    50% {
      opacity: 1;
      -webkit-transform: scale(0.6);
      transform: scale(0.6);
    }
  }
  @keyframes giftLightAni {
    0% {
      opacity: 1;
      -webkit-transform: rotate(0);
      transform: rotate(0);
    }
    to {
      opacity: 1;
      -webkit-transform: rotate(1turn);
      transform: rotate(1turn);
    }
  }
  @keyframes spriteXAni {
    0% {
      background-position-x: 0;
    }
    to {
      background-position-x: 100%;
    }
  }
  @-webkit-keyframes giftNumShowAni {
    0% {
      opacity: 0.5;
      -webkit-transform: scale(2.5);
      transform: scale(2.5);
    }
    20% {
      opacity: 0.6;
      -webkit-transform: scale(2);
      transform: scale(2);
    }
    50% {
      opacity: 1;
      -webkit-transform: scale(0.9);
      transform: scale(0.9);
    }
    70% {
      opacity: 1;
      -webkit-transform: scale(1);
      transform: scale(1);
    }
    to {
      opacity: 0;
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }
  @keyframes giftNumShowAni {
    0% {
      opacity: 0.5;
      -webkit-transform: scale(2.5);
      transform: scale(2.5);
    }
    20% {
      opacity: 0.6;
      -webkit-transform: scale(2);
      transform: scale(2);
    }
    50% {
      opacity: 1;
      -webkit-transform: scale(0.9);
      transform: scale(0.9);
    }
    70% {
      opacity: 1;
      -webkit-transform: scale(1);
      transform: scale(1);
    }
    to {
      opacity: 0;
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }
  @-webkit-keyframes starShowAni {
    0% {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes starShowAni {
    0% {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-webkit-keyframes starAni {
    0%,
    to {
      opacity: 1;
      -webkit-transform: scale(1);
      transform: scale(1);
    }
    50% {
      opacity: 1;
      -webkit-transform: scale(0.6);
      transform: scale(0.6);
    }
  }
  @keyframes starAni {
    0%,
    to {
      opacity: 1;
      -webkit-transform: scale(1);
      transform: scale(1);
    }
    50% {
      opacity: 1;
      -webkit-transform: scale(0.6);
      transform: scale(0.6);
    }
  }
  @-webkit-keyframes breathAni {
    0%,
    to {
      -webkit-transform: scale(1);
      transform: scale(1);
    }
    50% {
      -webkit-transform: scale(1.2);
      transform: scale(1.2);
    }
  }
  @keyframes breathAni {
    0%,
    to {
      -webkit-transform: scale(1);
      transform: scale(1);
    }
    50% {
      -webkit-transform: scale(1.2);
      transform: scale(1.2);
    }
  }
  @-webkit-keyframes spriteXAni {
    0% {
      background-position-x: 0;
    }
    to {
      background-position-x: 100%;
    }
  }
  @keyframes spriteXAni {
    0% {
      background-position-x: 0;
    }
    to {
      background-position-x: 100%;
    }
  }
  @-webkit-keyframes spriteXAnif {
    0% {
      background-position-x: 0;
    }
    to {
      background-position-x: -7.5rem;
    }
  }
  @keyframes spriteXAnif {
    0% {
      background-position-x: 0;
    }
    to {
      background-position-x: -7.5rem;
    }
  }
  @-webkit-keyframes giftShowAni {
    0% {
      -webkit-transform: scale(0);
      transform: scale(0);
    }
    50% {
      -webkit-transform: scale(1.4);
      transform: scale(1.4);
    }
    70% {
      -webkit-transform: scale(1);
      transform: scale(1);
    }
    90% {
      -webkit-transform: scale(1.1);
      transform: scale(1.1);
    }
    to {
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }
  @keyframes giftShowAni {
    0% {
      -webkit-transform: scale(0);
      transform: scale(0);
    }
    50% {
      -webkit-transform: scale(1.4);
      transform: scale(1.4);
    }
    70% {
      -webkit-transform: scale(1);
      transform: scale(1);
    }
    90% {
      -webkit-transform: scale(1.1);
      transform: scale(1.1);
    }
    to {
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }
  @-webkit-keyframes giftShowAni1 {
    0% {
      -webkit-transform: translate(0) scale(1);
      transform: translate(0) scale(1);
    }
    40% {
      -webkit-transform: translateY(-3.5rem) scale(0.9, 1.5);
      transform: translateY(-3.5rem) scale(0.9, 1.5);
    }
    80% {
      -webkit-transform: translateY(-0.55rem) scale(0.81, 0.6);
      transform: translateY(-0.55rem) scale(0.81, 0.6);
    }
    to {
      -webkit-transform: translateY(-0.55rem) scale(0.81);
      transform: translateY(-0.55rem) scale(0.81);
    }
  }
  @keyframes giftShowAni1 {
    0% {
      -webkit-transform: translate(0) scale(1);
      transform: translate(0) scale(1);
    }
    40% {
      -webkit-transform: translateY(-3.5rem) scale(0.9, 1.5);
      transform: translateY(-3.5rem) scale(0.9, 1.5);
    }
    80% {
      -webkit-transform: translateY(-0.55rem) scale(0.81, 0.6);
      transform: translateY(-0.55rem) scale(0.81, 0.6);
    }
    to {
      -webkit-transform: translateY(-0.55rem) scale(0.81);
      transform: translateY(-0.55rem) scale(0.81);
    }
  }

  @-webkit-keyframes scaleAni {
    0% {
      -webkit-transform: scale(0);
      transform: scale(0);
    }

    to {
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }

  @keyframes scaleAni {
    0% {
      -webkit-transform: scale(0);
      transform: scale(0);
    }

    to {
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }

  @-webkit-keyframes breathAni {
    0%,
    to {
      -webkit-transform: scale(1);
      transform: scale(1);
    }

    50% {
      -webkit-transform: scale(1.2);
      transform: scale(1.2);
    }
  }

  @keyframes breathAni {
    0%,
    to {
      -webkit-transform: scale(1);
      transform: scale(1);
    }

    50% {
      -webkit-transform: scale(1.2);
      transform: scale(1.2);
    }
  }

  @-webkit-keyframes spriteXAni {
    0% {
      background-position-x: 0;
    }

    to {
      background-position-x: 100%;
    }
  }

  @keyframes spriteXAni {
    0% {
      background-position-x: 0;
    }

    to {
      background-position-x: 100%;
    }
  }

  @-webkit-keyframes spriteXAnif {
    0% {
      background-position-x: 0;
    }

    to {
      background-position-x: -7.5rem;
    }
  }

  @keyframes spriteXAnif {
    0% {
      background-position-x: 0;
    }

    to {
      background-position-x: -7.5rem;
    }
  }

  @-webkit-keyframes starShowAni {
    0% {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  @keyframes starShowAni {
    0% {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  @-webkit-keyframes starAni {
    0%,
    to {
      opacity: 1;
      -webkit-transform: scale(1);
      transform: scale(1);
    }

    50% {
      opacity: 1;
      -webkit-transform: scale(0.6);
      transform: scale(0.6);
    }
  }

  @keyframes starAni {
    0%,
    to {
      opacity: 1;
      -webkit-transform: scale(1);
      transform: scale(1);
    }

    50% {
      opacity: 1;
      -webkit-transform: scale(0.6);
      transform: scale(0.6);
    }
  }

  @-webkit-keyframes giftNumShowAni {
    0% {
      opacity: 0.5;
      -webkit-transform: scale(2.5);
      transform: scale(2.5);
    }

    20% {
      opacity: 0.6;
      -webkit-transform: scale(2);
      transform: scale(2);
    }

    50% {
      opacity: 1;
      -webkit-transform: scale(0.9);
      transform: scale(0.9);
    }

    70% {
      opacity: 1;
      -webkit-transform: scale(1);
      transform: scale(1);
    }

    to {
      opacity: 0;
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }

  @keyframes giftNumShowAni {
    0% {
      opacity: 0.5;
      -webkit-transform: scale(2.5);
      transform: scale(2.5);
    }

    20% {
      opacity: 0.6;
      -webkit-transform: scale(2);
      transform: scale(2);
    }

    50% {
      opacity: 1;
      -webkit-transform: scale(0.9);
      transform: scale(0.9);
    }

    70% {
      opacity: 1;
      -webkit-transform: scale(1);
      transform: scale(1);
    }

    to {
      opacity: 0;
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }

  @-webkit-keyframes giftShowAni {
    0% {
      -webkit-transform: scale(0);
      transform: scale(0);
    }

    50% {
      -webkit-transform: scale(1.4);
      transform: scale(1.4);
    }

    70% {
      -webkit-transform: scale(1);
      transform: scale(1);
    }

    90% {
      -webkit-transform: scale(1.1);
      transform: scale(1.1);
    }

    to {
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }

  @keyframes giftShowAni {
    0% {
      -webkit-transform: scale(0);
      transform: scale(0);
    }

    50% {
      -webkit-transform: scale(1.4);
      transform: scale(1.4);
    }

    70% {
      -webkit-transform: scale(1);
      transform: scale(1);
    }

    90% {
      -webkit-transform: scale(1.1);
      transform: scale(1.1);
    }

    to {
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }

  @-webkit-keyframes giftShowAni1 {
    0% {
      -webkit-transform: translate(0) scale(1);
      transform: translate(0) scale(1);
    }

    40% {
      -webkit-transform: translateY(-3.5rem) scale(0.9, 1.5);
      transform: translateY(-3.5rem) scale(0.9, 1.5);
    }

    80% {
      -webkit-transform: translateY(-0.55rem) scale(0.81, 0.6);
      transform: translateY(-0.55rem) scale(0.81, 0.6);
    }

    to {
      -webkit-transform: translateY(-0.55rem) scale(0.81);
      transform: translateY(-0.55rem) scale(0.81);
    }
  }

  @keyframes giftShowAni1 {
    0% {
      -webkit-transform: translate(0) scale(1);
      transform: translate(0) scale(1);
    }

    40% {
      -webkit-transform: translateY(-3.5rem) scale(0.9, 1.5);
      transform: translateY(-3.5rem) scale(0.9, 1.5);
    }

    80% {
      -webkit-transform: translateY(-0.55rem) scale(0.81, 0.6);
      transform: translateY(-0.55rem) scale(0.81, 0.6);
    }

    to {
      -webkit-transform: translateY(-0.55rem) scale(0.81);
      transform: translateY(-0.55rem) scale(0.81);
    }
  }

  @-webkit-keyframes giftLightAni {
    0% {
      opacity: 1;
      -webkit-transform: rotate(0);
      transform: rotate(0);
    }

    to {
      opacity: 1;
      -webkit-transform: rotate(1turn);
      transform: rotate(1turn);
    }
  }

  @keyframes giftLightAni {
    0% {
      opacity: 1;
      -webkit-transform: rotate(0);
      transform: rotate(0);
    }

    to {
      opacity: 1;
      -webkit-transform: rotate(1turn);
      transform: rotate(1turn);
    }
  }

  @-webkit-keyframes giftTitleAni {
    0% {
      -webkit-transform: translateY(2.2rem) scale(0);
      transform: translateY(2.2rem) scale(0);
    }

    to {
      -webkit-transform: translate(0) scale(1);
      transform: translate(0) scale(1);
    }
  }

  @keyframes giftTitleAni {
    0% {
      -webkit-transform: translateY(2.2rem) scale(0);
      transform: translateY(2.2rem) scale(0);
    }

    to {
      -webkit-transform: translate(0) scale(1);
      transform: translate(0) scale(1);
    }
  }

  @-webkit-keyframes hideGiftAni {
    0% {
      -webkit-transform: scale(1);
      transform: scale(1);
    }

    30% {
      -webkit-transform: scale(1.1);
      transform: scale(1.1);
    }

    to {
      -webkit-transform: scale(0);
      transform: scale(0);
    }
  }

  @keyframes hideGiftAni {
    0% {
      -webkit-transform: scale(1);
      transform: scale(1);
    }

    30% {
      -webkit-transform: scale(1.1);
      transform: scale(1.1);
    }

    to {
      -webkit-transform: scale(0);
      transform: scale(0);
    }
  }

  @-webkit-keyframes hideLotteryAni {
    0% {
      opacity: 1;
      -webkit-transform: scale(1);
      transform: scale(1);
    }

    to {
      opacity: 0;
      -webkit-transform: scale(0);
      transform: scale(0);
    }
  }

  @-webkit-keyframes prizeScrollAni {
    0% {
      -webkit-transform: translateY(-8rem);
      transform: translateY(-8rem);
    }

    to {
      -webkit-transform: translate(0);
      transform: translate(0);
    }
  }

  @keyframes prizeScrollAni {
    0% {
      -webkit-transform: translateY(-8rem);
      transform: translateY(-8rem);
    }

    to {
      -webkit-transform: translate(0);
      transform: translate(0);
    }
  }

  @-webkit-keyframes prizeScrollAni1 {
    0% {
      -webkit-transform: translateY(-8rem);
      transform: translateY(-8rem);
    }

    60% {
      -webkit-transform: translateY(-5.75rem);
      transform: translateY(-5.75rem);
    }

    to {
      -webkit-transform: translateY(-6.4rem);
      transform: translateY(-6.4rem);
    }
  }

  @keyframes prizeScrollAni1 {
    0% {
      -webkit-transform: translateY(-8rem);
      transform: translateY(-8rem);
    }

    60% {
      -webkit-transform: translateY(-5.75rem);
      transform: translateY(-5.75rem);
    }

    to {
      -webkit-transform: translateY(-6.4rem);
      transform: translateY(-6.4rem);
    }
  }

  @-webkit-keyframes lotteryShowAni {
    0% {
      -webkit-transform: scale(0);
      transform: scale(0);
    }

    50% {
      -webkit-transform: scale(0.9);
      transform: scale(0.9);
    }

    to {
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }

  @keyframes lotteryShowAni {
    0% {
      -webkit-transform: scale(0);
      transform: scale(0);
    }

    50% {
      -webkit-transform: scale(0.9);
      transform: scale(0.9);
    }

    to {
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }

  @keyframes hideLotteryAni {
    0% {
      opacity: 1;
      -webkit-transform: scale(1);
      transform: scale(1);
    }

    to {
      opacity: 0;
      -webkit-transform: scale(0);
      transform: scale(0);
    }
  }
}
</style>
