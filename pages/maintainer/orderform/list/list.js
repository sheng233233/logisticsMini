//获取应用实例
const app = getApp()
var page = 1;
var isfinish = false; //加载完毕
 
Page({
  data: {
    massage: '',
    orderform_list: [],
    status: null //用于查询工单的状态
  },

  /**
   * 加载时
   */
  onLoad: function(option) {
    // console.log(option.status);
    var status = option.status;
    this.setData({status: status});
    switch (status) {
      case 'allocated':
        {
          this.setData({
            massage: '任务已全部接受',
          })
        }
        break;
      case 'accept':
        {
          this.setData({
            massage: '当前没有维修任务!',
          })
        }
        break;
      case 'all':
        {
          this.setData({
            massage: '维修记录为空!'
          })
        }
        break;
    }

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

  accept: function(e) {
    var ID = e.currentTarget.dataset.id;
    let that = this;
    //向后端发送请求
    wx.request({ //使用ajax请求服务
      url: wx.getStorageSync('host') + "/orderform/receipt/" + ID, //url
      method: 'PUT', //请求方式
      header: {
        'Content-Type': 'application/json',
      },
      data: {},
      success: function (res) {
        if (res.data.status == 200) {
          var list = that.data.orderform_list;
          var new_list = [];
          for (var i = 0; i < list.length; i++) {
            if (list[i].ID != ID) {
              new_list.push(list[i]);
            }
          }
          that.setData({
            orderform_list: new_list
          })
          wx.showToast({
            title: '成功接单!',
            icon: 'success'
          })
         

        } else {
          wx.showToast({
            title: '接单失败\n请稍后重试',
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


  },
})

/**
 * 加载数据
 */
function loadmore(that) {

  //向后端发送请求
  wx.request({ //使用ajax请求服务
    url: wx.getStorageSync('host') + "/orderform/getByStatus/" + wx.getStorageSync('user').id + "/" + that.data.status, //url
    method: 'GET', //请求方式
    header: {
      'Content-Type': 'application/json',
    },
    data: {},
    success: function(res) {

      if (res.data.status == 200) {

        var data = res.data.data;
        var orderform_list = [];
        for (var i = 0; i < data.length; i++) {
          // console.log(data[i]);
          if (data[i].status == "审核通过,未接单") {
            data[i] = {
              'ID': data[i].ID,
              'location': data[i].location,
              'status': data[i].status,
              'description': data[i].description,
              'repair_date': data[i].repair_date,
              'can_accept': true,
              'hidden': false
            }
          } else {
            data[i] = {
              'ID': data[i].ID,
              'location': data[i].location,
              'status': data[i].status,
              'description': data[i].description,
              'repair_date': data[i].repair_date,
              'can_accept': false,
              'hidden': false
            }
          }
          orderform_list.push(data[i])

        }
        // console.log(orderform_list)






        that.setData({
          orderform_list: orderform_list
        });

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






  // if (orderform_result.status == 200) {
  //   // console.log(orderform_result.data);
  //   var data = orderform_result.data;
  //   wx.hideLoading();
  //   if (data.length > 0) {
  //     var orderform_list = that.data.orderform_list;
  //     for (var i = 0; i < data.length; i++) {
  //       orderform_list.push(data[i]);
  //     }
  //     that.setData({ orderform_list: orderform_list });
  //     page++;
  //   } else {
  //     isfinish = true;
  //   }
  //   wx.stopPullDownRefresh();
  // }
}