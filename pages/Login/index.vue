<template>
  <div class="container">
    <div class='login-box'>
      <van-cell-group>
        <van-field v-model="form.phoneNo"
                   required
                   clearable
                   label="手机号"
                   placeholder="请输入手机号"
                   @input="checkPhone"
                   @click-right-icon="$toast('question')" />

        <van-field v-model="form.identifyCode"
                   center
                   clearable
                   label="验证码"
                   maxlength="6"
                   placeholder="请输入验证码"
                   required
                   @input="$set(form,'identifyCode',form.identifyCode.replace(/[^0-9]/g,''))">
          <van-button slot="button"
                      size="small"
                      type="primary"
                      :disabled="mark"
                      @click="getSms">{{sec ? sec+'s':'发送验证码'}}</van-button>
        </van-field>
      </van-cell-group>
      <van-button type="primary"
                  class='login-btn'
                  @click="login">登录</van-button>
    </div>
  </div>
</template>
<script>
import {
  mapState,
  mapActions,
  mapMutations
} from 'vuex'
import https from '~/assets/js/axios'
export default {
  components: {},
  data: () => ({
    form: {
      appKey: '06', // (03微信小程序，06外部浏览器）
      loginType: '0',
      thirdCode: '04',
      phoneNo: '',
      identifyCode: '',
      uniqueCode: ''
    },
    mark: true,
    sec: 0,
  }),
  computed: {
    ...mapState('user', [
      'info'
    ])
  },
  asyncData({route}) {
    if(route.query.code == 301){
      return {
        err: '请重新登陆'
      }
    }
  },
  mounted() {
    if(this.err){
      this.$gmt.warn(this.err)
    }
  },
  methods: {
    ...mapMutations('user', [
      'setData'
    ]),
    ...mapActions({}),
    checkPhone() {
      this.$set(this.form, 'phoneNo', this.form.phoneNo.replace(/[^0-9]/g, ''))
      let reg = /^1\d{10}/
      let checkPhone = reg.test(this.form.phoneNo)
      if (checkPhone) {
        this.mark = false
      } else {
        this.mark = true
      }
    },
    getSms() {
      https('user', 'sendSms', {
        phoneNo: this.form.phoneNo,
        templateCode: "1001" // 短信模板，默认传1001
      }, { useAccountNo: false }).then(data => {
        if (data.code === '1000') {
          this.$set(this.form, 'uniqueCode', data.data.uniqueCode)
          this.setSec()
        } else {
          this.$gmt.error(data.message)
        }
      })
    },
    setSec() {
      this.mark = true
      this.sec = 59
      let time = setInterval(() => {
        this.sec--
        if (!this.sec) {
          this.mark = false
          clearInterval(time)
          return
        }
      }, 1000)
    },

    login() {
      https('user', 'login', this.form, { useAccountNo: false }).then(data => {
        if (data.code === '1000') {
          this.$gmt.success('登陆成功')
          this.setData({ info: data.data })
          console.log('用户信息，', data.data)
          this.$router.push('/upload')
        } else {
          this.$gmt.error(data.message)
        }
      })
    }
  },
}
</script>
<style lang="scss" scoped>
@import '~/assets/scss/index.scss';
.container {
  @include flex;
  width: 100vw;
  min-height: 100vh;
  .login-box {
    width: 700px;
    height: 400px;
    padding: 16px;
    .login-btn {
      width: 100%;
      margin-top: 40px;
    }
  }
}
</style>