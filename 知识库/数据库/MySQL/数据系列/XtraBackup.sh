####################################
# @description XtraBackup 定时备份任务
# @params $? => 代表上一个命令执行后的退出状态: 0->成功,1->失败
# @example => sh XtraBackup.sh
# @author zhengqingya
# @date 2022/3/25 15:00
####################################

day=`date +%w`
date=`date +%Y%m%d`
last_day=`date -d '1 days ago' +%Y%m%d`
mysql_user=root
mysql_pwd='root'
mysql_data=/home/mysql_backup/${date}/
mysql_log=/home/mysql_backup/mysql_backup_log_`date +%Y%m%d`.log

case $day in
    1)
        echo "星期一 => 完整备份"
        innobackupex --defaults-file=/etc/my.cnf --host=www.zhengqingya.com --port=3306 --user=root --password='root' --parallel=3 --no-timestamp ${mysql_data}  > ${mysql_log} 2>&1
        ;;
    2)
        # 星期二
        ;;
    3)
        # 星期三
        ;;
    4)
        # 星期四
        ;;
    5)
        echo "星期五 => 完整备份"
        innobackupex --defaults-file=/etc/my.cnf --host=www.zhengqingya.com --port=3306 --user=root --password='root' --parallel=3 --no-timestamp ${mysql_data}  > ${mysql_log} 2>&1
        ;;
    6)
        # 星期六
        ;;
    7)
        # 星期天
        ;;
esac
