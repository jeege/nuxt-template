/*
* @Author: xiaoxin 
* @Date: 2019-06-01
* @Name: 划线提示  
 * @Last Modified by: linzhijie
 * @Last Modified time: 2019-10-28 15:22:35
*/
<template>
  <div class="page">
    <div class="other">
      <span>————</span><span>{{message}}</span><span>————</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LineTips',
  props: {
    message: {
      type: String,
      default: '没有更多了'
    }
  },
  data() {
    return {
    }
  },
  computed: {},

  mounted() { },

  methods: {}
}
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  align-items: center;
  flex-direction: column;
  .other {
    padding-top: 32px;
    padding-bottom: 34px;
    text-align: center;
    color: rgba(204, 204, 204, 1);
    span {
      margin-right: 20px;
    }
    span:nth-child(3) {
      margin: 0;
    }
  }
}
</style>