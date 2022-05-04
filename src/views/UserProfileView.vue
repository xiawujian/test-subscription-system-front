<template>
  <div>
    <el-card>
      <el-descriptions class="margin-top" title="用户个人信息" :column="3" border>
        <template slot="extra">
          <el-button type="primary" size="small">操作</el-button>
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
            手机号
          </template>
          18100000000
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-location-outline"></i>
            居住地
          </template>
          苏州市
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-tickets"></i>
            备注
          </template>
          <el-tag size="small">学校</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-office-building"></i>
            联系地址
          </template>
          江苏省苏州市吴中区吴中大道 1188 号
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