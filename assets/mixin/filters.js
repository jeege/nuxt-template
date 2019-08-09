import env from '~/assets/js/env'
const filters = {
  // code转name
  codeToName(value, key) {
    if (!isNaN(value)) value = String(value)
    if (!value) return;
    return env.gm[key][value];
  },
  // 不可以超过30个字
  maxLength(value) {
    let str = "";
    if (value.slice(30)) {
      str = "...";
    }
    return value.slice(0, 30) + str;
  },
  // 去除, 展示第一个
  removeComma(value) {
    return value.split(",")[0];
  },
  // 加.00
  tofix(value) {
    if (Number(value)) return Number(value).toFixed(2);
    return "0.00";
  },
  // 加.0
  toPoint(value) {
    if (Number(value)) return Number(value).toFixed(1);
    return "0.0";
  },
  int(value) {
    if (Number(value)) return String(value).split('.')[0];
    return "0";
  },
  float(value) {
    if (Number(value)) return Number(value).toFixed(2).split('.')[1];
    return "00";
  },
  // 银行卡加密
  addCardStar(value) {
    if (value) return (value + "").replace(/^(.{1}).+(.{1})$/, "$1**************$2");
    return '暂无'
  },
  // 身份证加※
  addIdCardStar(value) {
    return (value + "").replace(/^(.{1}).+(.{1})$/, "$1****************$2");
  },
  // 电话号码加※
  addStar(value) {
    return (value + "").replace(/^(.{3})\d{4}/, ($0, $1) => $1 + "****");
  },
  // 毫秒转换为本地时间格式
  yymm(value) {
    return new Date(value).toLocaleString();
  },
  // 转换订单id
  orderId(value) {
    return (value + "").slice(0, 2) + "****" + (value + "").slice(-4);
  },
  // 毫秒转化成日期格式
  transTime(value, type) {
    if (typeof value == 'string') {
      value = value.replace(/-/g, '/')
    }
    if (!value) return value
    const date = new Date(value);
    const [year, month, day, hour, minute, second] = [
      date.getFullYear(),
      (date.getMonth() + 1 + "").padStart(2, "0"),
      (date.getDate() + "").padStart(2, "0"),
      (date.getHours() + "").padStart(2, "0"),
      (date.getMinutes() + "").padStart(2, "0"),
      (date.getSeconds() + "").padStart(2, "0")
    ];
    switch (type) {
      case 'yyyy-mm-dd':
        // 毫秒转化成 yyyy-mm-dd格式
        return `${year}-${month}-${day}`;
      case 'yyyy-mm':
        return `${year}年${month}月`
      case 'mm-dd':
        // 毫秒转化成 mm月dd日格式
        return `${month}月${day}日`
      default:
        // 毫秒转化成 yyyy-mm-dd hh.ss.mm格式
        return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    }
  },
  toDays(value) {
    if (value) return `${Math.ceil(value / (24 * 60 * 60 * 1000))}天`
    
  },
  mixZero(time) {
    if (+time < 10) {
      return '0' + time
    } else {
      return time
    }
  },

}

export default filters