<template>
    <div v-if="data" class="container">
        <div class="content">
            <n-card size="huge" hoverable closable @close="handleClose">
                <template #header>
                    <h2>
                        {{ data.label }}
                    </h2>
                </template>
                <template #header-extra>
                    <n-el class="id"># {{ data.id }}</n-el>
                </template>
                <div class="title">
                    描述
                </div>
                <div class="desc" v-if="data.desc">
                    <div class="tags" v-if="data.desc.tags">
                        <div class="subtitle">涉及知识点</div>
                        <ul>
                            <li v-for="tag in typeof data.desc.tags == 'string' ? [data.desc.tags] : data.desc.tags"
                                :key="tag">
                                {{ tag }}
                            </li>
                        </ul>
                    </div>
                    <div class="order">
                        <div class="subtitle">恢复要求</div>
                        <div>
                            <ul>
                                <li>随教程例题：仅需要按照博客原文教程中的目标完成恢复即可</li>
                                <li>实例题：除特殊要求，均只需要恢复出要求恢复的文件即可</li>
                                <li>试卷要求：除特殊要求，均只需要在恢复的文件名后填写首行（或显眼处）出现的 <b style="color: red">flag{***随机字符串***}</b> 字样
                                </li>
                            </ul>
                        </div>
                        <div v-if="data.desc.order" style="margin-top: 1em">
                            以下为额外要求
                            <ul>
                                <li v-for="order in typeof data.desc.order == 'string' ? [data.desc.order] : data.desc.order"
                                    :key="order">
                                    {{ order }}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="desc" v-if="data.desc.desc">
                        <div class="subtitle">实例说明</div>
                        <p v-for="desc in typeof data.desc.desc == 'string' ? [data.desc.desc] : data.desc.desc"
                            :key="desc">
                            {{ desc }}
                        </p>
                    </div>
                    <div class="source" v-if="data.desc.source?.url">
                        <div class="subtitle">博客原文</div>
                        <n-el>
                            <a :href="data.desc.source.url" target="_blank" class="link">{{ data.desc.source.name ?
                                    data.desc.source.name : data.desc.source.url
                            }}</a>
                        </n-el>
                    </div>
                </div>
                <div class="nodesc" v-else>
                    <n-el class="hint">暂无描述</n-el>
                </div>
                <template #footer>
                    <div class="subtitle">下载题目</div>
                    <span v-for="link in data.links" :key="link.name">
                        <li v-if="link.url">
                            <n-button text @click="downloadFiles(link.url)" type="info" :disabled="disableDownload">{{link.name}}</n-button>
                            <!-- <a :href="link.url" target="_blank" class="link">{{ link.name }}</a> -->
                        </li>
                        <li v-else-if="link.urls">
                            <linkmodel :title="link.name" :links="link.urls" @download="downloadFiles"></linkmodel>
                        </li>
                        <!-- <span v-if="data.links.indexOf(link) < data.links.length - 1">&nbsp;&nbsp;|&nbsp;&nbsp;</span> -->
                    </span>
                </template>
            </n-card>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { Ref } from 'vue'
import type { dbdetail } from '@/types';
import { ref, onMounted } from 'vue'
import { getDetail, getPath } from '@/components/db';

import { useMessage } from "naive-ui";

import linkmodel from '@/components/linkmodel.vue';

const router = useRouter()
const id = ref(router.currentRoute.value.query.id)
const data: Ref<dbdetail | null> = ref(null)

const provList = ref(router.currentRoute.value.query.provList)
    
const message = useMessage();

const disableDownload = ref(false)

const handleClose = () => {
    if (provList.value) {
        router.push({ path: '/list' })
    } else {
        router.push({ path: '/' })
    }
}

function downloadFiles(urls: string | string[] | undefined) {
    if (urls === undefined) {
        return
    }
    if (typeof urls === "string") {
        window.open(urls, '_blank')
        return;
    }
    disableDownload.value = true
    message.loading(`即将下载 ${urls.length} 个文件，如果浏览器提示“下载已被阻止”，请点击“允许”`)
    for (let i = 0; i < urls.length;i++) {
        setTimeout(() => {
            const link = document.createElement("a");
            link.style.display = "none";
            const element = urls[i];
            link.href = element;
            link.click()
            message.info(`正在下载第 ${i + 1} 个文件，共 ${urls.length} 个文件`)
        }, 5000 * i);
    }
    setTimeout(() => {
        disableDownload.value = false
    }, 1000);
}

onMounted(async () => {
    if (id.value === undefined || id.value === null) {
        router.push({ path: '/' })
    } else {
        console.log(id.value)
        const path = await getPath(id.value.toString())
        if (path === null) {
            router.push({ path: '/' })
        } else {
            data.value = await getDetail(path)
        }
        // data.value = db.filter(item => item.id.toString() == id.value)[0]
    }
})


</script>

<style lang="scss" scoped>
@import '@/assets/scrollbar.css';
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;

    @media screen and (max-width: 768px) {
        padding: 0;
        margin: 0;
        .content {
            width: 100% !important;
            max-width: none !important;
            overflow: overlay;
            .n-card {
                height: 100% !important;
                max-height: none !important;
                overflow-y: none !important;
            }
        }
    }

    .content {
        width: 50%;
        max-width: 650px;
        min-width: 300px;
        display: flex;
        align-items: center;
        justify-content: center;
        .n-card {
            max-height: 80%;
            scrollbar-width: thin;
            overflow-y: overlay;
        }
    }

    h2 {
        font-size: 1.7rem;
        font-weight: bold;
    }

    .title {
        font-size: 1.4rem;
        font-weight: 700;
        margin-bottom: 16px;
    }

    .subtitle {
        font-size: 1.2em;
        font-weight: bold;
        margin: 16px 0;
    }

    .id {
        font-size: 0.9em;
        font-weight: 400;
        color: var(--warning-color);
        font-weight: bold;
        font-style: italic;
    }

    .desc {
        a {
            color: var(--primary-color);
            text-decoration: none;
        }
    }

    .nodesc {
        .hint {
            color: var(--text-color-2);
        }
    }

    .link {
        color: #42b983;
        text-decoration: none;
        font-size: 1.1em;
    }
}
</style>