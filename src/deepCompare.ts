import { isPlainObject } from "./common"

// 深比较
export function deepCompare(comp1: any, comp2: any, error: string[] = [], errorMsg: string[] = [], name?: string, index?: string,) {
  if (isPlainObject(comp1) && isPlainObject(comp2)) {
    let longer = Object.keys(comp1).length >= Object.keys(comp2).length
      ? comp1
      : comp2
    for (const key in longer) {
      const value1 = comp1[key]
      const value2 = comp2[key]
      let _key = name ? `${name}.${key}` : key
      deepCompare(value1, value2, error, errorMsg, _key)
    }
  } else if (Array.isArray(comp1) && Array.isArray(comp2)) {
    const longer = comp1.length >= comp2.length
      ? comp1
      : comp2
    for (const key in longer) {
      const value1 = comp1[key]
      const value2 = comp2[key]
      deepCompare(value1, value2, error, errorMsg, name, key,)
    }
  } else if (comp1 !== comp2) {
    name = name || 'array'
    let msg = index
      ? `${name}数据不一致，第${index}项,分别为${comp1}   =>    ${comp2}`
      : `${name}数据不一致，分别为${comp1}   =>    ${comp2}`
    error.push(name)
    errorMsg.push(msg)
  }

  return { error, errorMsg }
}
