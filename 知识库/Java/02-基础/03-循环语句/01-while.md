### while

只要条件满足会无限循环执行...

```
while (条件) {
    条件满足时执行...
}
```

---

```java
public class Hello {

    public static void main(String[] args) {
        int age = 0;
        while (age <= 18) {
            System.out.println(age);
            age++;
        }
    }

}
```