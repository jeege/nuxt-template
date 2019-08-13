<template>
  <div>
    <Button @click="share(0)">原生</Button>
    <Button @click="share(1)">分享朋友圈</Button>
    <Button @click="share(2)">分享好友</Button>
    <Button @click="share(3)">测试</Button>
    <Button @click="share(4)">唤起微信</Button>
    <p>{{api}}</p>
  </div>
</template>
<script>
import {
  mapState,
  mapGetters,
  mapActions,
  mapMutations
} from 'vuex'
export default {
  components: {},
  data: () => ({
    api: ''
  }),
  computed: {
    ...mapState({}),
    ...mapGetters({}),
  },
  methods: {
    ...mapMutations({}),
    ...mapActions({}),
    share(type) {
      if (type < 3) {
        // eslint-disable-next-line no-undef
        const mshare = new mShare({
          title: '分享标题',
          url: window.location.href,
          desc: '分享描述',
          img: 'https://image.nhf.cn/FsH558a3pIEqYuBuZD2BBDxgSYIS'
        });
        mshare.init(type);
      } else if (type == 3) {
        navigator.share && navigator.share({
          title: '标题',
          text: '内容',
          url: window.location.href
        });
      } else if (type == 4) {
        window.location.href = 'weixin://'
      }
    }

  },
  mounted() { },
  asyncData() { }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/index.scss';
</style>