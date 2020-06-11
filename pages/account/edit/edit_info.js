// pages/account/edit/edit_info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: null,
    user_type: null,
    can_edit: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;
    that.setData({
      user: wx.getStorageSync('user')
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  get_check_username: function (event) {
    let that = this;
    var username = event.detail.value;
    if (username == null || username == '') {
      return
    }
    if (username == wx.getStorageSync('user').username) { //与当前用户名一致,直接通过校验
      this.setData({
        username: username,
        can_edit: true
      })
      return
    }
    //检查用户名是否可用
    //向后端发送请求
    wx.request({ //使用ajax请求服务
      url: wx.getStorageSync('host') + "/" + wx.getStorageSync('user_type') + "/check/" + username + "/1", //url
      method: 'GET', //请求方式
      header: {
        'Content-Type': 'application/json',
      },
      data: {},
      success: function (res) {
        if (res.data.status == 200) {
          var useable = res.data.data;
          if (!useable) {
            wx.showToast({
              title: '该用户名已被使用',
              icon: 'none'
            });
            that.setData({
              can_edit: false,
            })
            return false;
          } else {
            that.setData({
              username: username,
              can_edit: true
            })
          }

        }
      },
      fail: function () {
        // app.consoleLog("请求数据失败");
      },
      complete: function () {
        // complete 
      }
    })

  },

  check_phone: function (e) {
    // console.log(e.detail.value);
    var phone = e.detail.value;
    if (phone == '' || phone == null) {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none'
      })
      return false;
    }
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!myreg.test(phone)) {
      this.setData({
        can_edit: false
      });
      wx.showToast({
        title: '手机号有误！',
        icon: 'none',
        duration: 1500
      })
      return false;
    }
    this.setData({
      can_edit: true,
      phone: phone
    });
    return true;
  },

  editinfo: function () {
    let that = this;
    var id = wx.getStorageSync('user').id;
    var username = that.data.username;
    var phone = that.data.phone;

    if (username == null || phone == null) {
      wx.showToast({
        title: '请完整填写信息！',
        icon: 'none',
        duration: 1500
      });
      return false;
    }
    if (username == '' || phone == '') {
      wx.showToast({
        title: '请完整填写信息！',
        icon: 'none',
        duration: 1500
      });
      return false;
    }
    //修改
    //向后端发送请求
    wx.request({ //使用ajax请求服务
      url: wx.getStorageSync('host') + "/" + wx.getStorageSync('user_type') + "/update/" + id, //url
      method: 'POST', //请求方式
      header: {
        'Content-Type': 'application/json',
      },
      data: {
        "username": username,
        "phone": phone
      },
      success: function (res) {
        if (res.data.status == 200) {
          wx.request({  //查询修改之后的用户信息
            url: wx.getStorageSync('host') + "/" + wx.getStorageSync('user_type') + "/get/" + id,
            method: 'GET',
            success: function (res) {
              if (res.data.status == 200) {
                wx.setStorage({
                  key: 'user',
                  data: res.data.data,
                });
              }
            }
          });
          wx.showToast({
            title: '修改成功',
            icon: 'success',
            success: function () {
              setTimeout(function () {
                wx.switchTab({
                  url: '/pages/account/account',
                })
              }, 1000)
            }
          })

        } else {
          wx.showToast({
            title: '修改失败,请稍后重试',
            icon: 'none'
          })
        }

      },
      fail: function () {
        // app.consoleLog("请求数据失败");
      },
      complete: function () {
        // complete 
      }
    })
  },

  cancel: function () {
    wx.switchTab({
      url: '/pages/account/account',
    })
  },


});