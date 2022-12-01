// pages/join-group/join-group.js
var app=getApp()
// const token=app.globalData.Token;
// const user=app.globalData.user;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token:'',
    user:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // this.data.token=token
    // console.log(this.data.token)
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
    //this.data.token=app.globalData.Token
    // console.log(token)
    // if(token){
    //   wx.reLaunch({
    //     url: 'join-group?id=1',
    //   })
    // }else{
    //   console.log(token)
    // }
    // var that=this
    // wx.login({
    //   success: res => {
    //     console.log(res.code)
    //     wx.request({
    //       url:'http://43.142.99.39:99/api/wechatLogin/'+res.code, //必填，其他的都可以不填
    //       data:{  
    //       },
    //       // header:{  
    //       //   'content-type':'application/json',
    //       // },
    //       method:'GET',
    //       // dataType:'JSON',
    //       // responseType:'text',
    //       success(res){
    //         var user=res.data.item.user;
    //         //console.log(res.data)
    //         var token=res.data.item.token;
    //         console.log('success');
    //         console.log(user,token)
    //         that.setData({
    //           token:token,
    //           user:user
    //         })
    //         // wx.showToast({
    //         //   title: '发布成功',
    //         //   icon: 'success',
    //         //   duration: 1000//持续的时间
    //         //   });
    //         //   setTimeout(()=>{wx.reLaunch({
    //         //     url: 'test?id=1'
    //         //     })
    //         //   },600 );
    //       },
    //       fail(){  
    //           console.log('fail')
    //       },
    //       complete(){   
    //           console.log('complete')   
    //       }
    //     })
    //   }
    // })
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

  },
  Join_g:function(data){
    var token=this.data.token
    console.log(token)
    var incvitationcode=data.detail.value.incvitationcode
    wx.request({
      url: 'https://www.web4j.top/group-user/insert',
      data:{
        groupId:incvitationcode
      },
      method:'POST',
      header:{
        'content-type':'application/json',
        'Access-Token':token
      },
      success(res){
        // var attendanceTask=res.data.item.attendanceTask
        // console.log(res.data.item.attendanceTask)
        // that.setData({
        //   name:attendanceTask.title,
        //   description:attendanceTask.description,
        //   startTime:attendanceTask.startTime,
        //   endTime:attendanceTask.endTime
        // })
        console.log(res.data)
        console.log(res.data.success)
        if(res.data.success)
        {
          wx.showToast({
          title: '加入成功',
          icon: 'success',
          duration: 1000//持续的时间
          });
          setTimeout(()=>{wx.reLaunch({
            url: 'join-group?id=1'
            })
          },600 );
        }
        else{
          wx.showToast({
            title: '您已加入该分组',
            icon: 'error',
            duration: 1000//持续的时间
            });
        }
      },
      fail(){
        console.log('fail')
      },
      complete(){
        console.log('complete')
      }
    })
  }
})
//1597588259473465346
//1597840840523259905
//1597839641153642497