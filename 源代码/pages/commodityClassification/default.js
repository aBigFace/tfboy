exports.defaultProductClassificationData = {
  name: "c_productClassification",
  cnName: "商品分类",
  hierarchyConfig: {
    title: "显示层级：",
    type: 0,
    list: [{
      text: "一级分类",
      val: "one"
    }, {
      text: "二级分类",
      val: "two"
    }, {
      text: "三级分类",
      val: "three"
    }]
  },
  viewConfig: {
    title: "选择样式：",
    type: 0,
    typeValue: {
      one: [{
        text: "样式一",
        val: "one_one"
      }],
      two: [{
        text: "样式一",
        val: "two_one"
      }],
      three: [{
        text: "样式一",
        val: "three_one"
      }]
    }
  },
  shortConfig: {
    title: "商品排序：",
    type: 3,
    list: [{
      text: "默认",
      val: 0
    }, {
      text: "销量",
      val: 1
    }, {
      text: "库存",
      val: 2
    }, {
      text: "商城价",
      val: 3
    }, {
      text: "上架时间",
      val: 4
    }],
    shortType: 0,
    shortTypeList: [{
      text: "升序",
      val: 0
    }, {
      text: "降序",
      val: 1
    }]
  },
  advertisementConfig: {
    title: "展示广告：",
    type: 0,
    showList: [{
      text: "开启",
      val: !0
    }, {
      text: "关闭",
      val: !1
    }],
    detail: {
      img: "",
      tips: "建议尺寸24*24px，大小不超过2MB，图片格式为jpg、jpeg、png、gif",
      link: {
        title: "链接：",
        value: "",
        type: "",
        name: "",
        tips: "请选择链接"
      }
    }
  },
  infoConfig: {
    title: "展示信息：",
    type: ["price", "cart"],
    list: [{
      text: "市场价",
      val: "price"
    }, {
      text: "购物车",
      val: "cart"
    }]
  }
};