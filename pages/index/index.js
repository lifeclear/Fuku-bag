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
    List:{}
    // 淘货列表部分结束
},
  onShow(){
      const that = this;
      /*悬赏的request START*/
      wx.request({
        url:'http://43.142.99.39:99/errand/findPage', //必填，其他的都可以不填
        data:{  
          },
         header:{  
             'content-type':'application/json',
             'Access-Token':'1'
        },
        method:'post',
        dataType:'JSON',
        responseType:'text', 
        success:function(res){
              let tmp = JSON.parse(res.data);
              let records = tmp.item.page.records;
              that.setData({
                  List_reward:records
              })
              console.log("rewards列表请求成功:",List)
        },
        fail:function(res){  
              console.log(res)
         },
        complete:function(){   
              console.log('rewards complete')   
         }
      })
  },


  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs',
    })
  },
  onChangeIndex:function(event){
      const that = this;
      console.log(event.currentTarget.dataset.index);
      let index = event.currentTarget.dataset.index;
      this.setData({
          showIndex : index
      })  
      let url_part = "errand";

      if(index==1)
        url_part = "vote";
      else if(index==2)
        url_part = "idle-goods";

        wx.request({
            url:'http://43.142.99.39:99/'+url_part+'/findPage', //必填，其他的都可以不填
            data:{  
              },
             header:{  
                 'content-type':'application/json',
                 'Access-Token':'1'
            },
            method:'post',
            dataType:'JSON',
            responseType:'text', 
            success:function(res){
                  let tmp = JSON.parse(res.data);
                  let records = tmp.item.page.records;
                  if(index==0){
                    that.setData({ List_reward:records})
                  }
                  else if(index==1){
                    that.setData({ List_vote:records})
                  }
                  else if(index==2){
                    that.setData({ List_goods:records})
                  }

                  console.log(url_part,"列表请求成功:",that.data.List)
            },
            fail:function(res){  
                  console.log(res)
             },
            complete:function(){   
                  console.log(url_part,' complete')   
             }
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
