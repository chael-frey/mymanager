<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="5">
          <img class="logo" src="../assets/images/logo.png" alt>
        </el-col>
        <el-col :span="16">
          <h1>顺其自然家族</h1>
        </el-col>
        <el-col :span="3">
          <el-button type="danger">退出</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px" class="aside">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
              <el-menu-item index="1-1">
                  <i class="el-icon-menu"></i>
                  用户列表
              </el-menu-item>        
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main"></el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {};
</script>

<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
  .el-container {
    height: 100%;
    .el-header {
      height: 60px;
      background-color: skyblue;
      .el-col {
        height: 60px;
      }
      .el-col-3 {
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
      .logo {
        height: 60px;
      }
      h1 {
        font-size: 30px;
        font-weight: normal;
        line-height: 60px;
        text-align: center;
        color: #fff;
      }
    }
    .aside {
      background-color: pink;
    }
    .main {
    }
  }
}
</style>
