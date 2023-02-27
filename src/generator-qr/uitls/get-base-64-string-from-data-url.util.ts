export const getBase64StringFromDataURLFn = (dataURL) =>
  dataURL.replace('data:', '').replace(/^.+,/, '');
