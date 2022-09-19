<script lang="ts" setup>
const router = useRouter()
const go = (url: string) => {
  router.push(url)
}
</script>

<template>
  <div>
    <div i-carbon-ibm-cloud inline-block text-4xl />
    <p>
      <a href="https://github.com/antfu/vitesse-lite" rel="noreferrer" target="_blank">
        东莞仔
      </a>
    </p>
    <p>
      <em op75 text-sm>每天努力一点</em>
    </p>

    <div>
      <n-button
        class="m-3 text-sm"
        @click="go('/print/超声医学科-急诊科及重症监护室-其他')"
      >
        Go
      </n-button>
      <n-button
        class="m-3 text-sm"
        @click="go('/gua')"
      >
        算卦
      </n-button>
      <n-button
        class="m-3 text-sm"
        @click="go('/mathematics')"
      >
        哥德巴赫猜想
      </n-button>
      <n-button
        class="m-3 text-sm"
        @click="go('/kuaiLe8')"
      >
        彩票快乐8
      </n-button>
      <n-button
        class="m-3 text-sm"
        @click="go('/questionBank/questionBank')"
      >
        高仿题库
      </n-button>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  title: 东莞仔
</route>
