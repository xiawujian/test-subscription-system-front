<template>
  <div>
    <el-card style="height: auto">
      <el-descriptions class="margin-top" title="教材详情" :column="1" border style="width: 50%">
        <el-descriptions-item>
          <template slot="label">
            <font-awesome-icon icon="fa-solid fa-book" />
            教材名
          </template>
          {{textbook.name}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            创建者
          </template>
          {{textbook.teacherId}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            作者
          </template>
          {{textbook.authorName}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <font-awesome-icon icon="fa-solid fa-house" />
            出版社
          </template>
          {{textbook.publisher}}
        </el-descriptions-item>
        <el-descriptions-item style="height: 500px">
          <template slot="label">
            <font-awesome-icon icon="fa-solid fa-receipt" />
            描述
          </template>
<!--          {{textbook.publisher}}-->
        </el-descriptions-item>
      </el-descriptions>
      <el-button style="margin-top: 30px" size="primary" v-on:click="goto()">返回</el-button>
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
      axios.post("/textbook/info",{
        textbookId:this.$data.textbookId
          }
      ).then((response) => {
        this.textbook = response.data
        console.log(this.textbook)
      }).catch((error) => {
        this.$message.error(error.response.data)
      })
    },
    goto: function () {
      if (this.$root.loginStatus.role===0) {
        this.$router.push("/home/student/textbook")
      }else if(this.$root.loginStatus.role===1){
        this.$router.push("/home/teacher/search")
      }else{
        this.$router.push("/home/admin/textbook")
      }

    }
  },
  mounted() {
    this.load()
  }
}
</script>

<style scoped>

</style>