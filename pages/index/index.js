const app = getApp();
var task_list = app.globalData.List_reward;
var vote_list = app.globalData.List_vote;
var goods_list = app.globalData.List_shop;
console.log("检测来自app数据（悬赏）：",task_list);
console.log("检测来自app数据（投票）：",vote_list);
console.log("检测来自app数据（货品）：",goods_list);
Page({
  data: {
    // 轮播图部分 START
    imgUrls : [
        'https://cdn.pixabay.com/photo/2022/07/13/16/25/cat-7319589_1280.jpg',
        'https://cdn.pixabay.com/photo/2022/10/05/05/40/sunset-7499759_1280.jpg',
        'https://cdn.pixabay.com/photo/2022/11/06/06/25/icing-7573324_1280.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 2000,         //滑动动画时长
    inputVal: "",
    showIndex: 0,
    // 轮播图部分结束

    // 悬赏列表部分开始
    List_reward:{},
    // 悬赏列表部分结束
    
    // 投票列表部分开始
    List_vote:{},
    // 投票列表部分结束

    // 淘货列表部分开始
    List_goods:{},
    // 淘货列表部分结束
},
  onShow(){
      const that = this;
      //异步获取信息
      setTimeout(function(){     
         that.setData({
             List_reward:app.globalData.List_reward,
             List_vote:app.globalData.List_vote,
             List_goods:app.globalData.List_goods,
    })},350);
;
      console.log("check",app.globalData.List_goods,this.data.List_goods);
  },


  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs',
    })
  },
  onChangeIndex:function(event){
      console.log(event.currentTarget.dataset.index);
      let index = event.currentTarget.dataset.index;
      this.setData({
          showIndex : index
      })  
  }
  ,
  onLoad() {
    // @ts-ignore
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  onRewardDetail(event) {
      var id = event.currentTarget.dataset.id;
      wx.redirectTo({
        url:"../reward/detail/detail?id="+id,
        success:function(){
          console.log("已经成功跳转到第"+id+"号悬赏任务")
        },
        fail:function(res){
          console.log(res)
        },
        complete:function(){
          console.log("完成跳转")
        }
      })
  },
  onVoteDetail(event){
    var id = event.currentTarget.dataset.id;
    wx.redirectTo({
      url:"../vote/detail/detail?id="+id,
      success:function(){
        console.log("已经成功跳转到第"+id+"号投票")
      },
      fail:function(res){
        console.log("投票跳转失败,失败信息如下：",res)
      },
      complete:function(){
        console.log("完成投票跳转")
      }
    })
  },
  onGoodsDetail(event){
    var id = event.currentTarget.dataset.id;
    wx.redirectTo({
      url:"../shop/detail/detail?id="+id,
      success:function(){
        console.log("已经成功跳转到第"+id+"号货物")
      },
      fail:function(res){
        console.log("货物跳转失败,失败信息如下：",res)
      },
      complete:function(){
        console.log("完成货物跳转")
      }
    })
  },
  getUserProfile() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
