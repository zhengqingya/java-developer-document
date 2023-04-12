# dstat

一个用来替换 vmstat、iostat、netstat、nfsstat 和 ifstat 这些命令的工具，通用的系统资源统计工具，是一个全能系统信息统计工具。

### 安装

```shell
yum install -y dstat
```

### 使用

参数说明

```shell
dstat [-afv] [options..] [delay [count]]
常用选项
-c：显示CPU系统占用，用户占用，空闲，等待，中断，软件中断等信息。
-C：当有多个CPU时候，此参数可按需分别显示cpu状态，例：-C 0,1 是显示cpu0和cpu1的信息。
-d：显示磁盘读写数据大小。
-D hda,total：include hda and total。
-n：显示网络状态。
-N eth1,total：有多块网卡时，指定要显示的网卡。
-l：显示系统负载情况。
-m：显示内存使用情况。
-g：显示页面使用情况。
-p：显示进程状态。
-s：显示交换分区使用情况。
-S：类似D/N。
-r：I/O请求情况。
-y：系统状态。
--ipc：显示ipc消息队列，信号等信息。
--socket：用来显示tcp udp端口状态。
-a：此为默认选项，等同于-cdngy。
-v：等同于 -pmgdsc -D total。
--output 文件：此选项也比较有用，可以把状态信息以csv的格式重定向到指定的文件中，以便日后查看。例：dstat --output /root/dstat.csv & 此时让程序默默的在后台运行并把结果输出到/root/dstat.csv文件中。
usr：用户空间的程序所占百分比；
sys：系统空间程序所占百分比；
idel：空闲百分比；
wai：等待磁盘I/O所消耗的百分比；
hiq：硬中断次数；
siq：软中断次数；
read：磁盘读带宽
writ：磁盘写带宽
recv：网络收包带宽
send：网络发包带宽
-- 内存分页统计：值较大表明系统正在使用大量的交换空间，通常情况下当系统已经开始用交换空间的时候，就说明你的内存已经不够用了，或者说内存非常分散，理想情况下page in（换入）和page out（换出）的值是0 0。
in： page in（换入）
out：page out（换出）

-- 其他系统信息：这一栏中较高的统计值通常表示大量的进程造成拥塞，需要对CPU进行关注。服务器一般情况下都会运行运行一些程序，所以这项总是显示一些数值。
int：中断次数
csw：上下文切换
```

简单使用

```shell
# CPU
dstat -c
# 统计最耗CPU的进程名和CPU占比
dstat  -t --top-cpu
# 2 50 表示每两秒输出一次结果，共统计50次，若不加此参数，统计结果每间隔一秒持续输出
dstat  -t --top-cpu 2 50

# 内存统计
dstat -t -m

# 网卡
dstat  -tnN ens192,ens224,total

# 磁盘
dstat -tdD sdb,sdc,sdd,sde,total

# IOPS
dstat -r

# IO
dstat -d
```

