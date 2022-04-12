<template>
  <div style="width: 50%;margin: 160px auto;">
    <el-card>
      <el-form :model="registerForm" :rules="rules" ref="registerForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="姓名" prop="username" style="width: 25%">
          <el-input v-model="registerForm.username"></el-input>
        </el-form-item>
<!--        <el-form-item label="学号" prop="id" style="width: 50%">-->
<!--          <el-input v-model="registerForm.id"></el-input>-->
<!--        </el-form-item>-->
        <!--      <el-form-item label="学院" prop="institute">-->
        <!--        <el-select v-model="ruleForm.institute" placeholder="请选择您的学院">-->
        <!--          <el-option label="区域一" value="shanghai"></el-option>-->
        <!--          <el-option label="区域二" value="beijing"></el-option>-->
        <!--        </el-select>-->
        <!--      </el-form-item>-->
        <!--      <el-form-item label="专业" prop="major" >-->
        <!--        <el-select v-model="ruleForm.major" placeholder="请选择您的专业" >-->
        <!--          <el-option v-for="maj in this.numbers" v-bind:key="maj" :label="maj" :value="maj"></el-option>-->
        <!--        </el-select>-->
        <!--      </el-form-item>-->
        <el-form-item label="密码" prop="password" style="width: 35%">
          <el-input type="password" v-model="registerForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass" style="width: 35%">
          <el-input type="password" v-model="registerForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="medium" style="width: 15%; margin: 15px 0" @click="submit">注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RegisterView",
  data() {
    let validateCheckPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("重复密码不能为空"))
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入的密码不一致"))
      } else {
        callback()
      }
    }
    return {
      registerForm: {
        username: '',
        // id: '',
        password: '',
        checkPass: ''
      },
      rules: {
        username: [
          {
            required: true,
            message: '请输入您的姓名',
            trigger: 'blur'
          },
        ],
        // id: [
        //   {
        //     required: true,
        //     message: '请输入您的学号',
        //   }
        // ],
        password: [
          {
            required: true,
            trigger: 'blur'
          }
        ],
        checkPass: [
          {
            required: true,
            validator: validateCheckPassword,
            trigger: 'blur'
          }
        ]
      }
    };

  },
  methods: {
    submit: function () {
      axios.post("/account/register", this.$data.registerForm)
          .then(() => {
            this.$message.success("注册成功")
            this.$router.push("/")
          })
          .catch(() => {
            this.$message.error("注册失败")
          })
    }
  }
}
</script>

<style scoped>

</style>