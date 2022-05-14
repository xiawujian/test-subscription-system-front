<template>
  <div style="width: 500px;margin: 160px auto;">
    <el-card style="margin: 160px auto;">
      <el-form :model="registerForm" :rules="rules" ref="registerForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username" style="width: 35%;text-align: center">
          <el-input v-model="registerForm.username"></el-input>
        </el-form-item>
<!--        <el-form-item label="专业" prop="major">-->
<!--          <el-select v-model="registerForm.major" placeholder="请选择您的专业">-->
<!--            <el-option v-for="maj in this.numbers" v-bind:key="maj" :label="maj" :value="maj"></el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
        <el-form-item label="密码" prop="password" style="width: 50%;text-align: center">
          <el-input type="password" v-model="registerForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass" style="width: 50%;text-align: center">
          <el-input type="password" v-model="registerForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" style="width: 50%;text-align: center">
          <el-input v-model="registerForm.email" autocomplete="off"></el-input>
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
            message: '请输入您的姓名',
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