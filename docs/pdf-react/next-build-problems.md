## 概述

由于react-pdf运行环境是在浏览器中，在nextjs环境中容易出现错误，以下会列举常见的错误和解决方法

## 常见问题及其解决方案

官方版本(v9)中出现了此问题，但并未有官方解决方案，故此处提供非官方解决方案
具体可参考：https://github.com/wojtekmaj/react-pdf/issues/1855

### 1.webpack打包错误:

报错信息：

```shell
Caused by:
    0: failed to parse input file
    1: Syntax Error

> Build failed because of webpack errors
```

解决方案：

* 确保webpack配置正确

```mjs
// next.config.mjs
const nextConfig = {
+ webpack: (config) => {
+   config.resolve.alias.canvas = false;

+   return config;
+ },
}
```

* 检查worker配置，确保在使用react-pdf组件前注册worker文件路径   

使用CDN资源替代本地资源，出错原因未知
具体参考：https://github.com/wojtekmaj/react-pdf/issues/1855

```ts
- pdfjs.GlobalWorkerOptions.workerSrc = new URL(
-   "pdfjs-dist/build/pdf.worker.min.mjs",
-   import.meta.url,
- ).toString()

+ pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`
```

### 2.typescript打包报错

报错信息：

```shell
TypeError: Promise.withResolvers is not a function
    ...
> Export encountered errors on following paths:
    ...
```

解决方案：

* 添加ts类型声明文件

```ts
// types/pdfjs.d.ts
interface PromiseConstructor {
  withResolvers<T>(): {
    promise: Promise<T>
    resolve: (value: T | PromiseLike<T>) => void
    reject: (reason?: any) => void
  }
}
```

注：需要保证tsconfig的include配置能够包含该文件

* 在使用pdfjs前检查Promise.withResolvers方法，不存在则手动创建

```ts
// lib/pdfjs-polyfill.ts
if (typeof Promise.withResolvers !== "function") {
  Promise.withResolvers = function <T>() {
    let resolve!: (value: T | PromiseLike<T>) => void
    let reject!: (reason?: any) => void
    const promise = new Promise<T>((res, rej) => {
      resolve = res
      reject = rej
    })
    return { promise, resolve, reject }
  }
}

export {}
```

最后在需要使用的文件顶部引入该文件

```ts
+ import "@/lib/pdfjs-polyfill"
// ...
```
