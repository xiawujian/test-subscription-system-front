<template>
  <div class="login-container">
    <el-form ref="form" :model="loginForm" label-width="80px" class="login-form">
      <h2 class="login-title" style="text-align: center">高校教材征订系统</h2>
      <el-form-item label="用户名" style="width: 100%">
        <el-input v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" style="width: 100%">
        <el-input type="password" v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
        <el-button @click="register">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "@/axios/axios";

export default {
  name: "LoginView",
  data() {
    return {
      loginForm: {
        username:"",
        password: ""
      }
    };
  },
  methods: {
    login: function () {
      if (this.$root.loginStatus.login) {
        this.$message.error("已登录，如需更换账号请先登出")
      } else {
        axios.post("/account/login", this.loginForm)
            .then((response) => {
              this.$root.loginStatus.login = true
              this.$root.loginStatus.userId = response.data.id
              this.$root.loginStatus.username = this.loginForm.username
              this.$root.loginStatus.role= response.data.role
              this.$message.success("登录成功")
              if(this.$root.loginStatus.role===0){
                this.$router.push("/home/student")
              }else if(this.$root.loginStatus.role===1){
                this.$router.push("/home/teacher")
              }else{
                this.$router.push("/home/admin")
              }
            })
            .catch((error) => {
              this.$message.error(error.response.data)
            })
      }
    },
    register:function (){
      this.$router.push("/register")
    }
  }
}
</script>

<style scoped>
.login-form {
  width: 350px;
  margin: 160px auto; /* 上下间距160px，左右自动居中*/
  background-color: rgb(255, 255, 255, 0.8); /* 透明背景色 */
  padding: 30px;
  border-radius: 20px; /* 圆角 */
}

 背景
.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
}

 标题
.login-title {
  color: #303133;
  text-align: center;
}
</style>