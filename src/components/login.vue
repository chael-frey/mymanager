<template>
  <div class="login">
    <div class="center">
        <h2>用户登录</h2>
      <el-form label-position="top" >
        <el-form-item label="账号">
          <el-input ></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login"
};
</script>

<style lang="scss">
*{
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
.center{
    width: 480px;
    height: 360px;
    background-color: #fff;
    border-radius: 5px;
    padding: 30px 50px;
    .el-button--primary{
        display: block;
        width: 100%;
    }
    h2{
        text-align: center;
        margin-top: 10px;
        margin-bottom: 30px;
    }
    .el-form-item__label{
        padding: 0;
        &::before{
            content: "*";
            color:red;
            margin-right: 5px;
        }
    }
}
</style>
