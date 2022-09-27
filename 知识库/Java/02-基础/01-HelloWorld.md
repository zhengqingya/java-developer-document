### `Hello.java`

```java
public class Hello {

    public static void main(String[] args) {
        System.out.println("HelloWorld!");
    }

}
```

### 如何运行一个Java文件？

```shell
# javac: 编译生成Hello.class字节码文件
javac -encoding utf-8 Hello.java
# java: 运行.class文件 -- 不要带.class后缀
java Hello
```

![HelloWorld.png](images/HelloWorld.png)