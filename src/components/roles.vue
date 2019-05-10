<template>
  <div class="user">
    <el-breadcrumb class="my-breadcrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="searchBar">
      <el-col :span="24">
        <el-button type="success" plain @click="addVisible=true">添加角色</el-button>
      </el-col>
    </el-row>
    <div class="table">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="roleName" label="角色名称" width="180"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述" width="180"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="handleEdit(scope.row)"
              icon="el-icon-edit"
              plain
              size="mini"
            ></el-button>
            <el-button type="success" icon="el-icon-check" plain size="mini"></el-button>
            <el-button
              type="danger"
              @click="delRoles(scope.row)"
              icon="el-icon-delete"
              plain
              size="mini"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 增加角色 -->
    <el-dialog title="新增角色" :visible.sync="addVisible">
      <el-form :model="rolesForm" :rules="userRules" ref="addRoles">
        <el-form-item label="角色名称" label-width="120px" prop="roleName">
          <el-input v-model="rolesForm.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="120px">
          <el-input v-model="rolesForm.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addVisible=false">取 消</el-button>
        <el-button type="primary" @click="submitForm('addRoles')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑角色 -->
    <el-dialog title="编辑角色" :visible.sync="editVisible">
      <el-form :model="rolesForm" :rules="userRules" ref="updateRole">
        <el-form-item label="角色名称" label-width="120px" prop="roleName">
          <el-input v-model="rolesForm.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="120px">
          <el-input v-model="rolesForm.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editVisible=false">取 消</el-button>
        <el-button type="primary" @click="submitForm('updateRole')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addVisible: false,
      tableData: [],
      rolesForm: {
        roleName: "",
        roleDesc: ""
      },
      userRules: {
        roleName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 6, message: "长度在 2 到 6 个字符", trigger: "blur" }
        ]
      },
      // 编辑角色部分
      editVisible:false,

    };
  },
  methods: {
    delRoles(params){
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.delRoles(params).then(res=>{
            if(res.data.meta.status==200){
              this.$message.success('删除成功!');
              this.getRoles();
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '你是好人'
          });          
        });
    },
    // 点击编辑角色弹框
    handleEdit(row) {
      this.editVisible=true;
      this.rolesForm=row;
    },
    // 提交角色信息
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if(formName=="addRoles"){
            this.$axios.addRoles(this.rolesForm).then(res => {
            if (res.data.meta.status == 201) {
              this.addVisible = false;
              this.getRoles();
            }
            });
          }else if(formName=="updateRole"){
            this.$axios.updateRolesById(this.rolesForm).then(res=>{
              if(res.data.meta.status==200){
                this.editVisible=false;
                this.getRoles()
              }
            })
          }
        } else {
          this.$message.error("小逼崽子，信息都不会填吗？");
          return false;
        }
      });
    },
    getRoles(){
        this.$axios.getRoles().then(res => {
          let data = res.data.data;
          data.forEach(v => {
            v._children = v.children;
            delete v.children;
          });
          this.tableData = data;
        });
    }
  },
  created() {
     this.getRoles()
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
