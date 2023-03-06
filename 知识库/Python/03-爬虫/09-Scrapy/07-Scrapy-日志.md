# Scrapy 日志

### 修改`settings.py`配置文件

```
# 在当前目录里创建logging输出文件的文件名
LOG_FILE = "app.log"
# log的最低级别
#           CRITICAL: 严重错误
#           ERROR: 一般错误
#           WARNING: 警告信息
#           INFO: 一般信息
#           DEBUG: 调试信息（默认级别）
LOG_LEVEL = "INFO"
```