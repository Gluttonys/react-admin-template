import {ossSts} from '@/services/common';
import {message} from 'antd';
import type OSS_DIRS from '@/constantPool/OSS_DIRS';
// @ts-ignore
import sha1 from 'sha1-file-web';

const OSS = require('ali-oss');

type ossData = {
  accessKeyId: string;
  accessKeySecret: string;
  securityToken: string;
  region: string;
  bucket: string;
  baseUrl: string;
};

class OssProvider {
  __ossIns: Record<any, any> = {};

  async getOssIns(): Promise<any> {
    if (this.__ossIns.bucket) return this.__ossIns;
    const ossData = await this.getEffectiveIns();
    if (ossData) {
      const {region, accessKeyId, accessKeySecret, bucket, securityToken} = ossData;

      this.__ossIns = new OSS({
        region,
        accessKeyId,
        accessKeySecret,
        bucket,
        stsToken: securityToken,
        refreshSTSToken: this.getEffectiveIns,
        refreshSTSTokenInterval: 1e3 * 60 * 5,
      });
    } else {
      throw ReferenceError('无法正确获取oss对象引用！');
    }
    return this.__ossIns;
  }

  async getEffectiveIns(): Promise<ossData | void> {
    try {
      const {
        data: {region, accessKeyId, accessKeySecret, securityToken, bucket, baseUrl},
      } = await ossSts();

      return {
        accessKeyId,
        accessKeySecret,
        securityToken,
        region,
        bucket,
        baseUrl,
      };
    } catch (e) {
      return void message.warn('获取 oss 信息失败~');
    }
  }

  async upload(file: File, dir: OSS_DIRS) {
    const OSSIns = await this.getOssIns();

    /** 处理文件路径 */
    const extensionName = file.name.split('.').reverse()[0];
    const fileName = await sha1(file);
    const filePath = `${dir}/${fileName}.${extensionName}`;

    const {bucket, region} = OSSIns.options;
    const prefix = `https://${bucket}.${region}.aliyuncs.com/`;
    const remotePath = `${prefix}${filePath}`;

    try {
      const {status} = await fetch(remotePath, {method: 'head'});

      if (status === 200) return Promise.resolve(remotePath);

      const result = await OSSIns.put(filePath, file);
      return Promise.resolve(result.url);
    } catch (e) {
      return Promise.reject(e);
    }
  }
}

export default OssProvider;
