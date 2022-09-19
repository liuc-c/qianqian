<script setup>
const props = defineProps(['topicOfDryData'])
</script>

<template>
  <n-list hoverable clickable>
    <n-list-item v-for="(item, index) in topicOfDryData" :key="index">
      <n-thing :title="`${`${index + 1}.`}${`${item.topic}：`}`" content-style="margin-top: 10px;">
        <template #description>
          <n-space size="small" style="margin-top: 4px">
            <n-tag :bordered="false" type="info" size="small">
              单选题
            </n-tag>
            <n-tag :bordered="false" type="info" size="small">
              ♥
            </n-tag>
          </n-space>
        </template>
        <span v-for="choice in item.choiceAnswers" :key="choice" :class="{ actived: choice.correct } ">
          {{ choice.mark }}.{{ choice.choiceAnswer }}<br>
        </span>
        <!--        复制着彩色傀儡<br> -->
        <!--        早上好我的罐头先生<br> -->
        <!--        让他带你去被工厂敲击 -->
      </n-thing>
    </n-list-item>
  </n-list>
<!--  </n-space> -->
</template>

<style scoped lang="scss">
.n-list{
  font-size: 1rem;
  text-align: left;
    .actived{
      color:red;
    }
}
</style>
