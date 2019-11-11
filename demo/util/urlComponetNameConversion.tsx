export default (str, target) => {
  if (str.slice(0, 1) !== '/') {
    return false;
  }

  const text = str.slice(1);
  const ary = text.split('/')[target];
  return ary.charAt(0).toUpperCase() + ary.slice(1);
};
