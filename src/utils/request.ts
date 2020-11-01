import { apiIp } from 'config/public';

interface ExtendOptions extends RequestInit {
  Accept?: 'json' | 'form';
  responseType?: 'json' | 'blob';
  ContentType?: string;
  body?: any;
}

interface IndexType {
  (apiUrl: RequestInfo, options?: ExtendOptions): Promise<
    Record<string, unknown>
  >;
}

enum AcceptType {
  json = 'application/json;charset=UTF-8',
  form = 'application/x-www-form-urlencoded;charset=UTF-8',
}

type CredentialsType = 'include' | 'omit' | 'same-origin' | undefined;

const index: IndexType = async function index(apiUrl = '', extendOptions = {}) {
  let url = apiUrl;
  if (typeof apiUrl === 'string' && !apiUrl.startsWith('http')) {
    url = `${apiIp}${apiUrl}`;
  }
  const {
    Accept,
    responseType,
    ContentType,
    ...otherExtendOptions
  } = extendOptions;
  const headers = {
    Accept: Accept === 'form' ? AcceptType.form : AcceptType.json,
    'Content-Type': ContentType || 'application/json',
    ...(extendOptions?.headers || {}),
  };
  const options = Object.assign(
    {
      headers,
      method: otherExtendOptions.method || 'GET',
      ...otherExtendOptions,
      credentials: 'include' as CredentialsType,
    },
    otherExtendOptions.body
      ? { body: JSON.stringify(otherExtendOptions.body) }
      : null,
  );
  try {
    const response = await fetch(url, options);
    if (statusValidate(response)) {
      return responseType === 'blob' ? response.blob() : response.json();
    } else {
      return {};
    }
  } catch (e) {
    console.log(e);
    Promise.reject('服务器网络异常');
    return {};
  }
};

function statusValidate(response: Response): boolean {
  const statusString = String(response.status);
  if (statusString === '401') {
    window.location.href = '/login';
    // Promise.reject('用户认证失败');
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
