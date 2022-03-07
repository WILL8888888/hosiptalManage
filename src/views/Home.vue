<template>
<h2 class="welcome">欢 迎 使 用</h2>
<h1 class="title">住 院 管 理 系 统</h1>
<img src="@/assets/images/homeBack.jpg" class="backimage">
</template>

<script setup lang="ts">

</script>

<style scoped>
.welcome{
  position: absolute;
  transform: translate(-50%,-50%);
  left: 55%;
  top: 40%;
  z-index: 100;
  color: #2b87ff;
  font-size: 30px;
  animation: welMove 1s ease-in-out;
}
.title{
  position: absolute;
  transform: translate(-50%,-50%);
  left: 55%;
  top: 48%;
  z-index: 100;
  color: #2b87ff;
  font-size: 30px;
  animation: titleMove 1s ease-in-out;
}
.backimage{
  width: 100%;
  height: 100vh;
  filter: blur(5px);
}
@keyframes welMove {
  0%{top:35%;opacity: 0;}
  100%{top:40%;opacity: 1;}
}
@keyframes titleMove {
  0%{top:43%;opacity: 0;}
  100%{top:48%;opacity: 1;}
}
</style>
