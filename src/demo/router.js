import { createRouter, createWebHistory } from 'vue-router';
import ComponentDemo from './pages/ComponentDemo.vue';

const routes = [
	{
		path: '/',
		component: ComponentDemo,
		name: 'ComponentDemo',
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
