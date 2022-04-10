<template>
  <div class="login-container" >
    <el-form ref="form" :model="form" label-width="80px" class="login-form">
      <h2 class="login-title">高校教材征订系统</h2>
      <el-form-item label="学号">
        <el-input v-model="form.number"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
        <el-button>取消</el-button>
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
      form: {
        number: "",
        password: ""
      }
    };
  },
  methods: {
    login: function () {
      if (this.$root.loginStatus.login) {
        this.$message.error("已登录，如需更换账号请先登出")
      } else {
        axios.post("/accounts/login", this.loginInfo)
            .then((response) => {
              this.$message({
                message: "登录成功",
                type: "success"
              })
              this.$root.loginStatus.login = true
              this.$root.loginStatus.userid = response.data
              this.$root.loginStatus.username = this.loginInfo.username
              this.$router.push("/home")
            })
            .catch((error) => {
              this.$message.error(error.response.data)
            })
      }
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

/* 背景 */
.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
}

/* 标题 */
.login-title {
  color: #303133;
  text-align: center;
}
</style>