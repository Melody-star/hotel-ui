<template>
  <div style="padding: 30px 0 0 30px">
    <h2 style="margin-bottom: 20px">查看账单</h2>
    <el-table :data="tableData" style="width: 98%">
      <el-table-column label="订单ID" prop="order.id" />
      <!-- <el-table-column label="客房编号" prop="room.roomNumber" /> -->
      <el-table-column label="菜品名称" prop="menuItem.itemName" />
      <el-table-column label="菜品价格" prop="menuItem.price" />
      <el-table-column label="菜品数量" prop="quantity" />
      <!-- <el-table-column align="right">
        <template #default="scope">
          <el-button type="success" @click="handlePay(scope.row)"
            >已支付</el-button
          >
        </template>
      </el-table-column> -->
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
  mounted() {
    this.fetchData();
    this.baseUrl = axios.defaults.baseURL;
  },
  methods: {
    fetchData() {
      // 使用 Axios 执行 GET 请求
      this.axios
        .get("/order-detail")
        .then((res) => {
          console.log(res);
          if (res.data.status == 200) {
            this.tableData = res.data.data;
            console.log(this.tableData);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
    async handleDelete(row) {
      const { data } = await axios.delete("/menu-item/" + row.id);
      if (data.status == 200) {
        ElMessage({
          message: "删除成功",
          type: "success",
        });
      } else {
        ElMessage({
          message: "删除失败",
          type: "error",
        });
      }
      this.fetchData();
    },
    async handlePay(e) {
      console.log(e);
      const { data } = await axios.patch("/order/" + e.id, {
        orderStatus: "待使用",
      });

      if (data.status == 200) {
        ElMessage({
          message: "操作成功",
          type: "success",
        });
        this.fetchData();
      } else {
        ElMessage({
          message: "操作失败",
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
