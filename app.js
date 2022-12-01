// app.js
App({
  globalData:{
    Token:"",
    userid:'',
    userInfo: null
  },
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var that=this
    // 登录
    wx.showLoading({
      title: '加载中',
    })
    wx.login({
      success: res => {
        //console.log(res.code)
        wx.request({
          url:'https://www.web4j.top/api/wechatLogin/'+res.code, //必填，其他的都可以不填
          data:{  
          },
          // header:{  
          //   'content-type':'application/json',
          // },
          method:'GET',
          // dataType:'JSON',
          // responseType:'text',
          success(res){
            var userid=res.data.item.user.id;
            //console.log(res.data)
            var token=res.data.item.token;
            that.globalData.userid=userid;
            that.globalData.Token=token
            console.log('success');
            //console.log(userid,token)
            //console.log(that.globalData.Token)
            wx.hideLoading({
              success: (res) => {},
            })
            if(that.userInfoCallback&&typeof that.userInfoCallback=='function'){
              that.userInfoCallback()
            }
            // wx.showToast({
            //   title: '发布成功',
            //   icon: 'success',
            //   duration: 1000//持续的时间
            //   });
            //   setTimeout(()=>{wx.reLaunch({
            //     url: 'test?id=1'
            //     })
            //   },600 );
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
  },
  // globalData: {
  //   userInfo: null
  // }
})
