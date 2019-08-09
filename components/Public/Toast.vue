/*
* @Author: xiaoxin 
* @Date: 2019-06-01
* @Name: toast组件  
 * @Last Modified by: linzhijie
 * @Last Modified time: 2019-08-08 10:40:38
*/
<template>
  <transition>
    <div class="wrap" :icon="icon">
      <div class="content">
        <img :src="require(`~/assets/imgs/toast${icon}.png`)"
             :class="{'rotate': rotate }"
             alt="图标">
        <p> {{tName}} </p>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'toast',
  props: {},
  data() {
    return {
      icon: 1, // 1:加载  2:对号 3:感叹号 4:星星 5:时钟  6:×
      tName:'',
    }
  },
  methods: {
    show(message,icon = 1 ,time = 1500){
      this.icon = icon
      this.tName = message
      setTimeout(()=>{
        this.$el.remove()
      },time)
    }
  },
  computed: {
    rotate(){
      const rotateList = [1]
      if(rotateList.includes(this.icon+'')||rotateList.includes(+this.icon)){
        return true
      }
      return false
    }
  },
  mounted(){}
}
</script>
<style lang='scss' scoped>
@import '~/assets/scss/index.scss';
.wrap {
  @include flex;
  @include stretching(fixed);
  z-index: 3000;
  padding: 0 24px;
}
.content {
  max-width: 100%;
  display: flex;
  color: white;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: black;
  padding: 26px 50px;
  border-radius: 20px;
  img {
    width: 66px;
    height: 66px;
    margin: 40px 20px;
  }
  p {
    font-size: 34px;
    margin: 0 20px 10px;
    text-align: center;
  }
}
.rotate {
  animation: rotate linear 0.9s infinite;
}
@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(-360deg);
  }
}
</style>