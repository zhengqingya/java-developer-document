### Optional

Optional类: Java8解决null值判断问题，避免null导致的NPE（NullPointerException）。

```
@Test
public void test_Optional() throws Exception {
    List<Integer> list = null;
    List<Integer> list2 = Optional.ofNullable(list).orElse(Lists.newArrayList());

    User user = User.builder().id(666).build();

    // 方式1：if判断
    int id = 1;
    if (user != null) {
        if (user.getId() != null) {
            id = user.getId();
        }
    }
    System.out.println(id);

    // 方式2：三目运算符
    int id2 = user != null ? (user.getId() != null ? user.getId() : 1) : 1;
    System.out.println(id2);

    // 方式3：Java8-Optional
    int id3 = Optional
            // 里面为空值判断 三目运算符
            .ofNullable(user)
            // 取id值
            .map(User::getId)
            // 如果上面id为空，提供一个默认值
            .orElse(1);
    System.out.println(id3);

    System.out.println("-------------------------");
    user = null;
    Optional.ofNullable(user).ifPresent(e -> {
        // 不为空的时候执行...
        System.out.println(e);
    });

    // 为空的时候抛出异常
    Optional.ofNullable(user).orElseThrow(() -> new Exception("异常了..."));
}
```

