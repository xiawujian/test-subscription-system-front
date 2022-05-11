<template>
  <div>
    <el-card>
      <template #header>
        <el-input v-model="key" placeholder="请输入教材名称" clearable style="width: 250px" maxlength="40" @input="load">
          <template #prefix>
          </template>
        </el-input>
      </template>
      <el-table
          border
          show-header
          v-el-table-infinite-scroll="load"
          :data="textbookEntries"
      >
        <el-table-column type="index" min-width="10.5%"></el-table-column>
        <el-table-column prop="name" label="课本名称" min-width="10.5%">
          <template #append="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column
            prop="mess"
            label="商品信息"
            min-width="27%"
        >
          <!--          <template #append="scope">{{ scope.row.mess }}</template>-->
        </el-table-column>
        <el-table-column prop="price" label="单价" min-width="3%">
          <template #append="scope">
            {{ scope.row.price.toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column type="info" label="查看详情" min-width="6%">
          <template #default="scope">
            <el-button>
              <router-link class="el-link el-link--primary" :to="'/home/detail/'+scope.row.id">
                查看详情
              </router-link>
            </el-button>
          </template>
        </el-table-column>
        <el-table-column v-if="this.$root.loginStatus.role===0" label="加入购物车" min-width="8%">
          <template slot-scope="scope">
            <el-button type="primary" @click="addShoppingCart(scope.$index)">
              加入购物车
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>

import elTableInfiniteScroll from "el-table-infinite-scroll";
import axios from "axios";

export default {
  name: "TextbookShowView",
  directives: {
    'el-table-infinite-scroll': elTableInfiniteScroll,
  },
  data: function () {
    return {
      textbookEntries: [],
      key: "",
    };
  },
  methods: {
    goto(path) {
      if (path !== this.currentPath)
        this.$router.push(path)
    },
    load() {
      axios.get("/textbook/search", {
        params: {
          "key": this.key,
        }
      }).then((response) => {
        this.textbookEntries = response.data
      }).catch((error) => {
        this.$message.error(error.response.data)
      })
    },
    addShoppingCart(index) {
      axios.post("/shopping/add", {
        userId: this.$root.loginStatus.userId,
        textbookId: this.textbookEntries[index].id,
        price: this.textbookEntries[index].price,
        name: this.textbookEntries[index].name
      }).then(() => {
        this.$message.success("添加成功")
      })
    }
  },
  mounted() {
    this.load()
  }
}
</script>

<style scoped>

</style>