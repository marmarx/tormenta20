import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/',           name: 'personagem',   component: () => import('@/views/Personagem.vue'),    alias: ['/personagem','/home','/inicio','/início']},
    {path: '/combate',    name: 'combate',      component: () => import('@/views/Combate.vue'),       alias: ['/combater','/luta']},
    {path: '/pericias',   name: 'pericias',     component: () => import('@/views/Pericias.vue'),      alias: ['/pericia','/perícia','/perícias','/skill','/skills']},
    {path: '/poderes',    name: 'poderes',      component: () => import('@/views/Poderes.vue'),       alias: ['/poder','/habilidade','/habilidades','/talento','/talentos']},
    {path: '/magias',     name: 'magias',       component: () => import('@/views/Magias.vue')}, //    alias:['/magias/:id','/magias/:id/editar','/magias/:id/edit'],
    {path: '/magias/:id', name: 'magiasId',     component: () => import('@/views/Magias.vue'),        alias:['/magias/:id/editar','/magias/:id/edit']},
    {path: '/condicoes',  name: 'condicoes',    component: () => import('@/views/Condicoes.vue'),     alias: ['/condições','/condição','/condicao','/status']},
    {path: '/equips',     name: 'equipamentos', component: () => import('@/views/Equipamentos.vue'),  alias: ['/equip','/equipamentos','/equipamento','/itens','/item']},
    {path: '/anotacoes',  name: 'anotacoes',    component: () => import('@/views/Anotacoes.vue'),     alias: ['/anotacao','/anotações','/anotação','/notas','/nota']},
    {path: '/dados',      name: 'dados',        component: () => import('@/views/Dados.vue'),         alias: ['/dado','/dice','/die','/rolador','/rolar']},
    {path: '/config',     name: 'configuraoes', component: () => import('@/views/Configuracoes.vue'), alias: ['/configuracao','/configuracoes','/configuração','/configurações','/configs']}
  ],
})

export default router
