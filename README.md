## 介绍

这是一个基于 Next.js 和 React-pdf 实现一个PDF旋转网页的小工具

## 功能

1. 参照 https://pdf.ai/tools/rotate-pdf 网站，完全复制其界面设计和用户体验，确保一致性
2. 实现PDF旋转功能，允许用户在本地处理文件并下载结果. 无需实现文件上传/下载到云服务器的功能，仅限本地文件操作
3. 采用你能想到的所有搜索引擎优化（SEO）策略

## 实现

1. 渲染：React-pdf
2. 编辑和保存：pdf-lib

## 运行

1. 安装依赖：`npm install`
2. 启动项目：`npm run dev`
3. 访问：http://localhost:3000
4. 点击 Quick start 按钮，进入pdf旋转工具页面

## 注意

1. 本项目仅供学习和参考

## 总结

核心技术与难点：

    此项目中pdf渲染与pdf编辑保存逻辑分离，分别使用不同库实现，以最高程度还原pdf原本格式

1. pdf渲染： React-pdf可实现传入pdf文件渲染到页面。
    重点在于对PDF viewer 的样式和状态管理，特别是多页情况下，分别管理每一页的状态，因此实现react hook: 

    usePDFViewer：

    - 用于管理PDF viewer的状态，包括当前页码、总页数、旋转角度等    
    - 原生react hook，无第三方依赖，具有高度可维护性和可拓展性

2. pdf编辑与保存： pdf-lib
    pdf编辑并未使用canvas内容保存，而是使用pdf-lib加载源文件编辑    
    一是canvas渲染的内容转化为pdf文件时，缩放以及渲染精度等问题会导致pdf模糊失真    
    二是canvas内容保存为pdf文件时，实际是生成图片保存为到pdf文件中，导致pdf原本文本内容无法选择复制等操作   
