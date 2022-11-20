var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
      task:"",
      status:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
      console.log(options.id+10000000000)
      console.log(typeof(app.globalData.List_reward));
      for(let data of app.globalData.List_reward)
          if(data.id==options.id)
          {
              this.setData({
                 task:data
              })
              break;
          }   
  },
  onBack(){
    wx.redirectTo({
      url:"../../reward/reward/reward",
      success:function(){
        console.log("成功地从悬赏详情页跳回到悬赏列表页面")
      },
      fail:function(res){
        console.log("失败地从悬赏详情页跳回到悬赏列表页面\n报错原因如下：\n")
        console.log(res)
      },
      complete:function(){
        console.log("完成了从悬赏详情页跳回到悬赏列表页面")
      }
    })
  },
  onAccept(){
    this.setData({
      status:1
    })
  },
  onCancel(){
    this.setData({
      status:0
    })
  }
})