<template>
  <div>
    <el-card>
      <el-form :model="creatForm" :rules="rules" ref="registerForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="书名" prop="name" style="width: 20%;text-align: center">
          <el-input v-model="creatForm.name"></el-input>
        </el-form-item>
        <el-form-item label="单价" prop="price" style="width: 15%;text-align: center">
          <el-input type="password" v-model="creatForm.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="作者" prop="authorName" style="width: 20%;text-align: center">
          <el-input type="password" v-model="creatForm.authorName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="出版社" prop="publisher" style="width: 20%;text-align: center">
          <el-input v-model="creatForm.publisher" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="medium" @click="submit">创建</el-button>
          <el-button size="medium" >返回</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "TextbookEditView",
  data: function () {
    return {
      creatForm: {
        name: '',
        price: '',
        teacherId: this.$root.loginStatus.userId,
        authorName: '',
        publisher: '',
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入教材名',
            trigger: 'blur'
          }
        ],
        price: [
          {
            required: true,
            message: '请输入单价',
            trigger: 'blur'
          }
        ],
        authorName: [
          {
            required: true,
            message: '请输入作者名',
            trigger: 'blur'
          }
        ],
        publisher: [
          {
            required: true,
            message: '请输入出版商',
            trigger: 'blur'
          }
        ],
      }
    }
  },
  methods:{
    submit:function (){
      axios.post("/textbook/addTextbook",this.$data.creatForm
      ).then(() => {
        this.$message.success("创建成功")
      }).catch((error) => {
        this.$message.error(error.response.data)
      })
    }
  }
}
</script>

<style scoped>

</style>