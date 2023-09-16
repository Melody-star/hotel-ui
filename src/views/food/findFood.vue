<template>
    <div>
        <form id="findRoomForm" onsubmit="return findRoom()" method="post">
            <h2>查找菜品</h2>
            <label for="foodName">菜品名称：</label>
            <input type="text" id="foodName">
            <label for="price">售&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;价：</label>
            <input type="number" id="price">
            <label for="foodkind">单&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位：</label>
            <input type="number" id="foodkind">
            <button type="submit">查找菜品</button>
        </form>
        <br id="foodList">
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