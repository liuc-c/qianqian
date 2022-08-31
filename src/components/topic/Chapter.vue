<script lang="ts" setup>
import { chapter } from '@/composables/useTopic'

const router = useRouter()

const go = (url: string) => {
  router.push(`/print/${url}`)
}
</script>

<template>
  <template v-for="item in chapter" :key="item.label">
    <n-h6 align-text prefix="bar" type="success">
      <n-text type="primary">
        {{ item.label }}
      </n-text>
    </n-h6>
    <template v-for="subItem in item.child" :key="subItem.label">
      <n-h6>
        <n-text type="info">
          {{ subItem.label }}
        </n-text>
      </n-h6>
      <div class="btn-box">
        <template v-for="btn in subItem.child" :key="btn.label">
          <n-button class="mr-3 mb-2" size="tiny" type="success" @click="go(`${item.label}-${subItem.label}-${btn.label}`)">
            {{ btn.label }}
          </n-button>
        </template>
      </div>
    </template>
  </template>
</template>

<style scoped>
.btn-box {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.btn-box > button {
  background-color: var(--n-color);
}
</style>
