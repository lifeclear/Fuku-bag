// pages/watch/watch.js
Page({
  _previewImg: function (e) {
    var currentImg = e.currentTarget.dataset.url;
    var tempArr = [];
    tempArr = e.currentTarget.dataset.urls;
    wx.previewImage({
      current: currentImg, // 当前显示图片的http链接 String
      urls: tempArr // 需要预览的图片http链接列表 Array
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    watchData: [{
        id: 1,
        url: "https://img.alicdn.com/imgextra/i1/738790163/O1CN01hvCVV21D4h970Plt2_!!0-saturn_solar.jpg_240x240xz.jpg_.webp",
        urls: [
          "https://img.alicdn.com/imgextra/i3/2206840659250/O1CN01cSGVrK2ICYBbcKkZ5_!!2206840659250.jpg_430x430q90.jpg",
          "https://img.alicdn.com/imgextra/i2/2206840659250/O1CN01ExT7GW2ICYC5LGVMG_!!2206840659250.jpg_430x430q90.jpg",
          "https://img.alicdn.com/imgextra/i3/2206840659250/O1CN01saVX4U2ICYBaTOMfU_!!2206840659250.jpg_430x430q90.jpg"
        ],
        brand: "卡地亚",
      introduce: "",
      price: 7988,
      newprice: 5699
      },
      {
        id: 2,
        url: "https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i4/1985007071/O1CN01B9d2Xt226Z9v4eUAK_!!1985007071.jpg_430x430q90.jpg",
        urls: [
          "https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i4/1985007071/O1CN01B9d2Xt226Z9v4eUAK_!!1985007071.jpg_430x430q90.jpg",
          "https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i2/1985007071/O1CN01WrKRkK226Z9lzvChL_!!1985007071.jpg_430x430q90.jpg",
          "https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i1/1985007071/O1CN01C0DwPz226Z9nYE196_!!1985007071.jpg_430x430q90.jpg",
          "https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i2/1985007071/O1CN01sux8uu226Z5sVg2gL_!!1985007071.jpg_430x430q90.jpg"
        ],
        brand: "罗宾",
        introduce: "",
        price: 3988,
        newprice: 1399
      },
      {
        id: 3,
        url: "https://img.alicdn.com/imgextra/https://img.alicdn.com/bao/uploaded/i2/632846530/O1CN01P70gIa1y6mtj5Bqvc_!!632846530.jpg_430x430q90.jpg",
        urls: [
          "https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i4/632846530/O1CN01QPS9gt1y6mtmeaa2m_!!632846530.jpg_430x430q90.jpg",
          "https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i2/632846530/O1CN01TGkU971y6mtoHLB1y_!!632846530.jpg_430x430q90.jpg",
          "https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i2/632846530/O1CN01uVpbe11y6mtliiVT9_!!632846530.jpg_430x430q90.jpg",
          "https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i4/632846530/O1CN01fE6zvS1y6mtlLPYuB_!!632846530.jpg_430x430q90.jpg"
        ],
        brand: "飞亚达",
        introduce: "指针",
        price: 6988,
        newprice: 2080
      },
      {
        id: 4,
        url: "https://gd3.alicdn.com/imgextra/i3/1087294774/O1CN01cEwzwz1l8XNcPMh8t_!!1087294774.png_400x400.jpg",
        urls: [
          "https://gd1.alicdn.com/imgextra/i1/2208527172/O1CN0187IQHI22qp8DevuRc_!!2208527172.jpg_400x400.jpg",
          "https://gd1.alicdn.com/imgextra/i1/2208527172/O1CN01MtUdUb22qp8D7E97C_!!2208527172.jpg_400x400.jpg",
          "https://gd2.alicdn.com/imgextra/i2/2208527172/O1CN01xCUyn622qp8COsWI5_!!2208527172.jpg"
        ],
        brand: "梭伦",
        introduce: "",
        price:5688,
        newprice:3860
      }
    ]
  }
})
