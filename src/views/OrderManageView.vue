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
          v-loading="loading"
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
        <el-table-column prop="status" label="状态" min-width="8%">
          <template #default="scope">
            {{ scope.row.status }}
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
  name: "OrderManageView",
  data: function () {
    return {
      shoppingOrderEntries: [],
      key: "",
      loading: true
    };
  },
  methods: {
    search() {
      this.loading=true
      axios.get("/order/search", {
        params: {
          "key": this.key,
        }
      }).then((response) => {
        this.shoppingOrderEntries = response.data
        setTimeout(() => {
          this.loading=false
        }, 500);
        for (const i in this.shoppingOrderEntries) {
          if (this.shoppingOrderEntries[i].orderStatus === 0) {
            this.shoppingOrderEntries[i].status = "未受理"
          } else if (this.shoppingOrderEntries[i].orderStatus === 1) {
            this.shoppingOrderEntries[i].status = "进行中"
          } else if (this.shoppingOrderEntries[i].orderStatus === 2) {
            this.shoppingOrderEntries[i].status = "已结束"
          }
        }
      }).catch((error) => {
        this.$message.error(error.response.data)
      })
    },
  },
  mounted() {
    this.search()
  }
}
</script>

<style scoped>

</style>