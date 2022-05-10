<template>
  <div>
    <el-card>
      <template #header>
        <el-input v-model="key" placeholder="请输入教材名称" clearable style="width: 250px" maxlength="40" @input="search">
          <template #prefix>
          </template>
        </el-input>
      </template>
      <el-table
          class="table"
          ref="multipleTable"
          :data="shoppingOrderEntries"
          border
          show-header
          v-el-table-infinite-scroll="load"
          tooltip-effect="dark"
          style="width: 100%"
      >
        <el-table-column sortable prop="id" label="订单编号" min-width="10.5%">
          <template #default="scope">
            No.{{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column label="课本名称" min-width="10.5%">
          <template #default="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column prop="price" label="单价" min-width="8%">
          <template #default="scope">
            {{ scope.row.price.toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column prop="textbookNum" label="数量" min-width="12%">
          <template #default="scope">
            {{ scope.row.textbookNum }}
          </template>
        </el-table-column>
        <el-table-column label="时间" min-width="11%">
          <template #default="scope">
            {{ scope.row.startTime }}
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ShoppingOrderView",
  data: function () {
    return {
      shoppingOrderEntries: [],
      key: "",
    };
  },
  methods: {
    search() {
      axios.get("/order/search", {
        params: {
          "key": this.key,
        }
      }).then((response) => {
        this.shoppingOrderEntries = response.data
      }).catch((error) => {
        this.$message.error(error.response.data)
      })
    },
    load() {
      axios.post("/order/show", {
        userId: this.$root.loginStatus.userId
      }).then((response) => {
        this.shoppingOrderEntries = response.data
      }).catch((error) => {
        this.$message.error(error.response.data)
      })
    },
  },
  mounted() {
    this.load()
  }
}
</script>

<style scoped>

</style>