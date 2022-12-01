// app.ts

App({
  
  globalData: {
      List_reward:{},
      List_vote:{},
      List_goods:{}
  },
  onLaunch() {
    /*      ORIGIN      */
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    })
     /*      ORIGIN      */
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
        that.globalData.List_reward = records;
        console.log("rewards列表请求成功:",that.globalData.List_reward)

    },
    fail:function(res){  
        console.log(res)
    },
    complete:function(){   
         console.log('rewards complete')   
    }
    }),
    /*悬赏的request END*/
    /*投票的request START*/
    wx.request({
    url:'http://43.142.99.39:99/vote/findPage', //必填，其他的都可以不填
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
      that.globalData.List_vote = records;
      console.log("vote列表请求成功过",that.globalData.List_vote)
  },
  fail:function(res){  
      console.log(res)
  },
  complete:function(){   
       console.log('vote complete')   
  }
    })
    /*投票的request END*/
    /*商品的request START*/
    wx.request({
        url:'http://43.142.99.39:99/idle-goods/findPage', //必填，其他的都可以不填
        data:{  
      },
      header:{  
         'content-type':'application/json',
         'Access-Token':'1'
      },
      method:'post',dataType:'JSON',responseType:'text', 
      success: (res) =>{
          let tmp = JSON.parse(res.data);
          let records = tmp.item.page.records;
          that.globalData.List_goods = records;
          console.log("shop列表请求成功：",that.globalData.List_goods);
      },
      fail:function(){  
          console.log('fail')
      },
      complete:function(){   
           console.log('complete')   
      }
    
    })
    /*商品的request END*/
  }
})




  