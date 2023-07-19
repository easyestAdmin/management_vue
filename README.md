## tailwindcss

使用 tailwindcss 可以让我们只需书写 HTML 代码，无需书写 CSS，即可快速构建美观的网站,比如下面代码

```html
<div class="flex items-center justify-center h-screen bg-gray-100">text</div>
```

表示这个 div 为 flex 盒子,同时设置了`align-items: center;justify-content: center`且高度撑满整个屏幕,以及背景颜色为色调 100(色调越高,颜色越深)的 gray。当然本篇文章不会详细介绍他的用法,感兴趣的可以到它的官网学习。如果你不想用`tailwindcss`,你也可以直接用传统的 css 形式。接下来我们看下在`Vue3`中如何配置`tailwindcss`

首先安装 tailwindcss 以及它使用到的包

```
npm install tailwindcss postcss autoprefixer
```

然后执行

```
npx tailwindcss init -p
```

就会生成`postcss.config.js`和`tailwind.config.js`两个配置文件,我们修改一下`tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

在 src 下新建`index.css`引入`tailwindcs`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

在`main.ts`下引入`index.css`

```js
import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import ElementPlus from "element-plus";
import "./index.css";
import "element-plus/dist/index.css";
createApp(App).use(ElementPlus).use(router).mount("#app");
```

配置完成后我们便可以使用`tailwind`进行样式的开发了

## 登录页面

这里用`tailwind`写了一个简易的登录页面,可以发现没有用到任何 css

```vue
<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <div class="flex mx-auto bg-white rounded py-10">
      <div class="w-[330px] box-border text-center pt-10">
        <div class="text-[#444444] font-bold">获取教程</div>
        <div class="text-sm pt-2 pb-6">微信扫码关注公众号</div>
        <div
          class="border border-gray rounded w-[50%] mx-auto overflow-hidden inline-block"
        >
          <img class="w-full" src="../assets/login/gzh_code.jpg" alt="" />
        </div>
        <div class="pt-4 font-bold text-sm">
          点击菜单[实战项目]获取本系列教程
        </div>
      </div>
      <div
        class="w-[400px] pl-10 pr-10 pb-3 border-box border-l border-l-2 border-gray"
      >
        <div class="font-bold mb-3">密码登录</div>
        <el-form :model="formLogin" :rules="loginRules">
          <el-form-item prop="username">
            <el-input
              class="h-[40px]"
              placeholder="请输入用户名"
              v-model="formLogin.username"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              class="h-[40px]"
              v-model="formLogin.password"
              placeholder="请输入密码"
            />
          </el-form-item>
          <el-checkbox v-model="isRemember" label="记住密码" size="large" />
          <el-button
            type="primary"
            class="w-full mt-5 !h-[40px]"
            @click="handleLogin"
            >登录</el-button
          >
        </el-form>
        <div class="flex items-center justify-between mt-4">
          <div class="w-[100px] border-t-2 border-gray"></div>
          <div class="text-[#999] text-[14px]">其它方式登录</div>
          <div class="w-[100px] border-t-2 border-gray"></div>
        </div>
        <div class="flex justify-around mt-4">
          <div class="bg-[#f5f5f5] rounded-full p-2">
            <wxIcon />
          </div>
          <div class="bg-[#f5f5f5] rounded-full p-2">
            <qqIcon />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
```

页面效果如下,当然感觉不好看的话可以自己修改下

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/998c196da34248e68015a459f186297f~tplv-k3u1fbpfcp-watermark.image?)

里面的其它方式登录后续再加,本篇文章暂不介绍

## 登录逻辑

上一篇文章已经封装好了 axios 请求,在很 http 下新建 login 目录用于存放登录相关接口,在 login/index.ts 中写下我们的第一个接口: 登录

```js
import request from "../request";
import { LoginVo } from "./types/login.vo";
export const login = (data: LoginVo) => {
  return request({
    url: "/auth/login",
    data,
    isToken: false,
    method: "post",
  });
};
```

可以看到我们引入了 LoginVo,这其实就是我们需要传给后端的数据格式,在`login/types`目录下的`login.vo.ts`中

```js
export type LoginVo = {
  username: string,
  password: string,
};
```

然后我们需要在登录接口中调用获取 token 并将 token 存储下来,这里我们封装了一个`Storage`的工具函数方便我们存入信息,新建`utils/storage.ts`

```ts
interface StorageItem<T> {
  value: T;
  expiry?: number; // 可选的过期时间戳
}

