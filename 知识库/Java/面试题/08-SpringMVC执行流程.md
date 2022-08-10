### SpringMVC 执行流程？

`答`：

1. 用户向服务器发送请求，请求被Spring 前端控制Servelt DispatcherServlet捕获(捕获)
2.
DispatcherServlet对请求URL进行解析，得到请求资源标识符（URI）。然后根据该URI，调用HandlerMapping获得该Handler配置的所有相关的对象（包括Handler对象以及Handler对象对应的拦截器），最后以HandlerExecutionChain对象的形式返回；(
查找handler)
3. DispatcherServlet 根据获得的Handler，选择一个合适的HandlerAdapter。 提取Request中的模型数据，填充Handler入参，开始执行Handler（Controller),
   Handler执行完成后，向DispatcherServlet 返回一个ModelAndView对象(执行handler)
4. DispatcherServlet 根据返回的ModelAndView，选择一个适合的ViewResolver（必须是已经注册到Spring容器中的ViewResolver) (选择ViewResolver)
5. 通过ViewResolver 结合Model和View，来渲染视图,DispatcherServlet 将渲染结果返回给客户端。（渲染返回）
