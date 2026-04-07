var t = {
  name: "c_presale",
  cnName: "预售活动",
  viewConfig: {
    title: "展示模板:",
    type: 0,
    typeTips: "",
    text: "多图滑动",
    list: [{
      name: "",
      time: ""
    }]
  },
  bgColor: {
    title: "模块背景：",
    type: 0,
    text: "图片填充",
    list: [{
      label: "图片填充",
      value: "0"
    }, {
      label: "颜色填充",
      value: "1"
    }],
    url: "",
    color: [{
      item: "red"
    }],
    default: [{
      item: "#fff"
    }]
  },
  activityListConfig: {
    maxList: 10,
    list: [JSON.parse(JSON.stringify({
      info: [{
        title: "活动名称：",
        isShowFlag: !0,
        key: "title",
        value: "",
        label: "",
        tips: "请选择活动名称",
        max: 12,
        options: []
      }, {
        title: "活动时间：",
        isShowFlag: !0,
        key: "title",
        value: "",
        tips: "请输入活动时间"
      }]
    }))]
  }
};
exports.defaultPresaleData = t;