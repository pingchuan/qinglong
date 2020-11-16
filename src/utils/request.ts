import { message } from 'antd';
import { clearCookie } from '@/utils/public';

type CredentialsType = 'include' | 'omit' | 'same-origin' | undefined;
type JsonOrForm = 'json' | 'form';
type JsonOrBlob = 'json' | 'blob';
interface ExtendOptions extends RequestInit {
  responseType?: JsonOrBlob;
  hasTip?: boolean;
  bodyType?: JsonOrForm;
  body?: any;
}

interface IndexType {
  (apiUrl: RequestInfo, options?: ExtendOptions): Promise<any>;
}

const headerWrapper = (
  bodyType?: JsonOrForm,
  extendOptions?: ExtendOptions,
) => {
  if (bodyType && bodyType === 'form') {
    return extendOptions?.headers || {};
  } else {
    return {
      ...(extendOptions?.headers || {}),
      'Content-Type': 'application/json;charset=UTF-8',
    };
  }
};

const bodyWrapper = (body?: any, bodyType?: JsonOrForm) => {
  let result = null;

  if (body && typeof body === 'object' && bodyType === 'form') {
    const formdata = new FormData();

    for (const key in body) {
      formdata.append(key, body[key]);
    }
    result = formdata;
  } else if (body) {
    result = JSON.stringify(body);
  }
  return result;
};

const index: IndexType = async function index(apiUrl = '', extendOptions = {}) {
  const url = '/qinglong' + apiUrl;
  const {
    responseType,
    bodyType,
    hasTip,
    ...otherExtendOptions
  } = extendOptions;
  const headers = headerWrapper(bodyType, extendOptions);

  const options = Object.assign(
    {
      headers,
      method: otherExtendOptions.method || 'GET',
      ...otherExtendOptions,
      credentials: 'include' as CredentialsType,
    },
    otherExtendOptions.body
      ? { body: bodyWrapper(otherExtendOptions.body, bodyType) }
      : null,
  );

  try {
    const response = await fetch(url, options);

    if (statusValidate(response)) {
      hasTip && message.success('操作成功');
      return responseType === 'blob' ? response.blob() : response.json();
    } else {
      return {};
    }
  } catch (e) {
    Promise.reject('服务器网络异常');
    return {};
  }
};

function statusValidate(response: Response): boolean {
  const statusString = String(response.status);

  if (statusString === '401') {
    clearCookie('user');
    window.location.href = '/qinglong/login';
    return false;
  } else if (statusString.startsWith('4')) {
    Promise.reject('服务器网络异常');
    return false;
  } else if (statusString.startsWith('5')) {
    response.json().then(e => Promise.reject(e.message));
    return false;
  }
  return true;
}

export default index;
