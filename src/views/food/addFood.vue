<template>
  <div>
    <h1>请输入菜品信息</h1>
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
        >
          <img v-if="form.itemImage" :src="form.itemImage" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">+</el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";
import { ElMessage } from "element-plus";

export default {
  data() {
    return {
      form: {
        itemName: "",
        description: "",
        price: "",
        price: "",
        itemImage: "",
      },
      baseUrl: "",
    };
  },
  mounted() {
    this.baseUrl = axios.defaults.baseURL;
  },
  methods: {
    handleAvatarSuccess(e) {
      this.form.itemImage = this.baseUrl + "/images/" + e.data.filename;
    },
    async onSubmit() {
      const { data } = await axios.post("/menu-item", {
        itemName: this.form.itemName,
        description: this.form.description,
        price: this.form.price,
        price: this.form.price,
        itemImage: this.form.itemImage,
      });

      if (data.status == 200) {
        ElMessage({
          message: "添加成功",
          type: "success",
        });
      } else {
        ElMessage({
          message: "添加失败",
          type: "error",
        });
      }
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

.input-width {
  width: 250px;
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
