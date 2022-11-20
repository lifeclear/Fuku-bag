// const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileIDlist:[],
    id:"",
    spmc:"",
    yj:"",
    xj:"",
    usernc:"",
    addre:"",
    image:"",
    tempFilePathslist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id
    this.setData({
      id:id
    })
    // db.collection('userpost').doc(id).get().then(
    //   res=>{
    //     //查找发帖人ID
    //     //console.log(res.data._openid)
    //     this.setData({
    //       spmc:res.data.spmc,
    //       yj:res.data.yj,
    //       xj:res.data.xj,
    //       addre:res.data.addre,
    //       fileIDlist:res.data.fileIDlist
    //     }),
    //     db.collection('userinfo').where({
    //       _openid:res.data._openid
    //     }).orderBy('date','desc').limit(1).get().then(res=>{
    //       //console.log(res.data)
    //       this.setData({
    //         usernc:res.data[0].nickname,
    //         addre:res.data[0].addre,
    //         image:res.data[0].image[0]
    //       })
    //     })
    //   })
  },
  listenerButtonPreviewImage: function (e) {
    let index = e.target.dataset.index;
    let that = this;
    wx.previewImage({
      current: that.data.fileIDlist[index],
      urls: that.data.fileIDlist,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})