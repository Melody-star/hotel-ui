<template>
  <div style="padding: 30px 0 0 30px">
    <h1>请输入客房信息</h1>
    <h2 style="margin: 20px 0px">添加客房</h2>
    <el-form>
      <el-form-item label="客房编号">
        <el-input v-model="form.number" class="input-width" />
      </el-form-item>
      <el-form-item label="客房类型">
        <el-select v-model="form.type" placeholder="请选择" class="input-width">
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
      <!-- <el-form-item label="客房图片">
                <el-upload class="avatar-uploader" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                    :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item> -->
      <el-form-item label="客房状态">
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
      <el-form-item>
        <el-button type="primary" @click="onSubmit">添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { ElMessage } from "element-plus";
import axios from "axios";

let options = [
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
];

let form = reactive({
  number: "",
  type: "",
  price: null,
  capacity: null,
  // image: "",
  status: "",
});

let statusOptions = [
  {
    value: "可用",
    label: "可用",
  },
  {
    value: "已预订",
    label: "已预订",
  },
];

const onSubmit = async () => {
  const { data } = await axios.post("/room", {
    capacity: parseInt(form.capacity),
    price: parseInt(form.price),
    roomImage: "",
    roomNumber: form.number,
    roomStatus: form.status,
    roomType: form.type,
  });
  if (data.data.message == "添加成功") {
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
};
</script>

<style scoped>
.input-width {
  width: 200px;
}

.avatar-uploader {
  width: 178px;
  height: 178px;
  display: block;
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
