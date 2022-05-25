type category = 'add' | 'edit';

type OptionFormProps = {
  // 表单的类型
  category: category;
  // 当为修改记录时候， 提供的记录实体
  entity?: Record<string, any>;
  // 当记录实体中包含图片上传字段时候， 填写指定字段，组件自动帮转图片对象， 做编辑回显使用
  entityImgTransform?: string[];
  // 新增URL
  addUrl: string;
  // 编辑URL
  editUrl: string;
  // 表格快捷方法对象， 提供刷新重置表格等操作
  action?: any;
};

type mainUrl = Pick<OptionFormProps, 'addUrl' | 'editUrl'>;

export { category, OptionFormProps, mainUrl };
