<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :model="queryForm" :inline="true">
        <el-form-item label="文件路径" prop="bookName">
          <!-- 姓名搜索条件 -->
          <el-input
            placeholder="路径"
            size="medium"
            v-model="queryForm.path"
            clearable
            style="width: 400px"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="bookName">
          该路径下目录：{{ queryForm.listNum }}  个，文件：{{
              queryForm.fileNum
            }}  个
          </label>
        </el-form-item>
        <el-form-item>
          <!-- 搜索按钮 -->
          <el-button type="primary" icon="el-icon-search" @click="doSearch()"
            >搜索</el-button
          >
          <!-- 搜索按钮 -->
          <el-button type="primary" @click="returnPrepath()"
            >返回上一级</el-button
          >
          <el-button type="success" @click="createDir()" :loading="loading"
            >新建文件夹</el-button
          >
          <!-- 上传文件按钮 -->
          <el-upload
            class="upload-demo inline-block margin-right-10"
            :action="uploadUrl"
            :before-upload="handlePreview"
            :on-success="handSuccess"
            :on-error="handfailupload"
            :before-remove="beforeRemove"
            :data="storePathObj"
          >
            <el-button type="success">点击上传文件</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>

    <el-table :data="tableData" border style="width: 100%" v-loading="loading">
      <el-table-column prop="fileName" label="文件名">
        <template slot-scope="scope">
          <el-link
            type="primary"
            @click="doSearch(scope.row)"
            target="_blank"
            class="buttonText"
            >{{ scope.row.fileName }}</el-link
          >
        </template>
      </el-table-column>
      <el-table-column prop="filePath" label="文件路径"> </el-table-column>
      <el-table-column prop="relativePath" label="相对路径"> </el-table-column>
      <el-table-column prop="parentPath" label="父路径"> </el-table-column>
      <el-table-column prop="owner" label="创建者" min-width="50%"> </el-table-column>
      <el-table-column prop="group" label="创建者组属" min-width="50%"> </el-table-column>
      <el-table-column prop="duplicates" label="副本数" min-width="50%"> </el-table-column>
      <el-table-column prop="size" label="大小"> </el-table-column>
      <el-table-column prop="rights" label="权限"> </el-table-column>
      <el-table-column prop="modifyTime" label="最后修改时间"></el-table-column>
      <el-table-column
        prop="file"
        :formatter="formatteBoolean"
        label="文件类型"
        min-width="55%"
      ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-download"
            @click="fileDownload(scope.row)"
            ></el-button
          >
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete-solid"
            @click="handleDelete(scope.row.relativePath)"
            ></el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryForm.pageNo"
        :page-sizes="pageSizes"
        :page-size="queryForm.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
