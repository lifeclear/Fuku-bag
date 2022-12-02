// pages/face-recognition/face-recognition.js
var app=getApp()
// const token=app.globalData.Token;
// const user=app.globalData.user;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token:'',
    src:'https://gss0.baidu.com/-Po3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/902397dda144ad34ea5205bdd3a20cf431ad851f.jpg',
    flag_c:0,
    flag_f:1,
    flag_s:0,
    photo:''
  },
  showcamera(){
    this.setData({
      flag_c:1,
      flag_f:0,
      flag_s:1
    })
  },
  takePhoto() {
    var token=this.data.token
    // console.log(token)
    var that=this
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        var path=res.tempImagePath
        this.setData({
          src: res.tempImagePath,
          flag_c:0
        })
        // console.log(path)
        wx.uploadFile({
          url: 'https://www.web4j.top/api/upload',
          filePath: path,
          name: 'file',
          // header: {
          //   "Content-Type": 'application/text',
          //   // 'accept': 'application/json',
          // },
          // formData: {
          //   'filename': 'img', //参数名
          //   'method':'post'
          // },
          success: (result) => {
            var records=JSON.parse(result.data);
            var filepath=records.item.filePath
            // console.log(result.data);
            console.log(filepath);
            console.log('success');
            this.setData({
              photo:filepath
            })
            wx.request({
              url: 'https://www.web4j.top/face-information/compareFace',
              data:{
                pitcure:filepath
              },
              header:{
                'content-type':'application/json',
                'Access-Token':token
              },
              method:"POST",
              success(res){
                console.log(res)
              },
              fail(){
                console.log('fail')
              }
            })
          },
          fail(){
            console.log('fail');
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    //此时需要判断全局数据是否获取到
	  var that=this
	  //如果已经获取到，则直接使用
	  if(app.globalData.Token){
      console.log(app.globalData.Token)
		  //如果此处的逻辑较多可以提炼为一个函数
		  that.setData({
			  token:app.globalData.Token
		  })
	  }else{
	  //如果还未请求到数据，则创建一个回调函数，等待数据获取完成后调用
		  app.userInfoCallback = res => {
			  that.setData({
			  	token:app.globalData.Token
        })
        console.log(that.data.token)
		  }
	  }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})