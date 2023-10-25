<template>
  <div>
    <h2 style="margin-bottom: 20px">查找客房</h2>
    <span>房间号：</span>
    <input type="text" v-model="roomNumber1" />
    <button @click="find">查找客房</button>

    <br id="roomList" />
    <h2>客房列表</h2>
    <el-table :data="tableData" style="width: 98%">
      <el-table-column label="客房编号" prop="roomNumber" />
      <el-table-column label="客房类型" prop="roomStatus" />
      <el-table-column label="客房价格" prop="roomType" />
      <el-table-column label="入住人数" prop="capacity" />
      <!-- <el-table-column label="客房图片">
                <template #default="scope">
                    <el-image style="width: 100px; height: 100px" :src="scope.row.roomImage" />
                </template>
            </el-table-column> -->
      <el-table-column label="客房状态" prop="roomStatus" />
      <!-- <el-table-column align="right">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column> -->
    </el-table>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
import axios from "axios";

export default {
  data() {
    return {
      tableData: [],
      roomNumber1: "",
    };
  },
  methods: {
    find() {
      if (this.roomNumber1 == "") {
        ElMessage({
          message: "请输入房间号",
          type: "warning",
        });
        return;
      }

      axios.get("/room/" + this.roomNumber1).then((res) => {
        console.log(res);

        if (res.data.data.length == 0) {
          this.tableData = res.data.data;
          ElMessage({
            message: "暂无数据",
            type: "info",
          });
        } else {
          this.tableData = res.data.data;
        }
      });
    },
  },
};
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}

h2 {
  padding-left: 20px;
  padding-top: 10px;
}

th,
td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #adb0b4;
}

form {
  margin-bottom: 20px;
  padding-left: 20px;
}

div {
  background-color: #e1e6e9;
  width: 100%;
  height: 800px;
}
</style>
