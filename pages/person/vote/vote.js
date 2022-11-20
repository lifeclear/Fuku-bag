Page({
    data: {
      chooseIncome:true,
      chooseExpenditure:false,
      List_vote:{}
    },
    onShow(){
        const that = this;
             /*投票的request START*/
            wx.request({
                url:'http://43.142.99.39:99/vote/findPage', //必填，其他的都可以不填
                data:{  
                    userId:"null"
              },
              header:{  
                 'content-type':'application/json',
                 'Access-Token':'1'
              },
              method:'post',
              dataType:'JSON',
              responseType:'text', 
              success:function(res){
                  console.log(res.data);
                  let tmp = JSON.parse(res.data);
                  let records = tmp.item.page.records;
                  console.log(records);
                  that.setData({
                        List_vote:records
                  })
              },
              fail:function(res){  
                  console.log("获取投票失败",res)
              },
              complete:function(){   
                   console.log('vote complete')   
              }
                })
            /*投票的request END*/
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
  