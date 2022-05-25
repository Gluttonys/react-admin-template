import type {IEditorConfig} from "@wangeditor/editor";
import OssProvider from "@/utils/ossProvider";
import OSS_DIRS from "@/constantPool/OSS_DIRS";
import {notification} from "antd";

type InsertFnType = (url: string, alt: string, href: string) => void

const defaultEditorConfig: Partial<IEditorConfig> = {
  placeholder: '请输入内容...',
  MENU_CONF: {
    /** @link https://www.wangeditor.com/v5/menu-config.html#%E5%9B%BE%E7%89%87 */
    insertImage: {
      onInsertedImage(imageNode: HTMLImageElement | null) {
        if (imageNode) {
          notification.success({message: '上传图片成功'})
        } else {
          notification.error({message: '上传图片失败'});
        }
      }
    },

    /** @link https://www.wangeditor.com/v5/menu-config.html#%E8%A7%86%E9%A2%91 */
    insertVideo: {
      onInsertedVideo(videoNode: HTMLVideoElement | null) {
        if (videoNode) {
          notification.success({message: '上传视频成功'})
        } else {
          notification.error({message: '上传视频失败'});
        }
      }
    },

    /** @link https://www.wangeditor.com/v5/menu-config.html#%E5%9F%BA%E6%9C%AC%E9%85%8D%E7%BD%AE */
    uploadImage: {
      server: '/list',
      fieldName: 'rich-text-file',
      maxFileSize: 2 * 1024 * 1024, /** 2M */
      allowedFileTypes: ['image/*'],
      withCredentials: true,
      timeout: 10_000,
      customUpload: async (file: File, insertFn: InsertFnType) => {
        const ossProvider = new OssProvider()
        const path = await ossProvider.upload(file, OSS_DIRS.IMAGE)
        insertFn(path, path, path)
      }
    },

    /** 上传视频相关配置 */
    uploadVideo: {
      customUpload: async (file: File, insertFn: InsertFnType) => {
        const ossProvider = new OssProvider()
        const path = await ossProvider.upload(file, OSS_DIRS.VIDEO)
        insertFn(path, path, path)
      }
    }
  }
}

export default defaultEditorConfig
