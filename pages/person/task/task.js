Page({

    /**
     * 页面的初始数据
     */
    data: {
      chooseIncome:true,
      chooseExpenditure:false,
      name:"",
      yaoqiu:"",
      money:"",
      beizhu:"",
      list:{}
    },
    onShow(){
        const that = this;
        wx.request({
          url:'http://43.142.99.39:99/errand/findPage', //必填，其他的都可以不填
          data:{  
                recipientId:"1"
             },
           header:{  
               'content-type':'application/json',
                'Access-Token':'1'
             },
           method:'post',dataType:'JSON',responseType:'text', 
            success:function(res){
            console.log(res.data);
             console.log(res.data.item)
            let tmp = JSON.parse(res.data);
            let records = tmp.item.page.records
            console.log(tmp);
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
    onDel:function(event){
        let id = event.currentTarget.dataset.id;
        console.log(id)
       console.log("???",event.currentTarget.dataset);
       wx.request({
        url:'http://43.142.99.39:99/errand/delete/'+id, //必填，其他的都可以不填

        data:{  
            id:id
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
    Income:function(){
      wx.clearStorage(),
      this.setData({
        chooseIncome:true,
        chooseExpenditure:false,
      })
    },
    Expenditure:function(){
      wx.clearStorage(),
      this.setData({
        chooseIncome:false,
        chooseExpenditure:true,
      })
    }
  })
  