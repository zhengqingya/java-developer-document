# maven-mvnd

- https://github.com/apache/maven-mvnd

maven-mvnd是Apache Maven团队借鉴了Gradle和Takari后衍生出的更快的构建工具。mvnd内嵌了Maven，也正是因为这个原因我们可以无缝地将Maven切换为mvnd（也不需要单独安装Maven）。

在设计上，在mvnd中会生成一个或多个的守护进程来服务构建请求以此来达到并行构建的效果。另外在VM的选择上，mvnd使用了GraalVM来代替传统的JVM，与之相比GraalVM启动速度更快，占用的内存更少。

根据文档描述，与传统的Maven相比mvnd具有以下优势：

- 运行构建的JVM不需要为每个构建重新启动。
- Maven插件类的类加载器缓存在多个构建中，插件jars只会被读取和解析一次。
- JVM中JIT生成的本机代码会被保留。与Maven相比，JIT编译花费的时间更少。在重复构建期间，JIT优化的代码立即可用。这不仅适用于来自Maven插件和Maven内核的代码，也适用于来自JDK本身的所有代码。

默认情况下，mvnd使用多个CPU内核并行构建模块。使用的内核数由公式Math.max(Runtime.getRuntime().availableProcessors() - 1, 1)
给出。如果您的源代码树不支持并行构建，请在命令行上传递-T1以使您的构建串行。

