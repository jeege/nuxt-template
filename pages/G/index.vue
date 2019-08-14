<template>
 <div>
   页面
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
  components: { },
  data: () => ({
    
  }),
  computed: {
    ...mapState({}),
    ...mapGetters({}),
  },
  methods: {
    ...mapMutations({}),
    ...mapActions({})
  },
  mounted(){},
  asyncData(){}
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/index.scss';
</style>