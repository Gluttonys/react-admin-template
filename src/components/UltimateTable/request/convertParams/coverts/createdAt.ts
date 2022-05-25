import type { CovertFun } from '@/components/UltimateTable/request/convertParams';

const createdAt: CovertFun = (params) => {
  if ('created_at' in params) {
    return Object.assign(params, {
      created_at: (params.created_at as []).join('-'),
    });
  } else {
    return params;
  }
};

export default createdAt;
