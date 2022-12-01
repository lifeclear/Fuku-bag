// pages/showgroup/showgroup.js
var app=getApp()
// const token=app.globalData.Token;
// const user=app.globalData.user;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token:'',
    lock:false,
    currentIndex:0,
    groupId:'',
    name:"今日福袋",
    description:"是否你也会在人潮拥挤的街头，寻寻觅觅，期盼相遇在夕阳斜斜的乌衣巷口。",
    roll_call:[
    //   name:"荞麦花",
    //   roll:"11-24",
    //   id:1
    // },{
    //   name:"萤火虫",
    //   roll:"11-30",
    //   id:2
    // },{
    //   name:"爬山虎",
    //   roll:"12-3",
    //   id:3
    // }
    ],
    prodCode:'',
    supplier:'',
    indexstatus:-1,//默认显示
    // dialogid:'',
    hideModal:true, //模态框的状态  true-隐藏  false-显示
    animationData:{},//
  },
  Addrc(event){
    var groupId=this.data.groupId
    console.log(groupId)
    this.setData({
      currentIndex:1
    })
    wx.navigateTo({
      url: '../add_roll_call/add_roll_call?groupId='+groupId
    })
    // console.log('hello')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(event) {
    let groupId=event.groupId
    var that=this
    console.log(groupId)
    this.setData({
      groupId:groupId
    })
    //此时需要判断全局数据是否获取到
	  //如果已经获取到，则直接使用
	  if(app.globalData.Token){
      console.log(app.globalData.Token)
		  //如果此处的逻辑较多可以提炼为一个函数
		  that.setData({
			  token:app.globalData.Token
      })
      var token=that.data.token
      wx.request({
        url: 'https://www.web4j.top/group/select/'+groupId,
        data:{
        },
        method:'GET',
        header:{
          'content-type':'application/json',
          'Access-Token':token
        },
        success(res){
          var group=res.data.item.group
          console.log(res.data.item.group)
          that.setData({
            name:group.title,
            description:group.description
          }),
          wx.request({
            url: 'https://www.web4j.top/attendance-task/findPage',
            data:{
              groupId:groupId
            },
            method:"POST",
            header:{
              'content-type':'application/json',
              'Access-Token':token
            },
            success(res){
              var records=res.data.item.page.records
              console.log(res.data.item.page.records)
              that.setData({
                roll_call:records
              })
            },
            fail(){
              console.log('fail')
            },
            complete(){
              console.log("complete")
            }
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
			  	token:app.globalData.Token
        })
        
        var token=that.data.token
        console.log(token)
        wx.request({
          url: 'https://www.web4j.top/group/select/'+groupId,
          data:{
          },
          method:'GET',
          header:{
            'content-type':'application/json',
            'Access-Token':token
          },
          success(res){
            var group=res.data.item.group
            console.log(res.data.item.group)
            that.setData({
              name:group.title,
              description:group.description
            }),
            wx.request({
              url: 'https://www.web4j.top/attendance-task/findPage',
              data:{
                groupId:groupId
              },
              method:"POST",
              header:{
                'content-type':'application/json',
                'Access-Token':token
              },
              success(res){
                var records=res.data.item.page.records
                console.log(res.data.item.page.records)
                that.setData({
                  roll_call:records
                })
              },
              fail(){
                console.log('fail')
              },
              complete(){
                console.log("complete")
              }
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
  //访问晚点名任务
  Roll_call(event){
    if (this.data.lock) {
      return;
    }
    var groupId=this.data.groupId
    const id=event.currentTarget.dataset.id
    console.log(id,groupId)
    wx.navigateTo({
      url: "../roll_call_details/roll_call_details?id="+id+'&groupId='+groupId,
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
    var token=this.data.token
    const id=e.currentTarget.dataset.id
    var groupId=this.data.groupId
    console.log(id)
    wx.request({
      url: 'https://www.web4j.top/attendance-task/delete/'+id,
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
          setTimeout(()=>{
            // wx.reLaunch({
            // url: 'showgroup?id=1'
            // })
            wx.navigateTo({
              url: "../showgroup/showgroup?groupId="+groupId,
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