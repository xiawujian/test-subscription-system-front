<template>
  <div>
    <el-card style="height: 100%">
      <el-descriptions class="margin-top" title="用户个人信息" :column="3" border>
        <template slot="extra">
          <el-button type="primary" size="small">修改</el-button>
        </template>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            用户名
          </template>
          {{userInf.username}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-mobile-phone"></i>
            密码
          </template>
          *************
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-mobile-phone"></i>
            邮箱
          </template>
          test@test.com
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>

<script>
// import axios from "axios";

import axios from "@/axios/axios";

export default {
  name: "UserProfileView",
  data() {
    return {
      userInf: {
        username: ''
      },
    }
  },
  methods: {
    userInfo: function () {
      axios.post("/account/info", {
        id: this.$root.loginStatus.userId
        }).then((response) => {
            // this.$message.success("查找成功")
            this.userInf.username = response.data.username;
          })
          .catch((error) => {
            this.$message.error(error.response.data)
          })
    }
  },
  mounted() {
    this.userInfo();
  }
}
</script>

<style scoped>

</style>