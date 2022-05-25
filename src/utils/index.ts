function cc(...classes: string[]) {
  return classes.join(' ');
}


/**
 * @desc将后端返回的列表转换成组件可用数据接口
 *
 * @example /XXX/selection => TreeData
 * */
const convertData = (rawDataList: Record<string, any>[]): any[] => {
  return rawDataList.map((item) => {
    const result = {
      label: item.label,
      value: item.id,
    }

    if (item.children?.length === 0) {
      return result
    } else {
      const children = convertData(item.children)

      return {
        ...result,
        children: children
      }
    }
  })
}

export {
  cc,
  convertData
}
