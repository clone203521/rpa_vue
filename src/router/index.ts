import {createRouter, createWebHistory, RouteRecordRaw,} from "vue-router";
// import {routes} from "vue-router/auto-routes";

export const routes = [
    {
        path: '/',
        component: () => import('@/App.vue'),
        redirect: '/operate1',
        meta: {
            title: 'xxx管理平台',
            hidden: false,
            icon: 'Avatar'
        },
    },
    {
        name: 'layout1',
        path: '/overseas',
        meta: {
            title: '海外平台',
            hidden: false,
            icon: 'Avatar'
        },
        children: [
            {
                path: '/operate1',
                component: () => import('@/pages/overseas/Operate/index.vue'),
                meta: {
                    title: '浏览器操作',
                    hidden: false,
                    icon: 'HomeFilled'
                }
            },
            {
                path: '/keyword1',
                component: () => import('@/pages/overseas/Keyword/index.vue'),
                meta: {
                    title: '关键词',
                    hidden: false,
                    icon: 'HomeFilled'
                }
            },
            {
                path: '/viewFilePath1',
                component: () => import('@/pages/overseas/ViewFilePath/index.vue'),
                meta: {
                    title: '查看文件路径',
                    hidden: false,
                    icon: 'HomeFilled'
                }
            },
        ]
    },
    {
        name: 'layout',
        path: '/domestic',
        meta: {
            title: '国内平台',
            hidden: false,
            icon: 'Avatar'
        },
        children: [
            {
                path: '/operate2',
                component: () => import('@/pages/domestic/Operate/index.vue'),
                meta: {
                    title: '浏览器操作',
                    hidden: false,
                    icon: 'HomeFilled'
                }
            },
            {
                path: '/keyword2',
                component: () => import('@/pages/domestic/Keyword/index.vue'),
                meta: {
                    title: '关键词',
                    hidden: false,
                    icon: 'HomeFilled'
                }
            },
            {
                path: '/viewFilePath2',
                component: () => import('@/pages/domestic/ViewFilePath/index.vue'),
                meta: {
                    title: '查看文件路径',
                    hidden: false,
                    icon: 'HomeFilled'
                }
            },
        ]
    },
    {
        path: '/404',
        index: 10,
        component: () => import('@/pages/404/index.vue'),
        name: '404',
        meta: {
            title: '404',
            hidden: true,
            icon: 'DocumentDelete'
        }
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404',
        name: 'Any',
        meta: {
            title: '任意路由',
            hidden: true,
            icon: 'DataLine'
        }
    },
] as RouteRecordRaw[];

const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router

