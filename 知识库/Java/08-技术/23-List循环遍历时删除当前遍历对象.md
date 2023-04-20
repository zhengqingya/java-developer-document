# List循环遍历时删除当前遍历对象

```java
public class Test {
    public static void main(String args[]) {
        List<String> strList = Lists.newArrayList("a", "b", "c");

        // 方式1：
        Iterator<String> iter = strList.iterator();
        while (iter.hasNext()) {
            String s = iter.next();
            if (s.equals("b")) {
                iter.remove();
            }
        }
        System.out.println(strList); // [a, c]

        // 方式2：forEach
        strList.removeIf(e -> e.equals("c"));
        System.out.println(strList); // [a]
    }
}
```
