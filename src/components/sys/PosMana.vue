<template>
  <div>
    <div>
      <el-input
          v-model="pos.name"
          placeholder="添加职位"
          suffix-icon="el-icon-circle-plus"
          size="small"
          class="addPosInpot"
          @keydown.enter.native="addPosition"
      >
      </el-input>
      <el-button type="primary" plain size="small" @click="addPosition">添加</el-button>

      <el-table :data="positions" style="width: 70%"  @selection-change="handleSelectionChange">
        <el-table-column type="selection"  width="55"></el-table-column>
        <el-table-column prop="id" label="编号" width="55"></el-table-column>
        <el-table-column prop="name" label="职位" width="120"></el-table-column>
        <el-table-column prop="createDate" label="创建时间"></el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button type="danger" size="small" @click="showEditView(scope.$index,scope.row)">编辑</el-button>
            <el-button type="primary" size="small" @click="handleDelete(scope.$index,scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="danger" size="small" style="margin-top: 8px" :disabled="multipleSelection.length == 0"
                 @click="deleteMany">批量删除
      </el-button>
    </div>
    <el-dialog
        title="编辑职位" :visible.sync="dialogVisible" width="30%">
      <div>
        <el-tag>职位名称</el-tag>
        <el-input v-model="updatePos.name" size="small" class="updatePosInput" ></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="doUpdate()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "PosMana",
  data() {
    return {
      pos: {
        name: ''
      },
      dialogVisible: false,
      updatePos: {
        name: '',
        createDate: ''
      },
      multipleSelection: [],
      positions: [],

    }
  },
  mounted() {
    this.initPointer();
  },
  methods: {
    //增加
    addPosition() {
      if (this.pos.name) {
        this.postRequest('/system/config/pos/', this.pos).then(resp => {
          if (resp) {
            this.initPointer();
            this.pos.name = '';
          }
        })
      } else {
        this.$message.error("职位名称不可空缺！");
      }
    },
    //查询
    initPointer() {
      this.getRequest('/system/config/pos/').then(resp => {
        if (resp) {
          this.positions = resp;
        }
      })
    },
    //修改
    doUpdate() {
      this.putRequest('/system/config/pos/', this.updatePos).then(resp => {
        if (resp) {
          this.updatePos.name="";
          this.updatePos.createDate="";
          this.initPointer();
          this.dialogVisible = false
        }
      });
    },
    //删除单个
    handleDelete(index, data) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteRequest('/system/config/pos/' + data.id).then(resp => {
          if (resp) {
            this.initPointer();
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
  },
    //批量删除
    deleteMany(){
      this.$confirm('此操作将永久删除【'+this.multipleSelection.length+'】条记录,是否继续？','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        let ids='?';
        this.multipleSelection.forEach(item=>{
          ids+='ids='+item.id+'&';
        })
        this.deleteRequest('/system/config/pos/' + ids).then(resp => {
          if (resp) {
            this.initPointer();
          }
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      })
    },
  //显示对话框
  showEditView(index, data) {

    Object.assign(this.updatePos, data);
    console.log(data)
    console.log(this.updatePos)
    this.dialogVisible = true;
    this.updatePos.createDate = '';
  },
    //监听事件
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
}
}
</script>

<style>
.addPosInpot {
  width: 300px;
  margin-right: 5px;
}
</style>
