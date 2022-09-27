### switch

```
switch (表达式) {
    case 值1:
        当表达式结果为值1时执行...
        break;
    case 值2:
        当表达式结果为值2时执行...
        break;
    default:
        当表达式结果不为值1和值2时执行...
        break;
}
```

---

```java
public class Hello {

    public static void main(String[] args) {
        int type = 1;
        switch (type) {
            case 1:
                System.out.println("1");
                break;
            case 2:
                System.out.println("2");
                break;
            default:
                System.out.println("...");
                break;
        }
    }

}
```
