import { createRouter, createWebHistory } from 'vue-router';
import ComponentDemo from './pages/ComponentDemo.vue';
import SignupFormDemo from './pages/SignupFormDemo.vue';

const routes = [
	{
		path: '/',
		component: ComponentDemo,
		name: 'ComponentDemo',
		meta: {
			breadcrumbText: 'Home',
		},
		children: [
			{
				path: '/foo',
				component: ComponentDemo,
				name: 'ComponentDemoFoo',
				meta: {
					breadcrumbText: 'Foo',
				},
				children: [
					{
						path: '/foo/bar',
						component: ComponentDemo,
						name: 'ComponentDemoFooBar',
						meta: {
							breadcrumbText: 'Bar',
						},
						children: [
							{
								path: '/foo/bar/baz',
								component: ComponentDemo,
								name: 'ComponentDemoFooBarBaz',
								meta: {
									breadcrumbText: 'Baz',
								},
							},
						],
					},
				],
			},
		],
	},
	{
		path: '/sign-up-demo',
		component: SignupFormDemo,
		name: 'Login Demo',
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
