import type { proColumns, UltimateTableProps } from '../type';
/**
 * @desc 引入处理程序
 */
import imgHandle from './registrar/imgHandle';
import videoHandle from './registrar/videoHandle';
import genderHandle from './registrar/genderHandle';
import dateHandle from './registrar/dateHandle';
import numberHandle from './registrar/numberHandle';
import jsonHandle from './registrar/jsonHandle';
import selectHandle from './registrar/selectHandle';

class Column {
  static __actuatorList: registrarFun[] = [];

  private readonly __resultColumns: proColumns = [];

  constructor(proCol: proColumns, props: UltimateTableProps) {
    this.__resultColumns = Column.__actuatorList.reduce((preProColumns, currentRegistrar) => {
      return currentRegistrar.call(null, preProColumns, props);
    }, proCol);
  }

  static register(regFun: registrarFun) {
    Column.__actuatorList.push(regFun);
  }

  public getColumn() {
    return this.__resultColumns;
  }
}

/**
 * @desc 注册处理程序
 */
Column.register(imgHandle);
Column.register(videoHandle);
Column.register(genderHandle);
Column.register(dateHandle);
Column.register(numberHandle);
Column.register(jsonHandle);
Column.register(selectHandle);
// Column.register(operatingHandle);

export type registrarFun = (proColumns: proColumns, props: UltimateTableProps) => proColumns;
export default Column;
