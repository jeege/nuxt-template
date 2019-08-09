/*
* @Author: xiaoxin 
* @Date: 2019-06-01
* @Name: 无数据 
 * @Last Modified by: linzhijie
 * @Last Modified time: 2019-08-08 10:29:23
*/
<template>
  <div :class="'no_data '+classNames">
    <img src="@/assets/imgs/no_data.png" width="150">
    <div>{{message}}</div>
  </div>
</template>

<script>
 export default {
  name:'NoData',
  props:{
    message:{
      type:String,
      default:'暂无数据'
    },
    classNames:{
      type:String,
      default:''
    }
  },
  data() {
   return {
   }
  },
  computed: {},

  mounted() {},

  methods: {}
 }
</script>

<style lang="scss" scoped>
  @import '~/assets/scss/index.scss';
  .no_data{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    img{
      margin-bottom: 28px;
    }
    color:rgba(153,153,153,1);
    font-size: 26px;
    font-weight:400;
  }
  .classTop{
    padding-top: 20vh;
  }
</style>