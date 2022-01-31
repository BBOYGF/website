<template>
  <div class="main">
    <div class="login" v-bind:class="{hide: !isShow}">
      <h2>登录</h2>
      <input type="text" placeholder="账号">
      <input type="password" placeholder="密码">
      <button>登录</button>
      <p @click="myClick">《{{ buttonContent }}》</p>
    </div>
    <div class="weChatLogin"  v-bind:class="{hide: isShow}">
      <h2>微信登录</h2>
      <div class="weChatImage"></div>
      <p @click="myClick">《{{ buttonContent }}》</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      isShow: true,
      buttonContent: '账号登录'
    }
  },
  methods: {
    myClick () {
      this.isShow = !this.isShow
      if (this.isShow) {
        this.buttonContent = '微信登录'
      } else {
        this.buttonContent = '账号登录'
      }
    }
  }
}
</script>

<style scoped>
.main {
  width: 100%;
  height: 100vh;
  border-color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  background-image: url("../assets/login_image.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}

.login {
  text-align: center;
  width: 300px;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 200px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.62);
}

.login h2 {
  margin-bottom: 10px;
  color: #000000;
  letter-spacing: 20px;
}

.login input {
  height: 30px;
  border-radius: 3px;
  /* 缩进15像素 */
  text-indent: 15px;
  outline: none;
  border: none;
  margin-bottom: 20px;
  margin-left: 40px;
  margin-right: 40px;
}

.login button {
  height: 30px;
  border-radius: 3px;
  /* 缩进15像素 */
  outline: none;
  border: none;
  margin-bottom: 20px;
  margin-left: 40px;
  margin-right: 40px;
  background: #1650e5;
  text-decoration-color: white;
  color: white;
  font-weight: bold;
}

.login p {
  text-decoration: underline;
}

.weChatLogin {
  text-align: center;
  width: 300px;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 200px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.62);
}

.weChatLogin p {
  text-align: center;
  text-decoration: underline;
}
.weChatImage {
  width: 200px;
  height: 200px;
  margin-right: 50px;
  margin-left: 50px;
  background-image: url("../assets/背景.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}
.weChatLogin h2 {
  text-align: center;
  color: black;
}

.hide {
  display: none;
}
</style>
