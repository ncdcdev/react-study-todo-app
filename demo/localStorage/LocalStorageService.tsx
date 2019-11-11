export const setItem = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const setPushItem = (target, key, val) => {
  target[key] = val;
  setItem([getItem('user').cognitId], target);
};

export const getItem = key => {
  return JSON.parse(localStorage.getItem(key));
};

export const removeItem = key => {
  localStorage.removeItem(key);
};

export const removeAllItem = () => {
  var i = 0,
    oJson = {},
    sKey;
  for (; (sKey = window.localStorage.key(i)); i++) {
    oJson[sKey] = window.localStorage.removeItem(sKey);
  }
};

export const refAllItem = () => {
  var i = 0,
    oJson = {},
    sKey;
  for (; (sKey = window.localStorage.key(i)); i++) {
    console.log(sKey, localStorage.getItem([sKey]));
  }
};
