<script lang="ts" setup>
import { darkTheme, lightTheme } from 'naive-ui'
</script>

<template>
  <n-config-provider :theme="isDark ? darkTheme : lightTheme">
    <naive-provider>
      <main font-sans p="x-14 yb-12" text="center gray-700 dark:gray-200">
        <router-view />
        <Footer />
      </main>
    </naive-provider>
  </n-config-provider>
</template>
