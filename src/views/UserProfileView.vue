<template>
  <div>
    <el-card style="height: 100%">
      <el-descriptions class="margin-top" title="用户个人信息" :column="1" style="width: 50%" border>
        <template slot="extra">

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
            <i class="el-icon-user-solid"></i>
            角色
          </template>
          {{userInf.role}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-mobile-phone"></i>
            邮箱
          </template>
          {{userInf.email}}
        </el-descriptions-item>
      </el-descriptions>
<!--      <el-button style="margin-top: 30px" type="primary" size="small">修改</el-button>-->
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

      },
    }
  },
  methods: {
    userInfo: function () {
      axios.post("/account/info", {
        id: this.$root.loginStatus.userId
        }).then((response) => {
            // this.$message.success("查找成功")
            this.userInf = response.data;
            if(response.data.role===0){
              this.userInf.role="学生"
            }else if(response.data.role===1){
              this.userInf.role="教师"
            }else{
              this.userInf.role="管理员"
            }
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