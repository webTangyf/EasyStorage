/**
 * @author tangyufeng
 * @email 542853503@qq.com
 * @create date 2020-05-25 14:35:51
 * @modify date 2020-07-04 09:37:47
 * @desc esay-storage
 */

import { getType, isJsonStr, isNoValue, esayCover, isDomexcEption, isString, isBrowser } from './share'
import * as DATE from './time'


/*
* 默认配置项
*/
let CACHE_OPTION = {
  // 是否为调试模式
  DEBUG: false,
  // 是否在存储的时候自动清除过期的数据空间
  IS_AUTO_CLEAR: true,
  // 超时时间
  TIMEOUT: 10 * DATE.MIN,
  // 默认的存储方式
  DEFAULT_METHOD: 'localStorage',
  // 存储方式, 只支持 localStorage, sessionStorage
  LOCAL_METHODS_LIST: ['sessionStorage', 'localStorage'],
  // 默认存储头
  defaultPrefix: '__EsayStorage__'
}



/**
 *
 * 格式化本地数据
 * @param {*} data
 * @returns 格式化完成的数据
 * @memberof System
 */
const formatSaveData = (data) => {
  let type = getType(data)
  if ([undefined, null].includes(data)) {
    console.warn(`formatSaveData params is ${data}`)
    return ''
  }
  if (type === 'string') {
    return data
  }
  if (['object', 'array'].includes(type)) {
    return JSON.stringify(data)
  }
  if (['number', 'boolean'].includes(type)) {
    console.warn(`formatSaveData had handle ${data} is from ${type} to string, please check the type will you get this data form local`)
    return data.toString()
  }
  return data
}

/**
 * 格式化键值
 * @param  {String} key 储存的key值
 */
const formatStorageKey = (key) => {
  return `${CACHE_OPTION.defaultPrefix}${key}`
}

/**
 * 清除已经过期的数据源
 * @param  {String} methods 检查的方法
 */
const clearOutTimeMemory = (methods) => {
  if (!isString(methods)) {
    throw new Error('clearOutTimeMemory params TypeError')
  }
  if (!CACHE_OPTION.LOCAL_METHODS_LIST.includes(methods)) {
    throw new Error('EsayStorage no suppor this methods')
  }
  Object.keys(window[methods])
    .filter(key => key.startsWith(CACHE_OPTION.defaultPrefix))
    .forEach(key => {
      const originKey = key.replace(CACHE_OPTION.defaultPrefix, '')
      const isSurvival = checkDataSurvival(key, methods)
      if (!isSurvival) {
        if (CACHE_OPTION.DEBUG) {
          console.log(`auto clear: ${originKey}`)
        }
        remove(originKey, methods)
      }
    })
}

/**
 *
 * 将数据存取在本地，并且设置超时
 * @param {String} key  存储的键值
 * @param {*} data 需要存储的数据
 * @param {Object} [option={timeout, methods}] 存取的配置
 */
const set = (key, data, handleOption = {}) => {
  if (isNoValue(data)) {
    console.warn(`set data must exist`)
    return
  }
    const LOCAL_METHODS_LIST = CACHE_OPTION.LOCAL_METHODS_LIST
    const defaultOption = {
      timeout: CACHE_OPTION.TIMEOUT,
      methods: CACHE_OPTION.DEFAULT_METHOD
    }
    const option = esayCover(defaultOption, handleOption)
    if (!LOCAL_METHODS_LIST.includes(option.methods)) {
      console.warn(`set no exist this ${option.methods}`)
      return
    }
    if (getType(option.timeout) !== 'number') {
      console.warn(`set option.timeout must be number`)
      return
    }
    const formatData = formatSaveData(data)
    const timestamp = new Date().getTime()
    const cacheObj = {
      originDataType: getType(data),
      timeout: option.timeout,
      timestamp: timestamp,
      data: formatData
    }
  try{
    window[option.methods].setItem(formatStorageKey(key), JSON.stringify(cacheObj))
  } catch (error) {
    if (!CACHE_OPTION.IS_AUTO_CLEAR) {
      throw error
    }
    if (isDomexcEption(error)){
      const message = error.message
      const isOverCatch = message.includes('exceeded')
      if (isOverCatch) {
        clearOutTimeMemory(option.methods)
        try{
          window[option.methods].setItem(formatStorageKey(key), JSON.stringify(cacheObj))
        } catch (errorAgain) {
          throw errorAgain
        }
        return
      }
      throw error
    }
    throw error
  }
}

/**
 *
 * 查看数据是否还存活
 * @param {String} key
 * @param  {} methods='localStorage'
 * @return {Boolean} 是否还有有效
 * @memberof System
 */
const checkDataSurvival = (key, methods) => {
  try {
    const LOCAL_METHODS_LIST = CACHE_OPTION.LOCAL_METHODS_LIST
    methods = methods || CACHE_OPTION.methods
    if (!LOCAL_METHODS_LIST.includes(methods)) {
      console.warn(`EsayStorage no suppor this methods: ${methods}`)
      return false
    }
    let data = window[methods].getItem(formatStorageKey(key))
    if (!data) {
      return false
    }
    if (isJsonStr(data)) {
      let {
        timeout,
        timestamp
      } = JSON.parse(data)
      if (!timeout || !timestamp) {
        return false
      }
      let nowDate = new Date().getTime()
      return nowDate - timestamp < timeout
    }
    return false
  } catch (error) {
    console.error(error)
  }
}

/**
 *
 * 获取数据
 * @param {String} key 存储的key
 * @param {string}  methods='localStorage'
 * @returns
 */
const get = (key, methods) => {
  try {
    methods = methods || CACHE_OPTION.methods
    let dataSurvival = checkDataSurvival(key, methods)
    if (!dataSurvival) {
      console.warn(`${key} no survival, please update local data`)
      return undefined
    }
    let localData = window[methods].getItem(formatStorageKey(key))
    let {
      originDataType,
      data
    } = JSON.parse(localData)
    if (originDataType === 'number') {
      return Number(data)
    }
    if (['object', 'array'].includes(originDataType)) {
      return JSON.parse(data)
    }
    if (originDataType === 'boolean') {
      return data === 'true'
    }
    return data
  } catch (error) {
    console.error(error)
  }
}

/**
 * 移除某项数据
 * @param  {String} key 储存的key
 * @param  {String} methods 储存的方法
 */
const remove = (key, methods) => {
  methods = methods || CACHE_OPTION.DEFAULT_METHOD
  window[methods].removeItem(formatStorageKey(key))
}

/**
 * 清除数据
 * @param  {String} methods 储存的方法
 */
const clear = (methods) => {
  methods = methods || CACHE_OPTION.DEFAULT_METHOD
  Object.keys(window[methods])
  .filter(key => key.startsWith(CACHE_OPTION.defaultPrefix))
  .forEach(key => {
    window[methods].removeItem(key)
  })
}


/**
 * 构建函数
 * @param  {Object} config 全局初始化配置
 */
const EsayStorage = function (config = {}) {
  if (!isBrowser) {
    throw new Error('esay storage just suppor browser env.')
  }
  console.log(config)
  // TODO: 检查运行环境， 目前只支持浏览器环境
  CACHE_OPTION = esayCover(CACHE_OPTION, config)
  if (CACHE_OPTION.DEBUG) {
    console.log(CACHE_OPTION)
  }
}

// 把基础的时间常量暴露除去
EsayStorage.DATE = DATE
EsayStorage.prototype = {
  get,
  set,
  remove,
  clear,
  checkDataSurvival,
  formatSaveData,
  clearOutTimeMemory
}



export default EsayStorage
