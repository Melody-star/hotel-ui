<template>
    <div id="foodList">
        <h2>菜品列表</h2>
        <table>
            <thead>
                <tr>
                    <th>菜品名称</th>
                    <th>单位</th>
                    <th>售价</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody id="foodTableBody">
                <!-- 客房数据将通过JavaScript动态填充 -->
            </tbody>
        </table>
    </div>
</template>

<script>
</script>

<style scoped>
table {
    border-collapse: collapse;
    width: 100%;
}

th,
td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #adb0b4;
}

h2 {
    padding-left: 20px;
    padding-top: 10px;
}

form {
    margin-bottom: 20px;
    padding-left: 20px;
}

div {
    background-color: #e1e6e9;
    width: 100%;
    height: 800px;
}</style>