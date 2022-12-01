<template>
    <div class="container">
        <div class="content">
            <n-card>
                <div class="backtoindex">
                    <n-button text @click="backtoindex">
                        <n-icon :component="Back" />
                        <span>返回首页</span>
                    </n-button>
                </div>
                <div class="title">
                    <div class="logo">
                        <img :src="logo" alt="" />
                    </div>
                    <h1>Winhex 数据恢复教程 - 题库列表</h1>
                </div>
                <n-data-table
                    :columns="columns"
                    :data="data"
                    :pagination="pagination"
                    :bordered="false"
                    :max-height="height"
                />
            </n-card>
        </div>
    </div>
</template>

<script setup lang="tsx">
import { ref, onMounted } from 'vue'
import { NButton } from 'naive-ui'
import { useRouter } from 'vue-router';
import { ArrowBack as Back } from '@vicons/ionicons5'
import logo from "../assets/logo.webp";

import { getList } from '@/components/db';

import type { DataTableColumns } from 'naive-ui'
import type { dblist } from '@/types';
import type { Ref } from 'vue'

const router = useRouter();

const height = ref(Math.floor(window.innerHeight/3));

type Data = {
    id: number
    label: string
}

const createColumns = ({ go }: { go: (val: Data) => void}): DataTableColumns<Data> => {
    return [
        {
            title: "ID",
            key: "id",
        },
        {
            title: "题目",
            key: "label",
        },
        {
            title: "操作",
            key: "action",
            render: (val) => {
                return (
                    <NButton
                        onClick={() => go(val)}
                    >
                        查看
                    </NButton>
                )
            },
        }
    ]
}

const columns = createColumns({
    go: (val) => {
        router.push({ path: "/detail", query: { id: val.id } });
    }
})

const data: Ref<dblist[]> = ref([])

const pagination = {
    pagesize: 10,
}

const backtoindex = () => {
    router.push({ path: '/' })
}

onMounted(async () => {
    data.value = await getList()
    window.onresize = () => {
        height.value = Math.floor(window.innerHeight/3)
    };
})
</script>

<style lang="scss" scoped>
@import '@/assets/scrollbar.css';
.container {
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .content {
        width: clamp(400px, 70%, 800px);
        .backtoindex {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .n-button {
                padding: 0;
                .n-icon {
                    margin-right: 0.5rem;
                }
            }
            margin-bottom: 20px;
        }
        .n-card {
            padding: 20px;
        }
        .title {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            white-space: nowrap;
            margin-bottom: 20px;
            h1 {
                margin: 0;
                font-size: 2em;
                font-weight: 400;
                font-family: "ZCOOL KuaiLe";
                white-space: nowarp;
            }
            .logo {
                width: 100px;
                height: 100px;
                overflow: hidden;
                pointer-events: none;

                img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                }
            }
        }
    }

    @media screen and (max-width: 600px) {
        padding: 0;
        margin: 0;
        .content {
            width: 100%;
            height: 100%;
            .n-card {
                padding-top: 10px !important;
                height: 100% !important;
                max-height: none !important;
                overflow-y: overlay;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
            overflow: hidden;
        }
    }
    @media screen and (max-height: 600px) {
        padding: 0;
        margin: 0;
        .content {
            width: 100%;
            height: 100%;
            .n-card {
                height: 100% !important;
                max-height: none !important;
                min-height: 600px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
            overflow: overlay;
        }
    }
}
</style>