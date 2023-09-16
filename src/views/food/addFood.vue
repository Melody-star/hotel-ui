<template>
    <div>
        <h1>请输入菜品信息</h1>
        <form id="addFoodForm" onsubmit="return addFood()" method="post">
            <h2>添加菜品</h2>
            <label for="foodName">菜品名称：</label>
            <input type="text" id="foodName"><br>

            <label for="price">售&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;价：</label>
            <input type="number" id="price"><br>

            <label for="foodkind">单&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位：</label>
            <input type="number" id="foodkind"><br><br />
            <button type="submit">添加菜品</button>
        </form>
    </div>
</template>

<script setup>

</script>

<style scoped></style>