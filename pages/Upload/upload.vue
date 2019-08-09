<template>
  <div class="container">
    <van-uploader ref="uploader"
                  accept="*/*"
                  :after-read="afterRead">
    </van-uploader>
    <h3>上传的文件路径：</h3>
    <a v-for="(src,index) in list"
       :key='index'
       :href="src"
       target="_blank"
       class="link">
      {{src}}</a>
  </div>
</template>
<script>
import {
  mapState,
  mapGetters,
  mapActions,
  mapMutations
} from 'vuex'
import util from '~/assets/js/utils'
export default {
  components: {},
  data: () => ({
    list: []
  }),
  computed: {
    ...mapState(['qiniutoken']),
    ...mapGetters({}),
  },
  methods: {
    ...mapMutations({}),
    ...mapActions({}),

    afterRead(file) {
      util.uploadQN(file.file, this.qiniutoken, false).then((res) => {
        if (res) {
          this.list.push(res)
        }
      })
    }
  },
  mounted() { },
  async asyncData({ store }) {
    await store.dispatch('getQiNiuToken')
  }
}
</script>
<style lang="scss" scoped>
.container {
  padding: 20px;
}
.link {
  display: block;
  width: 100%;
  word-break: break-all;
  margin-bottom: 10px;
}
</style>