<template>
  <div>
    <el-card>
      <template #header>
        <el-input v-model="key" placeholder="请输入教材名称" clearable style="width: 250px" maxlength="40" @input="search">
          <template #prefix>
            <font-awesome-icon style="margin-top: 12px" icon="fa-solid fa-magnifying-glass" />
          </template>
        </el-input>
        <el-button type="primary" style="margin-left: 2%" @click="buy()">结算</el-button>
      </template>
      <el-table
          show-summary
          class="table"
          ref="multipleTable"
          :data="shoppingCartEntries"
          tooltip-effect="dark"
          style="width: 100%"
          :summary-method="getSummaries"
          @selection-change="handleSelectionChange"
          v-loading="loading"
      >
        <el-table-column type="selection" min-width="8.5%"></el-table-column>
        <el-table-column label="课本名称" min-width="10.5%">
          <template #default="scope">{{ scope.row.name }}</template>
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
        <el-table-column prop="textbookNum" label="数量" min-width="12%">
          <template #default="scope">
            <el-input-number
                @change="changeNum(scope.$index)"
                size="mini"
                v-model="scope.row.textbookNum"
                :min="1"
                label="描述文字"
            ></el-input-number>
          </template>
        </el-table-column>
        <el-table-column label="金额" min-width="11%">
          <template #default="scope">
            {{ (scope.row.price * scope.row.textbookNum).toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="11%">
          <template #default="scope">
            <el-button type="danger" @click="removeShoppingCart(scope.row.userId,scope.row.textbookId)">
              <i class="el-icon-delete">  移除购物车</i>
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
  name: "ShoppingCartView",
  data: function () {
    return {
      totalTextbookNum: 0,
      totalPrice: 0,
      selectedNum: 0,
      shoppingCartEntries: [],
      shoppingOrderEntries: [],
      key: "",
      loading:true,
    };
  },
  watch: {
    totalTextbookNum: function () {
      // location.reload();
      this.load()
    }
  },
  methods: {
    buy() {
      for (const i in this.shoppingCartEntries) {
        if (this.shoppingCartEntries[i].selected === 1) {
          axios.post("/order/add", {
            "userId": this.$root.loginStatus.userId,
            "textbookId": this.shoppingCartEntries[i].textbookId,
            "textbookNum": this.shoppingCartEntries[i].textbookNum,
            "name": this.shoppingCartEntries[i].name,
            "price": this.shoppingCartEntries[i].price,
            "startTime": new Date(),
          }).then(() => {
            this.removeShoppingCart(this.$root.loginStatus.userId,this.shoppingCartEntries[i].textbookId)
            this.$message.success("结算成功")
          }).catch((error) => {
            this.$message.error(error.response.data)
          })
        }
      }
    },
    search() {
      this.loading=true
      axios.get("/shopping/search", {
        params: {
          "key": this.key,
        }
      }).then((response) => {
        this.shoppingCartEntries = response.data
        setTimeout(()=>{
          this.loading=false
        },500)
      }).catch((error) => {
        this.$message.error(error.response.data)
      })
    },
    load() {
      this.loading=true
      axios.post("/shopping/show", {
        userId: this.$root.loginStatus.userId
      }).then((response) => {
        this.shoppingCartEntries = response.data
        setTimeout(()=>{
          this.loading=false
        },500)
      }).catch((error) => {
        this.$message.error(error.response.data)
      })
    },
    changeNum(index) {
      axios.post("/shopping/update", {
        userId: this.shoppingCartEntries[index].userId,
        textbookId: this.shoppingCartEntries[index].textbookId,
        textbookNum: this.shoppingCartEntries[index].textbookNum
      }).then((response) => {
        this.totalTextbookNum = response.data.length;
        this.$message.success("修改成功")
      }).catch((error) => {
        this.$message.error(error.response.data)
      })
    },
    removeShoppingCart(userId, textbookId) {
      axios.post("/shopping/remove", {
        userId: userId,
        textbookId: textbookId
      }).then(() => {
        this.totalTextbookNum = this.totalTextbookNum - 1;
        this.$message.success("移除成功")
      }).catch((error) => {
        this.$message.error(error.response.data)
      })
    },
    handleSelectionChange(val) {
      const ids = [];
      this.selectedNum = val.length;
      for (const index in val) {
        ids.push(val[index].textbookId);
      }
      for (const i in this.shoppingCartEntries) {
        if (ids.indexOf(this.shoppingCartEntries[i].textbookId) !== -1) {
          console.log(this.shoppingCartEntries[i].textbookId);
          //this.shoppingOrderEntries.push(this.shoppingCartEntries[i]);
          this.shoppingCartEntries[i].selected = 1;
        } else {
          this.shoppingCartEntries[i].selected = 0;
        }
      }
    },
    getSummaries(param) {
      // eslint-disable-next-line no-unused-vars
      const {columns, data} = param;
      const sums = [];
      this.shoppingOrderEntries = null;
      this.index = 0;
      if (columns.length > 0) {
        this.totalPrice = this.shoppingCartEntries
            .filter((item) => item.selected == 1)
            .map((row) => row.textbookNum * row.price)
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
        if (index === 4) {
          sums[index] = "已选中商品" + this.selectedNum + "件";
        }
        if (index === 5) {
          sums[index] = this.totalPrice + "元";
          return;
        }
      });
      return sums;
    },
  },
  mounted() {
    this.load()
  }
}
</script>

<style scoped>

</style>