<template>
  <div class="login">
    <div class="form">
      <h3>用户登录</h3>
      <el-form
        :model="userForm"
        :rules="rules"
        ref="userForm"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="userForm.password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('userForm')">立即创建</el-button>
          <el-button @click="resetForm('userForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      userForm: {
        username: "",
        password: ""
      },
      rules:{
           username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 6, max:12, message: '长度在 6 到 12个字符', trigger: 'blur' }
          ]
      }
    };
  },
  methods:{
     submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
            this.$axios.login(this.userForm).then(res=>{
                console.log("ok");
            })
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
};
</script>

<style lang="scss">
html,
body {
  height: 100%;
  .login {
    height: 100%;
    background-color: skyblue;
    display: flex;
    justify-content: center;
    align-items: center;
    .form {
        border-radius: 10px;
      width: 600px;
      height: 400px;
      background-color: #fff;
      box-sizing: border-box;
      padding: 40px;
      h3{
          font-size: 24px;
          line-height: 30px;
          margin-bottom: 20px;
      }
      .el-form-item__content{
          .el-button{
              display: block;
              margin: 0;
              margin-bottom: 10px;
              width: 100%;
          }
      }
    }
  }
}
</style>
