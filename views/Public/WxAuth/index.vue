<template>
  <div></div>
</template>

<script>
import api from 'api'
import { setCookie } from 'js/utils'
export default {
  name: '',
  data() {
    return {}
  },
  async asyncData({ req, res, query, redirect }) {
    const { from = '/', code } = query
    if (code) {
      const { openid } = await api.user.getOpenid({ code }, { cookieFrom: (req || {}).headers }).catch(err => {
        console.log(err)
      }) || {}
      // 设置cookie
      if (res) {
        res.cookie('openid', openid)
      } else {
        setCookie('openid', openid)
      }
      redirect(decodeURIComponent(from))
    }

  }
}
</script>

<style lang="scss" scoped >
</style>
