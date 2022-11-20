Page({

    data: {
  
      name:"",
  
      img:"",
  
      isshow:true,
  
    },
  
    login() {
  
      var that=this
  
      wx.getUserProfile({
  
        desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
  
        success: (file) => {
  
          console.log(file.userInfo.nickName)
  
          console.log(file.userInfo.avatarUrl)
  
          that.setData({
  
            img:file.userInfo.avatarUrl,
  
  name:file.userInfo.nickName,
  
  isshow:false,
  
          })
  
     
  
        }
  
      })
  
    },
  
  })
