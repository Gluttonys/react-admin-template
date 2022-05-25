import SIZE from '@/constantPool/SIZE';

/**
 * @desc 获取一个矩形的宽高样式
 *
 * @param {SIZE} size 矩形大小
 * @returns {{objectFit: string, width: string, height: string}}
 */
const getSizeStyle = (size: SIZE) => {
  let px: string = '50px';

  switch (size) {
    case SIZE.HUGE:
      px = '200px';
      break;
    case SIZE.BIGGER:
      px = '130px';
      break;
    case SIZE.NORMAL:
      px = '90px';
      break;
    case SIZE.SMALL:
      px = '60px';
      break;
    case SIZE.LEAST:
      px = '30px';
      break;
  }

  return {
    objectFit: 'cover',
    width: px,
    height: px,
  };
};

const filterListChildren = (recordList: Record<string, any>[]): Record<string | 'annex', any>[] => {
  return recordList.map(record => {
    if (record.children && Array.isArray(record.children) && record.children.length > 0) {
      record.children = filterListChildren(record.children)
      return record
    } else {
      delete record.children
      return record
    }
  })
}

export {getSizeStyle, filterListChildren};
