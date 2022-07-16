export const templateWrap = (content: string) => {
  return content.replace(/\<template.*?\>(.*)\<\/template.*?\>/s, (match, p1) => {
    return `<template><div style='height:100%;width: 100%;'>${p1}</div></template>`
  })
}
