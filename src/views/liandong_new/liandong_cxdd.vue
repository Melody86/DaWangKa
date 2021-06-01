<template>
  <div id="fillInfo">
    <div class="home_content">
      <div class="info_write_info" style="padding: 39% 20%">
        <h4 style="font-size: 30px; color: white; margin-bottom: 30px">订单查询</h4>
        <ul>
          <li class="border_none tel_error address_detail_fill">
            <div class="info_mid">
              <input type="text" placeholder="请输入手机号" maxlength="50" id="addreInfo" />
            </div>
          </li>
          <li class="border_none tel_error address_detail_fill" style="margin-top: 10%">
            <div class="info_mid">
              <button style="text-align: center; display: block; width: 100%; height: 30px">
                <a href="javascript:alert('订单处理中，请稍后再试')">查询</a>
              </button>
            </div>
          </li>

          <li class="border_none tel_error address_detail_fill" style="margin-top: 10%">
            <div class="info_mid">
              <button style="text-align: center; display: block; width: 100%; height: 30px">
                <router-link :to="{ name: 'liandong_new' }">返回主页</router-link>
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#fillInfo {
  background: #171837;
  height: 100vh;
  #addreInfo {
    width: 96%;
    line-height: 200%;
  }
  .info_write_info ul .info_mid {
    width: 100%;
  }
}
</style>
