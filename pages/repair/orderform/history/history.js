//获取应用实例
const app = getApp()
var page = 1;
var isfinish = false; //加载完毕
 
Page({
  data: {
    orderform_list: [],
    inputShowed: false,
    inputVal: "",
    condition: ''
  },
  showInput: function() {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function() {
    this.setData({
      inputVal: "",
      inputShowed: false,
      condition: '',
      orderform_list: []
    });
    page = 1
    loadmore(this)
  },
  clearInput: function() {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function(e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  onPullDownRefresh: function() {
    page = 1;
    isfinish = false;
    this.setData({
      orderform_list: []
    });
    loadmore(this);
  },
  onReachBottom: function() {
    var that = this;
    loadmore(that);
    // console.log(page)
  },
  formSubmit: function(e) {
    // console.log(e.detail.value.condition);
    this.setData({
      condition: e.detail.value.condition
    });
    var that = this
    page = 1
    this.setData({
      orderform_list: []
    })
    loadmore(that)
  },

  onShow: function() {
    this.setData({
      orderform_list: []
    })
    loadmore(this)
  },

  /**
   * 前往详情页
   */
  toDetailByID: function(e) {
    var ID = e.currentTarget.dataset.id;
    // console.log(ID);
    wx.navigateTo({
      url: '../detail/detail?ID=' + ID,
    })
  },

  toDelete: function (e){
    let that = this;
    var ID = e.currentTarget.dataset.id;
    //向后端发送请求
    wx.request({ //使用ajax请求服务
      url: wx.getStorageSync('host') + "/orderform/" + ID, //url
      method: 'DELETE', //请求方式
      header: {
        'Content-Type': 'application/json',
      },
      data: {},
      success: function (res) {
        if (res.data.status == 200) {
          var list = that.data.orderform_list;
          var new_list = [];
          for(var i=0; i<list.length; i++){
            if (list[i].ID != ID){
              new_list.push(list[i]);
            }
          }
          that.setData({
            orderform_list: new_list
          })
          wx.showToast({
            title: '删除成功!',
            icon: 'success',
          });

          // wx.showToast({
          //   title: '删除成功!',
          //   icon: 'success',
          //   success: function () {
          //     setTimeout(function () {
          //       wx.redirectTo({
          //         url: '/pages/repair/orderform/history/history'
          //       })
          //     }, 1000)
          //   }
          // });

        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          });
        }

      },
      fail: function () {
        app.consoleLog("请求数据失败");
      },
      complete: function () {
        // complete 
      }
    })

  }
})

/**
 * 加载数据
 */
function loadmore(that) {
  // console.log(page);
  // if (isfinish) return;
  // wx.showLoading({
  //   title: '正在加载中',
  // })


  //向后端发送请求
  wx.request({ //使用ajax请求服务
    url: wx.getStorageSync('host') + "/orderform/show/" + wx.getStorageSync('user_type') + "/" + wx.getStorageSync('user').id, //url
    method: 'GET', //请求方式
    header: {
      'Content-Type': 'application/json',
    },
    data: {},
    success: function(res) {
      if (res.data.status == 200) {
        // console.log(res.data.data);
        var data=res.data.data;
        var orderform_list = [];
        for (var i = 0; i < data.length; i++) {
          // console.log(data[i]);
          if (data[i].status == "未审核" || data[i].status == "审核未通过"){
            data[i]={ 
              'ID': data[i].ID,
              'location': data[i].location,
              'status': data[i].status,
              'description': data[i].description,
              'repair_date': data[i].repair_date,
              'can_delete': true,
              'hidden': false
              }
          }else{
            data[i]={ 
              'ID': data[i].ID,
              'location': data[i].location,
              'status': data[i].status,
              'description': data[i].description,
              'repair_date': data[i].repair_date,
              'can_delete': false ,
              'hidden': false
              }
          }
          orderform_list.push(data[i])
        
        }
        // console.log(orderform_list)






        that.setData({
          orderform_list: orderform_list
        });

        // // console.log(orderform_result.data);
        //     var data = orderform_result.data;
        //     wx.hideLoading();
        //     if (data.length > 0) {
        //       var orderform_list = that.data.orderform_list;
        //       for (var i = 0; i < data.length; i++) {
        //         orderform_list.push(data[i]);
        //       }
        //       that.setData({ orderform_list: orderform_list });
        //       page++;
        //     } else {
        //       isfinish = true;
        //     }
        // isfinish = true;

      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        });
      }

    },
    fail: function() {
      app.consoleLog("请求数据失败");
    },
    complete: function() {
      // complete 
    }
  })


}