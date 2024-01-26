/*
 * @Description: 文件相关的一些方法
 * @Author: mxliu5
 * @Date: 2023-08-16
 */

// 获取文件后缀
export function getFileSuffix(value: string): string {
  const specialList = [".tar.gz"]; //特殊文件后缀集合
  //查找文件后缀是否为特殊后缀
  let special_suffix = "";
  specialList.forEach((str: string) => {
    const Index = value.indexOf(str);
    if (Index > -1 && Index + str.length === value.length) {
      special_suffix = str;
    }
  });
  //正常文件后缀
  const arr = value.split(".");
  const last = arr[arr.length - 1];
  let suffix = "";
  if (special_suffix) {
    suffix = special_suffix;
  } else {
    suffix = `${last}`;
  }
  return suffix;
}

// 下载文件
export function downloadFun(url: string, fileName: string) {
  const link = document.createElement("a");
  link.style.display = "none";
  link.href = url;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}
