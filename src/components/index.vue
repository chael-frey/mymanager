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
          <!-- 导航菜单 -->
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          router
        >
        <!-- 用户 -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
              <el-menu-item index="user">
                  <i class="el-icon-menu"></i>
                  用户列表
              </el-menu-item>        
          </el-submenu>
          <!-- 权限 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
              <el-menu-item index="roles">
                  <i class="el-icon-menu"></i>
                  角色列表
              </el-menu-item>        
              <el-menu-item index="rights">
                  <i class="el-icon-menu"></i>
                  权限列表
              </el-menu-item>        
          </el-submenu>
          <!-- 商品 -->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
              <el-menu-item index="shopList">
                  <i class="el-icon-menu"></i>
                  商品列表
              </el-menu-item>        
              <el-menu-item index="params">
                  <i class="el-icon-menu"></i>
                  商品参数
              </el-menu-item>        
              <el-menu-item index="categories">
                  <i class="el-icon-menu"></i>
                  商品分类
              </el-menu-item>        
          </el-submenu>
          <!-- 订单 -->
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
              <el-menu-item index="orders">
                  <i class="el-icon-menu"></i>
                  订单列表
              </el-menu-item>   
          </el-submenu>
          <!-- 订单 -->
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
              <el-menu-item index="reports">
                  <i class="el-icon-menu"></i>
                  数据报表
              </el-menu-item>   
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  created(){
    console.log(this.$router);
  }
};
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
      background-color: #B3C0D1;
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
      background-color: #fff;
    }
    .main {
        padding: 10px;
        background-color: rgb(238,238,255);
    }
  }
}
</style>
