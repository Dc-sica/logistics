[Gitbook使用]
============================
 1. Gitbook 简介
============================
1. 1 Gitbook 是什么
> Gitbook 是一个使用 Git 和 Markdown 来构建电子书籍的开源工具。它既可以生成一个静态网站，也可以输出内容作为电子书（ePub，Mobi，PDF）。Gitbook 可以在本地、Github、VPS 等平台上部署，本文采用的是借助 Node.js 在本地部署然后推送到 Github Page 托管的方式，其余的就不再赘述了。
1. 2 准备工作
> 工欲善其事，必先利其器。在开始搭建 Gitbook 电子书籍之前，你需要先了解一下 Markdown 基本语法、Git 及 Github 基本使用，然后作出如下准备：


* Node.js 环境：Gitbook 在本地部署时所需要的环境。
* Markdown 编辑器：推荐使用 Typora，用来编写 Gitbook 文档的具体内容。
+ Git 工具 +Github 账号：用于将 Gitbook 托管到 Github 存储库上。

 2. Gitbook 本地部署
============================

2. 1 Gitbook 本地安装
  
**Step1：安装 Node.js**

* 因为 GitBook 是基于 Node.js 的，所以我们首先需要下载安装 Node.js（对应平台的 .msi版本即可）
* 测试：打开cmd，输入 node -v和 npm -v，若显示node和npm的版本号即安装成功。
  
**Step2：安装 gitbook-cli 工具**

* gitbook-cli 是一个在系统上安装和使用 Gitbook 的工具，它将自动安装所需版本的 Gitbook 来构建一本书。
* 现在安装 Node.js 都会默认安装 npm（node 包管理工具），所以我们不用单独安装 npm，打开命令行，执行以下命令安装 GitBook

``` npm install -g gitbook-cli```

安装完之后，就会多了一个 gitbook 命令（如果没有，请确认上面的命令是否加了 -g）

**Step3：安装 Git**

* 官网下载 Git：https://www.git-scm.com/download/win
* 安装过程中一路 next 即可，安装成功后桌面右键单击出现 Git GUI Here 以及 Git Bash Here


2. 2 Gitbook 本地使用

**Step1：初始化 Gitbook**

* 新建一个存储 Gitbook 的文件夹（即工作区），切换到该目录，然后用如下命令初始化：

```gitbook init```

* 执行完后，你会看到多了两个文件 —— README.md 和 SUMMARY.md，它们的作用如下：

> ***README.md —— 书籍的介绍写在这个文件里***  
> 
> ***SUMMARY.md —— 书籍的目录结构在这里配置***

**Step2：示例**

```
* [前言](README.md)
* [第一章](Chapter1/README.md)
```

**Step3：在本地部署 Gitbook**

+ 回到命令行，在 Gitbook 的工作区文件夹中再次执行 gitbook init 命令。GitBook 会查找 SUMMARY.md 文件中描述的目录和文件，如果没有则会将其创建。
+ 接着我们再执行 gitbook serve 命令，将其部署在本地，打开 Chrome 访问：http://localhost:4000，即可看到本地部署的 Gitbook（注：serve 命令可以指定端口 gitbook serve --port 2333）
+ 当你写得差不多，你可以执行 gitbook build 命令构建书籍，默认将生成的静态网站输出到 _book 目录。实际上，这一步也包含在 gitbook serve 里面（注：build 命令可以指定路径 gitbook build [书籍路径] [输出路径]，如果你想查看输出目录详细的记录，可使用 gitbook build ./ --log=debug --debug 来查看）  


3. Gitbook 配置文件
============================

 
如果你想对你的网站有更详细的个性化配置或使用插件，那么需要使用配置文件。配置文件写完后，需要重启服务或者重新打包才能应用配置。Gitbook 的配置文件是 book.json， 请在项目的根目录处自行创建。  

3. 1 配置文件主要参数  

* title：标题
* author：作者
* description：描述，对应 Gitbook 网站的 description
* language：使用的语言， zh-hans 是简体中文，会对应到页面的 <html lang="zh-hans" >
* structure：指定 Readme、Summary、Glossary 和 Languages 对应的文件名
* plugins：使用的插件列表，所有的插件都在这里写出来，然后使用 gitbook install 来安装。
* pluginsConfig：插件的配置信息，如果插件需要配置参数，那么在这里填写。
* links：目前可以给侧导航栏添加链接信息
* styles：自定义页面样式，各种格式对应各自的 css 文件


3. 2 Gitbook 的常用插件
3. 2.1 Gitbook 插件简介  
  
**[1] 为什么要用插件？**

>Gitbook 默认自带以下 5 个插件：highlight：代码高亮、search：导航栏查询功能（不支持中文）、sharing：右上角分享功能、font-settings：字体设置（最上方的”A”符号）、livereload：为 Gitbook 实时重新加载。Gitbook 插件可以解决一些网站不太方便的地方，如侧边栏导航不能收缩，自带搜索不支持中文等问题。

**[2] 去哪里找插件？**

除了下文推荐的插件之外，Gitbook 还支持许多其他插件，可以从NPM 上搜索 Gitbook 相关的插件。

**[3] 插件安装方法：**

