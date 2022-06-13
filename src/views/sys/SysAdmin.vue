<template>
  <div>
    <div class="queryField">
      <el-input
          v-model=query
          placeholder="输入关键字"
          prefix-icon="el-icon-search"
          suffix-icon="el-icon-caret-right"
          style="width: 500px"
          @keydown.enter.native="getAllAdmin"
      ></el-input>
      <el-button type="primary" style="margin-left: 10px" @click=getAllAdmin>查询</el-button>
    </div>
    <div class="admin-container">
      <el-card class="admin-card" v-for="(admin,index) in admins" :key="index">
        <template #header >
          <div class="card-header" >
            <span>{{ admin.name }}</span>
            <el-button type="text" style="float: right ;color: red;padding: 3px" icon="el-icon-delete"
                       @click="deleteById(admin)"></el-button>
          </div>
        </template>
        <el-image :src=admin.userFace class="userFace" :alt="admin.name" :title="admin.name"></el-image>
        <div class="userinfo-container">
          <div>用户名：{{ admin.name }}</div>
          <div>电话：{{ admin.phone }}</div>
          <div>地址：{{ admin.address }}</div>
          <div>用户状态：
            <el-switch
                v-model='admin.enabled'
                size="large"
                active-text="启用"
                inactive-text="禁用"
                @change="enableChange(admin)"
            />
          </div>
          <div>
            用户角色：
            <el-tag style="margin: 5px;" v-for="(role,indexj) in admin.roles" :key="indexj">
              {{ role.nameZh }}
            </el-tag>
            <el-popover
                placement="right"
                title="角色列表"
                width="200"
                trigger="click"
                @show="initRoles(admin)"
                @hide="rolesChange(admin)"
            >
              <el-select v-model="selectedRoles" multiple placeholder="请选择">
                <el-option
                    v-for="role in roles"
                    :key="role.id"
                    :label="role.nameZh"
                    :value="role.id"
                >
                </el-option>
              </el-select>
              <template #reference>
                <el-button type="text" icon="el-icon-more"></el-button>
              </template>
            </el-popover>
          </div>
          <div>
            备注：{{ admin.remark }}
          </div>
        </div>
      </el-card>

      <el-card class="admin-card-add">
        <svg class="icon" width="200" height="200" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"
             data-v-042ca774="">
          <path fill="currentColor"
                d="M480 480V128a32 32 0 0164 0v352h352a32 32 0 110 64H544v352a32 32 0 11-64 0V544H128a32 32 0 010-64h352z"></path>
        </svg>
      </el-card>
    </div>
  </div>

</template>

<script>
export default {
  name: 'SysAdmin',
  data () {
    return {
      query: '',
      admins: [],
      roles: [],
      selectedRoles: []
    }
  },
  mounted () {
    this.getAllAdmin()
  },
  methods: {
    rolesChange (admin) {
      let change = false
      let roles = []
      Object.assign(roles, admin.roles)
      if (roles.length !== this.selectedRoles.length) {
        change = true
      } else {
        for (let i = 0; i < roles.length; i++) {
          let role = roles[i]
          for (let j = 0; j < this.selectedRoles.length; j++) {
            if (role.id === this.selectedRoles[j]) {
              role.splice(i, 1)
              i--
              break
            }
          }
          if (roles.length !== 0) {
            change = true
          }
        }
      }

      if (change) {
        let url = '/system/admin/roles?adminId=' + admin.id
        this.selectedRoles.forEach(r => {
          url = url + '&rids=' + r
        })
        this.putRequest(url).then(resp => {
          if (resp) {
            this.getAllAdmin()
          }
        })
      } else {

      }

    },
    initRoles (admin) {
      this.getAllRole()
      this.selectedRoles = []
      admin.roles.forEach(r => {
        this.selectedRoles.push(r.id)
      })
    },
    getAllRole () {
      this.getRequest('/system/admin/roles').then(resp => {
        if (resp) {
          this.roles = resp
        }
      })
    },
    getAllAdmin () {
      this.getRequest('/system/admin/' + '?keywords=' + this.query).then(resp => {
        if (resp) {
          this.admins = resp
        }
      })
    },
    deleteById (admin) {
      this.$confirm('是否删除该【' + admin.name + '】操作员？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.putRequest('/system/admin/' + admin.id).then(resp => {
          if (resp) {
            if (resp) {
              this.getAllAdmin()
            }
          }
        })
      }).catch(() => {
        this.$message({type: 'info', message: '已经取消操作！'})
      })
    },
    enableChange (admin) {
      this.putRequest('/system/admin/', admin).then(resp => {
        if (resp) {
          this.getAllAdmin()
        }
      })
    }
  }

}
</script>

<style scoped>
.queryField {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.admin-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 10px;
}

.admin-card {
  margin-left: 10px;
  margin-top: 10px;
  width: 300px;
  height: 400px;
  display: flex;
  flex-direction: column;
}

.userFace {
  border-radius: 50px;
  width: 100px;
  height: 100px;
}

.userinfo-container {
  font-size: 12px;
  color: #0281b6;
}
.admin-card-add{
  margin-left: 10px;
  margin-top: 10px;
  width: 300px;
  height: 400px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
