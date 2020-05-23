// pages/maintainer/orderform/done/done.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oid:null,
    maintain_image: null,
    parts: null,
    filelist: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.ID);
    this.setData({oid: options.ID});
  },


  get_parts: function (event) {
    var parts = event.detail.value;
    if (parts == null || parts == '') {
      this.setData({ parts: '本次维修未使用配件' })
    } else {
      this.setData({ parts: parts })
    }

  },


  afterRead(event) {  //上传图片
    let that = this;

    const { file } = event.detail;


    /**
        * 上传完成后把文件上传到服务器
        */

    //上传文件
    wx.uploadFile({
      url: wx.getStorageSync('UploadUrl'),
      filePath: file.path,
      name: 'uploadIMG',
      header: {
        "Content-sort": "multipart/form-data"
      },
      success: function (res) {
        // 上传完成需要更新 fileList
        const { fileList = [] } = that.data;
        fileList.push({ ...file, url: JSON.parse(res.data).data });
        that.setData({ fileList });
        that.setData({
          'maintain_image': JSON.parse(res.data).data
        });

      },
      fail: function (res) {
        wx.showModal({
          title: '错误提示',
          content: '上传图片失败',
          showCancel: false,
          success: function (res) { }
        })
      }
    });
  },

  deleteIMG: function () {
    this.setData({ fileList: [] })
  },



  done:function(){
    let that = this;

    wx.request({  //完善维修图片路径
      url: wx.getStorageSync('host') + "/orderform/after/" + that.data.oid,
      method: 'PUT',
      data: {
        'maintain_image': that.data.maintain_image
      }
    })

   
    wx.request({ //报送配件
      url: wx.getStorageSync('host') + "/orderform/parts/" + that.data.oid,
      method: 'PUT',
      data: {
        'parts': this.data.parts
      },
      success: function (res) {
        if (res.data.status == 200) {
          wx.showToast({
            title: '提交成功!',
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
            title: res.data.msg,
            icon: 'none'
          });
        }
      }
    })
  },





  uploadIMG: function () {
    let that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizesort: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourcesort: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: res => {
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 1000
        })
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePath = res.tempFilePaths[0];
        that.setData({
          tempFilePath: tempFilePath
        });

        /**
         * 上传完成后把文件上传到服务器
         */

        //上传文件
        wx.uploadFile({
          url: wx.getStorageSync('UploadUrl'),
          filePath: tempFilePath,
          name: 'uploadIMG',
          header: {
            "Content-sort": "multipart/form-data"
          },
          success: function (res) {
            that.setData({ 'maintain_image': JSON.parse(res.data).data });
            wx.request({  //完善维修图片路径
              url: wx.getStorageSync('host') + "/orderform/after/"+that.data.oid,
              method: 'PUT',
              data:{
                'maintain_image': that.data.maintain_image
              }
            })
            wx.hideToast();
          },
          fail: function (res) {
            wx.hideToast();
            wx.showModal({
              title: '错误提示',
              content: '上传图片失败',
              showCancel: false,
              success: function (res) { }
            })
          }
        });


      }
    })
  },


  /**
   * 报送配件,以及更新工单状态
   */
  formSubmit: function (e) {
    var form = e.detail.value;
    // console.log(form);
    let that = this;
    var parts = form.parts;
   
    //向后端发送请求
    wx.request({ 
      url: wx.getStorageSync('host') + "/orderform/parts/" + that.data.oid,
      method: 'PUT',
      data: {
        'parts': parts
      },
      success: function (res) {
        if (res.data.status == 200) {
          wx.showToast({
            title: '提交成功!',
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
            title: res.data.msg,
            icon: 'none'
          });
        }
      }
    })

  },
  
})