<template>
  <div>
    <el-card>
      <!--      <template #header>-->
      <!--        <el-input v-model="key" placeholder="请输入教材名称" clearable style="width: 250px" maxlength="40" @input="load">-->
      <!--          <template #prefix>-->
      <!--          </template>-->
      <!--        </el-input>-->
      <!--      </template>-->
      <el-table
          border
          show-header
          v-el-table-infinite-scroll="load"
          :data="textbookEntries"
          v-loading="loading"
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
              <router-link class="el-link el-link--primary" :to="'/home/detail/textbook/'+scope.row.id">
                查看详情
              </router-link>
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="11%">
          <template #default="scope">
              <el-button slot="reference" type="danger" @click="removeTextbook(scope.row.textbookId)">
                <i class="el-icon-delete"> 移除教材</i>
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
  name: "TeacherTextbookView",
  data: function () {
    return {
      textbookEntries: [],
      loading:true
    };
  },
  methods: {
    load() {
      this.loading=true
      axios.post("/textbook/my", {
        teacherId: this.$root.loginStatus.userId
      }).then((response) => {
        console.log(this.$root.loginStatus.userId)
        this.textbookEntries = response.data
        setTimeout(()=>{
          this.loading=false
        },500)
      }).catch((error) => {
        this.$message.error(error.response.data)
      })
    },
    removeTextbook(textbookId) {
      axios.post("/shopping/remove", {
        textbookId: textbookId
      }).then(() => {
        this.$message.success("移除成功")
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