* Step1：在项目的根目录中创建 book.json 文件，然后在 plugins 参数中添加插件名。
* Step2：使用 gitbook install 来安装插件，重启服务 gitbook serve 或者重新打包 gitbook build 就能看见效果。  
  
注意：

>编写 json 时字符串不能用“单引号”括起，最后的那个不能有“逗号”。
如果要卸载自带的 font-settings，插件处应写成 -fontsettings，中间不要加 -。
gitbook install 有时会出现问题，多试几次可能就好了。  

3. 2.2 Gitbook 插件推荐  
   
**[1] 支持中文的搜索框**
```javascript
{
    "plugins": [
         "-lunr", 
         "-search", 
         "search-pro"
    ],
}
 ```

**[2] 左侧章节目录可折叠**
```javascript
{
    "plugins": [
         "expandable-chapters-small"
    ],
}
```

**[3] 侧边栏宽度可调节**

```javascript
{
    "plugins": [
        "splitter"
    ],
}```

**[4] 回到顶部按钮**

```javascript
{
    "plugins": [
        "back-to-top-button"
    ],
}
```
**[5] 右上角添加 github 图标跳转**

```javascript
{
    "plugins": [
        "-sharing",
        "github"
    ],
    "pluginsConfig": {
        "github": {
            "url": "https://github.com/Logistic98/Found-monthly"
        },
    }
}
```
**[6] 阅读量计数**
```javascript
{
    "plugins": [
        "pageview-count"
    ],
}
```

**[7] 隐藏元素**

 可以隐藏不想看到的元素， hide-element 是通过 HTML 元素的 class 名字来查找要隐藏的元素，想要隐藏元素找到元素的样式类名加到插件配置里面就可以隐藏元素了。

```javascript
{
    "plugins": [
        "hide-element"
    ],
    "pluginsConfig": {
        "hide-element": {
            "elements": [".gitbook-link"]
        },
    }
}```  


***经过该配置之后，导航栏中 Published by GitBook 就被隐藏了。 ****

**[8] 代码块行号、复制**

```javascript
{
    "plugins": [
        "code"
    ],
}```
**[9] 复选框支持**
```javascript
{
    "plugins": [
        "todo"
    ],
}```
**[10] 修改标题栏图标**

```javascript
{
    "plugins": [
        "custom-favicon"
    ],
    "pluginsConfig": {
        "favicon": "./static/logo.ico"
    },
}
把 ico 格式的图标放到项目里（这个插件只能用 ico 图标），路径可以设置为相对路径 ```

**[11] 添加悬浮目录**
```javascript
{
    "plugins" : [ 
        "page-toc-button" 
    ],
    "pluginsConfig": {
        "page-toc-button": {
            "maxTocDepth": 2,
            "minTocSize": 2
        },
    }
}
maxTocDepth：标题的最大深度（最大支持到 2，即为 h1+h2+h3）
minTocSize：显示 toc 按钮的最小 toc 条目数```

**[12] 添加版权信息和最后修改时间**
```
{
    "plugins": [
       "tbfed-pagefooter"
    ],
    "pluginsConfig": {
        "tbfed-pagefooter": {
            "copyright":"Copyright &copy blackcat.monster 2020",
            "modify_label": "该文件修订时间：",
            "modify_format": "YYYY-MM-DD HH:mm:ss"
        },
    }
}```
 


3. 3 Gitbook 配置实例
======================

以下 book.json 文件，仅供参考。
``` javascript
{
    "title": "Found-weekly",
    "description": "记录分享新发现的科技见闻，每月28号更新",
    "author": "Mortal",
    "output.name": "site",
    "language": "zh-hans",
    "gitbook": "3.2.3",
    "root": ".",
    "links": {
        "sidebar": {
            "BlackCatの小窝": "https://www.blackcat.monster"
        }
    },
    "plugins": [
         "-lunr", 
         "-search",
         "-sharing",
         "-fontsettings",
         "highlight",
         "livereload",
         "search-pro",
         "expandable-chapters-small",
         "splitter",
         "back-to-top-button",
         "github",
         "pageview-count",
         "hide-element",
         "code",
         "todo",
         "custom-favicon",
         "page-toc-button",
         "tbfed-pagefooter"
    ],
    "pluginsConfig": {
        "github": {
            "url": "https://github.com/Logistic98/Found-monthly"
        },
        "hide-element": {
            "elements": [".gitbook-link"]
        },
       "favicon": "./static/logo.ico",
       "page-toc-button": {
            "maxTocDepth": 2,
            "minTocSize": 2
        },
        "tbfed-pagefooter": {
            "copyright":"Copyright &copy blackcat.monster",
            "modify_label": "该文件修订时间：",
            "modify_format": "YYYY-MM-DD HH:mm:ss"
        }
    }
}```   
4. 4 GitBook 在GitHub Page在线展示
===================================   
1. 1执行 gitbook build 生成编译后文件 默认在_book 
```javascript
gitbook build . docs // 指定编译文件到 docs 文件夹
```
1. 2 将生成的代码提交，在 setting source 即可以选择docs目录

![]('./../../assets/images/pic1.png)

1. 3 就可以在在线访问了
