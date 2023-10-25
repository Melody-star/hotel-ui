<template>
  <div class="box">
    <div class="text-count">财务统计</div>
    <div class="box-top">
      <div class="box-top-room">
        <div class="box-top-room-left">
          <text>房间收入</text>
          <text>￥1223</text>
          <text>50%</text>
        </div>
        <div class="box-top-room-right">
          <div id="chart" style="width: 100px; height: 100px"></div>
        </div>
      </div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
import * as Echarts from "echarts";

export default {
  data() {
    return {};
  },
  mounted() {
    let chart = Echarts.init(document.getElementById("chart"));
    chart.setOption({
      title: { text: "ECharts 示例" },
      tooltip: {},
      xAxis: { data: ["类别1", "类别2", "类别3", "类别4"] },
      yAxis: {},
      series: [{ name: "销量", type: "bar", data: [5, 20, 36, 10] }],
    });
  },
};
</script>

<style scoped>
.box {
  background-color: #434348;
  width: 100%;
  height: 100%;
  color: white;
}

.text-count {
  font-size: 23px;
  margin-top: 20px;
  margin-left: 20px;
}

.box-top {
  background-color: #4e4e57;
  margin: 20px 20px;
  border-radius: 6px;
}

.box-top-room-left {
  display: flex;
  flex-direction: column;
}
</style>
