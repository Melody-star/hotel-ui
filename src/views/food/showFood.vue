<template>
  <div style="padding: 30px 0 0 30px">
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
      <el-table-column v-if="isLogin && isAdmin" align="right">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button size="small" type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template #default="scope">
          <el-button type="primary" @click="book(scope.row)">订餐</el-button>
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

    <!-- 选择客房 -->
    <el-dialog v-model="showSelectRoom" title="选择客房">
      <el-form>
        <el-form-item label="客房编号">
          <el-select
            v-model="selectRoom"
            class="m-2"
            placeholder="选择客房"
            size="large"
          >
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.room.roomNumber"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="菜品数量">
          <el-input v-model="foodCount" placeholder="Please input" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="seleRoomSubmit"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { ElMessage } from "element-plus";
import { useUserStore } from "../../store/index";

const userStore = useUserStore();

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
      isLogin: false,
      isAdmin: false,
      showSelectRoom: false,
      selectRoom: "",
      options: [],
      foodCount: "1",
      menuItemId: "",
    };
  },
  mounted() {
    this.fetchData();
    this.baseUrl = axios.defaults.baseURL;

    console.log(userStore.userInfo);

    if (Object.keys(userStore.userInfo).length != 0) {
      this.isLogin = true;
      if (userStore.userInfo.userType == 1) {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
    } else {
      this.isLogin = false;
    }
  },
  methods: {
    fetchData() {
      // 使用 Axios 执行 GET 请求
      this.axios
        .get("/menu-item")
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            this.tableData = res.data.data;
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
    handleEdit(row) {
      this.form = row;
      this.id = row.id;
      this.dialogFormVisible = true;
    },
    async submit() {
      const { data } = await axios.patch("/menu-item/" + this.id, {
        itemName: this.form.itemName,
        description: this.form.description,
        price: this.form.price,
        price: this.form.price,
        itemImage: this.form.itemImage,
      });
      if (data.status == 200) {
        ElMessage({
          message: "修改成功",
          type: "success",
        });
        this.fetchData();
        this.dialogFormVisible = false;
      } else {
        ElMessage({
          message: "修改失败",
          type: "error",
        });
      }
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
    handleAvatarSuccess(e) {
      this.imageUrl = this.baseUrl + "/images/" + e.data.filename;
    },

    // 订餐
    async book(e) {
      this.menuItemId = e.id;
      const that = this;
      if (this.isLogin == false) {
        ElMessage({
          message: "请先登录",
          type: "info",
        });
      } else {
        console.log(e);
        const { data } = await axios.get(
          "/order/待使用/" + userStore.userInfo.id
        );

        if (data.status == 200) {
          that.options = data.data;
          this.showSelectRoom = true;
        }
      }
    },

    async seleRoomSubmit() {
      const { data } = await axios.post("/order-detail", {
        quantity: +this.foodCount,
        orderId: this.selectRoom,
        menuItemId: this.menuItemId,
      });

      if (data.status == 200) {
        ElMessage({
          message: "预定成功",
          type: "success",
        });
        this.showSelectRoom = false;
      } else {
        ElMessage({
          message: "预定失败",
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
