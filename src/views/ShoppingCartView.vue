<template>
  <div>
    <el-table
        show-summary
        class="table"
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        :summary-method="getSummaries"
        @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" min-width="8.5%"></el-table-column>
      <el-table-column label="课本名称" min-width="10.5%">
        <template #default="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column
          prop="name"
          label="商品信息"
          min-width="27%"
          show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column prop="price" label="单价" min-width="8%">
        <template #default="scope">
          {{ scope.row.price.toFixed(2) }}
        </template>
      </el-table-column>
      <el-table-column prop="num" label="数量" min-width="12%">
        <template #default="scope">
          <el-input-number
              size="mini"
              v-model="scope.row.num"
              :min="1"
              label="描述文字"
          ></el-input-number>
        </template>
      </el-table-column>
      <el-table-column label="金额" min-width="11%">
        <template #default="scope">
          {{ (scope.row.price * scope.row.num).toFixed(2) }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "ShoppingCartView",
  data: function () {
    return {
      totalPrice: 0,
      selNum: 0,
      tableData: [
        {
          id: 1,
          date: '1',
          price: 1,
          num: '1',
          selected: 0
        },
        {
          id: 2,
          date: '1',
          price: 1,
          num: '1',
          selected: 0
        },
        {
          id: 3,
          date: '1',
          price: 1,
          num: '1',
          selected: 0
        },
      ],
    };
  },
  watch: {},
  methods: {
    handleSelectionChange(val) {
      const ids = [];
      this.selNum = val.length;
      for (const index in val) {
        ids.push(val[index].id);
      }
      for (const i in this.tableData) {
        if (ids.indexOf(this.tableData[i].id) != -1) {
          this.tableData[i].selected = 1;
        } else {
          this.tableData[i].selected = 0;
        }
      }
    },
    getSummaries(param) {
      // eslint-disable-next-line no-unused-vars
      const {columns, data} = param;
      const sums = [];
      if (columns.length > 0) {
        this.totalPrice = this.tableData
            .filter((item) => item.selected == 1)
            .map((row) => row.num * row.price)
            .reduce((total, num) => total + num, 0)
            .toFixed(2);
      } else {
        this.totalPrice = 0;
      }
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        if (index === 3) {
          sums[index] = "已选中商品" + this.selNum + "件";
        }
        if (index === 4) {
          sums[index] = this.totalPrice + "元";
          return;
        }
        if (index == 6) {
          return;
        }
      });
      return sums;
    },
  }
}
</script>

<style scoped>

</style>