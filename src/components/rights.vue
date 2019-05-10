<template>
  <div class="user" v-loading="loading" element-loading-text="拼命加载中">
    <el-breadcrumb class="my-breadcrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="table"  >
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
        <el-table-column prop="path" label="路径" width="180"></el-table-column>
        <el-table-column prop="level" label="层级">
          <template slot-scope="scope">
              {{scope.row.level==0?'一级':''}}
              {{scope.row.level==1?'二级':''}}
              {{scope.row.level==2?'三级':''}}
          </template>
        </el-table-column>
      </el-table>
      
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading:true,
      tableData: []
    };
  },
  methods:{
    getRights(){
      this.$axios.getRights().then(res=>{
        this.tableData=res.data.data
        setTimeout(() => {
        // 延迟一会
        this.loading = false;
      }, 1000);
      })
    }
  },
  created(){
    this.getRights()
  }
};
</script>

<style lang="scss">
.my-breadcrumb {
  line-height: 45px;
  padding-left: 10px;
  background-color: #d3dce6;
  border-radius: 4px 4px 0 0;
  margin-bottom: 2px;
}
.searchBar {
  margin-bottom: 2px;
}
</style>
