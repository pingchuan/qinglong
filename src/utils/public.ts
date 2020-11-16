/**
 * 设置cookie
 * @param key
 * @param value
 */
export const setCookie = (key: string, value: string) => {
  const date = new Date();

  date.setTime(date.getTime() + 8 * 60 * 60 * 1000);
  const expires = 'expires=' + date.toUTCString();

  document.cookie =
    key + '=' + btoa(encodeURIComponent(value)) + '; ' + expires;
  document.cookie =
    key + '=' + btoa(encodeURIComponent(value)) + '; ' + expires + '; path=/;';
};

/**
 * 获取cookie
 * @param key
 */
export const getCookie = (key: string) => {
  const name = key + '=';
  const ca = document.cookie.split(';');

  for (let i = 0; i < ca.length; i++) {
    const c = ca[i].trim();

    if (c.indexOf(name) === 0) {
      return decodeURIComponent(atob(c.substring(name.length, c.length)));
    }
  }
  return '';
};

/**
 * 清除cookie
 * @param key
 */
export const clearCookie = (key: string, value?: string) => {
  const date = new Date();
  const expires = 'expires=' + date.toUTCString();

  document.cookie = key + '=' + btoa(value || '{}') + '; ' + expires;
  document.cookie =
    key + '=' + btoa(value || '{}') + '; ' + expires + '; path=/;';
};
