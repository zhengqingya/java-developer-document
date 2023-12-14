# 性能测试工具 - sysbench

https://github.com/akopytov/sysbench

一款开源的多线程性能测试工具，可以执行CPU/内存/线程/IO/数据库等方面的性能测试。

### 一、安装

#### Linux

```shell
curl -s https://packagecloud.io/install/repositories/akopytov/sysbench/script.rpm.sh | sudo bash
sudo yum -y install sysbench
sysbench --version

# 默认脚本路径  /usr/share/sysbench
```

#### Mac

```shell
# Add --with-postgresql if you need PostgreSQL support
brew install sysbench
```

### 二、使用

```shell
# 查看相关指令
sysbench --help
# 查看文件IO测试
sysbench fileio help
```

```
Usage:
  sysbench [options]... [testname] [command]

Commands implemented by most tests: prepare run cleanup help
*command部分有4类：prepare run cleanup和help：
    prepare：准备数据的命令。例如，在sysbench压力测试之前，需要先准备好测试库、测试表以及测试表中的数据。
    run：表示进行压力测试。
    cleanup：清除测试时产生的数据。
    help：输出给定lua脚本的帮助信息。

General options: //普通功能
  --threads=N                      指定线程数 [1]
  --events=N                       事件总数的限制 [0]
  --time=N                           限制总执行时间(以秒为单位)[10]
  --warmup-time=N             在启用统计信息运行实际基准测试之前，在禁用统计信息的情况下执行事件这么长时间 [0]
  --forced-shutdown=STRING       强制关闭或禁用“off”之前，在—时间限制之后等待的秒数 [off]
  --thread-stack-size=SIZE        每个线程的堆栈大小 [64K]
  --thread-init-timeout=N         等待工作线程初始化的时间(以秒为单位) [30]
  --rate=N                        		平均事务率。0表示不限制[0]
  --report-interval=N             以秒为单位定期报告中间统计信息。0禁用间隔报告 [0]
  --report-checkpoints=[LIST,...] 转储完整的统计信息，并在指定的时间点重置所有计数器。参数是一个逗号分隔的值列表，表示从测试开始到必须执行报表检查点所花费的时间(以秒为单位)。默认情况下，报表检查点是关闭的。 []
  --debug[=on|off]                打印更多调试信息 [off]
  --validate[=on|off]              在可能的情况下执行验证检查[off]
  --help[=on|off]                    打印帮助并退出 [off]
  --version[=on|off]                打印版本并退出[off]
  --config-file=FILENAME      包含命令行选项的文件
  --luajit-cmd=STRING           执行LuaJIT控制命令。这个选项相当于“luajit -j”。有关更多信息，请参见LuaJIT文档

Pseudo-Random Numbers Generator options: //伪随机数生成器选项
  --rand-type=STRING   随机数分布{均匀，高斯，special，帕累托，zipfian}默认使用 [special]
  --rand-seed=N             种子为随机数发生器。当为0时，将当前时间用作RNG种子。 [0]
  --rand-spec-iter=N      特殊分布的迭代次数[12]
  --rand-spec-pct=N     “特殊”值落在特殊分布中的整个范围的百分比[1]
  --rand-spec-res=N    	用于特殊分布的“特殊”值的百分比 [75]
  --rand-pareto-h=N     形状参数为帕累托分布[0.2]
  --rand-zipfian-exp=N Zipfian分布的形状 参数 (exponent, theta)  [0.8]

Log options:  //日志选项
  --verbosity=N verbosity level {5 - debug, 0 - only critical messages}  [3] 冗长级别{5 -调试，0 -只有关键消息}

  --percentile=N       在延迟统计中计算的百分位数(1-100)。使用0的特殊值禁用百分位数计算 [95]
  --histogram[=on|off] 在报表中打印延迟直方图 [off]

General database options: //一般数据库选项

  --db-driver=STRING  指定要使用的数据库驱动程序(“帮助”获取可用驱动程序列表) [mysql]
  --db-ps-mode=STRING 语句使用模式 {auto, disable} [auto]
  --db-debug[=on|off] 打印特定于数据库的调试信息 [off]


Compiled-in database drivers:  //对数据库驱动程序
  mysql - MySQL driver

mysql options:
  --mysql-host=[LIST,...]          MySQL服务器主机[localhost]
  --mysql-port=[LIST,...]          MySQL服务器端口 [3306]
  --mysql-socket=[LIST,...]        MySQL socket
  --mysql-user=STRING              MySQL 用户[sbtest]
  --mysql-password=STRING          MySQL 密码[]
  --mysql-db=STRING                MySQL 数据库名称 [sbtest]
  --mysql-ssl=STRING               SSL模式。这接受与MySQL客户机实用程序中的——ssl-mode选项相同的值。默认情况下禁用 [disabled]
  --mysql-ssl-key=STRING           客户端私钥文件的路径名称
  --mysql-ssl-ca=STRING            CA文件的路径名
  --mysql-ssl-cert=STRING          客户端公钥证书文件的路径名
  --mysql-ssl-cipher=STRING        为SSL连接使用特定的密码 []
  --mysql-compression[=on|off]     如果在客户端库中可用，则使用压缩 [off]
  --mysql-debug[=on|off]           跟踪所有客户机库调用 [off]
  --mysql-ignore-errors=[LIST,...] 要忽略的错误列表，或“全部” [1213,1020,1205]
  --mysql-dry-run[=on|off]         试运行，假设所有MySQL客户端API调用都是成功的，而没有执行它们 [off]

Compiled-in tests: //编译测试
  fileio - 文件 I/O 测试
  cpu - CPU性能测试
  memory - 缓存功能速度测试
  threads - 线程子系统性能测试
  mutex - 互斥锁的性能测试
```

