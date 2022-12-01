//js
//引入事先写好的日期设置util.js文件
var datePicker = require('../../utils/dateSetting.js')
 
//设定当前的时间，将其设定为常量
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
Page({
  //与wxml中的数据一一对应，在具体函数中修改time、multiArray、multiIndex等值，进行页面的呈现
  data: {
    areaCode:'请选择库区',
      prodCode:'',
      supplier:'',
      indexstatus:-1,//默认显示
      // dialogid:'',
      hideModal:true, //模态框的状态  true-隐藏  false-显示
      animationData:{},//
      areaList:[
        '是','否'
      ],
    photos:[],
    time: '',
    multiArray: [],
    multiIndex: [0, 0, 0, 0, 0],
    choose_year: "",
    student: {
      name: '',
      age: '',
      address: ''
    },
    lock:false,
  },
  getValueTap(e){
    // console.log(e)
    // console.log(e.currentTarget.dataset.dialogid)
    let dialogid=e.currentTarget.dataset.dialogid;
    // console.log(this.data.areaList[dialogid])//得到衣服
    this.setData({
      areaCode:this.data.areaList[dialogid],//赋值给输入框
      indexstatus: dialogid, //更新
    })
  },
 // 显示遮罩层
 showModal: function () {
    var that=this;
    that.setData({
      hideModal:false
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
      duration: 100,//动画的持续时间 默认400ms   数值越大，动画越慢   数值越小，动画越快
      timingFunction: 'ease',//动画的效果 默认值是linear
    })
    this.animation = animation
    that.fadeDown();//调用隐藏动画   
    setTimeout(function(){
      that.setData({
        hideModal:true
      })      
    },100)//先执行下滑动画，再隐藏模块
    
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
  // submit(event){
  //   console.log('hello')
  //   const {detail} = event;
  //   /*
  //     detail 返回三个参数
  //     1、values: 各表单项的value值
  //     2、errors: 各表单项验证后的返回的错误信息数组
  //     3、isValidate: 表单是否验证通过的boolean值
  //     具体格式示例：
  //     detail = {
  //        values: {
  //            studentName: "",
  //            studentAge: "",
  //            studentAddress: ""
  //        },
  //        errors: {
  //            studentName: [],
  //            studentAge: [],
  //            studentAddress: []
  //        },
  //        isValidate: true
  //     }
  //   */
  // },
 onLoad: function () {
    //wx.lin.initValidateForm(this)
    this.setData({
      multiArray:
        [
          [year , year + 1 , year + 2 ],
          datePicker.determineMonth(),
          datePicker.determineDay(year, month),
          datePicker.determineHour(),
          datePicker.determineMinute()
        ],
    })
  },
  //最后呈现时间的函数。
  bindMultiPickerChange: function (e) {
    //年
    var dateStr = this.data.multiArray[0][this.data.multiIndex[0]] +"-";
    //月
    if(this.data.multiArray[1][this.data.multiIndex[1]]<10)
    {
      dateStr=dateStr+"0"+this.data.multiArray[1][this.data.multiIndex[1]] +"-";
    }
    else{
      dateStr=dateStr+this.data.multiArray[1][this.data.multiIndex[1]] +"-";
    }
    //日
    if(this.data.multiArray[2][this.data.multiIndex[2]]<10)
    {
      dateStr=dateStr+"0"+this.data.multiArray[2][this.data.multiIndex[2]]+" ";
    }
    else{
      dateStr=dateStr+this.data.multiArray[2][this.data.multiIndex[2]]+" ";
    }
    //时
    if(this.data.multiArray[3][this.data.multiIndex[3]]<10)
    {
      dateStr=dateStr+"0"+this.data.multiArray[3][this.data.multiIndex[3]]+":";
    }
    else
    {
      dateStr=dateStr+this.data.multiArray[3][this.data.multiIndex[3]]+":";
    }
    if(this.data.multiArray[4][this.data.multiIndex[4]]<10)
    {
      dateStr=dateStr+"0"+this.data.multiArray[4][this.data.multiIndex[4]];
    }
    else{
      dateStr=dateStr+this.data.multiArray[4][this.data.multiIndex[4]];
    }
    this.setData({
      time: dateStr
    })
  },
  //当时间选择器呈现并进行滚动选择时间时调用该函数。
  bindMultiPickerColumnChange: function (e) {
    //e.detail.column记录哪一行发生改变，e.detail.value记录改变的值（相当于multiIndex）
    switch (e.detail.column) {
      //这里case的值有0/1/2/3/4,但除了需要记录年和月来确定具体的天数外，其他的都可以暂不在switch中处理。
      case 0:
        //记录改变的年的值
        let year = this.data.multiArray[0][e.detail.value];
        this.setData({
          choose_year: year.substring(0, year.length - 1)
        })
        break;
      case 1:
        //根据选择的年与月，确定天数，并改变multiArray中天的具体值
        let month = this.data.multiArray[1][e.detail.value];
        let dayDates = datePicker.determineDay(this.data.choose_year, month.substring(0, month.length - 1));
        //这里需要额外注意，改变page中设定的data，且只要改变data中某一个值，可以采用下面这种方法
        this.setData({
          ['multiArray[2]']: dayDates
        })
        break;
    }
    //同上，上面改变的是二维数组中的某一个一维数组，这个是改变一个一维数组中某一个值，可供参考。
    this.setData({
      ["multiIndex[" + e.detail.column + "]"]: e.detail.value
    })
  },
  Login(){
    wx.login({
    success (res) {
      console.log(res.code)
      // if (res.code) {
      //   //发起网络请求
      //   wx.request({
      //     url: 'https://example.com/onLogin',
      //     data: {
      //       code: res.code
      //     }
      //   })
      // } else {
      //   console.log('登录失败！' + res.errMsg)
      // }
    },
    fail(){
      console.log('fail')
    }
  })
  },
  location(){
    wx.getLocation({
      type:"gcj02",
      // altitude: 'altitude',
      success(res){
        console.log(res)
        // that.setData({
        //   latitude:res.latitude,
        //   longitude:res.longitude,
        // })
        // wx.openLocation({
        //   latitude: res.latitude,
        //   longitude: res.longitude,
        //   // name:"长沙理工大学",
        //   scale: 18
        // })
      }
    })
  },
  onChangeTap(e) {
    console.log(e.detail.current)
    console.log(e.detail.current.url)
    let _this = this;
    for(let i in e.detail.all){
      wx.uploadFile({
        url: 'https://ndk.rioyi.com/index.php/api/article/upload', //接口地址
        filePath: e.detail.all[i].url, //获取到的上传图片路径
        name: 'img', //参数名
        header: {
          "Content-Type": "multipart/form-data",
          'accept': 'application/json',
        },
        formData: {
          'filename': 'img', //参数名
        },
        success:(res)=> {
          console.log('success')
          console.log(res.data)
          // let datas = JSON.parse(res.data);
          // const { fileList } = _this.data;
          // fileList.push({path:'https://ndk.rioyi.com/'+datas.data}); //地址需要拼接
          // _this.setData({ fileList });
        },
        fail(){
          console.log('fail')
        }
      })
    }
  },
  openlocation(){
    wx.openLocation({
      latitude:36.0812917700,	//维度
      longitude: 114.4562530500, //经度
      name: "目的地",	//目的地定位名称
      scale: 15,	//缩放比例
      address: "目的地"	//导航详细地址
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
        hideModal:true
      })      
    },100)//先执行下滑动画，再隐藏模块
  },
  tap: function() {
    //检查锁
    if (this.data.lock) {
      return;
    }
    console.log('触发了 tap')
  },
  // touchend: function() {
  //   if (this.data.lock) {
  //     //开锁
  //     this.setData({ lock: false });
  //   }
  // },
  longtap: function () {
    //锁住
    this.setData({
      lock: true
    });
    console.log('触发了 longtap')
    this.setData({
      lock:false
    })
  }
})