###########################
##                       ##
##  @Author: lulu        ##
##  @Name: 错误浮层       ##
##                       ##
###########################
<template>
  <div class="error">
      <img class="error-img" src="~/assets/imgs/errorPage.png" alt="">
      <p class="error-text">{{reason}}</p>
      <button v-if="errorType===1" class="error-button" @click="$emit('reload')">请点击这里重新加载</button>
  </div>
</template>

<script>
export default {
  name:'error',
  props:{
    errorType:{
      type:[String,Number],
      default:1    // 1: 商品接口报错  2: 地址失效  3: 404
    }
  },
  computed:{
    reason(){
      const list = ['','网络异常','当前链接已失效','404']
      return list[this.errorType] || '网络异常'
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~/assets/scss/index.scss';
  .error{
    @include flex;
    @include stretching(fixed);
    justify-content: stretch;
    background-color: white;
    z-index: 10;
    &-img{
      width: 320px;
      height: 300px;
      margin-top:300px; 
    }
    &-text{
      color: #bbb;
      font-size: 30px;
      margin-top: 60px;
    }
    &-button{
      border: none;
      color: #ff5200;
      background-color: transparent;
      margin-top: 50px;
    }
  }
</style>