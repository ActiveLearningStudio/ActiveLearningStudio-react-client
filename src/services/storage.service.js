export default {
  setItem: (key, data) => {
    if (typeof data === 'object') {
      localStorage.setItem(key, JSON.stringify(data));
    } else {
      localStorage.setItem(key, data);
    }
  },

  getItem: (key) => {
    let item = localStorage.getItem(key);
    try {
      item = JSON.parse(item);
    } catch (e) {
      return item;
    }
    return item;
  },

  removeItem: (key) => {
    localStorage.removeItem(key);
  },

  deleteAllCookies: () => {
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i += 1) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }
  },
};
