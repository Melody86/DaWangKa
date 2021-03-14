<!-- 联通大王卡 -->
<template>
  <div class="unicom-index">
    <h1>联通大王卡页面</h1>
    <privacyDoc></privacyDoc>
    <surfNetDoc></surfNetDoc>
  </div>
</template>

<script>
import privacyDoc from './privacyDoc'
import surfNetDoc from './surfNetDoc'

export default {
  name: 'DaWang',
  components: {
    privacyDoc,
    surfNetDoc
  },
  data() {
    return {}
  },

  computed: {},

  mounted() {},

  methods: {}
}
</script>
<style lang="scss" scoped>
.unicom-index {
  text-align: center;
}
</style>
