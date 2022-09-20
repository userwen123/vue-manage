// 使用vant组件库实现轮播图、按钮等
import { Button, Radio, Container, Header, Main, Aside, Menu, Submenu, MenuItem, MenuItemGroup, Dropdown, DropdownMenu, DropdownItem, Row, Col, Card, Table, TableColumn, Breadcrumb, BreadcrumbItem, Tag, Form, FormItem, Input, Select, Option, Switch, DatePicker, Dialog, Pagination } from 'element-ui';

// 把引用的组件放进一个数组中
let plugins = [Button, Radio, Container, Header, Main, Aside, Menu, Submenu, MenuItem, MenuItemGroup, Dropdown, DropdownMenu, DropdownItem, Row, Col, Card, Table, TableColumn, Breadcrumb, BreadcrumbItem, Tag, Form, FormItem, Input, Select, Option, Switch, DatePicker, Dialog, Pagination ]

// 遍历引用的组件，使用 app.use
export default function getEle(Vue) {
    plugins.forEach((item) => {
        return Vue.use(item)
    })
}