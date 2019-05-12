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
          <el-button type="danger" @click="exit">退出</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px" class="aside">
          <!-- 导航菜单 -->
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          router
        >
        <!-- 用户 -->
          <el-submenu v-for="(item,index) in $store.state.menuList" :key="index"  :index="item.order+''">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>
              <el-menu-item v-for="(it,i) in item.children" :key="i" :index="it.path">
                  <i class="el-icon-menu"></i>
                  {{it.authName}}
              </el-menu-item>        
          </el-submenu>
          <!-- 权限 -->
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
  data(){
    return {
      menuForm:[]
    }
  },
  beforeCreate(){
    if(!window.sessionStorage.getItem("token")){
      this.$message.error("请先登录");
      this.$router.push("login")
    }
  },
  methods:{
    exit(){
      window.sessionStorage.removeItem("token")
      this.$router.push("login")
    }
  },
  created(){
    this.$axios.getMenu().then(res=>{
      this.$store.commit("changeMenuList",res.data.data);
    })
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
