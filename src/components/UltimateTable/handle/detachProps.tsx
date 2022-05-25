import type { UltimateTableProps } from '@/components/UltimateTable';

/**
 * 拆分 container, table 各自属性
 * @param {UltimateTableProps} props
 * @return {[{affixProps: Omit<AffixProps,
 *                             "children"> | undefined,
 *                             tabList: (TabPaneProps & {key?: React.ReactText})[] | undefined,
 *                             waterMarkProps: WaterMarkProps | undefined,
 *                             tabActiveKey: string | undefined,
 *                             ghost: boolean | undefined,
 *                             extraContent: React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | Iterable<React.ReactNode> | React.ReactPortal | boolean | null | undefined
 *
 */
const getContainerProps = (props: UltimateTableProps) => {
  /* 处理容器属性 */
  const {
    content,
    extraContent,
    tabList,
    tabActiveKey,
    onTabChange,
    header,
    tabBarExtraContent,
    ghost,
    affixProps,
    footer,
    waterMarkProps,
    tabProps,
    ...restTableProps
  } = props;

  const containerProps = {
    content,
    extraContent,
    tabList,
    tabActiveKey,
    onTabChange,
    header,
    tabBarExtraContent,
    ghost,
    affixProps,
    footer,
    waterMarkProps,
    tabProps,
  };

  return [containerProps, restTableProps];
};

export default getContainerProps;
