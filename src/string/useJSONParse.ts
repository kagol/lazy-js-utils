const keyReg = /\s+(?!['"])([\w_\-\$\.]+):/gm
const valueReg = /:\s*(?!['"])([\w_\-\$\.]+)/gm
const commaLackReg = /:\s*("[\w_\-\$\.]+")\s*(?!,)"/gm
const commaMoreReg = /:\s*("[\w_\-\$\.]+"\s*,)\s*}/gm
const moreCommaReg = /,(\s*})/gm
/**
 * 将字符串转为JSON.stringify的格式并parse出结果
 * @param { string } str 字符串
 * @returns
 */
export function useJSONParse(str: string) {
  return JSON.parse(
    str
      .replace(keyReg, (match, key) => match.replace(key, `"${key}"`))
      .replace(valueReg, (match, value) => match.replace(value, `"${value}"`))
      .replace(commaLackReg, (match, value) =>
        match.replace(value, `${value},`),
      )
      .replace(commaMoreReg, (match) => match.replace(',', ''))
      .replace(moreCommaReg, (_, v) => v),
  )
}

// const data = `{
//   "compilerOptions": {
//     "baseUrl": "./",
//     "lib": ["esnext", "DOM"],
//     "paths": {
//         "@/*": ["src/*"],
//         "~/*": ["/"],
//     }
//   },
//   "exclude": ["node_modules", "dist"]
// }
// `
// console.log(useJSONParse(data)) // { name: 'simon', age: '14' }
