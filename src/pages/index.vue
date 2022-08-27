<script lang="ts" setup>
const router = useRouter()
const go = () => {
  router.push('/print/qt')
}
</script>

<template>
  <div>
    <div i-carbon-ibm-cloud inline-block text-4xl />
    <p>
      <a href="https://github.com/antfu/vitesse-lite" rel="noreferrer" target="_blank">
        仟仟
      </a>
    </p>
    <p>
      <em op75 text-sm>嘿嘿嘿</em>
    </p>

    <div>
      <n-button
        class="m-3 text-sm"
        @click="go()"
      >
        Go
      </n-button>
    </div>
  </div>
</template>
