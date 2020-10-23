interface ExtendOptions extends RequestInit {
  Accept?: 'json' | 'form';
  responseType?: 'json' | 'blob';
}

interface IndexType {
  (url: RequestInfo, options?: ExtendOptions): Promise<Record<string, unknown>>;
}

enum ContentType {
  json = 'application/json;charset=UTF-8',
  form = 'application/x-www-form-urlencoded;charset=UTF-8',
}

const index: IndexType = async function index(url, extendOptions = {}) {
  const { Accept, responseType, ...otherExtendOptions } = extendOptions;
  const headers = {
    Accept: Accept === 'form' ? ContentType.form : ContentType.json,
    ...(extendOptions?.headers || {}),
  };
  const options = {
    headers,
    method: otherExtendOptions.method || 'GET',
    ...otherExtendOptions,
  };
  try {
    const response = await fetch(url, options);
    statusValidate(response);
    return responseType === 'blob' ? response.blob() : response.json();
  } catch (e) {
    Promise.reject('服务器网络异常');
    return {};
  }
};

function statusValidate(response: Response) {
  const { status, statusText } = response;
  const statusString = String(status);
  if (statusString.startsWith('4') || statusString.startsWith('5')) {
    Promise.reject(statusText);
  }
}

export default index;
