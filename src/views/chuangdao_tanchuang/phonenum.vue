<!-- 常见问题 -->
<template>
  <div class="number" v-html="f_data"></div>
</template>

<script>
// 请求接口

export default {
  name: 'Phonenum',
  props: ['pnum', 'pkey'],
  data() {
    return {
      // pdata: this.pnum,
      // f_data: '',
      pp_key: this.pkey,
      pp_num: this.pnum
    }
  },
  computed: {
    f_data() {
      return this.SearchHighlight(parseInt(this.pnum) + '', parseInt(this.pkey) + '')
    }
  },
  mounted() {
    // this.f_data = this.SearchHighlight(parseInt(this.pnum) + '', parseInt(this.pkey) + '')
    console.log(!isNaN(this.f_data))
  },
  methods: {
    SearchHighlight(phone, searchNum) {
      if (searchNum == '') {
        var begin = Math.ceil(Math.random() * 4)
        var num = Math.ceil(Math.random() * 5)
        var phoneB = phone.substr(0, begin)
        var phoneC = phone.substr(begin, num)
        var phoneE = phone.substr(begin + num, 11 - begin - num)
        var textLi = phoneB + "<b style='color:Red;'>" + phoneC + '</b>' + phoneE
      } else {
        var arr = phone.split(searchNum)
        var count = arr.length
        var textLi = ''
        var textC = "<b style='color:Red;'>" + searchNum + '</b>'
        for (var i = 0; i < count; i++) {
          if (i + 1 == count) {
            textLi += arr[i]
          } else {
            textLi += arr[i] + textC
          }
        }
      }
      return textLi
    }
  }
}
</script>
<style lang="scss" scoped>
.number {
  margin-bottom: 0.1rem;
}
</style>
