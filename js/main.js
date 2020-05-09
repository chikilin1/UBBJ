const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }


const routes = [
	{ path: '/foo', component: Sedes },
	{ path: '/bar', component: Bar },
    { path: '/', component: Index},
    { path: '/sedes', component: Sedes},
    { path: '/carrera', component: Carreras},
    { path: '/login', component: Login},
    { path: '/registro_usuarios', component: Registro_usuarios},
    { path: '/registro_sedes', component: Registro_sedes},
    { path: '/registro_docentes', component: Registro_docentes},
    { path: '/areas_de_conocimiento', component: Areas_de_conocimiento},
    { path: '/aspirantes', component: Aspirantes},
    { path: '/transparencia', component: Transparencia}
    
]

const router = new VueRouter({
	mode: 'history',
	routes:	routes
})

const app = new Vue({
	hashbang: false,
	history: true,
	router
}).$mount('#app')


