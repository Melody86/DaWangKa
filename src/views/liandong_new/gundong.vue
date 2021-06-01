<template>
  <div>
    <div style="font-size: 0.4rem; font-weight: bold; color: black; text-align: center; margin-top: 0.4rem">
      成交记录
    </div>
    <div class="pingDiv" style="border-radius: 0.5rem; margin-top: 0.4rem">
      <div style="width: 90%; margin: auto">
        <div style="width: 100%; height: 12.5rem; overflow: hidden">
          <div class="Pinei" style="margin-top: 0.6rem">
            <vue-seamless-scroll class="warp" :data="pneiDList">
              <div id="autoscroll">
                <div class="van-cell" v-for="(pd, index) in pneiDList" :key="index">
                  <div class="van-cell__title">
                    <div class="scroll-box">
                      <div class="title">
                        {{ pd.name }} <span>{{ pd.area }}</span>
                      </div>
                      <div class="desc-box">
                        <b>{{ pd.taocan }}</b>
                        <div class="tip-box">
                          领取成功
                          <i class="van-icon van-icon-success" style="color: rgb(231, 23, 43); font-size: 20px"> </i>
                        </div>
                        <span>{{ pd.time }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </vue-seamless-scroll>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pneiDList: [
        {
          area: '北京朝阳',
          name: '张女士 155****3345',
          time: '1分钟前',
          taocan: '电信552G流量套餐卡'
        },

        {
          area: '北京朝阳',
          name: '陈女士 155****3345',
          time: '10分钟前',
          taocan: '电信552G流量套餐卡'
        },
        {
          area: '北京朝阳',
          name: '刘女士 155****3345',
          time: '1天前',
          taocan: '电信552G流量套餐卡'
        },
        {
          area: '北京朝阳',
          name: '赵女士 155****3345',
          time: '50分钟前',
          taocan: '电信552G流量套餐卡'
        },
        {
          area: '北京朝阳',
          name: '李先生 155****3345',
          time: '6分钟前',
          taocan: '电信552G流量套餐卡'
        },
        {
          area: '北京朝阳',
          name: '张先生 155****3345',
          time: '7分钟前',
          taocan: '电信552G流量套餐卡'
        },
        {
          area: '北京朝阳',
          name: '张女士 155****3345',
          time: '10分钟前',
          taocan: '电信552G流量套餐卡'
        },
        {
          area: '北京朝阳',
          name: '张女士 155****3345',
          time: '13分钟前',
          taocan: '电信552G流量套餐卡'
        },
        {
          area: '北京朝阳',
          name: '张女士 155****3345',
          time: '23分钟前',
          taocan: '电信552G流量套餐卡'
        },
        {
          area: '北京朝阳',
          name: '张女士 155****3345',
          time: '22分钟前',
          taocan: '电信552G流量套餐卡'
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.scroll-box {
  .title {
    font-size: 15px;
    color: #333;
    font-weight: 700;
    span {
      float: right;
      font-size: 12px;
      color: #888;
      font-weight: 700;
    }
  }
  .desc-box {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    .tip-box {
      font-weight: 700;
      white-space: nowrap;
      flex: 1;
      -ms-flex: 1;
      -webkit-box-flex: 1;
      color: #333;
      font-size: 15px;
      text-align: center;
      flex-shrink: 1;
      -ms-flex-negative: 1;
      padding-left: 10px;
    }
    span {
      float: right;
      font-size: 12px;
      color: #888;
      font-weight: 700;
      text-align: right;
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
    }
  }
}
</style>
