<template>
  <div class="addGood">
    <el-alert title="添加商品信息" type="info" center show-icon></el-alert>
    <el-steps :active="+active" finish-status="success">
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>
    <el-tabs  v-model="active" tab-position="left" style="height: 200px;">
      <el-tab-pane label="基本信息">基本信息</el-tab-pane>
      <el-tab-pane label="商品参数">商品参数</el-tab-pane>
      <el-tab-pane label="商品属性">商品属性</el-tab-pane>
      <el-tab-pane label="商品图片">商品图片</el-tab-pane>
      <el-tab-pane label="商品内容">商品内容</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
    data(){
        return {
            active: 0
        }
    }
};
</script>

<style>
</style>
