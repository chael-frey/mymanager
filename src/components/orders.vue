<template>
  <div class="user">
    <el-breadcrumb class="my-breadcrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="searchBar">
      <el-col :span="6">
        <el-input placeholder="请输入内容" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="12">
        <el-button type="success" plain>添加用户</el-button>
      </el-col>
    </el-row>
    <div class="table">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="order_number" label="订单标号" width="250"></el-table-column>
        <el-table-column prop="order_price" label="订单价格" width="180"></el-table-column>
        <el-table-column label="是否付款" width="180">
          <template slot-scope="scope">
            <el-button v-if="scope.row.pay_status==0" type="danger" plain>未付款</el-button>
            <el-button v-else type="success" plain>已付款</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="is_send" label="是否发货"></el-table-column>
        <el-table-column label="发货时间">
          <template slot-scope="scope">{{scope.row.create_time|formatTime}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="handleEdit(scope.row)"
              icon="el-icon-edit"
              plain
              size="mini"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :page-sizes="[2, 4, 6, 8,10]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <!-- 修改弹出框 -->
    <el-dialog title="修改订单地址" :visible.sync="editVisible">
      <el-form :model="editForm"  ref="editForm">
        <el-form-item label="省市区/县" label-width="120px" prop="username">
          <el-cascader expand-trigger="hover" :options="options" v-model="selectedOptions" ></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" label-width="120px">
          <el-input v-model="editForm.address" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editVisible=false">取 消</el-button>
        <el-button type="primary" @click="submitForm('editForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import moment from "moment";
// 导入地址数据
import options from "../assets/city_data2017_element.js";
export default {
  data() {
    return {
      // 分页部分数据
      total:0,
      // 选择城市部分数据
      options,
      selectedOptions: [],
      editVisible: false,
      tableData: [],
      orderData: {
        query: "",
        pagenum: 1,
        pagesize: 10
      },
      editForm: {
        address: ""
      },
    };
  },
  methods: {
    handleEdit(row) {
      this.editVisible = true;
    }
  },
  created() {
    this.$axios.getOrderList(this.orderData).then(res => {
      this.tableData = res.data.data.goods;
      this.total=res.data.data.goods.length
    });
  },
  filters: {
    formatTime(value) {
      return moment(value).format("YYYY-MM-DD HH:mm:ss");
    }
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
