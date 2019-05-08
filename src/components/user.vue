<template>
  <div class="user">
    <el-breadcrumb class="my-breadcrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="searchBar">
      <el-col :span="6">
        <el-input placeholder="请输入内容" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="12">
        <el-button type="success" plain @click="addVisible=true">添加用户</el-button>
      </el-col>
    </el-row>
    <div class="table">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="username" label="姓名" width="180"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="mg_state" label="用户状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="changeType(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="handleEdit(scope.$index, scope.row)"
              icon="el-icon-edit"
              plain
              size="mini"
            ></el-button>
            <el-button type="success" icon="el-icon-check" plain size="mini"></el-button>
            <el-button
              type="danger"
              @click="delUser(scope.row)"
              icon="el-icon-delete"
              plain
              size="mini"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :page-sizes="[10, 20, 25, 400]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      ></el-pagination>
    </div>
    <!-- 弹出框 -->
    <el-dialog title="收货地址" :visible.sync="addVisible">
      <el-form :model="userForm" :rules="userRules" ref="userForm">
        <el-form-item label="用户名" label-width="120px" prop="username">
          <el-input v-model="userForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px" prop="password">
          <el-input v-model="userForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="120px">
          <el-input v-model="userForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="120px">
          <el-input v-model="userForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addVisible=false">取 消</el-button>
        <el-button type="primary" @click="addUser('userForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addVisible:false,
      userData: {
        query: "",
        pagenum: 1,
        pagesize: 10
      },
      tableData:[],
      userForm:{
        username:"",
        password:"",
        email:"",
        mobile:""
      },
      userRules:{
        username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' }
          ],
        password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
          ]
      }
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    getUser() {
      this.$axios.getUser(this.userData).then(res => {
        this.tableData = res.data.data.users;
      });
    },
    changeType(row) {
      this.$axios.stateChange(row);
    },
    delUser(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios.delUser(row).then(res => {
            if (res.data.meta.status == 200) {
              this.getUser();
            }
          });
        })
        .catch(() => {
          this.$message("已取消删除");
        });
    },
    addUser(formName){
      this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.addUser(this.userForm).then(res=>{
              if(res.data.meta.status==201){
                this.addVisible=false
                this.$refs[formName].resetFields();
                this.getUser()
              }
            })
          } else {
            this.$message.error("小逼崽子，信息都不会填吗？")
            return false;
          }
        });
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
