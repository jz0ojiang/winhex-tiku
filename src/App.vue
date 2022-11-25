<script setup lang="ts">
import { RouterView } from 'vue-router'
import Application from '@/components/Application.vue';
import { darkTheme } from 'naive-ui'
</script>

<template>
  <n-config-provider :theme="darkTheme">
      <Application>
        <RouterView />
      </Application>
  </n-config-provider>
</template>  
