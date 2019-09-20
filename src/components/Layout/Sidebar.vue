<template>
    <div>
        <div class="aside-container">
            <!-- START Sidebar (left)-->
            <div class="aside-inner">
                <nav class="sidebar" data-sidebar-anyclick-close="">
                    <!-- START sidebar nav-->
                    <ul class="sidebar-nav">
                        <!-- START app info-->
                        <li class="has-user-block">
                            <div class="flex-row p-3" @click="showAppList">
                                <img :src="iconPath(applicationObj.icon_path)" class="img-thumbnail rounded-circle" height="50"
                                     width="50" alt="">
                                <div class="text-center" style="display: inline-block;width: 100px;">
                                    <span class="text-center">{{applicationObj.name}}</span>
                                </div>
                            </div>
                        </li>
                        <!-- END app info-->

                        <template v-for="(item, index) in sidebarMenuData">
                            <!-- -->
                            <router-link v-if="!item.hasSubMenu" tag="li" :to="'/' + item.name" active-class="active">
                                <a :title="item.title">
                                    <!--                                <span v-if="item.label" :class="'float-right badge badge-'+item.label.color">{{item.label.value}}</span>-->
                                    <em class="icon-grid"></em>
                                    <span>{{item.title}}</span>
                                </a>
                            </router-link>

                            <li v-if="item.hasSubMenu">
                                <a :title="item.title" href @click.prevent="clickSidebarMenu(index)">
                                    <!-- <span v-if="item.label" :class="'float-right badge badge-'+item.label.color">{{item.label.value}}</span>-->
                                    <em class="icon-grid"></em>
                                    <span>{{item.title}}</span>
                                </a>
                                <!--                            v-model="collapse[item.name]"-->
                                <b-collapse tag="ul" class="sidebar-nav sidebar-subnav" :id="item.name"
                                            v-model="collapseFlag[index]">
                                    <div class="sidebar-subnav-header">{{item.title}}</div>
                                    <template v-for="(obj, i) in collapseMenuData[index]">
                                        <!--                                        '/' + sidebarMenuData[sidebarMenuIndex].name + -->
                                        <router-link tag="li" :to="'/' + obj.name" active-class="active">
                                            <a :title="item.title">
                                                <!-- <span v-if="sitem.label" :class="'float-right badge badge-'+sitem.label.color">{{sitem.label.value}}</span>-->
                                                <span>{{obj.title}}</span>
                                            </a>
                                        </router-link>
                                    </template>
                                </b-collapse>
                            </li>
                        </template>

                        <!--                        <template v-for="(item, index) in toArray(menuData[menuList[0].name].subItem)">-->
                        <!--                            <li class="nav-heading">-->
                        <!--                                <span>{{item.title}}</span>-->
                        <!--                            </li>-->
                        <!--                            <template v-if="item.hasSubMenu">-->
                        <!--                                <b-collapse tag="ul" class="sidebar-nav sidebar-subnav" :id="item.name"-->
                        <!--                                            v-model="collapseFlag[index]">-->
                        <!--                                    <router-link-->
                        <!--                                            v-for="(i, key) in toArray(menuData[menuList[0].name].subItem[item.name].subItem)"-->
                        <!--                                            :key="key" tag="li" :to="'/' + i.name" active-class="active">-->
                        <!--                                        <a :title="i.title">-->
                        <!--                                            <em class="icon-grid"></em>-->
                        <!--                                            <span>{{i.title}}</span>-->
                        <!--                                        </a>-->
                        <!--                                    </router-link>-->
                        <!--                                </b-collapse>-->
                        <!--                            </template>-->

                        <!--                        </template>-->

                    </ul>
                    <!-- END sidebar nav-->
                </nav>
            </div>
            <!-- END Sidebar (left)-->
        </div>

        <!--        应用管理浮窗-->
        <div v-show="isShowAppList" class="popover bs-popover-right pl-3 pr-3 pt-1 pb-1 popover-custom">
            <b-link href="/#/applicationList">应用管理</b-link>
            <div v-for="(item, index) in appList" class="mt-2" style="flex-direction: row" @click="toggleApp(index)">
                <img :src="iconPath(item.icon_path)" class="img-thumbnail rounded-circle" height="50" width="50" alt="">
                <div class="text-center" style="display: inline-block;width: 100px;">
                    <span class="text-center">{{item.name}}</span>
                </div>
                <div v-if="index != appList.length - 1" class="mt-2"
                     style="height: 1px;background-color: rgba(0, 0, 0, 0.2)"></div>
            </div>
        </div>
    </div>

