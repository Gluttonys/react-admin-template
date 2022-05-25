import React, {useState} from 'react';
import {ProFormUploadDragger} from '@ant-design/pro-form';
import type {ProFormDraggerProps} from '@ant-design/pro-form/es/components/UploadButton';
import type OSS_DIRS from '@/constantPool/OSS_DIRS';
import OssProvider from '@/utils/ossProvider';

type XzUploaderProps = {
  oss_dir: OSS_DIRS;
} & ProFormDraggerProps;

const XzUploader: React.FC<XzUploaderProps> = (props) => {
  const [remotePath, setPath] = useState<string>('');

  const beforeUpload = async (file: File) => {
    const ossProvider = new OssProvider();
    const tempPath = await ossProvider.upload(file, props.oss_dir);
    setPath(tempPath);
  };

  const handleTransForm = (value: any, fileName: string) => {
    if (value[0]?.url) {
      /* 默认值 */
      return {
        [fileName]: value[0]?.url,
      };
    } else {
      return {[fileName]: remotePath};
    }
  };

  return (
    <ProFormUploadDragger
      {...props}
      fieldProps={{
        beforeUpload,
        listType: 'picture',
      }}
      description=""
      transform={handleTransForm}
    />
  );
};

export {XzUploader, XzUploaderProps};
