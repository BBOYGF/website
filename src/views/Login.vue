<template>
  <div class="main">
    <el-form ref="loginFrom" :model="loginForm" :rules="rules" class="loginContainer" :class="{hide:wechatLogin}"
             v-loading="loading"
             element-loading-text="正在登录。。。"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(0, 0, 0, 0.8)">
      <h3 class="loginTitle">系统登录</h3>
      <el-form-item prop="username">
        <el-input type="text" v-model="loginForm.username" placeholder="请输入用户名" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input type="text" auto-complete="false" v-model="loginForm.code" placeholder="点击图片更换验证码"
                  style="width:250px;margin: 5px" @keydown.enter.native="submitLogin"></el-input>
        <img :src="captchaUrl" @click="updateCaptcha">
      </el-form-item>
      <el-checkbox label="记住密码" name="type" v-model="checked" class="loginChenkbox"></el-checkbox>
      <el-button type="primary" @click="submitLogin" style="width: 100%">登录</el-button>
    </el-form>
    <div class="wechatLogin" :class="{hide:!wechatLogin}">
      <img :src=wechatImageUrl @click="updateWeChatImg">
    </div>
    <el-button type="primary" @click="switchLogin" style="margin: 10px;width: 200px" >{{ loginType }} </el-button>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      captchaUrl: '/captcha?time=' + new Date(),
      loginForm: {
        username: 'admin',
        password: '123',
        code: ''
      },
      loading: false,
      checked: true,
      rules: {
        username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'}],
        code: [{required: true, message: '请输入验证码', trigger: 'blur'}]
      },
      wechatLogin: false,
      loginType: '切换登录',
      wechatImageUrl: '/admin/getLoginWeChat?time=' + new Date()
    }
  },
  methods: {
    submitLogin () {
      this.$refs.loginFrom.validate((valid) => {
        if (valid) {
          this.loading = true
          this.postRequest('/login', this.loginForm).then(resp => {
            if (resp) {
              const tokenStr = resp.obj.tokenHead + resp.obj.token
              window.sessionStorage.setItem('tokenStr', tokenStr)
              // 跳转首页
              let path = this.$route.query.redirect
              console.log('path是：' + path)
              console.log('this.$router是：' + this.$router.replace('/home'))
              console.log('path === undefined：' + (typeof (path) == 'undefined'))
              this.$router.replace((path === '/' || typeof (path) == 'undefined') ? '/home' : path).catch(err => {
                    console.log('发生了异常' + err)
                    this.$router.replace('/home')
                  }
              )
            }
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          this.$message.error('请输入所有字段！')
          this.loading = false
          return false
        }
      })
    },
    updateCaptcha () {
      this.$message('获取验证码！')
      this.captchaUrl = '/captcha?time=' + new Date()
    },
    updateWeChatImg () {
      this.$message('获取二维码！')
      this.wechatImageUrl = '/admin/getLoginWeChat?time=' + new Date()
    },
    switchLogin () {
      this.$message('切换登录')
      if (this.wechatLogin) {
        this.loginType = '切换微信登录'
      } else {
        this.loginType = '切换账号登录'
      }
      this.wechatLogin = !this.wechatLogin
    }
  }
}
</script>

<style>
.loginContainer {
  border-radius: 15px;
  background-clip: padding-box;
  width: 350px;
  padding: 15px 25px 15px 35px;
  border: 1px solid #eeeeee;
  box-shadow: 0 0 25px #cac6c6;
  background: rgba(255, 255, 255, 0.96);
}

.loginTitle {
  margin: 20px auto 40px auto;
  text-align: center;
}

.loginChenkbox {
  text-align: left;
  margin: 0px 0px 15px 0px;
}

.el-form-item__content {
  display: flex;
  align-items: center;
}

.main {
  height: 100vh;
  background-image: url("../assets/login_image.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.wechatLogin {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  /*background-clip: padding-box;*/
  width: 350px;
  padding: 15px 25px 15px 35px;
  border: 1px solid #eeeeee;
  box-shadow: 0 0 25px #cac6c6;
  background: rgba(255, 255, 255, 0.96);
}

.wechatLogin img {
  width: 250px;
  height: 290px;
  background-size: cover;
}

.main button {
  padding: 5px;
  border: none;
  width: 100px;
  color: #eeeeee;
  border-radius: 5px;
  background: #0281b6;
}
.hide {
  display: none;
}

</style>
