// pages/repair/orderform/comment/comment.js
Page({

  /**
  * 页面的初始数据
  * 满分为5星
  */
  data: { 
    star: 0,//点亮的星星数
    star_g: 5,//没有点亮的星星数
    desc: ['', '很不满意', '不满意', '一般', '满意', '非常满意'],
    level:0,
    oid:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var oid = options.ID;
    this.setData({
      oid: oid
    })
  },

  /**
   * 选择评价星级
   */
  in_xin: function (e) {
    var in_xin = e.currentTarget.dataset.in;
    // console.log(e.currentTarget.dataset.in);
    // console.log(e.currentTarget);
    var star;
    if (in_xin == 'star') {
      star = Number(e.currentTarget.id)
    } else {
      star = Number(e.currentTarget.id) + this.data.star
    }
    this.setData({
      level: star,
      star: star,
      star_g: 5 - star
    })
  },

  /**
   * 提交评价
   */
  formSubmit:function(e){
    let that = this;
    var details = e.detail.value.details;
    var level = that.data.level;

    //向后端发送请求
    wx.request({
      url: wx.getStorageSync('host') + "/comment/create/" + that.data.oid,
      method: 'POST',
      data: {
        'details': details,
        'level': level
      },
      success: function (res) {
        if (res.data.status == 200) {
          wx.showToast({
            title: '评价成功!',
            icon: 'success',
            success: function () {
              setTimeout(function () {
                wx.switchTab({
                  url: '/pages/orderform/orderform'
                })
              }, 1000)
            }
          });

        } else {
          wx.showToast({
            title: '评价失败\n请稍后重试',
            icon: 'success'
          })
        }
      }
    })


  }

})