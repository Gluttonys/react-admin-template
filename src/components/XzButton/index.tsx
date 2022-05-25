import type { ButtonProps } from 'antd';
import { Button } from 'antd';

type XzButtonProps = {
  background?: string;
} & ButtonProps;

const XzButton = (props: XzButtonProps): JSX.Element => {
  const { background } = props;

  const style = {
    background,
    color: '#f8f8f8',
    border: 'none',
    margin: '0 5px',
  };

  return <Button {...props} style={style} />;
};

export default XzButton;
