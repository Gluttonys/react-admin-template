import {sessionStorageGetItem} from '@/utils/storage';
import {storageKeys} from '@/constantPool/STORAGE_KEYS';

export default (
  url: string,
  options: RequestInit,
): {
  url: string;
  options: RequestInit;
} => {
  if (!url.includes('/account/signin')) {
    const token = sessionStorageGetItem(storageKeys.ACCESS_TOKEN);
    options.headers = {
      ...options.headers,
      Authorization: token,
    };
  }

  return {url, options};
};
