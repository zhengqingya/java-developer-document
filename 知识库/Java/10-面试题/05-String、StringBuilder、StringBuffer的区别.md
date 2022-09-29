### String、StringBuilder、StringBuffer的区别？

`答`：

1. 运行速度 ：StringBuilder > StringBuffer > String
   原因：String为字符串常量，String对象一旦创建之后该对象是不可更改的。
   Java中对String对象进行的操作实际上是一个不断创建新的对象并且将旧的对象回收的一个过程，所以执行速度很慢。
   StringBuilder和StringBuffer的对象是变量，对变量进行操作就是直接对该对象进行更改，而不进行创建和回收的操作，所以速度要比String快很多。
2. 在线程安全上，StringBuilder是线程不安全的，而StringBuffer是线程安全的
3. String：适用于少量的字符串操作的情况
   StringBuilder：适用于单线程下在字符缓冲区进行大量操作的情况
   StringBuffer：适用多线程下在字符缓冲区进行大量操作的情况 
