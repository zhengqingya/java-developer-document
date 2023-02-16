# DataX - 入门体验

## Quick Start

https://github.com/alibaba/DataX/blob/master/userGuid.md

### 一、运行测试 - Linux

```shell
# 下载DataX工具包
wget https://datax-opensource.oss-cn-hangzhou.aliyuncs.com/202210/datax.tar.gz
# 解压
tar -zxvf datax.tar.gz
# 进入bin目录
cd datax/bin

# 查看python版本
python -V
# Python 2.7.5
# 运行同步作业 -- 自检脚本 -> 用来验证是否安装成功
python datax.py ../job/job.json
```

#### 配置示例：从stream读取数据并打印到控制台

```shell
# 查看配置模板
python datax.py -r streamreader -w streamwriter

# 创建作业的配置文件（json格式）
cat> stream2stream.json <<EOF
{
  "job": {
    "content": [
      {
        "reader": {
          "name": "streamreader",
          "parameter": {
            "sliceRecordCount": 10,
            "column": [
              {
                "type": "long",
                "value": "10"
              },
              {
                "type": "string",
                "value": "hello，你好，世界-DataX"
              }
            ]
          }
        },
        "writer": {
          "name": "streamwriter",
          "parameter": {
            "encoding": "UTF-8",
            "print": true
          }
        }
      }
    ],
    "setting": {
      "speed": {
        "channel": 5
       }
    }
  }
}
EOF


# 启动DataX
python datax.py ./stream2stream.json
# 同步结束，显示日志如下：
# ...
# 2023-02-16 14:14:30.350 [job-0] INFO  JobContainer - PerfTrace not enable!
# 2023-02-16 14:14:30.351 [job-0] INFO  StandAloneJobContainerCommunicator - Total 50 records, 950 bytes | Speed 95B/s, 5 records/s | Error 0 records, 0 bytes |  All Task WaitWriterTime 0.000s |  All Task WaitReaderTime 0.006s | Percentage 100.00%
# 2023-02-16 14:14:30.356 [job-0] INFO  JobContainer - 
# 任务启动时刻                    : 2023-02-16 14:14:20
# 任务结束时刻                    : 2023-02-16 14:14:30
# 任务总计耗时                    :                 10s
# 任务平均流量                    :               95B/s
# 记录写入速度                    :              5rec/s
# 读出记录总数                    :                  50
# 读写失败总数                    :                   0
```

### 二、运行测试 - 本地Windows

```shell
# 下载解压 https://datax-opensource.oss-cn-hangzhou.aliyuncs.com/202210/datax.tar.gz
cd datax/bin
python -V
# Python 3.10.6

# 运行时会出现中文乱码问题，解决：执行如下命令
CHCP 65001

# 运行
python datax.py ../job/job.json
```
