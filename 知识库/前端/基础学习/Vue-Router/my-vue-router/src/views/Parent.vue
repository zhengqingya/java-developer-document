<template>
  <div>Parent</div>
  <hr />
  <div>
    <ul>
      <li>
        <router-link to="/parent/parentOne">one</router-link>
      </li>
      <li>
        <router-link to="/parent/parentTwo">two</router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  mounted() {
    console.log(this.$route.query);
  },
};
</script>
