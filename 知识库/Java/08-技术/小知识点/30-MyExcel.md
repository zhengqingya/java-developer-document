# MyExcel

MyExcel，全新的excel操作方式！

- https://github.com/liaochong/myexcel

Myexcel 是一个可以导入、导出和加密 excel 的工具包。

---

优点：

- 可生成任意复合表现形式：本工具使用代用单元格方式进行excel绘制制，可生成任复合度excel，自适应广度、高度；
- 零学习成本：使用html作模板，学习成本几乎为零；
- 支持常用于背景色、边框、字体等样式设置：工具参见文档-样式支持部分；
- 支持.xls、.xlsx、.csv：支持生成.xls、.xlsx后的Excel及.csv文件；
- 支持公式导出：支持Excel模板中设置公式，降低服务端的计算量；
- 支持低内存SXSSF模型：支持低内存的SXSSF模型，可利用极低的内存生成.xlsx；
- 支持生产者消费者模型导出：支持生产者消费者模型导出，无需一次获取所有数据，分批获取数据配合SXSSF模型式实现真意上海量数据导出；
- 支持多种模板引擎：已内置Freemarker、Groovy、Beetl、Thymeleaf等常用模板引擎Excel构建器（详情参见文档入门），推荐使用Beetl模型板引引擎（Beetl文档）；
- 提供默认Excel构建器，直接输出简单Excel：无需编写任何html，已设置默认模板，可直接根据POJO数据列表输出；
- 支持一次生成多张表：以表作单元，支持一份excel文档中多张导出；
- 支持Excel容量设置：支持设置Excel容量，到达容量后自动新建Excel，可构建zip压缩包导出；
