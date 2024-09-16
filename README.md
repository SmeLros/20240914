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

3. SEO优化
    在 Nextjs 中，本身已经做了很多SEO 架构方面优化，如自动生成meta标签、title标签等，但为了进一步提高SEO效果，我们还可以采取以下措施：

    - 元数据关键词优化：在路由下新增 layout.tsx ，新增并导出 Metadata 类型的数据，用于设置页面标题、描述、关键词等元数据信息
    - 新增外部链接：如社交平台github、twitter等，技术平台分享csdn、掘金等，增加网站的可信度和权威性
    - 体验优化：
        + 响应式设计：在页面中添加响应式设计，使页面在不同设备上都能良好展示，提高用户体验    
        + 页面加载速度：优化页面加载速度（首屏优先），减少页面加载时间，提高用户体验
        Nextjs中可控制部分比如：适当开启和关闭路由预取（prefetch），图片资源打包优化（sharp库），路由组优化 
        + 无障碍设计：添加屏幕阅读器等无障碍设计，使网站对残障人士更加友好    
        + 交互设计：添加人性化的交互设计，使网站更加生动有趣，提高用户体验

    - 内容优化： 添加高质量的内容，如文档、教程、示例等，使网站更具吸引力，提高用户体验
