<template>
  <div class="user">
    <el-breadcrumb class="my-breadcrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类参数</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 警告窗 -->
    <el-alert title="注意：只允许为第三级分类设置相关参数！" type="warning" show-icon></el-alert>
    <!-- 级联列表 -->
    请选择商品分类：
    <el-cascader
    :props="props"
    @change="handleChange"
    expand-trigger="hover"
    :options="options">
    </el-cascader>
    <!-- tab切换栏 -->
    <el-tabs v-model="activeName"  >
      <el-tab-pane label="动态参数" name="many">
        <el-button type="primary" disabled>添加动态参数</el-button>
        <div class="table">
          <el-table :data="manyTableData" style="width: 100%" border>
            <el-table-column type="index"></el-table-column>
            <el-table-column prop="attr_vals" label="商品参数" width="180"></el-table-column>
            <el-table-column prop="name" label="姓名" width="操作">
               <template>
              <el-button type="primary">编辑</el-button>
              <el-button type="danger">删除</el-button>
            </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="静态参数" name="only">
        <el-button type="primary" disabled>添加静态参数</el-button>
        <div class="table">
          <el-table :data="onlyTableData" style="width: 100%"  border>
            <el-table-column type="index"></el-table-column>
            <el-table-column prop="attr_vals" label="商品参数" width="180"></el-table-column>
            <el-table-column prop="name" label="姓名" width="操作">
               <template>
              <el-button type="primary">编辑</el-button>
              <el-button type="danger">删除</el-button>
            </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
       props: {
        label: "cat_name",
        value: "cat_id",
        children: "children"
      },
      options:[],
      selectedOptions: [],
      activeName: "many",
      manyTableData: [],
      onlyTableData: []
    };
  },
  methods:{
     handleChange(value) {
        if(value[2]){
          this.$axios.getStatic({id:value[2],type:"many"}).then(res=>{
              this.manyTableData=res.data.data;
          })
          this.$axios.getStatic({id:value[2],type:"only"}).then(res=>{
              this.onlyTableData=res.data.data;
          })
        }
      }
  },
  created(){
    this.$axios.getCategories().then(res=>{
      this.options=res.data.data
    })
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
.el-alert--warning{
  margin: 20px 0px;
}
</style>
