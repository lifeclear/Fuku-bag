//获取应用实例
Page({
    data: {
  
        name:"",
        img:"",
        isshow:true,
        userInfo:''
      },
    
      onLoad(){
          
        //获取本地缓存
        let user=wx.getStorageSync('user')
        console.log("进入小程序的index页面获取缓存",user)
        this.setData({
            userInfo:user
        })
    },
    //授权登录
    login(){
        wx.login({
          success: (res) => {
            const that = this;
            wx.request({
              url:'http://43.142.99.39:99/api/wechatLogin', //必填，其他的都可以不填
                  
              data:{  
                
                    code:res.code
                
            },
            header:{  
               'content-type':'application/json',
               'Access-Token':'1'
            },
            method:'get',dataType:'JSON',responseType:'text', 
            success:function(res){
                console.log(res.data);
         console.log(res.data.item)
           let tmp = JSON.parse(res.data);
           let records = tmp.item.page.records
           console.log(tmp);
           //console.log(tmp.item.page.records);
                that.setData({
                    list:records,
                
                })
                console.log("aaa",that.data.list);
            },
            fail:function(){  
                console.log('fail')
            },
            complete:function(){   
                 console.log('complete')   
            }
          })
          },
        })
        wx.getUserProfile({
            desc:'必须授权后才能继续使用',
            success:res=>{
                let user=res.userInfo
                //设置本地缓存,把用户信息缓存到本地
                wx.setStorageSync('user',user)
                console.log('用户信息',user)
                this.setData({
                    userInfo:user
                })
            }
        })
    },
    //退出登录
    loginOut(){
        this.setData({
            userInfo:''
        })
        wx.setStorageSync('user',null)
    },


    goTo1:function(){
      wx.navigateTo({
        url: '../task/task',
      })
    },
    goTo2:function(){
        wx.navigateTo({
          url: '../vote/vote',
        })
      },
      goTo3:function(){
        wx.navigateTo({
          url: '../message/message',
        })
      },
      goTo4:function(){
        wx.navigateTo({
          url: '../setting/setting',
        })
      },
      goTo5:function(){
        wx.navigateTo({
          url: '../help/help',
        })
      },
      goTo6:function(){
        wx.navigateTo({
          url: '../shop/shop',
        })
      },
  })

