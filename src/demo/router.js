import { createRouter, createWebHistory } from 'vue-router';
import ComponentDemo from './pages/ComponentDemo.vue';
import SignupFormDemo from './pages/SignupFormDemo.vue';
import TypeaheadDemo from './pages/TypeaheadDemo.vue';
import FormV2Demo from './pages/FormV2Demo.vue';

const routes = [
	{
		path: '/sign-up-demo',
		component: SignupFormDemo,
		name: 'Login Demo',
		meta: {
			collapseFooter: true,
		},
	},
	{
		path: '/form-v2-demo',
		component: FormV2Demo,
		name: 'FormV2Demo',
		meta: {
			collapseFooter: true,
		},
	},
	{
		path: '/typeahead-demo',
		component: TypeaheadDemo,
		name: 'Typeahead demo',
		meta: {
			collapseFooter: true,
		},
	},
	{
		path: '/',
		component: ComponentDemo,
		name: 'ComponentDemo',
		meta: {
			breadcrumbText: 'Home',
			collapseFooter: false,
		},
		children: [
			{
				path: '/foo',
				component: ComponentDemo,
				name: 'ComponentDemoFoo',
				meta: {
					breadcrumbText: 'Foo',
					collapseFooter: true,
				},
				children: [
					{
						path: '/foo/bar',
						component: ComponentDemo,
						name: 'ComponentDemoFooBar',
						meta: {
							breadcrumbText: 'Bar',
							collapseFooter: true,
						},
						children: [
							{
								path: '/foo/bar/baz',
								component: ComponentDemo,
								name: 'ComponentDemoFooBarBaz',
								meta: {
									breadcrumbText: 'Baz',
									collapseFooter: true,
								},
							},
						],
					},
				],
			},
		],
	},
	{
		path: '/:pathMatch(.*)*',
		component: {
			template:
				'<div>Caught by catch-all route. Current route: {{ $route.path }}</div>',
		},
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach((to, from, next) => {
	console.log('Route changing to:', to.path);
	next();
});

export default router;
