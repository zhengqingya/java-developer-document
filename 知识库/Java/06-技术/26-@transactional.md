# @transactional

一个 spring 框架中的注解，用于控制事务行为。当应用程序调用带有该注解的方法时，spring 将开启一个数据库事务，并在方法执行结束后回滚或提交该事务，以确保数据完整性。

### 传播机制

- `propagation_required`：若当前没有事务，则创建一个新事务；否则，加入当前事务。
- `propagation_supports`：支持当前事务；若不存在事务，则不开启新事务。
- `propagation_mandatory`：必须存在当前事务；否则，抛出异常。
- `propagation_requires_new`：每次都开启新事务；若当前存在事务，则将其挂起。
- `propagation_not_supported`：不支持当前事务，即使存在也会被挂起。
- `propagation_never`：不支持当前事务，若存在则抛出异常。
- `propagation_nested`：若当前存在事务，则在一个嵌套的事务内执行；否则，与 propagation_required 相同。

其中，`propagation_required` 是最常用的传播机制，它保证所有操作需要在一个事务中执行，
如果方法调用其他带有 @transactional 注解的方法，将会在同一个事务范围内共享。

当使用多个数据库连接时，可以通过 @transactional(value = "transactionmanager") 指定事务管理器的名字，以确保使用正确的数据库连接。

### @Transactional(rollbackFor = Exception.class)

@Transactional只能回滚RuntimeException和RuntimeException下面的子类抛出的异常 不能回滚Exception异常
如果需要支持回滚Exception异常请用`@Transactional(rollbackFor = Exception.class)`
如果是增删改的时候建议大家都使用`@Transactional(rollbackFor = Exception.class)`

```
@Transactional
public void test_transaction() throws Exception {
    this.userMapper.insert(xxx); // 无法回滚
    if (1 == 1) {
        throw new Exception("报错了...");
    }
}
```

### 失效场景

1. try catch捕获了异常(没有在catch里面手动抛出异常)
2. 不是用public修饰
3. 没有加@Service (也就是没有被 Spring 管理)
4. 只读事务中修改操作： @Transactional 默认是读写模式，在读模式下只支持select语句，对数据库写入操作（insert、update、delete）将抛出异常。
5. 异常被声明为不受事务管理：若某个异常在Dao层抛出时，该异常被声名为不受事务管理，则 Transactional 注释无法拦截并处理这些异常。
6. 异步方法： 在执行异步方法时，@Transactional注解不会在主线程中传播到异步调用的线程中。




