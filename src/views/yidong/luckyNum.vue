<!-- 电信星卡-幸运数字 -->
<template>
  <div class="luck-number-box">
    <img src="../../assets/images/yidong/banner.png">
    <div class="box-container">
      <div class="container-wrapper">
        <div class="container-wrapper-padding">
          <div class="container-wrapper-padding-input">
            <input type="number" placeholder="幸运数字" />
            <span>查找</span>
          </div>
          <button class="container-wrapper-padding-btn"></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'luckyNum',
  data() {
    return {}
  },
  components: {},
  mounted(){
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.luck-number-box {
  img {
    width: 100%;
  }
  .box-container {
    padding: 0.346667rem 0.4rem 0;
    position: relative;
    font-size: 12px;
    font-weight: 400;
    .container-wrapper{
      padding: 0.8px 2px;
      border-radius: 15px;
      background-color: #ddae60;
      box-shadow: 0 3px 5px 0 rgba(221,173,96,.23)!important;
      border-color: rgb(0, 0, 0);
      height: 77px;
      width: 345px;
      display: flex;
      align-items: center;
      justify-content: center;
      .container-wrapper-padding{
        border: 1px solid #fff;
        border-radius: 12px;
        height: 72px;
        width: 331px;
        display: flex;
        align-items: center;
        justify-content: center;
        .container-wrapper-padding-input{
          height: 40px;
          width: 225px;
          position: relative;
          input{
            width: 154px;
            height: 25px;
            color: black;
            font-size: 15px;
            background: #fff;
            border-radius: 20px;
            padding: 7.5px 14.5px;
            padding-right: 39.5px;
            border: none;
          }
          input::-webkit-input-placeholder { /* WebKit browsers */
            color: #999;
            font-size: 16px;
          }
          span{
            position: absolute;
            width: 36px;
            height: 25px;
            color: #ff9e01!important;
            right: 14.5px;
            top: 50%;
            transform: translateY(-50%);
            background-color: hsla(37,79%,68%,.37)!important;
            line-height: 25px;
            border-radius: 12.5px;
          }
        }
        .container-wrapper-padding-btn{
          width: 80px;
          height: 40px;
          border: none;
          background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAABTCAYAAAAYyQyaAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo2NjlGRjA4NTJGMzUxMUVCODAyQkNFODcwNUQzNjlBRSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo2NjlGRjA4NjJGMzUxMUVCODAyQkNFODcwNUQzNjlBRSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjY2OUZGMDgzMkYzNTExRUI4MDJCQ0U4NzA1RDM2OUFFIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjY2OUZGMDg0MkYzNTExRUI4MDJCQ0U4NzA1RDM2OUFFIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+2LOkUQAAGLlJREFUeNrsnWmUHNV1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') no-repeat center center / 100% 100%;
        }
      }
    }
    
  }
  
}
</style>

