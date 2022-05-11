<template>
  <div>
    <el-card style="height: auto">
      <el-descriptions class="margin-top" title="教材详情" :column="3" border>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            教材名
          </template>
          {{textbook.name}}
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "TextbookDetailView",
  data: function () {
    return {
      textbookId: this.$route.params.textbookId,
      textbook:{

      },
    };
  },
  methods:{
    load(){
      axios.post("/textbook/info",this.$data.textbookId
      ).then((response) => {
        this.textbook = response.data
      }).catch((error) => {
        this.$message.error(error.response.data)
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