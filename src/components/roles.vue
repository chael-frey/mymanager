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
        <!-- 展开行 -->
        <el-table-column type="expand">
          <template slot-scope="props">
            <!-- 一级tab -->
            <el-row v-for="(level1,index) in props.row._children" :key="index">
              <el-col :span="6">
                <el-tag type="primary" :key="level1.id" @close="delRights(props.row,level1.id)" closable>{{level1.authName}}</el-tag>
                <span class="el-icon-arrow-right"></span>
              </el-col>
              <el-col :span="18">
                <!-- 二级tab -->
                <el-row v-for="(level2,i) in level1.children" :key="i">
                  <el-col :span="6">
                    <el-tag type="success" :key="level2.id" @close="delRights(props.row,level2.id)" closable>{{level2.authName}}</el-tag>
                    <span class="el-icon-arrow-right"></span>
                  </el-col>
                  <el-col :span="18">
                    <!-- 三级tab -->
                        <el-tag type="warning" v-for="level3 in level2.children" :key="level3.id" @close="delRights(props.row,level3.id)" closable>{{level3.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <!-- 其他部分 -->
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
            <el-button type="success" @click="handleRole(scope.row)" icon="el-icon-check" plain size="mini"></el-button>
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
    <!-- 权限管理 -->
    <el-dialog title="分配权限" :visible.sync="rightsVisible">
        <el-tree 
          :data="rightsData" 
          :props="rightsProps"
          :default-checked-keys="defaultCheckedKeys"
          node-key="id"
          show-checkbox
          default-expand-all
          ref="tree"
          ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="rightsVisible=false">取 消</el-button>
        <el-button type="primary" @click="setRoleRights('updateRole')">确 定</el-button>
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
      editVisible: false,
      // 修改权限
      rightsVisible:false,
      // 权限数据
      rightsForm:{},
      // 所有的权限
      rightsData:[],
      rightsProps:{
        children:"children",
        label:"authName"
      },
      // 默认的选中权限
      defaultCheckedKeys:[]
    };
  },
  methods: {
    delRoles(params) {
      this.$confirm("此操作将永久删除该角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios.delRoles(params).then(res => {
            if (res.data.meta.status == 200) {
              this.$message.success("删除成功!");
              this.getRoles();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "你是好人"
          });
        });
    },
    // 点击编辑角色弹框
    handleEdit(row) {
      this.editVisible = true;
      this.rolesForm = row;
    },
    // 弹出权限框
    handleRole(row){
      this.rightsVisible=true;
      this.rightsForm = row;
      this.$axios.getTreeRights().then(res=>{
        this.rightsData = res.data.data;
        let checkedIds = [];
        function getCheckedKeys(item){
          item._children.forEach(v=>{
            
            if (v.children) {
              // 为了保证代码的一致 重新赋值 _children属性
              v._children = v.children;
              getCheckedKeys(v);
            }else{
              checkedIds.push(v.id);
            }
          })
        }
        getCheckedKeys(row);
        this.defaultCheckedKeys = checkedIds;
      })
    },
    // 提交角色信息
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (formName == "addRoles") {
            this.$axios.addRoles(this.rolesForm).then(res => {
              if (res.data.meta.status == 201) {
                this.addVisible = false;
                this.getRoles();
              }
            });
          } else if (formName == "updateRole") {
            this.$axios.updateRolesById(this.rolesForm).then(res => {
              if (res.data.meta.status == 200) {
                this.editVisible = false;
                this.getRoles();
              }
            });
          }
        } else {
          this.$message.error("小逼崽子，信息都不会填吗？");
          return false;
        }
      });
    },
    getRoles() {
      this.$axios.getRoles().then(res => {
        let data = res.data.data;
        data.forEach(v => {
          v._children = v.children;
          delete v.children;
        });
        this.tableData = data;
      });
    },
    // 删除权限
    delRights(row,rightId){
      this.$axios.delRights({
        roleId:row.id,
        rightId
      }).then(res=>{
        row._children=res.data.data
      })
    },
    // 设置权限
    setRoleRights(){
      const rids = this.$refs.tree.getCheckedKeys().join(",")+","+this.$refs.tree.getHalfCheckedKeys().join(",");
       this.$axios.setRoleRights({
          // 直接获取之前弹出权限框保存的数据
          roleId: this.rightsForm.id,
          rids
        })
        .then(res => {
          // console.log(res);
          if (res.data.meta.status == 200) {
            this.rightsVisible = false;
            // 重新获取数据
            this.getRoles();
          }
          this.$axios.getMenu().then(res=>{
            console.log(res.data.data);
            this.$store.commit("changeMenuList",res.data.data);
          })
        });
    }
  },
  created() {
    this.getRoles();
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
.el-tag{
  margin-right: 5px;
  margin-bottom: 5px;
}
</style>
