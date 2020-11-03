/**
 * 设置cookie
 * @param key
 * @param value
 */
export const setCookie = (key: string, value: string) => {
  const d = new Date();
  d.setTime(d.getTime() + 8 * 60 * 60 * 1000);
  const expires = 'expires=' + d.toUTCString();
  document.cookie = key + '=' + btoa(value) + '; ' + expires;
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
      return atob(c.substring(name.length, c.length));
    }
  }
  return '';
};
