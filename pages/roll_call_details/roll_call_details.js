// pages/roll_call_details/roll_call_details.js
var app=getApp()
// const token=app.globalData.Token;
// const user=app.globalData.user;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    token:'',
    id:'',
    name:"乔麦花",
    description:"乱花渐欲迷人眼，浅草才能莫马蒂。",
    startTime:'',
    endTime:'',
    AllStudent:[
    // {
    //   name:"Jane"
    // },{
    //   name:"Tom"
    // },{
    //   name:"Jack"
    // },{
    //   name:"Xun"
    // }
    ],
    not_yet_Student:[
    // {
    //   name:"Jane"
    // },{
    //   name:"Tom"
    // }
    ],
    Already_Student:[
    //   {
    //   name:"Jack"
    // },{
    //   name:"Xun"
    // }
    ],
    list:[
      {
          pagePath:"/pages/roll_call/roll_call",
          text:"签到",
          iconPath:"https://img.51miz.com/Element/00/18/66/56/165b1c5f_E186656_0d203fad.png",
          selectedIconPath:"https://img.51miz.com/Element/00/18/66/56/165b1c5f_E186656_0d203fad.png"
      }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(e) {
    let id=e.id
    let groupId=e.groupId
    console.log(id,groupId)
    this.setData({
      id:id,
    })
    //此时需要判断全局数据是否获取到
	  var that=this
	  //如果已经获取到，则直接使用
	  if(app.globalData.Token){
      console.log(app.globalData.Token)
		  //如果此处的逻辑较多可以提炼为一个函数
		  that.setData({
			  token:app.globalData.Token
      })
      var token=that.data.token
      wx.request({
        url: 'https://www.web4j.top/attendance-task/select/'+id,
        data:{
  
        },
        method:'GET',
        header:{
          'content-type':'application/json',
          'Access-Token':token
        },
        success(res){
          var attendanceTask=res.data.item.attendanceTask
          console.log(res.data.item.attendanceTask)
          that.setData({
            name:attendanceTask.title,
            description:attendanceTask.description,
            startTime:attendanceTask.startTime,
            endTime:attendanceTask.endTime
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
        url: 'https://www.web4j.top/attendance-task-user/findPage',
        data:{
          taskId:id
        },
        method:'POST',
        header:{
          'content-type':'application/json',
          'Access-Token':token
        },
        success(res){
          var records=res.data.item.page.records
          console.log(records)
          // var users=res.data.item.users
          // console.log(users)
          // that.setData({
          //   AllStudent:records
          // })

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
          url: 'https://www.web4j.top/attendance-task/select/'+id,
          data:{
    
          },
          method:'GET',
          header:{
            'content-type':'application/json',
            'Access-Token':token
          },
          success(res){
            var attendanceTask=res.data.item.attendanceTask
            console.log(res.data.item.attendanceTask)
            that.setData({
              name:attendanceTask.title,
              description:attendanceTask.description,
              startTime:attendanceTask.startTime,
              endTime:attendanceTask.endTime
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
          url: 'https://www.web4j.top/attendance-task-user/findPage',
          data:{
            taskId:id
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
            console.log(res)
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

  }
})