export const Storage = {
  // 获取值
  get<T>(
    key: string,
    storageType: "localStorage" | "sessionStorage" = "localStorage"
  ): T | null {
    const storage =
      storageType === "sessionStorage" ? sessionStorage : localStorage;
    const item = storage.getItem(key);
    if (item) {
      const { value, expiry } = JSON.parse(item) as StorageItem<T>;
      if (expiry && Date.now() > expiry) {
        storage.removeItem(key);
        return null;
      }
      return value;
    }
    return null;
  },

  // 设置值
  set<T>(
    key: string,
    value: T,
    expiry?: number,
    storageType: "localStorage" | "sessionStorage" = "localStorage"
  ): void {
    const storage =
      storageType === "sessionStorage" ? sessionStorage : localStorage;
    const item: StorageItem<T> = { value };
    if (expiry) {
      item.expiry = Date.now() + expiry;
    }
    storage.setItem(key, JSON.stringify(item));
  },

  // 删除值
  remove(
    key: string,
    storageType: "localStorage" | "sessionStorage" = "localStorage"
  ): void {
    const storage =
      storageType === "sessionStorage" ? sessionStorage : localStorage;
    storage.removeItem(key);
  },

  // 清空所有值
  clear(storageType: "localStorage" | "sessionStorage" = "localStorage"): void {
    const storage =
      storageType === "sessionStorage" ? sessionStorage : localStorage;
    storage.clear();
  },
};
```

可以看到我们给 storage 加了可以设置过期时间的功能,后续可能会用到,然后开始写登录的逻辑

```ts
//登录
const handleLogin = async () => {
  const { data } = await login(formLogin);
  Storage.set<string>("token", data);
};
```

在页面中调用一下就会发现请求成功了

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fa4f5081b39f4769a0b7bc5420723f1d~tplv-k3u1fbpfcp-watermark.image?)

最后再加上规则校验以及记住密码的的功能,完整代码如下

```vue
<script lang="ts" setup>
import wxIcon from "@/assets/svg/wx_icon.vue";
import qqIcon from "@/assets/svg/qq_icon.vue";
import { reactive, ref, onMounted } from "vue";
import { login } from "@/http/login";
import { LoginVo } from "@/http/login/types/login.vo";
import { Storage } from "@/utils/storage";
const formLogin = reactive<LoginVo>({ username: "", password: "" });
const loginRules = reactive({
  username: [{ required: true, message: "用户名不可为空", trigger: "blur" }],
  password: [{ required: true, message: "密码不可为空", trigger: "blur" }],
});
//登录
const handleLogin = async () => {
  const { data } = await login(formLogin);
  Storage.set<string>("token", data);
  if (isRemember.value) {
    rememberPassword(formLogin);
    return;
  }
  Storage.remove("userAccount");
};
/**
 * 记住密码
 * @param account 账户密码
 */
const rememberPassword = (account: LoginVo) => {
  Storage.set<LoginVo>("userAccount", account);
};
const isRemember = ref(false);

//获取记住的账户密码
const getRememberAccount = () => {
  const userAccount: LoginVo | null = Storage.get("userAccount");
  if (!userAccount) return;
  formLogin.username = userAccount.username;
  formLogin.password = userAccount.password;
  isRemember.value = true;
};
onMounted(getRememberAccount);
</script>
```

到这里一个简单的登录就完成了,还是比较简单的。
