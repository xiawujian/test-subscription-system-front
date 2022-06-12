<template>
  <div style="width: 500px;margin: 160px auto;">
    <el-card style="margin: 160px auto;">
      <template #header>
        <div style="width: 100%; text-align: center">
          <h1 style="margin: 0;">注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;册</h1>
        </div>
      </template>
      <el-form :model="registerForm" :rules="rules" ref="registerForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label=" 用  户  名 " prop="username" style="width:80%;text-align: center">
          <el-input type="text" prefix-icon="el-icon-user" placeholder="请输入用户名" v-model="registerForm.username"></el-input>
        </el-form-item>
<!--        <el-form-item label="专业" prop="major">-->
<!--          <el-select v-model="registerForm.major" placeholder="请选择您的专业">-->
<!--            <el-option v-for="maj in this.numbers" v-bind:key="maj" :label="maj" :value="maj"></el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
        <el-form-item label="  密  码  " prop="password" style="width:80%;text-align: center">
          <el-input type="password" prefix-icon="el-icon-lock" placeholder="请输入密码" v-model="registerForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass" style="width:80%;text-align: center">
          <el-input type="password" prefix-icon="el-icon-lock" placeholder="请确认密码" v-model="registerForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="  邮  箱  " prop="email" style="width:80%;text-align: center">
          <el-input  type="email" prefix-icon="el-icon-takeaway-box" placeholder="请输入邮箱" v-model="registerForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="medium" @click="submit">注册</el-button>
          <el-button size="medium" v-on:click="goto('/')">返回</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RegisterView",
  data() {
    let validateCheckPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("重复密码不能为空"))
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入的密码不一致"))
      } else {
        callback()
      }
    }
    return {
      registerForm: {
        username: '',
        // id: '',
        password: '',
        checkPass: '',
        email:''
      },
      rules: {
        username: [
          {
            required: true,
            message: '请输入您的用户名',
            trigger: 'blur'
          },
        ],
        password: [
          {
            required: true,
            message: '请输入您的密码',
            trigger: 'blur'
          }
        ],
        checkPass: [
          {
            required: true,
            validator: validateCheckPassword,
            trigger: 'blur'
          }
        ],
        email:[
          {
            required: true,
            message: '请输入您的邮箱',
            trigger: 'blur'
          }
        ]
      }
    };

  },
  methods: {
    submit: function () {
      axios.post("/account/register", this.$data.registerForm)
          .then(() => {
            this.$message.success("注册成功")
            this.$router.push("/")
          })
          .catch(() => {
            this.$message.error("注册失败")
          })
    },

    goto: function (path) {
      if (path !== this.currentPath)
        this.$router.push(path)
    }

  }
}
</script>

<style scoped>
.register-form {
  width: 350px;
  margin: 160px auto; /* 上下间距160px，左右自动居中*/
  background-color: rgb(255, 255, 255, 0.8); /* 透明背景色 */
  padding: 30px;
  border-radius: 20px; /* 圆角 */
}
</style>