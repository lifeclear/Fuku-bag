// // 引入SDK核心类
// var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
 
// // 实例化API核心类
// var qqmapsdk = new QQMapWX({
//     key: 'JTPBZ-6AFK6-MTASH-E24LJ-RSNSH-F5BUB'
// });
// Page({
//     data: {
//         srcLat: '起点经度',
//         srcLng: '起点纬度',
//         dstLat: '终点经度',
//         dstLng: '起点纬度',
//         latitude: '',
//         longitude: ''
//     },
//     onLoad() {
//         var _this = this;
//         //调用距离计算接口
//         qqmapsdk.direction({
//             mode: 'driving',//可选值：'driving'（驾车）、'walking'（步行）、'bicycling'（骑行），不填默认：'driving',可不填
//       //from参数不填默认当前地址
//           from: {
//               latitude: _this.data.srcLat,
//               longitude: _this.data.srcLng
//           },
//           to: {
//               latitude: _this.data.dstLat,
//               longitude: _this.data.dstLng
//           }, 
//           success: function (res) {
//               console.log(res);
//               var ret = res;
//               var coors = ret.result.routes[0].polyline, pl = [];
//               //坐标解压（返回的点串坐标，通过前向差分进行压缩）
//               var kr = 1000000;
//               for (var i = 2; i < coors.length; i++) {
//                   coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
//               }
//               //将解压后的坐标放入点串数组pl中
//               for (var i = 0; i < coors.length; i += 2) {
//                   pl.push({ latitude: coors[i], longitude: coors[i + 1] })
//               }
//               console.log(pl)
//               //设置polyline属性，将路线显示出来,将解压坐标第一个数据作为起点
//               _this.setData({
//                   latitude:pl[0].latitude,
//                   longitude:pl[0].longitude,
//                   polyline: [{
//                       points: pl,
//                       color: '#FF0000DD',
//                       width: 4
//                   }]
//                })
//           },
//           fail: function (error) {
//               console.error(error);
//           },
//           complete: function (res) {
//               console.log(res);
//            }
//        });
        
//     }
// })    
// 引入SDK核心类
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
 
// 实例化API核心类
var qqmapsdk = new QQMapWX({
    key: 'JTPBZ-6AFK6-MTASH-E24LJ-RSNSH-F5BUB' // 必填
});
 
