<template>
  <div>
    <el-tag type="success">角色名称：</el-tag>
    <el-input v-model="addRelo.nameZh" size="small" placeholder="请输入角色名称" style="width: 200px;margin: 5px"></el-input>

    <el-input v-model="addRelo.name" size="small" placeholder="输入别名" style="width: 200px ;margin: 5px">
      <template slot="prepend" size="small">ROLE_</template>
    </el-input>
    <el-button type="success" size="small" icon="el-icon-plus" @click="doAddRelo">添加</el-button>
    <el-collapse @change="handleChange" accordion v-model="Activityname" style="width: 800px;">
      <el-collapse-item v-for="(item,index) in relos " :title=item.nameZh   :name="item.id" >
        <el-button type="danger" size="small" style="margin-left: 700px" icon="el-icon-delete" @click="doDeldetRelo(item)">删除角色</el-button>
        <el-tree
            :data="treeData"
            :props="defaultProps"
             show-checkbox
             node-key="id"
             ref="tree"
            :default-checked-keys="defaultCheckedKeys"
            :default-expanded-keys="defaultCheckedKeys"
            v-loading="loading"
            >
        </el-tree>
        <div style="display: flex;justify-content: flex-end">
          <el-button @click="cancelUpdate">取消修改</el-button>
          <el-button type="primary"   @click="doUpdate(item.id,index)">确认修改
          </el-button>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  name: "PermissMana",
  data() {
    return {
      Activityname:'2',
      relos: [],
      Rid:'',
      treeData:[],
      defaultProps:{
        children: 'children',
        label: 'name'
      },
      defaultCheckedKeys:[],
      addRelo: {
        name: '',
        nameZh: '',
        id:''
      },
      loading:false
    }
  },
  mounted() {
    this.getAllRole()
  },
  methods: {
    getAllRole() {
      this.getRequest('/system/basic/perm/Role/').then(resp => {
        if (resp) {
          this.relos = resp;
        }
      })
    },
    handleChange(val) {
      this.loading=true
      if(val)
      {
        //获取所有节点
        this.getRequest("/system/basic/perm/menu/").then(resp=>{
          if(resp){
            this.treeData=resp;
          }
        })
        //选中节点
        this.getRequest("/system/basic/perm/getMenuByRole/"+val).then(resp=>{
          if(resp){
            this.defaultCheckedKeys=resp
            this.loading=false
          }
        })


      }
    },
    //添加
    doAddRelo() {
      if (this.addRelo.name != '' && this.addRelo.nameZh != '') {
        this.addRelo.id=''
        this.postRequest('/system/basic/perm/Role/', this.addRelo).then(resp => {
          if (resp) {
            this.getAllRole()
          }
        })
      } else {
        this.$message.error("角色名称不能为空！")
      }
    },
    //删除角色
    doDeldetRelo(role){
        this.deleteRequest('/system/basic/perm/Role/'+role.id).then(resp=>{
            if(resp){
              this.getAllRole()
            }
        })
    },
    //更新角色的权限
    doUpdate(rid,index){
      let treeElement = this.$refs.tree[index];
      let selectedKeys  = treeElement.getCheckedKeys(true);
      let url='/system/basic/perm/updataPermByRole/?rid='+rid;
      selectedKeys.forEach(
          key=>{
            url+='&mids='+key;
          }
      )
      this.putRequest(url).then(resp=>{
        if(resp){
          this.Activityname=-1
        }
      })


    },
    //取消修改
    cancelUpdate(){
      this.Activityname=-1
    }

  }
}
</script>

<style scoped>

</style>
