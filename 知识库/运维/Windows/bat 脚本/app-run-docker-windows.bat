@REM 《批处理脚本》

@REM `@echo on`:显示每一步执行命令的返回结果 `@echo off`:不显示
@echo on

@REM 允许变量延迟扩展，在for等语句中用%a%语法读取变量一直是初始值 ，即使你在里面改变了变量的值 ，变量延迟扩展用!a! 感叹号代替百分号读取变量，取出的是变量的实时值
setlocal enabledelayedexpansion


REM -------------------------------------------------------------------------------


@REM 设置变量
set APP_NAME=small-tools-api
set APP_IMAGE_NAME=registry.cn-hangzhou.aliyuncs.com/zhengqing/small-tools-api
set APP_IMAGE=registry.cn-hangzhou.aliyuncs.com/zhengqing/small-tools-api:latest
set APP_PROFILE=dev
set APP_PORT_GATEWAY=1218
set APP_PORT_SYSTEM=20010
set APP_PORT_BASIC=20020
set APP_PORT_TOOL=20030
set APP_PORT_REMOTE=50001



echo "delete-container"
for /f "tokens=1" %%i in ('docker ps -a ^| findstr "%APP_NAME%"') do @docker stop %%i
for /f "tokens=1" %%i in ('docker ps -a ^| findstr "%APP_NAME%"') do @docker rm %%i


echo "delete-image"
for /f "tokens=3" %%i in ('docker images ^| findstr "%APP_NAME%"') do @docker rmi %%i



echo "build-image"
cd docker
docker build -t %APP_IMAGE% .



echo "run"
docker run -d -e PROFILE=%APP_PROFILE% -p %APP_PORT_GATEWAY%:%APP_PORT_GATEWAY% -p %APP_PORT_SYSTEM%:%APP_PORT_SYSTEM% -p %APP_PORT_BASIC%:%APP_PORT_BASIC% -p %APP_PORT_TOOL%:%APP_PORT_TOOL% --restart=always --name %APP_NAME% %APP_IMAGE%


echo "push-image"
REM pause
REM docker push %APP_IMAGE%
