<template>
  <div style="height: 100%">
    <el-container style="height: 100%;">
      <el-aside width="auto">
        <side-bar-component></side-bar-component>
      </el-aside>
      <el-container>
        <el-header height="50px">
          <top-bar-component></top-bar-component>
        </el-header>
        <el-main class="back-top-target" style="height: 100%;">
          <router-view></router-view>
        </el-main>
      </el-container>
      <el-backtop target=".back-top-target" :bottom="70"></el-backtop>
    </el-container>
  </div>
</template>

<script>
import SideBarComponent from "@/components/SideBarComponent";
import TopBarComponent from "@/components/TopBarComponent";
export default {
  name: "HomeView",
  components: {TopBarComponent, SideBarComponent}
}
</script>

<style scoped>

</style>