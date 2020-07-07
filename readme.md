## EsayStorage

### 文档结构
1. 简介以及场景
2. 开始使用
3. api介绍(等待完善)
4. 待完善


#### 1. 简介以及场景

##### 契机
最开始就是觉得浏览器的默认缓存不能有有效期以及格式，就很麻烦，所以就是想着自己做一个轮子，然后可以有有效期以及对应的格式

##### 场景
主要是为了支持一些有效期存储的问题，然后后面的话希望能去解决一些多环境统一化存储问题


#### 2. 开始使用

easy storage 支持多种多种引入方式

通过 cmd 方式

```js
// 引入构造函数
import EasyStorage from "index.js";
```

通过 amd 方式

```js
// 引入构造函数
const EasyStorage = require("index.js");
```

通过 script 方式

```html
<script src="./index.js"></script>
<script>
  console.log(window.EasyStorage);
  // construct
</script>
```

#### 实例化

上方的函数，是针对 sdk 的构造函数，我们以 cmd 为案例，展示我们应该如何进行 sdk 的实例化以及调用
```js
  // 实例化
  const easyStorage = new EasyStorage({
    TIMEOUT: EasyStorage.DATE.MIN
  });
  var storageData = {
    a: 'test'
  }
  // 存储数据
  easyStorage.set(`storageKey`, storageData)

  // 获取数据
  typeof easyStorage.get('storageKey') // object
```

#### 实例化配置项
```js
  // 实例化
  new EasyStorage({
    // 是否为调试模式（调试模式下，会在部分关键节点console）
    DEBUG: false,
    // 是否在存储的时候自动清除过期的数据空间
    IS_AUTO_CLEAR: true,
    // 数据超时时间
    TIMEOUT: 10 * DATE.MIN,
    // 默认采用的存储方式
    DEFAULT_METHOD: 'localStorage',
    // 存储方式, 目前只支持 localStorage, sessionStorage
    LOCAL_METHODS_LIST: ['sessionStorage', 'localStorage'],
    // 默认存储头
    DEFAULT_PREFIX: '__EsayStorage__'
  });
```

#### 3. api介绍

* easyStorage.set 存储api
  调用事例
  ```js
  /**
   * 将数据存取在本地，并且设置超时
   * @param {String} key  存储的键值[必填]
   * @param {*} data 需要存储的数据[必填]
   * @param {Object} [option={timeout, methods}] 存取的配置[非必填]
   */
    var storageData = {
      a: 'test'
    }
    easyStorage.set(`storageKey`, storageData, {
      // 时间常量，对外暴露供使用
      timeout: easyStorage.DATE.MIN,
      // 存储方式[localStorage, sessionStorage] 默认是默认是全局配置
      methods: 'localStorage'
    })
  ```

* easyStorage.get 获取api
  调用事例
  ```js
    /**
     * 获取数据
     * @param {String} key 存储的key
     * @param {string}  methods 使用的存储方式 默认是全局配置[非必填]
     * @returns
     */
    var storageData = easyStorage.get(`storageKey`)
  ```

* easyStorage.remove 移除api
  调用事例
  ```js
  /**
   * 移除某项数据
   * @param  {String} key 储存的key
   * @param  {String} methods 储存的方法[非必填]
   */
    easyStorage.remove(`storageKey`)
  ```

* easyStorage.clear 清除api
  调用事例
  ```js
  /**
   * 清楚所有esay storage数据
   * @param  {String} methods 储存的方法[非必填]
   */
    easyStorage.clear()
  ```

* easyStorage.clear 清除api
  调用事例
  ```js
  /**
   * 清楚所有esay storage数据
   * @param  {String} methods 储存的方法[非必填]
   */
    easyStorage.clear()
  ```

* easyStorage.checkDataSurvival 查询数据有效性
  调用事例
  ```js
  /**
   * 查询数据有效性
   * @param {String} key 储存的key
   * @param  {String} methods 存储方法
   * @return {Boolean} 是否还有有效
   */
    easyStorage.checkDataSurvival(`storageKey`)
  ```



#### 4. 待完善
* 已储存表格 以及对应的过期时间换算，支持多种时间格式
* 支持小程序端（支付宝/微信）
* 提供基础的单元测试内容（增删查改，超时）
* 支持localStorage的用不超时（目前不支持）

