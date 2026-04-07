var t = {
  name: "c_imgText",
  cnName: "图文",
  imgConfig: {
    cname: "docStyle",
    title: "图片导角：",
    type: 0,
    list: [{
      text: "直角",
      icon: "square"
    }, {
      text: "圆角",
      icon: "circle"
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
  ihConfig: {
    title: "图片高度：",
    val: 128,
    min: 0,
    max: 200
  },
  widthConfig: {
    title: "图片宽度：",
    val: 128,
    min: 0,
    max: 200
  },
  mbConfig: {
    title: "页面边距：",
    val: 24,
    min: 0,
    max: 100
  },
  tsConfig: {
    title: "选择样式：",
    type: 0,
    list: [{
      text: "样式一",
      val: "modelOne"
    }]
  },
  isShowBtn: {
    title: "按钮：",
    type: 1,
    list: [{
      text: "隐藏",
      val: !1
    }, {
      text: "显示",
      val: !0,
      value: "查看"
    }]
  },
  imgListConfig: {
    maxList: 9,
    list: [JSON.parse(JSON.stringify({
      img: "",
      info: [{
        key: "title",
        title: "标题：",
        value: "",
        tips: "请输入标题名称",
        max: 12
      }, {
        key: "link",
        title: "链接：",
        value: "",
        type: "",
        name: "",
        tips: "请选择链接",
        max: 100
      }]
    }))]
  },
  id: "15241"
};
exports.defaultImgTextData = t;