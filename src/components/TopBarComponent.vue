<template>
  <div style="height: 100%;width:100%">
    <el-row type="flex" justify="end" align="middle">
      <el-menu mode="horizontal" style="width: 100%">
        <el-submenu index="1" style="float: right" @command="handleCommand">
          <template slot="title">你好！{{ username }}</template>
          <el-menu-item v-on:click="logout">退出登录</el-menu-item>
        </el-submenu>
      </el-menu>
      <!--      <el-dropdown @command="handleCommand">-->
      <!--        <el-button type="text">你好！{{ username }}</el-button>-->
      <!--        <template #dropdown>-->
      <!--          <el-dropdown-menu style="text-align: center">-->
      <!--            <template slot="title">你好！{{username}}</template>-->
      <!--            <el-dropdown-item command="logout">退出登录</el-dropdown-item>-->
      <!--          </el-dropdown-menu>-->
      <!--        </template>-->
      <!--      </el-dropdown>-->
    </el-row>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "TopBarComponent",
  data() {
    return {
      activeIndex: 1
    }
  },
  computed: {
    username: function () {
      return this.$root.loginStatus.username
    }
  },
  methods: {
    logout: function () {
      axios.post("/account/logout")
          .then(() => {
            this.$message.success("退出成功");
            this.$root.loginStatus.login = false
            this.$root.loginStatus.userid = null
            this.$root.loginStatus.username = null
            this.$router.push("/")
          })
          .catch((error) => {
            this.$message.error(error.response.data)
          })
    },
    handleCommand: function (command) {
      switch (command) {
        case "logout":
          this.logout();
          break;
      }
    },
  }
}
</script>

<style scoped>

</style>