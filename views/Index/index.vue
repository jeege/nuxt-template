<template>
  <div>
    asdasd
  </div>
</template>

<script>
import api from 'api'
export default {
  name: '',
  data() {
    return {
    }
  },
  computed: {
  },
  asyncData({ store, req }) {
    api.user.getList({
      pageNo: 1,
      pageSize: 10
    }, {
      cookieFrom: (req || {}).headers
    }).then(data => {
      console.log(data)
    }).catch(err => {
      console.log(err)
    })
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped >
</style>