#### CPU测试

```shell
sysbench cpu help
# --cpu-max-prime=N 质数发生器的上限 [10000]
sysbench cpu --cpu-max-prime=2000 run
```

#### 线程测试

```shell
sysbench threads help
# --thread-yields=N 每个请求要执行的收益率数 [1000]
# --thread-locks=N  每个线程的锁数 [8]
sysbench threads --threads=64 --thread-yields=100 --thread-locks=2 run
```

#### 磁盘IO性能测试

```shell
sysbench fileio help
# fileio options:
#  --file-num=N                 代表生成测试文件的数量 [128]
#  --file-block-size=N           在所有IO操作中使用的块大小 [16384]
#  --file-total-size=SIZE        要创建的文件的总大小 [2G]
#  --file-test-mode=STRING       测试模式 {seqwr, seqrewr, seqrd, rndrd, rndwr, rndrw}
#  --file-io-mode=STRING         文件操作模式 {sync,async,mmap} [sync]
#  --file-async-backlog=N        每个线程要排队的异步操作数 [128]
#  --file-extra-flags=[LIST,...] 用于打开文件的附加标志列表 {sync,dsync,direct} []
#  --file-fsync-freq=N           执行fsync()函数的频率。fsync主要是同步磁盘文件，因为可能有系统和磁盘缓冲的关系。 0代表不使用fsync函数。默认值为100。
#  --file-fsync-all[=on|off]     每执行完一次写操作，就执行一次fsync。默认为off。
#  --file-fsync-end[=on|off]     在测试结束时执行fsync函数。默认为on。
#  --file-fsync-mode=STRING      文件同步函数的选择，同样是和API相关的参数，由于多个操作系统对于fdatasync支持不同，因此不建议使用fdatasync。默认为fsync。
#  --file-merged-requests=N      大多情况下，合并可能的IO的请求数，默认为0。
#  --file-rw-ratio=N             测试时的读写比例，默认时为1.5，即可3：2。

# eg: 指定最大创建16个线程，创建的文件总大小为1G，文件读写模式为随机读。
# 准备 -- 在当前目录下创建1G的文件数据
sysbench fileio --threads=16 --file-total-size=1G --file-test-mode=rndrw prepare
# sysbench 1.0.20 (using bundled LuaJIT 2.1.0-beta2)
# 128 files, 8192Kb each, 1024Mb total
# Creating files for the test...
# Extra file open flags: (none)
# Creating file test_file.0
# Creating file test_file.1
# ...
# Creating file test_file.127
# 1073741824 bytes written in 21.24 seconds (48.21 MiB/sec).

# 运行
sysbench fileio --threads=16 --file-total-size=1G --file-test-mode=rndrw run
# 清理 -- 删除生成的文件数据
sysbench fileio --threads=16 --file-total-size=1G --file-test-mode=rndrw cleanup
```

#### MySQL数据库性能测试

