<template>
  <van-tabbar :value="tabBarState">
    <van-tabbar-item icon="home-o" @click="changePage(0)">简介</van-tabbar-item>
    <van-tabbar-item icon="bar-chart-o" @click="changePage(1)">排行榜</van-tabbar-item>
    <van-tabbar-item icon="records" @click="changePage(2)">报名</van-tabbar-item>
    <van-tabbar-item icon="user-o" @click="changePage(3)">我的</van-tabbar-item>
  </van-tabbar>
</template>
<script>

import {
  mapState
} from 'vuex'
const page = {
  0: '/upload',
  1: '/share',
  2: '/sign',
  3: '/user'
}
export default {
  components: {},
  data: () => ({
  }),
  computed: {
    ...mapState(['tabBarState'])
  },
  methods: {
    changePage(index){
      if(index != this.tabBarState){
        this.$router.push(page[index])
      }
    }
  },
  mounted() { },
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/index.scss';
</style>