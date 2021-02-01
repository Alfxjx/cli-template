/**
 * @description 用于给按单页请求的表格设置一个统一的序号。
 * @author xujx
 * @date 2021-02-01
 * @param {*} index starts from zero in an array
 * @param {*} current current page
 * @param {*} size page size
 * @returns {*} the index for item in such table pagination
 */
export function parseIndex(index, current, size) {
  if (current < 1 || size < 1 || index < 0 || index >= size) return false;
  return 1 + index + (current - 1) * size;
}
