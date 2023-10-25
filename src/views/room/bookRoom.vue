<template>
  <div>
    <h1>请选择预定客房</h1>
    <br id="roomList" />
    <h2>客房列表</h2>
    <el-table :data="tableData" style="width: 98%">
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
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
            >预定</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogFormVisible" title="填写信息">
      时间选择
      <el-date-picker
        v-model="value1"
        type="daterange"
        range-separator="To"
        start-placeholder="入住时间"
        end-placeholder="离开时间"
        value-format="YYYY-MM-DD"
      />
      <template #footer>
        <span>
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="submit"> 提交 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { useUserStore } from "../../store/index";
import { ElMessage } from "element-plus";

const userStore = useUserStore();

export default {
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      value1: null,
      roomId: null,
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
            pageSize: 10,
          },
        })
        .then((res) => {
          if (res.data.status == 200) {
            this.tableData = []
            for (let i = 0; i < res.data.data.data.length; i++) {
              if (res.data.data.data[i].roomStatus == "可用") {
                this.tableData.push(res.data.data.data[i]);
              }
            }
          }
        });
    },
    handleEdit(index, value) {
      this.dialogFormVisible = true;
      this.roomId = value.id;
    },
    submit() {
      this.dialogFormVisible = false;

      console.log(userStore.userInfo.id);

      if (userStore.userInfo.id == undefined) {
        ElMessage({
          message: "请先登录",
          type: "info",
        });
        return;
      }

      if (this.value1 == null) {
        ElMessage({
          message: "请选择时间",
          type: "warning",
        });
        return;
      }

      // 创建订单
      this.axios
        .post("/order", {
          userId: userStore.userInfo.id,
          orderStatus: "待支付",
          checkInDate: this.value1[0],
          roomId: this.roomId,
          checkOutDate: this.value1[1],
        })
        .then((res) => {
          console.log(res);

          if (res.data.status == 200) {
            ElMessage({
              message: res.data.message,
              type: "success",
            });
            this.fetchData();
          } else {
            ElMessage({
              message: "预定失败",
              type: "error",
            });
          }
        });
    },
  },
};
</script>

<style scoped>
th,
td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #adb0b4;
}

h1 {
  padding-left: 20px;
  padding-top: 10px;
}

h2 {
  padding-left: 20px;
  padding-top: 10px;
}
</style>
