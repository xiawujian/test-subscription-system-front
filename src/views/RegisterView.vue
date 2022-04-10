<template>
  <div style="width: 50%;margin: 160px auto;">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="姓名" prop="name" style="width: 25%">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="学号" prop="number" style="width: 50%">
        <el-input v-model="ruleForm.number"></el-input>
      </el-form-item>
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
      <el-form-item label="密码" prop="pass" style="width: 35%">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass" style="width: 35%">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "RegisterView",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    }
    return {
      ruleForm: {
        name: '',
        number: '',
        institute: '',
        major: '',
        pass: '',
        checkPass: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入您的姓名',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 5,
            message: '长度在 2 到 5 个字符',
            trigger: 'blur'
          }
        ],
        number: [
          {
            required: true,
            message: '请输入您的学号',
          }
        ],
        institute: [
          {
            required: true,
            message: '请选择您的学院',
            trigger: 'change'
          }
        ],
        major: [
          {
            required: true,
            message: '请选择您的专业',
            trigger: 'change'
          }
        ],
        pass: [
          {
            required: true,
            validator: validatePass,
            trigger: 'blur'
          }
        ],
        checkPass: [
          {
            required: true,
            validator: validatePass2,
            trigger: 'blur'
          }
        ]
      }
    };

  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped>

</style>