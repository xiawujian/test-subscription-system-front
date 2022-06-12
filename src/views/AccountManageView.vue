<template>
  <div>
    <el-card>
      <template #header>
        <el-input v-model="key" placeholder="请输入用户名" clearable style="width: 250px" maxlength="40" @input="load">
          <template #prefix>
            <font-awesome-icon style="margin-top: 12px" icon="fa-solid fa-magnifying-glass" />
          </template>
        </el-input>
      </template>
      <el-table
          border
          show-header
          v-el-table-infinite-scroll="load"
          v-loading="loading"
          :data="accountEntries"
      >
        <el-table-column prop="id" label="用户id" min-width="10.5%">
          <template #append="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column prop="username" label="用户名" min-width="10.5%">
          <template #append="scope">{{ scope.row.username }}</template>
        </el-table-column>
        <el-table-column type="info" label="查看详情" min-width="6%">
          <template #default="scope">
            <el-button>
              <router-link class="el-link el-link--primary" :to="'/home/detail/account/'+scope.row.id">
                查看详情
              </router-link>
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="11%">
          <template #default="scope">
            <el-button type="danger" @click="removeAccount(scope.row.userId)">
              <i class="el-icon-delete">  移除用户</i>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AccountManageView",
  data: function () {
    return {
      accountEntries: [],
      key: "",
      loading:true
    };
  },
  methods: {
    goto(path) {
      if (path !== this.currentPath)
        this.$router.push(path)
    },
    load() {
      this.loading=true
      axios.get("/account/search", {
        params: {
          "key": this.key,
        }
      }).then((response) => {
        this.accountEntries = response.data
        setTimeout(() => {
          this.loading=false
        }, 500);
      }).catch((error) => {
        this.$message.error(error.response.data)
      })
    },
    removeAccount(userId) {
      axios.post("/account/remove", {
        userId: userId
      }).then(() => {
        this.$message.success("移除成功")
      }).catch((error) => {
        this.$message.error(error.response.data)
      })
    },
  }
}
</script>

<style scoped>

</style>