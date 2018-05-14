export default function (str, len) {
  const  size = Math.ceil(str.length / len);
  const ret = new Array(size);
  let offset;

  for (let i = 0; i < size; i++) {
    offset = i * len;
    ret[i] = str.substring(offset, offset + len);
  }

  return ret;
}
