import {routes} from '../../../router' //引入
import { defineStore} from 'pinia'


let userUserStore = defineStore('User', {
    // 仓库
    state: ():UserState => {
        return {
            token:'xxx---15578',  //token
            menuRoutes:routes, //存储menu菜单(路由)
        }
    },
    // 异步|逻辑
    actions: {

    },
    getters: {

    }
})

export default userUserStore