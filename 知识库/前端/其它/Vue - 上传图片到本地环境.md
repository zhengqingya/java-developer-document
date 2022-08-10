# Vue - 上传图片到本地,url保存到后台数据库中

```vue
<el-form-item label="图片:" prop="pictureUrl">
  <el-upload action="" :http-request="uploadPictureFile"
             :limit="1"
             :file-list="fileList"
             list-type="picture"
             :on-preview="handlePreview"
             :on-remove="handleRemove">
    <el-button size="small" type="primary">点击上传</el-button>
    <div class="el-upload__tip" slot="tip" style="color: #99a9bf">只能上传一张图片哦</div>
  </el-upload>
</el-form-item>

<script>
  export default {
    data() {
      return {
        fileList: [],//图片信息
      }
    },
    methods: {
      // 上传图片
      uploadPictureFile (param) {
        let form = new FormData()
        form.append('file', param.file)
        form.append('dir', 'temp1')
        // 暂时先上传到本地
        uploadPicture(
            form,
            {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
          ).then(res => {
          this.form.pictureUrl = res.data;//将上传图片后返回的图片信息赋值给pictureUrl，随后传到后台数据库中
        }).catch(res => {
          console.log('上传错误')
          this.$message.info("上传错误:"+res.data);
        });
      },
      // 处理图片 - 移除照片时触发
      handleRemove(file, fileList) {
        console.log(file, fileList);
        this.$message.info("移除图片成功！");
      },
      // 处理图片 - 点击文件列表中已上传的图片时的钩子
      handlePreview(file) {
        console.log(file);
        this.$message.info("点击图片...");
      },
      // 回显
      handleDetail(row) {
        this.fileList = [];
        this.form = Object.assign({}, row)
        this.fileList[0] = eval("("+row.pictureUrl+")");//将后台返回的图片信息赋值给fileList数组第一个值
        this.dialogStatus = 'detail'
        this.dialogVisible = true
      }
    }
  }
</script>
```
js上传图片到后端地址
```javascript
export function uploadPicture(form) {
  return request({
    url: '/system/pollutantSource/uploadPicture',
    method: 'post',
    data: form
  })
}
```

```java
@RequestMapping(value = "/uploadPicture", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
@ResponseBody
@ApiOperation(value = "上传图片", httpMethod = "POST", response = ApiResult.class, notes = "上传图片")
public ApiResult uploadPicture(@RequestParam(required = false) String dir, @RequestParam(required = false) MultipartFile file) {
    System.out.println("hello------------------------------上传文件");
    try {
//            System.out.println("upload start = " + System.currentTimeMillis());
        FileList path = pollutantSourceService.uploadFile(file, dir);
//            System.out.println("upload end = " + System.currentTimeMillis());
//            System.out.println("图片名："+videoUrl);
        return ApiResult.ok("上传图片成功", path);
    } catch (Exception e) {
        return ApiResult.ok("上传图片失败", e.getMessage());
    }
}

@Data
public class FileList {
    /**
     * 前端vue中 图片名
     */
    private String name;
    /**
     * 前端vue中 图片地址
     */
    private String url;
}

@Override
public FileList uploadFile(MultipartFile file, String resSort) throws Exception{
    String shortPath =  file.getOriginalFilename();
    //获取项目根目录：System.getProperty("user.dir")
    File dest = new File(System.getProperty("user.dir") + "\\images", shortPath);
    if (!dest.getParentFile().exists()) {
        boolean rel = dest.getParentFile().mkdirs();
        if (!rel) {
            throw new Exception("文件夹创建失败");
        }
    }
    InputStream is = file.getInputStream();
    OutputStream os = new FileOutputStream(dest);
    try {
        byte[] buffer = new byte[8 * 1024];
        int bytesRead;
        while ((bytesRead = is.read(buffer)) != -1) {
            os.write(buffer, 0, bytesRead);
        }
    } catch (Exception e) {
        throw e;
    } finally {
        if (is != null) {
            is.close();
        }
        if (os != null) {
            os.close();
        }
    }
    FileList list = new FileList();
    list.setName(shortPath);
    list.setUrl(System.getProperty("user.dir") + "\\images\\" + shortPath);
    return list;
}
```



### 方式二：上传头像系列
```vue
<el-form-item label="头像:" prop="avatar">
    <el-upload
      action=""
      :http-request="uploadPictureFile"
      class="avatar-uploader"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <img v-if="fileUrl" :src="fileUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
</el-form-item>

<script>
  export default {
    data() {
      return {
         fileUrl: undefined, // 头像信息
      }
    },
    methods: {
       // 上传头像
      uploadPictureFile(param) {
      const form = new FormData()
      form.append('file', param.file)
      form.append('type', 'image')
      // 暂时先上传到本地
      uploadAvatar(
          form,
          {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
          }
          ).then(res => {
            this.fileUrl = res.data.url
            this.form.avatar = res.data.url// 将上传头像后返回的头像信息赋值给avatar，随后传到后台数据库中
          }).catch(res => {
            console.log('上传错误')
            this.$message.info('上传错误:' + res.data)
          })
      },
      handleAvatarSuccess(res, file) {
       this.form.avatar = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;
        // 进行图片匹配
        var imgList = ['image/jpeg', 'image/png'];
        var result = imgList.some(function (item) {
          return item === file.type;
        });
        if (!result) {
          this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return result && isLt2M;
      },
      // 回显
      handleDetail(row) {
        this.fileUrl = undefined;
        this.form = Object.assign({}, row)
        this.fileUrl = this.form.avatar
        this.dialogStatus = 'detail'
        this.dialogVisible = true
      }
    }
  }
</script>
```
