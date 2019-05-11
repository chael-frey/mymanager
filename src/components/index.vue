<template>
  <div class="index">
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="2">
            <img src="../assets/images/ohu2.gif" alt>
          </el-col>
          <el-col :span="20">
            <h3>熊哥护卫队</h3>
          </el-col>
          <el-col class="imgRight" :span="2">
            <img src="../assets/images/ohu.jpg" alt>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <!-- 左侧导航部分 -->
        <el-aside width="200px">
          <el-menu
            router
            default-active="2"
            class="el-menu-vertical-demo"
          >
            <el-submenu v-for="(item,index) in menuList" :key="index" :index="item.order" >
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{item.authName}}</span>
              </template>
                <el-menu-item v-for="(it,j) in item.children" :key="j" :index="it.path"><i class="el-icon-menu"></i>{{it.authName}}</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "idnex",
  data() {
    return {
      menuList: []
    };
  },
  beforeCreate() {
    if (!window.sessionStorage.getItem("token")) {
      this.$router.push("/login");
    }
  },
  created() {
    this.$axios.getMenu().then(res => {
      this.menuList = res.data.data;
      console.log(res);
    });
  }
};
</script>

<style lang="scss">
.index {
  height: 100%;
}
.el-container {
  width: 100%;
  height: 100%;

  .el-container {
    height: 100%;
  }
}
.el-header {
  height: 60px;
  padding: 0;
  background: linear-gradient(to right, skyblue, pink);
  h3 {
    font-size: 30px;
    line-height: 60px;
    text-align: center;
    font-weight: normal;
    color: #fff;
  }
  .el-col-2 {
    img {
      height: 60px;
    }
    &.imgRight {
      text-align: right;
    }
  }
}
.el-aside {
  background-color: skyblue;
}
.el-main {
  background-color: pink;
}
</style>
