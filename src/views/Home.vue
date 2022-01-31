<template>
  <div class="background">
    <div class="a">我是主页面</div>
    <div class="a">哈哈</div>
    <router-link to="/login">登录</router-link>
  </div>
</template>

<script>
export default {
  name: 'home'
}
</script>

<style scoped>
.background {
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  padding: 0;
}
</style>
