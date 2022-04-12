<template>
  <div>
    <el-card>
      <template #header>
        <el-input clearable style="width: 250px" maxlength="40">
          <template #prefix>
            &nbsp;<font-awesome-icon icon="fa-solid fa-magnifying-glass"></font-awesome-icon>
          </template>
        </el-input>
      </template>
      <el-table
          border
          show-header
          v-el-table-infinite-scroll="load"
          v-el-table-infinite-scroll-immediate="false"
          :data="tableData"
      >
        <el-table-column prop="name" label="课本名称" min-width="10.5%">
          <template #append="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column
            prop="mess"
            label="商品信息"
            min-width="27%"
        >
          <template #append="scope">{{ scope.row.mess }}</template>
        </el-table-column>
        <el-table-column prop="price" label="单价" min-width="8%">
          <template #append="scope">
            {{ scope.row.price.toFixed(2) }}
          </template>
        </el-table-column>
      </el-table>
    </el-card>

  </div>
</template>

<script>

import elTableInfiniteScroll from "el-table-infinite-scroll";

const exampleData = new Array(20).fill({
  name: 'dawd',
  mess: "dawdawdawdawdawd",
  price: 1,
});
export default {
  name: "TextbookShowView",
  directives: {
    'el-table-infinite-scroll': elTableInfiniteScroll,
  },
  data: function () {
    return {
      tableData: exampleData
    };
  },
  methods: {
    load() {
      this.tableData = this.tableData.concat(exampleData);
    }
  },
  mounted() {
    this.load()
  }
}
</script>

<style scoped>

</style>