<template>
  <div style="padding: 30px 0 0 30px">
    <h2 style="margin-bottom: 20px">客房列表</h2>
    <el-table
      :data="
        tableData.slice((currentPage - 1) * PageSize, currentPage * PageSize)
      "
      style="width: 98%"
    >
      <el-table-column label="客房编号" prop="roomNumber" />
      <el-table-column label="客房类型" prop="roomType" />
      <el-table-column label="客房价格" prop="price" />
      <el-table-column label="入住人数" prop="capacity" />
      <!-- <el-table-column label="客房图片">
                <template #default="scope">
                    <el-image style="width: 100px; height: 100px" :src="scope.row.roomImage" />
                </template>
            </el-table-column> -->
      <el-table-column label="客房状态" prop="roomStatus" />
      <el-table-column align="right">
        <!-- <template #header>
                    <el-input v-model="search" size="small" placeholder="搜索" />
                </template> -->
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button size="small" type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="PageSize"
      layout="total, sizes, prev, pager, next"
      :total="totalCount"
    >
    </el-pagination>

    <el-dialog v-model="dialogFormVisible" title="修改信息">
      <el-form>
        <el-form-item label="客房编号">
          <el-input v-model="form.number" class="input-width" />
        </el-form-item>
        <el-form-item label="客房类型">
          <el-select
            v-model="form.type"
            placeholder="请选择"
            class="input-width"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="客房价格">
          <el-input v-model="form.price" class="input-width" />
        </el-form-item>
        <el-form-item label="入住人数">
          <el-input v-model="form.capacity" class="input-width" />
        </el-form-item>
        <el-form-item label="客房状态">
          <!-- <el-input v-model="form.status" class="input-width" /> -->
          <el-select
            v-model="form.status"
            placeholder="请选择"
            class="input-width"
          >
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
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
      // 默认显示第几页
      currentPage: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 1,
      // 个数选择器（可修改）
      pageSizes: [10, 20, 30, 40],
      // 默认每页显示的条数（可修改）
      PageSize: 10,
      form: {
        number: "",
        type: "",
        price: "",
        capacity: "",
        status: "",
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
        .get("/room", {
          params: {
            keyWord: "",
            page: 1,
            pageSize: 1000,
          },
        })
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            this.tableData = res.data.data.data;
            this.totalCount = res.data.data.data.length;
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
    handleEdit(row) {
      this.form.number = row.roomNumber;
      this.form.type = row.roomType;
      this.form.price = row.price;
      this.form.capacity = row.capacity;
      this.form.status = row.roomStatus;

      console.log(row);
      this.roomId = row.id;
      this.dialogFormVisible = true;
    },
    async submit() {
      const { data } = await axios.patch("/room/" + this.roomId, {
        capacity: parseInt(this.form.capacity),
        price: parseInt(this.form.price),
        roomImage: "",
        roomNumber: this.form.number,
        roomStatus: this.form.status,
        roomType: this.form.type,
      });

      console.log(data);

      if (data.data.message == "修改成功") {
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
    // 每页显示的条数
    handleSizeChange(val) {
      // 改变每页显示的条数
      this.PageSize = val;
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.currentPage = 1;
    },
    // 显示第几页
    handleCurrentChange(val) {
      // 改变默认的页数
      this.currentPage = val;
    },
  },
};
</script>

<style scoped></style>
