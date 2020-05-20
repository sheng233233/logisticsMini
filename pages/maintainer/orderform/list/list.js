//获取应用实例
const app = getApp()
var page = 1;
var isfinish = false; //加载完毕

Page({
  data: {
    title: null,
    orderform_list: [],
    inputShowed: false,
    inputVal: "",
    condition: '',
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
            title: '未接受任务列表'
          })
        }
        break;
      case 'accept':
        {
          this.setData({
            title: '当前任务列表'
          })
        }
        break;
      case 'all':
        {
          this.setData({
            title: '历史工单'
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
    console.log(ID);
    wx.navigateTo({
      url: '../detail/detail?ID=' + ID,
    })
  }
})

/**
 * 加载数据
 */
function loadmore(that) {
  // if (isfinish) return;
  // wx.showLoading({
  //   title: '正在加载中',
  // })



  // var get_data = require('../../../getData/orderform/get_data.js');
  // var orderform_result = get_data.get_maintain_orderform_list(that.data.status);

  //向后端发送请求
  wx.request({ //使用ajax请求服务
    url: wx.getStorageSync('host') + "/orderform/getByStatus/" + wx.getStorageSync('user').id + "/" + that.data.status, //url
    method: 'GET', //请求方式
    header: {
      'Content-Type': 'application/json',
    },
    data: {},
    success: function(res) {
      console.log(res.data)
      if (res.data.status == 200) {
        console.log(res.data.data);
        that.setData({
          orderform_list: res.data.data
        });
        
        isfinish = true;
        wx.stopPullDownRefresh();

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