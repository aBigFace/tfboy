var t = {
  name: "c_search",
  cnName: "搜索",
  imgConfig: {
    cname: "docStyle",
    title: "边框形状：",
    type: 1,
    list: [{
      text: "直角",
      icon: "square"
    }, {
      text: "圆角",
      icon: "fillet"
    }]
  },
  isTopConfig: {
    title: "常驻顶部：",
    type: !0,
    list: [{
      text: "开启",
      val: !0
    }, {
      text: "关闭",
      val: !1
    }]
  },
  searchContainerConfig: {
    title: "搜索内容：",
    type: ["商品"],
    list: [{
      text: "商品",
      val: 1
    }, {
      text: "商户",
      val: 2
    }]
  },
  bgColor: {
    color: [{
      item: "#fff"
    }],
    default: [{
      item: "#fff"
    }],
    title: "背景颜色："
  },
  borderColor: {
    color: [{
      item: "#f2f2f2"
    }],
    default: [{
      item: "#f2f2f2"
    }],
    title: "框体颜色："
  },
  textColor: {
    color: [{
      item: " #BBBBBB"
    }],
    default: [{
      item: " #BBBBBB"
    }],
    title: "字体颜色："
  },
  imgLink: {
    title: "图标:",
    imgUrl: ""
  },
  selectLink: {
    title: "链接",
    linkUrl: "",
    tips: "请选择链接"
  },
  viewConfig: {
    title: "展示模板:",
    type: 0,
    typeTips: "",
    list: [{
      text: "样式一",
      val: "typeOne"
    }, {
      text: "样式二",
      val: "typeTwo"
    }, {
      text: "样式三",
      val: "typeThree"
    }]
  },
  imgListConfig: {
    maxList: 10,
    list: [JSON.parse(JSON.stringify({
      img: "",
      info: [{
        isShowFlag: !0,
        key: "title",
        value: "",
        tips: "请输入提示词",
        max: 12
      }]
    }))]
  },
  id: "15241"
};
exports.defaultSearchData = t;