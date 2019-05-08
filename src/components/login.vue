<template>
  <div class="login">
    <div class="center">
      <h2>用户登录</h2>
      <el-form label-position="top" :model="formData" :rules="formRules" ref="formRules">
        <el-form-item label="账号" prop="username">
          <el-input v-model="formData.username" ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formData.password" show-password ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('formRules')">登录</el-button>
          <el-button type="danger" @click="resetForm('formRules')">重置</el-button>
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
      formData: {
        username: "",
        password: "",
        token:""
      },
      formRules:{
        username:[
          { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
        ],
        password:[
          { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
       submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.login(this.formData).then(res=>{
              if(res.data.meta.status==400){
                this.$message.error(res.data.meta.msg)
              }else{
                this.$message.success(res.data.meta.msg)
                this.$router.push("/")
              }
            })
          } else {
            this.$message.error("数据有误");
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
  },
  created(){
    
  }
};
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
}
html,
body {
  height: 100%;
  .login {
    height: 100%;
    background: #324152;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.center {
  width: 480px;
  height: 360px;
  background-color: #fff;
  border-radius: 5px;
  padding: 30px 50px;
  .el-button {
    display: block;
    width: 100%;
    margin: 0;
    margin-bottom: 5px;
  }
  h2 {
    text-align: center;
    margin-top: 10px;
    margin-bottom: 30px;
  }
  .el-form-item__label {
    padding: 0;
    
  }
}
</style>
