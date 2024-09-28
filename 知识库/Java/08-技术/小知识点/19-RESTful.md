1. @GetMapping
2. @PostMapping = @RequestMapping(value = "/user/login",method = RequestMethod.POST)
3. @PutMapping
4. @DeleteMapping
5. @PatchMapping

### @RequestParam(value="id",required = false, defaultValue = "0")

value表示参数名字 required表示是否为必需，defaultValue表示默认值

```java

@RestController
@RequestMapping("/api")
public class HelloController {
    @Autowired
    private Boyproperties boyproperties;

    @RequestMapping(value = {"/hi1", "/hi2"}, method = RequestMethod.GET)
    public String hi(@RequestParam(value = "id", required = false, defaultValue = "0") Integer id) {
        return "index.html?" + id;
    }
}
```