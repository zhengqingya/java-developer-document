/**
 * window.localStorage => 浏览器永久存储，用于长久保存整个网站的数据，保存的数据没有过期时间，直到手动去删除。
 */
export const localStorage = {
  set(key, val) {
    window.localStorage.setItem(key, JSON.stringify(val));
  },
  get(key) {
    const json = window.localStorage.getItem(key);
    return JSON.parse(json);
  },
  remove(key) {
    window.localStorage.removeItem(key);
  },
  clear() {
    window.localStorage.clear();
  },
};

/**
 * window.sessionStorage => 浏览器本地存储，数据保存在当前会话中，在关闭窗口或标签页之后将会删除这些数据。
 */
export const sessionStorage = {
  set(key, val) {
    window.sessionStorage.setItem(key, JSON.stringify(val));
  },
  get(key) {
    const json = window.sessionStorage.getItem(key);
    return JSON.parse(json);
  },
  remove(key) {
    window.sessionStorage.removeItem(key);
  },
  clear() {
    window.sessionStorage.clear();
  },
};
