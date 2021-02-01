export function getFileDownload(url) {
  var method = "get";
  var xhr = new XMLHttpRequest();
  xhr.open(method, url, true);
  xhr.responseType = "blob";
  xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
  xhr.onload = function() {
    var responseHeader = xhr.getResponseHeader("Content-Disposition");
    console.log(responseHeader);
    var string = responseHeader.split(";")[1].split("=")[1];
    var name = decodeURI(string);
    if (this.status === 200) {
      var blob = this.response;
      // if IE
      if (typeof window.navigator.msSaveBlob !== "undefined") {
        window.navigator.msSaveBlob(blob, name);
        return;
      }
      var a = document.createElement("a");
      var url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = name;
      a.click();
    }
  };
  xhr.send(
    JSON.stringify({
      name: "",
      status: ""
    })
  );
}
/**
 * @description 下载文件
 * @author xujx
 * @date 2021-01-26
 * @param {*} name 文件名
 * @param {*} url 文件的地址
 */
export function clickToDownload(name, url) {
  const aLink = document.createElement("a");
  const evt = document.createEvent("MouseEvents");
  evt.initMouseEvent(
    "click",
    true,
    false,
    window,
    0,
    0,
    0,
    0,
    0,
    false,
    false,
    false,
    false,
    0,
    null
  );
  aLink.download = name;
  aLink.href = url;
  aLink.dispatchEvent(evt);
}