Page({
  data:{
    //默认经纬度
    distance:[],
    name: '',
    address: '',
    latitude:26.05248089096305,
    longitude:119.19106543064117,
    latitude_t:'',
    longitude_t:'',
  },
  onShow(e){
    var that=this
    wx.getLocation({
      type:"gcj02",
      // altitude: 'altitude',
      success(res){
        console.log(res)
        that.setData({
          latitude:res.latitude,
          longitude:res.longitude,
        })
        // wx.openLocation({
        //   latitude: res.latitude,
        //   longitude: res.longitude,
        //   // name:"长沙理工大学",
        //   scale: 18
        // })
      }
    })
  },
  formSubmit(e) {
    // console.log(this.data.latitude,this.data.longitude)
    var _this = this;
    var f_latitudde=String(this.data.latitude)
    var f_longitude=String(this.data.longitude)
    var t_latitude=String(this.data.latitude_t)
    var t_longitude=String(this.data.longitude_t)
    //console.log(f_latitudde+','+f_longitude)
    //调用距离计算接口
    qqmapsdk.direction({
      mode: 'walking',//可选值：'driving'（驾车）、'walking'（步行）、'bicycling'（骑行），不填默认：'driving',可不填
      //from参数不填默认当前地址
      from: f_latitudde+','+f_longitude,
      to: t_latitude+','+t_longitude, 
      success: function (res) {
        console.log(res);
        var ret = res;
        var coors = ret.result.routes[0].polyline, pl = [];
        //坐标解压（返回的点串坐标，通过前向差分进行压缩）
        var kr = 1000000;
        for (var i = 2; i < coors.length; i++) {
          coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
        }
        //将解压后的坐标放入点串数组pl中
        for (var i = 0; i < coors.length; i += 2) {
          pl.push({ latitude: coors[i], longitude: coors[i + 1] })
        }
        console.log(pl)
        //设置polyline属性，将路线显示出来,将解压坐标第一个数据作为起点
        _this.setData({
          latitude:pl[0].latitude,
          longitude:pl[0].longitude,
          polyline: [{
            points: pl,
            color: '#FF0000DD',
            width: 4
          }]
        })
      },
      fail: function (error) {
        console.error(error);
      },
      complete: function (res) {
        console.log(res);
      }
    });
    qqmapsdk.calculateDistance({
      //mode: 'driving',//可选值：'driving'（驾车）、'walking'（步行），不填默认：'walking',可不填
      //from参数不填默认当前地址
      //获取表单提交的经纬度并设置from和to参数（示例为string格式）
      from: f_latitudde+','+f_longitude, //若起点有数据则采用起点坐标，若为空默认当前地址
      to: t_latitude+','+t_longitude, //终点坐标
      success: function(res) {//成功后的回调
        console.log(res);
        var res = res.result;
        var dis = [];
        for (var i = 0; i < res.elements.length; i++) {
          dis.push(res.elements[i].distance); //将返回数据存入dis数组，
        }
        _this.setData({ //设置并更新distance数据
          distance: dis
        });
      },
      fail: function(error) {
        console.error(error);
      },
      complete: function(res) {
        console.log(res);
      }
  });
},
  getLocation: function () {
    var _this = this;
    wx.chooseLocation({
      success: function (res) {
        var name = res.name
        var address = res.address
        var latitude = res.latitude
        var longitude = res.longitude
        _this.setData({
          name: name,
          address: address,
          latitude_t: latitude,
          longitude_t: longitude
        })
      },
      complete(r){
        console.log(r)
        console.log(222)
      }
    })
  },
  // fetchAgainLocation() {
  //   let that = this
  //   wx.getSetting({
  //     success: (res) => {
  //       var statu = res.authSetting;
  //       if (!statu['scope.userLocation']) {
  //         wx.showModal({
  //           title: '是否授权当前位置',
  //           content: '需要获取您的地理位置，请确认授权，否则地图功能将无法使用',
  //           success: (tip) => {
  //             if (tip.confirm) {
  //               wx.openSetting({
  //                 success: (data) => {
  //                   if (data.authSetting["scope.userLocation"] === true) {
  //                     wx.showToast({
  //                       title: '授权成功',
  //                       icon: 'success',
  //                       duration: 1000
  //                     })
  //                     wx.chooseLocation({
  //                       success: res => {
  //                         console.log('打开地图选择确定', res)
  //                       }
  //                     })
  //                   } else {
  //                     wx.showToast({
  //                       title: '授权失败',
  //                       icon: 'success',
  //                       duration: 1000
  //                     })
  //                   }
  //                 },
  //                 fail: () => {},
  //                 complete: () => {}
  //               });
  //             }
  //           }
  //         })
  //       }
  //     },
  //     fail: ()=>{},
  //     complete: ()=>{}
  //   })
  // },
  openlocation(){
    wx.openLocation({
      latitude:this.data.latitude_t,	//维度
      longitude: this.data.longitude_t, //经度
      name: this.data.name,	//目的地定位名称
      scale: 15,	//缩放比例
      address: this.data.name	//导航详细地址
    })
  },
  address(e){
    qqmapsdk.geocoder({
      address: e.detail.value,   //用户输入的地址（注：地址中请包含城市名称，否则会影响解析效果），如：'北京市海淀区彩和坊路海淀西大街74号'
      complete: res => {
           console.log(res.result.location);   //经纬度对象
          } ,
          // else{
          //     console.log('无法定位到该地址，请确认地址信息！');
          // }
  })
  }
})

