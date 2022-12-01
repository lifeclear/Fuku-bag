// pages/person/task/task.js
var app=getApp()
// const token=app.globalData.Token;
// const user=app.globalData.user;

Page({
  data: {
    userid:'',
    token:'',
    lock:false,
    show_index:0,
    List_my_sent:[],
    List_my_accept:[],
    sponsorId_local:1,
    recipientId_local:1,
    // user_id:1,
    Ac_id:0,
    Sent_id:0,
    prodCode:'',
    supplier:'',
    indexstatus:-1,//默认显示
    // dialogid:'',
    hideModal:true, //模态框的状态  true-隐藏  false-显示
    animationData:{},//
  },
  onChangeIndex:function(event){
      const id = event.currentTarget.dataset.id;
      this.setData({
          show_index:1-id
      })
  },
  onShow(){
    var that=this
	  //如果已经获取到，则直接使用
	  if(app.globalData.Token){
      console.log(app.globalData.Token,app.globalData.userid)
		  //如果此处的逻辑较多可以提炼为一个函数
		  that.setData({
        token:app.globalData.Token,
        userid:app.globalData.userid
      })
      var token=that.data.token
      var userid=that.data.userid
      wx.request({
        url: 'https://www.web4j.top/group/findPage',
        data:{
        },
        method:"POST",
        header:{
          'content-type':'application/json',
          'Access-Token':token
        },
        success(res){
          var record=res.data.item.page.records
          that.setData({
            List_my_sent:record
          })
        },
        fail(){
          console.log('fail')
        },
        complete(){
          console.log('complete')
        }
      })
      wx.request({
        url: 'http:https://www.web4j.top/group-user/joined/'+userid,
        data:{
        },
        method:"GET",
        header:{
          'content-type':'application/json',
          'Access-Token':token
        },
        success(res){
          // console.log(res.data.item.joined)
          var records=res.data.item.joined
          // console.log(records)
          that.setData({
            List_my_accept:records,
          })
        },
        fail(){
          console.log('fail')
        },
        complete(){
          console.log('complete')
        }
      })
	  }else{
	  //如果还未请求到数据，则创建一个回调函数，等待数据获取完成后调用
		  app.userInfoCallback = res => {
			  that.setData({
          token:app.globalData.Token,
          userid:app.globalData.userid
        })
        
        var token=that.data.token
        var userid=that.data.userid
        wx.request({
          url: 'https://www.web4j.top/group/findPage',
          data:{
          },
          method:"POST",
          header:{
            'content-type':'application/json',
            'Access-Token':token
          },
          success(res){
            var record=res.data.item.page.records
            //console.log(record)
            that.setData({
              List_my_sent:record,
            })
          },
          fail(){
            console.log('fail')
          },
          complete(){
            console.log('complete')
          }
        })
        wx.request({
          url: 'https://www.web4j.top/group-user/joined/'+userid,
          data:{
          },
          method:"GET",
          header:{
            'content-type':'application/json',
            'Access-Token':token
          },
          success(res){
            // console.log(res.data.item.joined)
            var records=res.data.item.joined
            // console.log(records)
            that.setData({
              List_my_accept:records,
            })
          },
          fail(){
            console.log('fail')
          },
          complete(){
            console.log('complete')
          }
        })
		  }
    }
    // console.log(token,'hello')
  },
  onChange_Ac_id:function(res){
      let id = res.currentTarget.dataset.id;
      this.setData({
          Ac_id:id
      })
  },
  onChange_Sent_id:function(res){
      let id = res.currentTarget.dataset.id;
      this.setData({
          Sent_id:id
      })
  },
  Showgroup:function(event){
    if (this.data.lock) {
      return;
    }
    const groupId=event.currentTarget.dataset.id
    console.log(groupId)
    wx.navigateTo({
      url: "../showgroup/showgroup?groupId="+groupId,
    })
  },
  Showgroup_joined(event){
    // if (this.data.lock) {
    //   return;
    // }
    const groupId=event.currentTarget.dataset.id
    console.log(groupId)
    wx.navigateTo({
      url: "../showgroup_joined/showgroup_joined?groupId="+groupId,
    })
  },
  touchend(e){
    that.setData({
      lock:false
    })
  },
  // 显示遮罩层
  showModal: function () {
    var that=this;
    that.setData({
      hideModal:false,
      lock:true
    })
    var animation = wx.createAnimation({
      duration: 100,//动画的持续时间 默认400ms   数值越大，动画越慢   数值越小，动画越快
      timingFunction: 'ease',//动画的效果 默认值是linear
    })
    this.animation = animation 
    setTimeout(function(){
      that.fadeIn();//调用显示动画
    },100)
    
  },

  // 隐藏遮罩层
  hideModal: function () {
    var that=this; 
    var animation = wx.createAnimation({
      duration: 50,//动画的持续时间 默认400ms   数值越大，动画越慢   数值越小，动画越快
      timingFunction: 'ease',//动画的效果 默认值是linear
    })
    this.animation = animation
    that.fadeDown();//调用隐藏动画   
    setTimeout(function(){
      that.setData({
        hideModal:true,
        lock:false
      })      
    },50)//先执行下滑动画，再隐藏模块
    
  },

  //动画集
  fadeIn:function(){
    this.animation.translateY(0).step()
    this.setData({
      animationData: this.animation.export()//动画实例的export方法导出动画数据传递给组件的animation属性
    })    
  },
  fadeDown:function(){
    this.animation.translateY(600).step()
    this.setData({
      animationData: this.animation.export(),  
    })
  }, 
  Returnback(){
    var that=this; 
    var animation = wx.createAnimation({
      duration: 100,//动画的持续时间 默认400ms   数值越大，动画越慢   数值越小，动画越快
      timingFunction: 'ease',//动画的效果 默认值是linear
    })
    this.animation = animation
    that.fadeDown();//调用隐藏动画   
    setTimeout(function(){
      that.setData({
        hideModal:true,
        lock:false
      })      
    },50)//先执行下滑动画，再隐藏模块
  },
  Delete(e){
    const groupId=e.currentTarget.dataset.id
    var token=this.data.token
    console.log(groupId)
    wx.request({
      url: 'https://www.web4j.top/group/delete/'+groupId,
      data:{

      },
      method:'GET',
      header:{
        'content-type':'application/json',
        'Access-Token':token
      },
      success(res){
        console.log(res)
        wx.showToast({
          title: '删除成功',
          icon: 'success',
          duration: 1000//持续的时间
          });
          setTimeout(()=>{wx.reLaunch({
            url: 'my?id=1'
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
})