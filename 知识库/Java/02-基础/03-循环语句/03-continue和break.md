### continue

临时跳过，中断本次循环，直接进入下一次循环

```
public class Hello {

    public static void main(String[] args) {
        for (int i = 0; i < 10; i++) {
            if (i == 3) {
                continue;
            }
            System.out.println(i);
        }
    }

}
```

### break

直接结束循环

> 在嵌套循环中，只能作用在所在层循环上，无法对上层循环起作用

```
public class Hello {

    public static void main(String[] args) {
        for (int i = 0; i < 10; i++) {
            if (i == 3) {
                break;
            }
            System.out.println(i);
        }
    }

}
```
