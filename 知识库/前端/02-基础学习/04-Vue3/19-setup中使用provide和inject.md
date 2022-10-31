```vue
<script>
import HelloWorld from "./components/HelloWorld.vue";
import { provide, ref } from "vue";
export default {
  components: { HelloWorld },
  setup() {
    const name = ref("hi");
    provide("name", name);
    function changeName() {
      name.value = "666";
    }
    return { changeName };
  },
};
</script>
<template>
  <HelloWorld />
  <button @click="changeName">change</button>
</template>
```

```vue
<script>
import { inject } from "vue";
export default {
  setup() {
    const name = inject("name");
    return { name };
  },
};
</script>
<template>
  <div>
    <p>{{ name }}</p>
  </div>
</template>
```