// pages/addgroup/addgroup.js
var app=getApp()
// const token=app.globalData.Token;
// const user=app.globalData.user;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token:'',
    group:{
      groupname:'',
      description:''
    },
    max: 250, //最多字数 (根据自己需求改变) 
    currentWordNumber:0,
  },
  inputs: function (e) {
    // 获取输入框的内容
    var value = e.detail.value;
    // 获取输入框内容的长度
    var len = parseInt(value.length);
    this.setData({
      currentWordNumber: len //当前字数  
    });
  },
  submit:function(event){
    // console.log('hello')
    var token=this.data.token
    const {detail} = event;
    var groupname=detail.values.groupname
    var description=detail.values.description
    // console.log(name,description)
    // console.log(detail.values)
    // console.log('hello')
    if (!groupname || !description) {
      wx.showToast({
        title: '不能为空！',
        icon: 'error',
        duration: 1000,
      })
    }
    else{
      wx.request({
      url:'https://www.web4j.top/group/insert', //必填，其他的都可以不填
      data:{  
        title:groupname,
        description:description
      },
      header:{  
         'content-type':'application/json',
         'Access-Token':token
      },
      method:'post',  
      dataType:'JSON',  
      responseType:'text', 
      success(res){
        console.log(res.data);
        wx.showToast({
          title: '发布成功',
          icon: 'success',
          duration: 1000//持续的时间
          });
          setTimeout(()=>{wx.reLaunch({
            url: 'addgroup?id=1'
            })
          },600 );
      },
      fail(){  
          console.log('fail')
      },
      complete(){   
          console.log('complete')   
      }
    })
  }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.lin.initValidateForm(this)
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