export function accountValidate(account) {
  return account.length !== 0;
}
export function passwordValidate(password) {
  // return /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{8,16}$/.test(password);
  return password.length !== 0;
}

/**
 * @description 格式化数字，个位数加0
 * @date 2019-09-03
 * @param {Number}
 * @returns {Number}
 */
function formatNumber(n) {
  const str = n.toString();
  return str.length > 1 ? str : `0${str}`;
}

/**
 * @description
 * @date 2019-08-08
 * @export
 * @param {Date|number} time 时间，单位为毫秒(ms)
 * @param {string} format 格式模板 如 yyyy.MM.dd.hh.mm.ss
 * @returns {string} example: 2020.08.06
 */
export function formatDate(inputTime, format) {
  let time;
  if (!inputTime) {
    return "";
  }
  if (typeof inputTime === "number") {
    switch (String(inputTime).length) {
      case 10:
        // 秒级（10位）乘1000
        time = new Date(inputTime * 1000);
        break;
      default:
        // 默认毫秒级
        time = new Date(inputTime);
        break;
    }
  } else {
    time = new Date(inputTime);
  }

  // 年月日时分秒
  const yyyy = time.getFullYear();
  // 月份
  const M = time.getMonth() + 1;
  const d = time.getDate();
  const h = time.getHours();
  // 分钟
  const m = time.getMinutes();
  const s = time.getSeconds();

  // 个位数加0
  const MM = formatNumber(M);
  const dd = formatNumber(d);
  const hh = formatNumber(h);
  const mm = formatNumber(m);
  const ss = formatNumber(s);

  // 匹配格式模板，对应的是输入的格式和得到的值。
  const templates = [
    { reg: "yyyy", value: yyyy },
    { reg: "MM", value: MM },
    { reg: "M", value: M },
    { reg: "dd", value: dd },
    { reg: "d", value: d },
    { reg: "hh", value: hh },
    { reg: "h", value: h },
    { reg: "mm", value: mm },
    { reg: "m", value: m },
    { reg: "ss", value: ss },
    { reg: "s", value: s }
  ];

  let result = format;

  for (const template of templates) {
    result = result.replace(template.reg, template.value.toString());
  }
  return result;
}

// 导出execl下载
export function excelDownload(url) {
  // 请求方法
  var method = "get";
  // 请求url
  // 定义一个XMLHttpRequest对象
  var xhr = new XMLHttpRequest();
  xhr.open(method, url, true);
  // 设置ajax的响应类型为blob
  xhr.responseType = "blob";
  xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
  // 当请求完成，响应就绪进入
  xhr.onload = function() {
    var responseHeader = xhr.getResponseHeader("Content-Disposition");
    console.log(responseHeader);
    var string = responseHeader.split(";")[1].split("=")[1];
    var name = decodeURI(string);
    // 当响应状态码为200时进入
    if (this.status === 200) {
      // 获取响应返回的blob对象
      var blob = this.response;
      // 这一段用来判断是否是IE浏览器，因为下面有些代码不支持IE
      if (typeof window.navigator.msSaveBlob !== "undefined") {
        window.navigator.msSaveBlob(blob, name);
        return;
      }
      // 在dom树上创建一个a标签
      var a = document.createElement("a");
      // 我的理解是生成一个相对于浏览器的虚拟url，用于指向传入的blob对象，让浏览器可以通过这个url找到这个blob对象
      var url = window.URL.createObjectURL(blob);
      // 将url赋值给a标签的href属性
      a.href = url;
      a.href = url;
      // 设置设置下载文件的名称
      a.download = name;
      // 主动触发a标签点击事件
      a.click();
    }
  };
  // 附带参数发送请求
  xhr.send(
    JSON.stringify({
      name: "",
      status: ""
    })
  );
}

// 用于给按单页请求的表格设置一个统一的序号。
export function parseIndex(index, current, size) {
  return 1 + index + (current - 1) * size;
}

/**
 * @description 下载文件
 * @author xujx
 * @date 2021-01-26
 * @param {*} name 文件名
 * @param {*} url 文件的地址
 */
export function downloadFile(name, url) {
  const aLink = document.createElement("a");
  const evt = document.createEvent("MouseEvents");
  evt.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  aLink.download = name;
  aLink.href = url;
  aLink.dispatchEvent(evt);
}
