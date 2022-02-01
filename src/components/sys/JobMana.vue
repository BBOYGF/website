<template>
  <div>
    <el-input
        placeholder="添加职称"
        prefix-icon="el-icon-plus"
        size="small"
        clearable
        v-model="addJob.name"
        style="width: 200px ;margin-right: 5px"
    >
    </el-input>
    <el-select
        v-model="addJob.titleLevel"
        placeholder="职称等级"
        size="small"
    >
      <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"

      >
      </el-option>
    </el-select>
    <el-button type="primary" size="small" icon="el-icon-plus" style="margin-left: 5px" @click="addJobLevel">添加
    </el-button>
    <el-table size="small" border style="width: 90%;margin-top: 5px " :data="jobData"
              @selection-change="handleSelectionChange">
      <el-table-column
          type="selection"
          width="55">
      </el-table-column>
      <el-table-column
          prop="id"
          label="编号"
          width="50">
      </el-table-column>
      <el-table-column
          prop="name"
          label="职称名称"
          width="180">
      </el-table-column>
      <el-table-column
          label="职称级别"
          prop="titleLevel"
          width="180">
      </el-table-column>
      <el-table-column
          prop="createDate"
          label="创建时间"
          width="180">
      </el-table-column>
      <el-table-column
          prop="enabled"
          label="是否启用"
          width="180">
        <template slot-scope="scope">
          <el-button v-if="scope.row.enabled"  size="small" type="success" disabled >启用</el-button>
          <el-button  v-else  size="small" type="warning" disabled >禁用</el-button>

        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="showUpdateJop(scope.row)"
          >编辑
          </el-button>
          <el-button
              size="mini"
              type="danger"
              @click="deleteJob(scope.$index,scope.row)"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button
        size="mini"
        type="danger"
        @click="delectAllJob"
        style="margin-top: 10px"
        :disabled="multipleSelection.length == 0"
    >批量删除
    </el-button>

      <el-dialog
          title="修改信息"
          :visible.sync="dialogVisible"
          width="32%"
      >
                <el-input
                    placeholder="添加职称"
                    size="small"
                    clearable
                    v-model="updateJob.name"
                    style="width: 200px ;margin: 5px"
                >
                </el-input>
                <el-select
                    v-model="updateJob.titleLevel"
                    placeholder="职称等级"
                    size="small"
                    style="width: 200px ;margin: 5px"
                >
                  <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                  >
                  </el-option>
                </el-select>
                <el-tag type="success" style="margin: 5px">是否启用</el-tag>
                <el-switch
                    v-model="updateJob.enabled"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                </el-switch>
                <span slot="footer" class="dialog-footer">
                   <el-button @click="dialogVisible = false">取 消</el-button>
                   <el-button type="primary" @click="updataJobLevel">确 定</el-button>
                </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: "JobMana",
  data() {
    return {
      options: [
        {
          label: '正高级',
          value: '正高级'
        }, {
          label: '副高级',
          value: '副高级'
        },
        {
          label: '初级',
          value: '初级'
        },
        {
          label: '中级',
          value: '中级'
        }
      ],
      jobData: [],
      addJob: {
        name: '',
        titleLevel: '',
        enabled: true
      },
      multipleSelection: [],
      updateJob: {
        id:'',
        name: '',
        titleLevel: '',
        createDate:'',
        enabled: ''
      },
      dialogVisible: false
    }
  },
  mounted() {
    this.initJob()
  },
  methods: {
    //初始化
    initJob() {
      this.getRequest('/system/basic/joblevel/').then(resp => {
        if (resp) {
          this.jobData = resp
        }
      })
    },
    //添加职位
    addJobLevel() {
      if (this.addJob.name != '' && this.addJob.titleLevel != '') {
        this.postRequest('/system/basic/joblevel/', this.addJob).then(res => {
              if (res) {
                this.jobData = []
                this.initJob()
              }
            }
        )
      } else {
        this.$message.error("职位和职称必须添加")
      }
    },
    //删除职位
    deleteJob(index, row) {
      console.log(index + " | " + row.id)
      this.$confirm('是否删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteRequest('/system/basic/joblevel/' + row.id).then(re => {
          if (re) {
            this.initJob()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });


    },
    //删除所有
    delectAllJob() {
      this.$confirm('是否删除' + this.multipleSelection.length + '条数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids = '?'
        this.multipleSelection.forEach(item => {
          ids += 'ids=' + item.id + '&'
        })
        console.log("ids是：" + ids)
        this.deleteRequest('/system/basic/joblevel/' + ids).then(re => {
          if (re) {
            this.initJob()
          }
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });


    },
    showUpdateJop(row) {
      // this.updateJob.id=row.id
      console.log(row)
      Object.assign(this.updateJob, row);
      this.dialogVisible=true;
      // this.updateJob.name=row.name;
      // this.updateJob.titleLevel=row.titleLevel;
      // this.updateJob.enabled=row.enabled;
      this.updateJob.createDate=''
    },
    //监听选择事件
    handleSelectionChange(val) {
      this.multipleSelection = val;

    },
    updataJobLevel(){
      if(this.updateJob.name!=''&& this.updateJob.titleLevel!='')
      {
        this.putRequest('/system/basic/joblevel/',this.updateJob).then(ros=>{
          if(ros){
            this.initJob()
          }
        })
      }else{
        this.$message.error("职称和职级必填");
      }
      this.dialogVisible=false;
      this.updateJob.createDate='';
      this.updateJob.titleLevel='';
      this.updateJob.name='';
      this.updateJob.id='';
      this.updateJob.enabled=false;

    }

  }
}
</script>

<style>

</style>
