<template>
  <div>
    <el-container style="height: 100%; border: 1px solid #eee">
      <el-aside width="200px" style="height: 100%;background-color: rgb(238, 241, 246)">
        <el-menu v-if="this.$root.loginStatus.role===0" style="height: 100%;">
          <el-menu-item v-on:click="goto('/home/student')">
            <template slot="title"><i class="el-icon-user"></i>主页</template>
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-notebook-1"></i>教材征订</template>
            <el-menu-item v-on:click="goto('/home/student/textbook')">购买教材</el-menu-item>
            <el-menu-item v-on:click="goto('/home/student/cart')">购物车</el-menu-item>
            <el-menu-item v-on:click="goto('/home/student/order')">订单查询</el-menu-item>
          </el-submenu>
          <el-menu-item v-on:click="goto('/home/student/profile')">
            <template slot="title"><i class="el-icon-setting"></i>个人信息</template>
          </el-menu-item>
        </el-menu>
        <el-menu v-if="this.$root.loginStatus.role===1" style="height: 100%;">
          <el-menu-item v-on:click="goto('/home/teacher')">
            <template slot="title"><i class="el-icon-user"></i>主页</template>
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-notebook-1"></i>教材</template>
            <el-menu-item v-on:click="goto('/home/teacher/search')">查看教材</el-menu-item>
            <el-menu-item v-on:click="goto('/home/teacher/edit')">创建教材</el-menu-item>
            <el-menu-item v-on:click="goto('/home/teacher/my')">我的教材</el-menu-item>
          </el-submenu>
          <el-menu-item v-on:click="goto('/home/teacher/profile')">
            <template slot="title"><i class="el-icon-setting"></i>个人信息</template>
          </el-menu-item>
        </el-menu>
        <el-menu v-if="this.$root.loginStatus.role===2" style="height: 100%;">
          <el-menu-item v-on:click="goto('/home/admin')">
            <template slot="title"><i class="el-icon-user"></i>主页</template>
          </el-menu-item>
          <!--        <el-submenu index="1">-->
          <!--          <template slot="title"><i class="el-icon-notebook-1"></i>教材征订</template>-->
          <!--          <el-menu-item v-on:click="goto('/tss/admin/textbook')">购买教材</el-menu-item>-->
          <!--          <el-menu-item v-on:click="goto('/tss/admin/cart')">购物车</el-menu-item>-->
          <!--          <el-menu-item v-on:click="goto('/tss/admin/order')">订单查询</el-menu-item>-->
          <!--        </el-submenu>-->
          <el-menu-item v-on:click="goto('/tss/admin/profile')">
            <template slot="title"><i class="el-icon-setting"></i>个人信息</template>
          </el-menu-item>
        </el-menu>
      </el-aside>
    </el-container>
  </div>
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
  methods: {
    goto: function (path) {
      if (path !== this.currentPath)
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