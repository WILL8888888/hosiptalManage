<template>
  <div class="diliver">
    <div class="diliver-title">{{ diliverTitle  }}</div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({ diliverTitle: String });
</script>

<style lang="scss" scoped>
.diliver{
  width: 100%;
  height: 2px;
  border-top: 2px solid #dcdfe6;
  position: relative;
  margin-top: 20px;
  &-title{
    font-size: 20px;
    font-weight: 600;
    position: absolute;
    transform: translateY(-50%);
    background-color: #e9f3ff;
    left: 50px;
  }
}
</style>