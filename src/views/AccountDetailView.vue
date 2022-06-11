<template>
  <div>
    <el-card style="height: auto">
      <el-descriptions class="margin-top" title="教材详情" :column="1" border style="width: 50%">
        <el-descriptions-item>
          <template slot="label">
            <font-awesome-icon icon="fa-solid fa-user" />
            用户名
          </template>
          {{account.username}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <font-awesome-icon icon="fa-solid fa-user" />
            角色
          </template>
          {{account.status}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <font-awesome-icon icon="fa-solid fa-at" />
            邮箱
          </template>
          {{account.email}}
        </el-descriptions-item>
      </el-descriptions>
      <el-button style="margin-top: 30px" size="primary" v-on:click="goto()">返回</el-button>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AccountDetailView",
  data: function () {
    return {
      accountId: this.$route.params.accountId,
      account:{

      },
    };
  },
  methods:{
    load(){
      axios.post("/account/info",{
        id:this.$data.accountId
          }
      ).then((response) => {
        this.account = response.data
        if(this.account.role===0){
          this.account.status="学生";
        }else if(this.account.role===1){
          this.account.status="教师";
        }else{
          this.account.status="管理员";
        }
      }).catch((error) => {
        this.$message.error(error.response.data)
      })
    },
    goto: function () {
        this.$router.push("/home/admin/account")
    }
  },
  mounted() {
    this.load()
  }
}
</script>

<style scoped>

</style>