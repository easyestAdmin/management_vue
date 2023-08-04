## 实现导航栏标签页

在后台管理系统页面中一般都会有导航栏标签这一功能,它可以让我们点击过的菜单以 tab 标签栏的形式展现出来,同时右键标签可以展示`刷新页面`,`关闭当前`,`关闭其它`,`全部关闭`选项,如下图所示

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/562230923a58475ea7bff599681a468a~tplv-k3u1fbpfcp-watermark.image?)

本篇文章将介绍导航栏标签的具体实现

## 新增标签

elementplus 为我们提供了 Tag 组件,我们可以直接使用

首先在全局状态管理器`store/index.ts`中定义一个 state:navTags 用于存放点击过的标签数据,这些数据包含的字段包括菜单名`name`以及跳转路由`path`,同时里面默认添加一个首页的标签。还需要定义一个添加标签的函数放到 actions 中

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ac4e455196034fb5b164ecccd4aa901f~tplv-k3u1fbpfcp-watermark.image?)

当点击菜单的时候需要在 navTags 新增一条标签数据,因此可以在路由守卫中调用 addTags 函数

```js
//router/index.ts
router.beforeEach(async (to, from, next) => {
  //.....
  if (homeStore.menuList.length) {
   //....
    homeStore.addTags({ name: to.name as string, path: to.path });

    next();
    return;
  }
 ....

  next({ ...to, replace: true });
});

export default router;
```

然后在 navbar 中使用 tag 组件,同时添加一些样式

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/29e562962bf74c079048a9ec7b273d74~tplv-k3u1fbpfcp-watermark.image?)

这里有一个属性 effect,可以设置标签主题,当当前标签的 path 和当前页面路由 path 一样的话就给它设置为`dark`主题。获取当前页面的 path 其实很简单,在`navbar.vue`中监听路由变化即可

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e32c83d491c9408a985980e28309934f~tplv-k3u1fbpfcp-watermark.image?)

此时点击菜单的时候我们已经可以将标签一个个添加上去了,此时我们还需要让标签被点击然后跳转到对应页面

```js
const handelTo = (item: any) => {
  router.push(item.path);
};
```

## 删除标签

Tag 组件可以设置 closable 定义一个标签是否可移除,同时提供一个点击 x 的 close 事件,我们可以在这个事件中删除当前标签在`navTags`中的数据,这里我们还需要判断删除的是不是当前页面,如果是的话则还需要跳转到最后一个标签选项

```js
<el-tag
  v-for="(item, index) in homeStore.navTags"
  @click="handelTo(item)"
  :key="item.name"
  class="ml-2 cursor-pointer flex-shrink-0"
  :effect="currentPath === item.path ? 'dark' : ''"
  type="primary"
  :closable="item.path != '/'"
  @close="handleClose(index, item.path)"
>
          {{ item.name }}
        </el-tag>
```

```js
const handleClose = (index: number, path: string) => {
  homeStore.navTags.splice(index, 1);
  //判断是否为当前页面,如果是则跳转至最后一个标签页
  if (path === currentPath.value) {
    const length = homeStore.navTags.length;
    length && router.push(homeStore.navTags[length - 1].path);
  }
};
```

到这里导航标签功能基本完成,接下来来实现点击鼠标右键出现`刷新页面`,`关闭当前`等选项功能

## 右键列表功能

在 src/component 中新增一个 tagsview 组件用于实现右键列表功能

```js

```
