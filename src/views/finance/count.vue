<template>
  <div class="box">
    <div class="text-count">财务统计</div>
    <div class="box-top">
      <div class="box-top-room">
        <div class="box-top-room-left">
          <text style="font-size: 28px">￥1223</text>
          <text style="margin-top: 10px">今日收入</text>
        </div>
        <div class="box-top-room-left">
          <text style="font-size: 28px">￥1223</text>
          <text style="margin-top: 10px">今日支出</text>
        </div>
        <div class="box-top-room-left">
          <text style="font-size: 28px">￥1223</text>
          <text style="margin-top: 10px">本月收入</text>
        </div>
        <div class="box-top-room-left">
          <text style="font-size: 28px">￥1223</text>
          <text style="margin-top: 10px">本月支出</text>
        </div>
      </div>
      <div style="background-color: white; height: 300px; margin-top: 20px">
        <!-- <div style="color: black;margin-left: 20px;">收入情况</div> -->
        <div id="chart" style="width: 100%; height: 100%"></div>
      </div>
      <div style="display: flex; margin-top: 20px">
        <div
          style="
            background-color: white;
            height: 300px;
            width: 700px;
            color: black;
          "
        >
          收入占比
          <div id="chart1" style="width: 100%; height: 100%"></div>
        </div>
        <div
          style="
            background-color: white;
            height: 300px;
            margin-left: 20px;
            width: 700px;
            color: black;
          "
        >
          入住数量
          <div id="chart2" style="width: 100%; height: 100%"></div>
        </div>
      </div>
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
      xAxis: {
        type: "category",
        data: [
          "一月",
          "二月",
          "三月",
          "四月",
          "五月",
          "六月",
          "七月",
          "八月",
          "九月",
          "十月",
        ],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260, 260, 260, 240],
          type: "line",
        },
      ],
    });

    let chart1 = Echarts.init(document.getElementById("chart1"));
    chart1.setOption({
      tooltip: {
        trigger: "item",
      },
      legend: {
        top: "5%",
        left: "center",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: 1048, name: "客房收入" },
            { value: 735, name: "餐饮收入" },
          ],
        },
      ],
    });

    let chart2 = Echarts.init(document.getElementById("chart2"));
    chart2.setOption({
      xAxis: {
        type: "category",
        data: ["一月", "二月", "三月", "四月", "五月", "六月", "七月","八月","九月"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130,20,20],
          type: "bar",
        },
      ],
    });
  },
};
</script>

<style scoped>
.box {
  background-color: #f2f2f2;
  width: 100%;
  height: 100%;
  color: white;
}

.text-count {
  font-size: 23px;
  margin-top: 20px;
  margin-left: 20px;
  color: black;
}

.box-top {
  margin: 20px 20px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
}

.box-top-room-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: black;
}

.box-top-room {
  display: flex;
  justify-content: space-around;
  padding: 30px 0;
  background-color: #ffffff;
}
</style>
