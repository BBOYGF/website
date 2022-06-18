<template>
  <div class="orderPage">
    <div class="orderTitle">古的电脑维修工作室留言板</div>
    <el-form label-width="80px" class="orderMain">
      <el-form-item label="给店主的留言：" label-width="15%" style="width: 50% ;height:30%;margin-top: 10px">
        <el-input type="textarea" :autosize="{ minRows: 10, maxRows: 15}" placeholder="请输入内容" style="width: 100% "
                  v-model="submitFrom.content">
        </el-input>
      </el-form-item>
      <el-form-item label="联系方式：" label-width="15%" style="width: 50%">
        <el-input style="width: 100%" v-model="submitFrom.contact"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'orderView',
  created () {
    console.log('修dom 标题')
    document.title = '古的电脑维修'
  },
  methods: {
    onSubmit () {
      console.log('提交的内容是：' + this.submitFrom.content + this.submitFrom.contact)
      if (this.submitFrom.content && this.submitFrom.contact) {
        this.postRequest('/order/send', this.submitFrom).then(resp => {
          console.log('发送成功！')
        }).catch(error => {
          console.log('提交失败！')
        })
      } else {
        if (this.submitFrom.content == undefined || this.submitFrom.content.length <= 0) {
          this.$message.error('请填写留言内容！')
        }
        if (this.submitFrom.contact == undefined || this.submitFrom.contact.length <= 0) {
          this.$message.error('请填写联系方式！')
        }

      }
    }
  },
  data () {
    return {
      submitFrom: {
        content: '',
        contact: ''
      }
    }
  }

}
</script>

<style scoped>
.orderPage {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #4b4b4b;
}

.orderTitle {
  border-width: 1px;
  font-family: "微软雅黑", serif;
  color: darkorange;
  font-size: 50px;
}

.orderMain {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
}
</style>
