<script setup lang="tsx">
import type { Ref } from "vue";
import type { dblist } from "@/types";
import { ref, onMounted } from "vue";
import { Search } from "@vicons/ionicons5";
import { useRouter, RouterLink } from "vue-router";
import { NButton, NButtonGroup } from "naive-ui";
import logo from "../assets/logo.webp";
import { getList } from "@/components/db";

const router = useRouter();
const inputValue = ref('');
const resultElement: Ref<null | (() => JSX.Element)> = ref(null);

var db: dblist[]

const search = (value: string) => {
  if (value === "") {
    resultElement.value = null;
    return;
  }
  let res = db
    .filter(
      (item) =>
        item.label.toLocaleLowerCase().includes(value.toLocaleLowerCase()) ||
        item.id.toString().includes(value)
    )
    .map((item) => (
      <NButton
        tertiary
        onClick={() => {
          navigator(item.id);
        }}
      >
        {item.id} - {item.label}
      </NButton>
    ));
  let showcount = Math.floor(window.innerHeight / 100);
  if (res.length > showcount) {
    let m = <span class="hint">共找到 {res.length} 条结果，{res.length - showcount} 条因为结果过多被隐藏</span>
    res = res.slice(0, showcount);
    res.push(m);
  }
  resultElement.value = () => <NButtonGroup vertical>{res}</NButtonGroup>;
};

const navigator = (id: number | string) => {
  router.push({ path: "/detail", query: { id: id } });
};

onMounted(async () => {
  db = await getList();
  window.onresize = () => {
    search(inputValue.value);
  };
});

</script>

<template>
  <div class="container">
    <div class="content">
      <div class="title">
        <div class="logo">
          <img :src="logo" alt="" />
        </div>
        <n-el style="color: var(--text-color-1); transition: .3s var(--cubic-bezier-ease-in-out);">
          <h1>Winhex 数据恢复教程 - 题库</h1>
        </n-el>
      </div>
      <div class="search">
        <n-input
          placeholder="搜索"
          v-model:value="inputValue"
          clearable
          :on-input="search"
        >
          <template #prefix>
            <n-icon :component="Search" />
          </template>
        </n-input>
      </div>
      <div v-if="!resultElement" style="margin-top: .6em">
        <RouterLink to="/list" class="link">查看题库列表</RouterLink>
      </div>
      <div class="result" v-if="resultElement">
        <resultElement />
      </div>
    </div>
    <div class="footer">
      <p>Database of data recovery for Winhex</p>
      <p>
        For Winhex Data Recovery Totorial in
        <a href="https://blog.im0o.top" target="_blank">Jz0ojiang's Blog</a>
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  height: 100vh;
  @media screen and (max-height: 600px) {
    .content {
      top: 5% !important;
    }
    .result {
      z-index: 999;
    }
    .footer {
      display: none;
    }
  }

  @media screen and (max-width: 750px) {
    .content {
      top: 5% !important;
    }
    .result {
      z-index: 999;
    }
    .footer {
      display: none;
    }
    
  }

  .content {
    max-width: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;

    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 120px;

    .link {
      color: #447974;
      text-decoration: none;
    }

    .title {
      display: flex;
      flex-direction: column;
      align-items: center;
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

      h1 {
        margin: 0;
        font-size: 2em;
        font-weight: 400;
        font-family: "ZCOOL KuaiLe";
        white-space: nowarp;
      }
    }

    :deep(.result) {
      margin-top: 20px;
      width: 100%;
      height: 100%;
      overflow: auto;
      display: flex;
      flex-direction: column;
      .hint {
        padding-top: 8px;
        font-size: 0.8rem;
        white-space: nowrap;
      }
    }
  }

  .footer {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.9em;
    color: #999;
    text-align: center;
    white-space: nowrap;
    p {
      margin: 0;
    }

    a {
      color: aquamarine;
      text-decoration: none;
    }
  }
}
</style>
