<template>
  <div style="padding: 30px 0 0 30px">
    <h2 style="margin-bottom: 20px">查找菜品</h2>
    <span>菜品名称：</span>
    <input type="text" v-model="form.itemName" />
    <button @click="find">查找菜品</button>
    <h2 style="margin-bottom: 20px">菜品列表</h2>
    <el-table :data="tableData" style="width: 98%">
      <el-table-column label="菜品名称" prop="itemName" />
      <el-table-column label="菜品描述" prop="description" />
      <el-table-column label="菜品价格" prop="price" />
      <el-table-column label="菜品图片">
        <template #default="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.itemImage"
          />
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogFormVisible" title="修改信息">
      <el-form>
        <el-form-item label="菜品名称">
          <el-input v-model="form.itemName" class="input-width" />
        </el-form-item>
        <el-form-item label="菜品描述">
          <el-input v-model="form.description" class="input-width" />
        </el-form-item>
        <el-form-item label="菜品价格">
          <el-input v-model="form.price" class="input-width" />
        </el-form-item>
        <el-form-item label="菜品图片">
          <el-upload
            class="avatar-uploader"
            :action="`${baseUrl}/upload/album`"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">+</el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="submit"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { ElMessage } from "element-plus";

export default {
  data() {
    return {
      id: null,
      tableData: [],
      dialogFormVisible: false,
      form: {
        itemName: "",
        description: "",
        price: "",
        price: "",
        itemImage: "",
      },
      imageUrl: "",
      baseUrl: "",
    };
  },
  methods: {
    find() {
      this.axios
        .get("/menu-item/" + this.form.itemName)
        .then((res) => {
            if (res.status == 200) {
              this.tableData = res.data.data;
            }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
  },
};
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
