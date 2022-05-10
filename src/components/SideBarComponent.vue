<template>
  <el-container style="height: 100%; border: 1px solid #eee">
    <el-aside width="200px" style="height: 100%;background-color: rgb(238, 241, 246)">
      <el-menu v-if="this.$root.loginStatus.role===0" style="height: 100%;">
        <el-menu-item v-on:click="goto('/home')">
          <template slot="title"><i class="el-icon-user"></i>主页</template>
        </el-menu-item>
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-notebook-1"></i>教材征订</template>
          <el-menu-item v-on:click="goto('/home/textbook')">购买教材</el-menu-item>
          <el-menu-item v-on:click="goto('/home/cart')">购物车</el-menu-item>
          <el-menu-item v-on:click="goto('/home/order')">订单查询</el-menu-item>
        </el-submenu>
        <el-menu-item v-on:click="goto('/home/profile')">
          <template slot="title"><i class="el-icon-setting"></i>个人信息</template>
        </el-menu-item>
      </el-menu>
    </el-aside>
  </el-container>
</template>

<script>
export default {
  name: "SideBarComponent",
  data() {
    const item = {
      date: '',
      name: '',
      address: '`'
    };
    return {
      tableData: Array(20).fill(item)
    };
  },
  computed: {
    currentPath: function () {
      return this.$route.path
    }
  },
  methods:{
    goto: function (path){
      if(path!==this.currentPath)
        this.$router.push(path)
    }
  }
};
</script>

<style scoped>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>