</template>

<script>

    import {mapGetters, mapMutations, mapState} from 'vuex';

    import {MenuRequest, MenuResponse} from "../../proto/pb/menu_pb.js"
    import {MenuServiceClient} from "../../proto/pb/menu_grpc_web_pb.js"
    import { baseURL } from '@/utils/constants'
    const MENU_DATA = require('../../assets/menu/menu.json');
    const APP_DATA = require('../../assets/app/_list.json');

    export default {
        name: 'Sidebar',
        data() {
            return {
                collapseFlag: [true, true, true],
                // Menu,

                appPath: "shared/apps/_list.json",

                menuPath: "shared/menu/menu.json",

                // 所有菜单数据
                menuData: [],
                // 二级菜单
                // sidebarMenuData: [],
                sidebarMenuIndex: -1,

                // 三级菜单
                collapseMenuData: [],
                collapseMenuIndex: -1,

                isShowAppList: false,
                appList: [],

            }
        },
        created() {
            this.menuClient = new MenuServiceClient(this.gRPC_url, null, null);

            // console.log(this.menuList);
            if (this.menuList == 1) {
                this.getSidebarMenu();
            }

            // this.getAllMenu();
        },
        mounted() {
            // SidebarRun(this.$router, this.closeSidebar.bind(this))
            // console.log('isCollapsed: ' + this.isCollapsed);
            this.getAppData();
        },
        computed: {
            isDebug: {
                get() {
                    return this.getSetting.isDebug
                },
                // set (value) { this.changeSetting({name: 'isDebug', value}) }
            },
            applicationObj: {
                get() {
                    return this.getSetting.applicationObj
                },
                set(value) {
                    this.changeSetting({name: 'applicationObj', value})
                }
            },
            applicationURL: {
                get() {
                    return this.getSetting.applicationURL
                },
                set(value) {
                    this.changeSetting({name: 'applicationURL', value})
                }
            },
            gRPC_url: {
                get() {
                    return this.getSetting.gRPC_url
                },
                // set (value) { this.changeSetting({name: 'gRPC_url', value}) }
            },
            isCollapsed: {
                get() {
                    return this.getSetting.isCollapsed
                },
                // set(value) { this.changeSetting({name: 'isCollapsed', value})}
            },

            headerMenuList: {
                get() {
                    return this.getSetting.headerMenuList
                },
                set(value) {
                    this.changeSetting({name: 'headerMenuList', value})
                }
            },

            sidebarMenuData: {
                get() {
                    return this.getSetting.sidebarMenuData
                },
                set(value) {
                    this.changeSetting({name: 'sidebarMenuData', value})
                }
            },

            menuList: {
                get() {
                    return this.getSetting.menuList
                },
                set(value) {
                    this.changeSetting({name: 'menuList', value})
                }
            },

            ...mapGetters([
                'getSetting',
                'getTheme'
            ]),
            ...mapState({
                showUserBlock: state => state.setting.showUserBlock
            }),
        },
        watch: {
            // $route(to, from) {
            //     this.closeSidebar()
            // },
            // 监听选择的菜单
            menuList(value) {
                // console.log("sidebar page menuList changed: " + JSON.stringify(value));
                // 一级菜单也没有选择
                // if (value.length == 0) {
                //     // 默认选择第一个一级菜单
                //     this.menuList.push(this.headerMenuList[0]);
                //     // 请求二三级菜单
                //     this.getSidebarMenu();
                // }
                // 切换一级菜单，清空二级菜单索引和三级菜单数据
                if (value.length == 1) {
                    this.sidebarMenuIndex = -1;
                    this.collapseMenuData = [];
                    this.getSidebarMenu();
                }
                // 切换二级菜单，清空三级菜单索引
                if (value.length == 2) {
                    this.collapseMenuIndex = -1;
                    this.getSidebarMenu();
                }
            },

            headerMenuList(value) {
                // 得到一级菜单且没有选择任何菜单
                if (value.length > 0 && this.menuList.length == 0) {
                    // console.log("first load data");
                    this.menuList.push(value[0]);
                }
            },

            // collapseMenuData(value) {
            //     console.log("collapse value changed!");
            // }
        },
        methods: {
            ...mapMutations([
                'changeSetting',
                'toggleSetting'
            ]),
            //请示应用的图片路径
            iconPath(path) {
                let url = `${baseURL}/api/raw${path}?auth=${this.$store.state.setting.jwt}&`;

                url += `appId=shared&`

                url += `cId=${this.$store.state.setting.cId}`

                return  url + `&inline=true`;
            },
            getAppData() {

                if (this.isDebug) {
                    this.appList = APP_DATA;  // {#} -i -sign
                    this.showDefaultApp();
                    return;
                }

                this.getJSON(this.appPath, jsonObj => {
                    this.appList = jsonObj;
                    this.showDefaultApp();
                })
            },

            showDefaultApp() {
                // this.$log('showDefaultApp');
                // let outputAppObj = this.applicationObj; // {#} -i -sign
                if (this.applicationObj.appId == undefined) {
                    this.applicationObj = this.appList[0]; // {#} -i -sign
                    this.applicationURL = this.applicationObj.appId + '/';
                    // this.$router.push('/overview/templateList');
                }
            },

            toggleApp(index) {
                this.applicationObj = this.appList[index];
                this.isShowAppList = false;
                this.applicationURL = this.applicationObj.appId + '/';
                // this.$router.push('/templateList');
            },

            // 得到二三级菜单
            getSidebarMenu() {

                if (this.isDebug) {
                    let outputMenuList = this.menuList; // {#} -i -sign
                    let menuData = MENU_DATA; // {#} -i -t getSidebarMenu -sign
                    this.menuList.forEach(item => {// {#} -i -t menuList -sign
                        if (item.hasSubMenu) {
                            menuData = menuData[item.name].subItem;
                        }
                    });
                    let data = [];
                    Object.keys(menuData).forEach(key => {
                        data.push({
                            name: key,
                            title: menuData[key].title,
                            hasSubMenu: menuData[key].subItem != undefined && Object.keys(menuData[key].subItem).length > 0
                        });
                    });
                    let outputData = data; // {#} -i -sign
                    this.setMenuData(data);
                    return;
                }

                let menuRequest = new MenuRequest();
                let tmp = [];
                this.menuList.forEach(item => {
                    tmp.push(item.name);
                    tmp.push("subItem");
                });
                menuRequest.setNamelistList(tmp);

                menuRequest = this.addCommonRequest(menuRequest);
                let self = this;
                this.menuClient.getMenu(menuRequest, {}, (err, response) => {
                    this.doFilter(err, response, success => {
                        let data = self.getMenuData(success);
                        // console.log("data: " + JSON.stringify(data));
                        self.setMenuData(data);
                    }, fail => {
                    });
                })
            },

            // 得到所有菜单
            getAllMenu() {

                if (this.isDebug) {
                    this.menuData = MENU_DATA; // {#} -i -t getAllMenu -sign
                    let menuList = this.menuList; // {#} -i -t getAllMenu -sign
                    let data = this.menuData[this.menuList[0].name]; // {#} -i -t getAllMenu -sign
                    return;
                }

                this.getJSON(this.menuPath, jsonObj => {
                    this.menuData = jsonObj;
                })
            },

            // 将菜单数据封装成对象
            getMenuData(response) {
                let list = response.getMenulistList();
                let menuList = [];
                for (let index in list) {
                    let obj = {
                        name: list[index].getName(),
                        title: list[index].getTitle(),
                        hasSubMenu: list[index].getHassubmenu(),
                    };
                    // console.log(obj);
                    menuList.push(obj);
                }
                return menuList;
                // this.sidebarMenuData = menuList;
            },

            // 将菜单数据放入对应二三级菜单变量中
            setMenuData(data) {
                // 根据请求的二三级菜单，将数据放到对应的变量里
                if (this.menuList.length == 1) {
                    this.sidebarMenuData = data;
                } else if (this.menuList.length == 2) {
                    let arr = JSON.parse(JSON.stringify(this.collapseMenuData));
                    arr[this.sidebarMenuIndex] = data;
                    this.collapseMenuData = arr;
                    this.toggleCollapse();
                    // console.log("collapseMenuData: " + JSON.stringify(this.collapseMenuData))
                } else {
                    console.log("请求菜单级数有误？")
                }
            },

            // 点击二级菜单
            clickSidebarMenu(index) { // {#} -i -t clickSidebarMenu -sign -from

                if (this.sidebarMenuIndex != index) {
                    this.sidebarMenuIndex = index;
                    let menu = this.sidebarMenuData[index];
                    this.dealSubMenu(menu);
                } else {
                    this.collapseFlag.splice(index, 1, !this.collapseFlag[index]);
                }
            },
            // 点击三级菜单
            clickCollapseMenu(index) {
                this.collapseMenuIndex = index;
                // console.log('collapse menu index: ' + index);
                let menu = this.collapseMenuData[this.sidebarMenuIndex][index];
                // console.log('collapse menu item: ' + JSON.stringify(menu));
                this.dealSubMenu(menu);
            },
            // 子菜单处理
            dealSubMenu(menu) {
                if (menu.hasSubMenu) {
                    // 改变二级菜单
                    this.menuList = [this.menuList[0], menu];
                }
                // else {
                //     // 请求布局
                //     let arr = [];
                //     this.menuList.forEach(item => {
                //         arr.push(item.name);
                //     });
                //     arr.push(menu.name);
                //     console.log("layout items: " + JSON.stringify(arr));
                // }
            },
            // 折叠子菜单切换
            toggleCollapse() {
                for (let c in this.collapseFlag) {
                    this.collapseFlag[c] = false
                }
                this.collapseFlag[this.sidebarMenuIndex] = true;
                // console.log('collapse flags: ' + JSON.stringify(this.collapseFlag));
            },


            showAppList() {
                // this.$refs.popover1.$emit('open');
                this.isShowAppList = !this.isShowAppList;
            },

            // closeSidebar() {
            //     this.$store.commit('changeSetting', {name: 'asideToggled', value: false})
            // },

            toArray(data) { // {#} -i -t toArray -sign -from
                let array = [];
                Object.keys(data).forEach(key => {
                    array.push({
                        name: key,
                        title: data[key].title,
                        hasSubMenu: data[key].subItem != undefined && Object.keys(data[key].subItem).length > 0
                    });
                });
                let outputData = array; // {#} -i -t toArray -sign
                return array
            }

        }
    }
</script>

<style scoped>
    .popover-custom {
        border-radius: 5px;
        border-color: rgba(0, 0, 0, 0.2);
        z-index: 999;
        position: fixed;
        display: block;
        top: 70px;
        left: 220px;
        width: 200px;
        height: 300px;
        overflow: scroll;
    }
</style>
