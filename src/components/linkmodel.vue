<template>
    <n-button text @click="showModal = true" type="primary">
        {{ title }}
    </n-button>
    <n-modal v-model:show="showModal" preset="card" style="width: 600px" :title="props.title" size="huge"
        :bordered="false">
        <div class="subtitle">
            手动下载分卷
        </div>
        <span v-for="link in props.links" :key="link.name">
            <n-button text @click="download(link.url)" type="info">{{ link.name }}</n-button>
            <span v-if="props.links.indexOf(link) < props.links.length - 1"> | </span>
        </span>
    </n-modal>
</template>
  
<script setup lang="ts">
import { ref } from 'vue'
const showModal = ref(false)

const props = defineProps<{
    title: string,
    links: {
        name: string,
        url: string
    }[]
}>()

const emit = defineEmits<{
  (e: 'download', urls: string|string[]): void
}>()

const download = (url: string|string[]) => {
    emit('download', url)
}
</script>

<style lang="scss" scoped>
.subtitle {
    font-size: 1.2em;
    font-weight: bold;
    margin: 16px 0;
}
</style>