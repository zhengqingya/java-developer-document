<script setup>
	import {
		ref
	} from 'vue'

	defineProps({
		msg: String,
	})

	const count = ref(0)
</script>

<template>
	<van-button type="primary">主要按钮</van-button>
	<van-button type="success">成功按钮</van-button>
	<van-button type="default">默认按钮</van-button>
	<van-button type="warning">警告按钮</van-button>
	<van-button type="danger">危险按钮</van-button>

</template>

<style scoped>
	.read-the-docs {
		color: #888;
	}
</style>