```shell
# 参数
#     --mysql-host= MySQL服务器IP
#     --mysql-port= 端口
#     --mysql-user= 账户名
#     --mysql-password= 密码
#     --mysql-db= 数据库名
#     --tables=表数
#     --table-size= 表行数
#     --threads= 进程数
#     --time = 限制测试时长（秒）

# 1、准备数据（prepare） -- tips: 先在数据库中创建test测试库
CREATE DATABASE test;
sysbench /usr/share/sysbench/oltp_common.lua --mysql-host=localhost --mysql-port=3306  --mysql-user=root --mysql-password=root  --mysql-db=test --tables=4 --table-size=1000  --threads=128  prepare

# 2、开始压力测试（run）
# --report-interval=3 每3秒输出一次测试进度报告
# --time=60 测试时长1分钟
# --percentile=99 表示设定采样比例，默认是 95%，即丢弃1%的长请求，在剩余的99%里取最大值
sysbench /usr/share/sysbench/oltp_read_write.lua --mysql-host=localhost --mysql-port=3306  --mysql-user=root --mysql-password=root  --mysql-db=test  --tables=4  --threads=128 --report-interval=3  --time=60 --percentile=99 run

# 3、清理测试时产生的数据（cleanup）
sysbench /usr/share/sysbench/oltp_read_write.lua --mysql-host=localhost --mysql-port=3306  --mysql-user=root --mysql-password=root  --mysql-db=test --tables=4 cleanup
```

压测日志

```shell
sysbench 1.0.20 (using bundled LuaJIT 2.1.0-beta2)

Running the test with following options:
Number of threads: 128 # 测试过程中用到的线程数目
Report intermediate results every 3 second(s) # 每3秒钟输出一次测试报告结果
Initializing random number generator from current time


Initializing worker threads...

Threads started!

# thds 并发线程数
# tps 每秒事务数
# qps 每秒响应请求操作数，也即是最大吞吐能力
# r/w/o:每秒读、每秒写、其它操作
# lat 是延迟，(ms,99%) 是 99% 的查询时间小于或等于该值，单位毫秒
# err/s 每秒错误数
# reconn/s 每秒重试次数
[ 3s ] thds: 128 tps: 108.86 qps: 4585.04 (r/w/o: 3617.30/598.89/368.85) lat (ms,99%): 2632.28 err/s: 108.86 reconn/s: 0.00
[ 6s ] thds: 128 tps: 126.69 qps: 4707.23 (r/w/o: 3644.03/676.80/386.41) lat (ms,99%): 3911.79 err/s: 133.03 reconn/s: 0.00
...
[ 60s ] thds: 128 tps: 125.73 qps: 4602.08 (r/w/o: 3554.53/667.02/380.53) lat (ms,99%): 3706.08 err/s: 129.07 reconn/s: 0.00
SQL statistics:
    queries performed: # 执行的查询
        read:                            220416 # 读总数
        write:                           41803  # 写总数
        other:                           23635  # 其他操作总数(SELECT、INSERT、UPDATE、DELETE之外的操作，例如COMMIT等)
        total:                           285854 # 全部总数
    transactions:                        7891   (130.45 per sec.)   # 总事务数(每秒事务数)
    queries:                             285854 (4725.56 per sec.)  # 总操作数(每秒操作数)
    ignored errors:                      7853   (129.82 per sec.)   # 总忽略错误数(每秒忽略错误次数)
    reconnects:                          0      (0.00 per sec.)     # 总重试次数(每秒重试次数)

General statistics:
    total time:                          60.4888s # 总耗时
    total number of events:              7891     # 总事务数（默认参数下，一个event即一个事务）

Latency (ms):  # 平均延迟   （越低越好）
         min:                                   33.08 # 最小耗时
         avg:                                  978.12 # 平均耗时
         max:                                 7385.98 # 最长耗时
         99th percentile:                     3773.42 # 超过99%执行耗时时间
         sum:                              7718377.79 # 总耗时

Threads fairness: # 并发统计
    events (avg/stddev):           61.6484/6.18 # 平均每个线程执行事件数/标准偏差  （stddev 是标准差，值越小，代表结果越稳定）
    execution time (avg/stddev):   60.2998/0.14 # 平均每个线程执行时间/标准偏差
```


- 双节点(本地盘) 通用型-4核8000MB/200GB
- 单节点(本地盘) 通用型-4核16000MB/200GB

```shell
# sysbench压测结果 （10w表数据）
[ 3s ] thds: 128 tps: 1157.74 qps: 23594.05 (r/w/o: 16585.62/4652.29/2356.14) lat (ms,99%): 287.38 err/s: 1.00 reconn/s: 0.00
[ 6s ] thds: 128 tps: 948.73 qps: 19020.96 (r/w/o: 13317.24/3804.26/1899.46) lat (ms,99%): 277.21 err/s: 0.33 reconn/s: 0.00
[ 9s ] thds: 128 tps: 942.67 qps: 18859.65 (r/w/o: 13208.65/3765.00/1886.00) lat (ms,99%): 272.27 err/s: 0.00 reconn/s: 0.00
```
