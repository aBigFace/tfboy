exports.defaultModuleSpacingData = {
  name: "c_moduleSpacing",
  cnName: "模块间距",
  type: 1,
  bgcColor: "",
  moduleStyle: {
    title: "模块背景：",
    type: "",
    list: [{
      text: "白色",
      val: "#fff",
      type: 0
    }, {
      text: "背景色",
      val: "#f5f5f5",
      type: 1
    }, {
      text: "自定义",
      val: "custom",
      type: 2
    }]
  },
  modulebgcColor: {
    default: [{
      item: "#999999"
    }],
    color: [{
      item: "#999999"
    }]
  },
  mbConfig: {
    title: "间距大小：",
    val: 20,
    min: 0,
    max: 300
  },
  id: "15245"
};