//import zhCn from "element-plus/lib/locale/lang/zh-cn";
//import { mapState, mapActions, mapMutations } from "vuex";
import {
  fetchData,
  getById,
  update,
  download,
  deleteDir,
  createDir,
} from "../../api/fileList";
import {mybaseUrl} from "../../utils/axios"
import {getToken} from  "@/utils/auth";
export default {
  name: "ComplexTable",
  components: {},
  directives: {},
  filters: {},
  data() {
    return {
      uploadUrl:'http://localhost:8080/api/file/uploadFile',//默认上传地址
      loading: false,
      pageSizes: [10, 20, 30, 50, 100],
      total: 100,
      tableData: [],
      queryForm: {
        name: undefined,
        pageNo: 1,
        pageSize: 10,
        path: "/",
        fileNum: 0,
        listNum: 0
      },
      dialogTitle: "",
      dialogVisible: false,
      bibliographyInfo: {}, // 具体的一行信息
      isEdit: true,
      dialogCommitButtonName: "新 增",
      showPassword: true,
      prePathArr: ["/"],
      storePathObj:{
        storePath:"",
        token:''
        }
    };
  },
  created() {
    this.getList();
    // 文件上传路径
    this.uploadUrl = mybaseUrl + '/file/uploadFile';
  },
  methods: {
    //...mapActions("volunteer", ["fetchData"]),
    //...mapMutations("volunteer", ["setPageSize"]),
    getList(path) {
      console.log(this.prePathArr);
      let prePath = this.prePathArr[this.prePathArr.length - 1];
      if (path) {
        this.queryForm.path = path;
      }
      // 获取表格数据
      fetchData(this.queryForm).then(
        (response) => {
          if (response.code === 200) {
            this.tableData = response.data.fileStatusDos;
            this.total = response.data.total;
            this.queryForm.pageSize = response.data.pageSize;
            this.queryForm.fileNum = response.data.fileNum;
            this.queryForm.listNum = response.data.listNum;
            // 将路径记录存入数组中
            if (path && path != prePath) this.prePathArr.push(path);
          } else {
            this.$message.error(response.message);
            this.queryForm.path = this.prePathArr[this.prePathArr.length - 1];
          }
        },
        (err) => {
          this.$message.error(err);
        }
      );
      this.loading = false;
    },
    /**
     * 返回上一级目录
     */
    returnPrepath() {
      this.prePathArr.pop();
      this.getList(this.prePathArr[this.prePathArr.length - 1]);
    },
    /**
     * 创建文件夹
     */
    createDir() {
      // 记录一下当前目录
      let prePath = this.prePathArr[this.prePathArr.length - 1];
      if (prePath === this.queryForm.path) {
        return this.$message.error("路径：" + this.queryForm.path + "  不正确");
      }
      createDir(this.queryForm.path).then(
        (res) => {
          if (res.code === 200) {
            // 查的是上一级目录
            this.$message.success(
              "文件夹：" + this.queryForm.path + "创建成功"
            );
            this.getList(prePath);
          } else {
            this.$message.error(
              "文件夹：" + this.queryForm.path + "创建失败," + res.message
            );
          }
        },
        (err) => {
          console.log(err);
          this.$message.error(
            "文件夹：" + this.queryForm.path + "创建失败," + err
          );
        }
      );
    },
    doSearch(row) {
      //row.file是判断是否为文件
      if (!row) {
        this.getList();
      } else if (row.file) {
        this.$message.error(row.fileName + "不是文件夹");
      } else {
        let prepath = this.prePathArr[this.prePathArr.length - 1];
        let path = prepath + (prepath == "/" ? "" : "/") + row.fileName;
        this.getList(path);
      }
    },
    handleSizeChange(val) {
      this.queryForm.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      console.log("===", val);
      this.queryForm.pageNo = val;
      this.getList();
    },
    openEditDialog(id) {
      this.dialogCommitButtonName = "修 改";
      this.dialogTitle = "详 情";
      let param = {
        id: id,
      };
      this.clearDialogData();
      getById(param)
        .then((response) => {
          this.bibliographyInfo = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
      this.dialogVisible = true;
    },
    openAddDialog() {
      this.dialogCommitButtonName = "新 增";
      this.isEdit = false;
      this.dialogTitle = "新增书目";
      this.clearDialogData();
      this.dialogVisible = true;
    },
    clearDialogData() {
      this.bibliographyInfo = {};
    },
    handleClose(done) {
      this.dialogVisible = false;
      this.clearDialogData();
    },
    dialogCommit() {
      if (this.isEdit) {
        this.handleUpdate();
      } else {
        this.handleAdd();
      }
    },
    handleDelete(path) {
      deleteDir(path)
        .then((response) => {
          if (response.code == 200) {
            this.$message({
              message: "删除成功",
              type: "success",
            });
            this.getList();
          } else {
            this.$message.error("删除失败");
          }
        })
        .catch((err) => {
          console.log(err);
          this.$message.error("网络异常");
        });
    },
    formatteBoolean(row, index) {
      return row.file ? "文件" : "目录";
    },
    ////////////////////////上传文件的钩子函数/////////////////////////////
    handSuccess(response, file, fileList) {
      console.log(response, file, fileList);
      //刷新当前界面
      this.getList();
      this.$message.success("上传成功");
    },
    handlePreview(file) {
      console.log(file);
      let uploadFileName = file.name;
      let path = this.queryForm.path;
      let storepath = path + (path == '/' ? '' : '/') + uploadFileName;
      console.log("=====",storepath)
      this.storePathObj.storePath = storepath;
      this.storePathObj.token = getToken();
    },
    handfailupload(err, file, fileList) {
      console.log(err, file, fileList);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    //////////////////////下载文件的函数//////////////////////
    fileDownload(row) {
        download({
            fileName: row.fileName,
            relativePath: row.relativePath,
        }).then(res=>{
          console.log(res)
        },err=>{
          console.log(err)
        })
    },
  },
};
</script>
<style scoped>
.inline-block {
  margin-left: 10px;
  display: inline-block;
}
</style>
