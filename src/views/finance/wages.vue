<template>
  <div style="padding: 30px 0 0 30px">
    <h2 style="margin-bottom: 20px">财务管理</h2>
    <el-table :data="tableData" style="width: 98%">
      <el-table-column label="ID" prop="id" />
      <el-table-column label="姓名" prop="name" />
      <el-table-column label="电话号码" prop="phoneNumber" />
      <el-table-column label="工资" prop="email" />
      <el-table-column align="right">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogFormVisible" title="修改信息">
      <el-form>
        <el-form-item label="ID">
          <el-input v-model="form.id" class="input-width" />
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.name" class="input-width" />
        </el-form-item>
        <el-form-item label="电话号码">
          <el-input v-model="form.phoneNumber" class="input-width" />
        </el-form-item>
        <el-form-item label="工资">
          <el-input v-model="form.email" class="input-width" />
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
      roomId: null,
      tableData: [],
      dialogFormVisible: false,
      form: {
        id: "",
        name: "",
        phoneNumber: "",
        email: "",
      },
      options: [
        {
          value: "单人间",
          label: "单人间",
        },
        {
          value: "双人间",
          label: "双人间",
        },
        {
          value: "豪华间",
          label: "豪华间",
        },
      ],
      statusOptions: [
        {
          value: "可用",
          label: "可用",
        },
        {
          value: "已预订",
          label: "已预订",
        },
      ],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      // 使用 Axios 执行 GET 请求
      this.axios
        .get("/user", {
          params: {
            keyWord: "",
            page: "1",
            pageSize: "20",
          },
        })
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            this.tableData = res.data.data.data;
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
    handleEdit(row) {
      this.form.id = row.id;
      this.form.name = row.name;
      this.form.phoneNumber = row.phoneNumber;
      this.form.email = row.email;

      this.roomId = row.id;
      this.dialogFormVisible = true;
    },
    async submit() {
      const { data } = await axios.patch("/user/" + this.roomId, {
        id: +this.form.id,
        name: this.form.name,
        phoneNumber: this.form.phoneNumber,
        email: this.form.email,
      });

      console.log(data);

      if (data.message == "成功") {
        ElMessage({
          message: "修改成功",
          type: "success",
        });
        this.fetchData();
        this.dialogFormVisible = false;
      }
    },
    async handleDelete(row) {
      const { data } = await axios.delete("/room/" + row.id);
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
  },
};
</script>

<style scoped></style>
