<template>
  <div class="goods">
    <el-row class="searchBar">
      <el-col :span="6">
        <el-input placeholder="请输入内容"  class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="12">
        <el-button type="success"  @click="$router.push('goods/Add')"  plain>添加用户</el-button>
      </el-col>
    </el-row>
    <div class="table">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column type="index" ></el-table-column>
        <el-table-column prop="goods_name" label="商品名称" width="460"></el-table-column>
        <el-table-column prop="goods_price" label="商品价格(元)" width="180"></el-table-column>
        <el-table-column prop="goods_weight" label="商品重量"></el-table-column>
        <el-table-column prop="add_time" label="创建时间">
          <template v-slot="scop">
              {{scop.row.add_time|formatTime}}
          </template> 
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template >
              <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
              <el-button type="danger" icon="el-icon-delete" plain size="mini"></el-button>
          </template> 
        </el-table-column>
      </el-table>
      <el-pagination
        :page-sizes="[2, 4, 6, 8,10]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import moment from "moment"
export default {
  data() {
    return {
      tableData: [],
      pageSet:{
          pagenum:1,
          pagesize:10,
          query:""
      }
    };
  },
  created(){
      this.$axios.getGoods(this.pageSet).then(res=>{
          this.tableData=res.data.data.goods
      })
  },
  filters:{
    formatTime(value){
      return moment(value).format("YYYY-MM-DD HH:mm:ss")
    }
  }
};
</script>

<style>

</style>
