# AutoCut

> https://github.com/mli/autocut

通过字幕来剪切视频

### 安装

```shell
pip install git+https://github.com/mli/autocut.git
```

### 使用

```shell
autocut -d 2022-12-14
```

![img.png](images/autocut-01.png)

等待一会儿之后会生成如下文件

![img.png](images/autocut-02.png)

- xxx.mov
- xxx.srt
- xxx.md
- autocut.md

勾选需要的语句之后再勾选`Mark if you are done editing.` 即可自动剪辑出新的视频`xxx_cut.mp4`
![img.png](images/autocut-03.png)
![img.png](images/autocut-04.png)
