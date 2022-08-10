@REM 《批处理》递归删除指定文件夹

@REM `@echo on`:显示每一步执行命令的返回结果 `@echo off`:不显示
@echo off

echo "start delete target"
REM pause

@REM 允许变量延迟扩展，在for等语句中用%a%语法读取变量一直是初始值 ，即使你在里面改变了变量的值 ，变量延迟扩展用!a! 感叹号代替百分号读取变量，取出的是变量的实时值
setlocal enabledelayedexpansion

@REM 设置需删除的文件夹
set DELETE_FOLDER_TARGET=target

for /r . %%a in (!DELETE_FOLDER_TARGET!) do (
  if exist %%a (
  echo "delete"%%a
  rd /s /q "%%a"
 )
)


echo "start delete .idea and *.iml"
REM pause

rd/s/q .idea
del *.iml /f /s
