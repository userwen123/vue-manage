// 引入 js-cookie, 缓存menu
import Cookie from 'js-cookie'

export default {
    state:{
        isCollapse:false,  //是否折叠侧边栏
        // 面包屑，存储所点击的路径页面
        tabsList:[
            {
                path:'/',
                name:'home',
                label:'首页',
                icon:'home'
            },
        ],
        // 存储目前所处页面
        currentMenu:null,
        // 根据不同的登录账号，显示不同的菜单目录，相关菜单路由存储在menu中
        menu:[],
    },
    mutations:{
        // 更改isCollapse的值
        collapseMenu(state){
            state.isCollapse = !state.isCollapse
        },
        // 存储面包屑页面数据
        selectMenu(state,val) {
            // 如果传进来的值不是主页，则当前页面为val
            if(val.name !== 'name') {
                state.currentMenu = val
                // 判断传进来的页面是否已经在tabsList中存储
                // 如果没有，则存进去
                // findIndex 寻找匹配的元素，返回第一个匹配元素的下标，没有就返回-1
                const result = state.tabsList.findIndex(item => item.name === val.name)
                if(result === -1){
                    // 没有就将该路径加入tabsList中
                    state.tabsList.push(val)
                }
            }else { //如果传进来的值是主页,就将当前页面重置为null
                state.currentMenu = null
            }
        },
        // 点击叉掉面包屑时，修改tabsList列表
        closeTag(state,val) {
            // 找到当前叉掉的面包屑在tabsList中的索引
            const result = state.tabsList.findIndex(item => item.name === val.name)
            // 在tabsList中删掉叉掉的面包屑
            state.tabsList.splice(result,1)
        },
        // 存储菜单路由
        setMenu(state,val) {
            state.menu = val
            // 将Menu数据缓存到cookie中，避免浏览器刷新过程中丢失 menu 数据
            Cookie.set('menu',JSON.stringify(val))
        },
        // 清除cookie中缓存的menu
        clearMenu(state) {
            state.menu = []
            Cookie.remove('menu')
        },
        // 路由的动态添加
        addMenu(state,router) {
            // 如果cookie中没有menu数据，直接返回，表明登录账号不对
            if(!Cookie.get('menu')) {
                return
            }
            // 如果cookie中有menu数据,将menu添加到state中
            const menu = JSON.parse(Cookie.get('menu'))
            state.menu = menu
            // 对返回的menu进行处理,menuArray存储路由相关数据
            const menuArray = []
            menu.forEach(item => {
                // 如果存在二级菜单
                if(item.children) {
                    item.children = item.children.map(item => {
                        // 给每一项添加一个component属性，因为每一级路由中都存在
                        item.component = () => import(`../views/${item.url}`)
                        return item
                    })
                    menuArray.push(...item.children)
                } else {
                    item.component = () => import(`../views/${item.url}`)
                    menuArray.push(item)
                }
            });
            // 动态添加路由,注意路由版本一定要@3.5.3，用@3.2.0以下方法会出错
            menuArray.forEach(item => {
                router.addRoute('Main',item)
            })
        },
    },
}