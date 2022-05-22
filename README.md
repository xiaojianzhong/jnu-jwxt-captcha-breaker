# 暨南大学教务系统验证码解析模型

![GitHub Workflow Status](https://img.shields.io/github/workflow/status/xiaojianzhong/jnu-jwxt-captcha-breaker/Node.js)
![node](https://img.shields.io/node/v/jnu-jwxt-captcha-breaker)
![npm](https://img.shields.io/npm/v/jnu-jwxt-captcha-breaker)
![npm](https://img.shields.io/npm/dw/jnu-jwxt-captcha-breaker)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/xiaojianzhong/jnu-jwxt-captcha-breaker)
![GitHub](https://img.shields.io/github/license/xiaojianzhong/jnu-jwxt-captcha-breaker)

基于 [TensorFlow.js](https://www.tensorflow.org/js) 的 暨南大学教务系统验证码解析模型。

## 目录

- [环境要求](#prerequisites)
- [安装](#installation)
- [用法](#usage)
  - [如何在命令行中使用](#cli-usage)
  - [如何在代码中使用](#code-usage)
- [构建](#build)
- [测试](#test)
- [格式化](#formatting)
- [测试结果](#result)

## <a name="prerequisites"></a> 环境要求

1. [Node.js](https://nodejs.org) >= 10
2. [npm](https://www.npmjs.com)

## <a name="installation"></a> 安装

可以全局安装（作为命令行工具使用）：

```bash
$ npm install -g jnu-jwxt-captcha-breaker
```

也可以作为本地 npm 模块安装（作为二次开发接口使用）：

```bash
$ npm install --save jnu-jwxt-captcha-breaker
```

## <a name="usage"></a> 用法

### <a name="cli-usage"></a> 如何在命令行中使用

#### 1. 解析验证码图片

```bash
$ jnu-jwxt-captcha-breaker --paths <图片路径>
```

#### 2. 解析一个目录中的所有图片

```bash
$ jnu-jwxt-captcha-breaker --dirs <目录路径>
```

该程序支持同时解析多张图片或多个目录，你还可以混合图片和目录使用：

```bash
$ jnu-jwxt-captcha-breaker --paths <图片一的路径> --dirs <目录一的路径> --dirs <目录二的路径> --paths <图片二的路径>
```

### <a name="code-usage"></a> 如何在代码中使用

如果你需要进行二次开发，该程序同样提供了公共 API 接口。

在 Node.js 中，首先通过 commonjs 规范加载该 npm 模块：

```javascript
const CaptchaBreaker = require('jnu-jwxt-captcha-breaker').CaptchaBreaker;
```

接下来创建解析器对象：

```javascript
const breaker = new CaptchaBreaker();
```

然后初始化数据参数和模型参数：

```javascript
await breaker.init(option);
```

`init()` 方法支持一个 `option` 对象参数，该对象支持以下字段：

| 参数名称     | 参数类型  | 描述                             | 默认值     |
| ------------ | --------- | -------------------------------- | ---------- |
| `loadModel`  | `boolean` | 是否从文件系统加载预训练好的模型 | `true`     |
| `trainModel` | `boolean` | 是否使用数据集对模型进行训练     | `false`    |
| `saveModel`  | `boolean` | 是否保存模型到文件系统           | `false`    |
| `dataDir`    | `string`  | 数据集的路径                     | `'data/'`  |
| `modelDir`   | `string`  | 模型的加载/保存路径              | `'model/'` |

最后便可以调用解析方法：

```javascript
const result = await cb.parse(buffer);
```

`parse()` 方法支持参数如下：

| 参数名称 | 参数类型 | 描述             | 默认值 |
| -------- | -------- | ---------------- | ------ |
| `buffer` | `Buffer` | 图片内存缓冲对象 | -      |

## <a name="build"></a> 构建

```bash
npm run build
```

## <a name="test"></a> 测试

```bash
npm test
```

## <a name="formatting"></a> 格式化

项目同时使用了 [eslint](https://github.com/eslint/eslint) 和 [prettier](https://github.com/prettier/prettier) 进行代码格式化，通过以下命令即可进行格式化：

```bash
npm run lint
```

## <a name="result"></a> 测试结果

该程序在 30 张真实图片上的识别测试结果如下：

| index | image                 | result                      |
| ----- | --------------------- | --------------------------- |
| 0     | ![](./asset/5yu6.png) | Unable to split characters. |
| 1     | ![](./asset/6fYG.png) | Unable to split characters. |
| 2     | ![](./asset/7uff.png) | Unable to split characters. |
| 3     | ![](./asset/8mdk.png) | amdk                        |
| 4     | ![](./asset/Aa3F.png) | Aa3F                        |
| 5     | ![](./asset/ENeU.png) | ENMu                        |
| 6     | ![](./asset/GCYU.png) | Unable to split characters. |
| 7     | ![](./asset/KXGL.png) | Unable to split characters. |
| 8     | ![](./asset/NSMe.png) | NSMe                        |
| 9     | ![](./asset/QUbG.png) | QubG                        |
| 10    | ![](./asset/RUx8.png) | Ruxd                        |
| 11    | ![](./asset/WxLz.png) | wxLz                        |
| 12    | ![](./asset/YecQ.png) | YOCQ                        |
| 13    | ![](./asset/ZpeH.png) | ZpeH                        |
| 14    | ![](./asset/daUh.png) | dauh                        |
| 15    | ![](./asset/fK3K.png) | Unable to split characters. |
| 16    | ![](./asset/giHh.png) | Unable to split characters. |
| 17    | ![](./asset/gxTb.png) | gxTb                        |
| 18    | ![](./asset/h5Gn.png) | h5Gn                        |
| 19    | ![](./asset/kMpR.png) | kMpH                        |
| 20    | ![](./asset/mMUa.png) | Unable to split characters. |
| 21    | ![](./asset/mRNh.png) | mRNh                        |
| 22    | ![](./asset/mhsP.png) | mhsP                        |
| 23    | ![](./asset/rcPz.png) | rCPz                        |
| 24    | ![](./asset/sYYX.png) | Unable to split characters. |
| 25    | ![](./asset/wAnY.png) | Unable to split characters. |
| 26    | ![](./asset/xh5Q.png) | Unable to split characters. |
| 27    | ![](./asset/ysUA.png) | Unable to split characters. |
| 28    | ![](./asset/zKqB.png) | zKqb                        |
| 29    | ![](./asset/zLnZ.png) | zLnz                        |

目前在字符分割算法上仍然表现欠佳，需要改进。
