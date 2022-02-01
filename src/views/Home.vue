<template>
  <div>
    <el-container>
      <el-header class="homeHeader">
        <div class="title">我的机器人</div>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            {{ user.username }} <i><img src="../assets/favicon.png" alt=""></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="个人中心">个人中心</el-dropdown-item>
            <el-dropdown-item command="设置">设置</el-dropdown-item>
            <el-dropdown-item command="注销登录">注销登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-container>
        <el-aside :width='asideWidth'>
          <el-menu router unique-opened  :collapse=fold @onclick="testOpen">
            <el-submenu :index="index+''" v-for="(item,index) in routes" :key="index" v-if="!item.hidden">
              <template slot="title">
                <i :class="item.iconCls" style="color: #0281b6 ;margin-right: 5px"></i>
                <span>{{ item.name }}</span>
              </template>
              <el-menu-item :index="children.path" v-for="(children,indexj) in item.children" :key="indexj">
                {{ children.name }}
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right" v-if="this.$router.currentRoute.path!=='/home'">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ this.$router.currentRoute.name }}</el-breadcrumb-item>
          </el-breadcrumb>
          <div class="homwWelcome" v-if="this.$router.currentRoute.path==='/home'">欢迎来到我的系统</div>
          <router-view class="homeRouterView"/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      user: JSON.parse(window.sessionStorage.getItem('user')),
      fold: false,
      asideWidth: '200px'
    }
  },
  computed: {
    routes () {
      return this.$store.state.routes
    }
  },
  methods: {
    handleCommand (command) {
      if (command === '注销登录') {
        this.$confirm('此操作将退出登录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 注销登录
          this.postRequest('/logout')
          // 清空用户信息
          window.sessionStorage.removeItem('tokenStr')
          window.sessionStorage.removeItem('user')
          // 清空菜单
          this.$store.commit('initRouter', [])
          // 跳转登录页
          this.$router.replace('/')
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      }
    },
    testOpen () {
      console.log('是打开？')
      this.fold = !this.fold
      this.asideWidth = 70
    }
  }
}

</script>

<style scoped>
.homeHeader {
  background: #115533;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  box-sizing: border-box;
}

.homeHeader .title {
  font-size: 30px;
  font-family: 楷体;
  color: white;
}

.el-dropdown-link {
  font-size: 20px;
  font-family: 楷体;
  color: white;
  align-items: center;
}

.el-dropdown-link img {
  width: 48px;
  height: 48px;
  border-radius: 24px;
  margin-left: 8px;
}

.homwWelcome {
  text-align: center;
  font-family: 华文楷体;
  font-size: 30px;
  color: lightseagreen;
}

.homeRouterView {
  margin-top: 10px;
}
</style>
