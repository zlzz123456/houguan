import Vue from 'vue'
import Router from 'vue-router'
import mixins from './mixins'
import store from './store'
import {CommonRequest, Request} from './proto/pb/common_pb.js'
import {MenuServiceClient} from "./proto/pb/menu_grpc_web_pb.js"

// 布局组件
import Layout from './components/Layout/Layout'     // 有顶栏，侧边栏
import LayoutPage from './components/Layout/LayoutPage'     // 全空
import LayoutHeader from './components/Layout/LayoutHeader' // 有顶栏

// 公共功能
import Login from './views/common/Login' // 登录
import ApplicationList from './views/common/ApplicationList' // 应用管理
import AuthCheck from './views/common/AuthCheck1'    // 权限管理

/* 门户功能 */
import Home from './views/overview/Home'    // 主页
// 素材资源
import ComponentList from './views/overview/ComponentList' // 组件列表页
import Component from './views/overview/Component'  // 组件详情页
import StageList from './views/overview/StageList'  // 场景列表页
import Files from './views/overview/Files'  // 资源管理页
// 前端展示
import TemplateList from './views/overview/TemplateList' // 页面列表页
import Template from './views/overview/Template'    // 页面详情页
// 配置管理
import NormalSetting from './views/overview/NormalSetting'  // 常规配置
import HostsSetting from './views/overview/HostsSetting'    // 通讯服务
import CacheSetting from './views/overview/CacheSetting'    // 缓存策略
import SafeSetting from './views/overview/SafeSetting'  // 安全设置
// 发布管理
import VersionManager from './views/overview/VersionList' // 版本管理
import GrayScaleManager from './views/overview/GrayScaleManager'    // 灰度管理
import GrayScale from './views/overview/GrayScale'  // 灰度详情
import Registry from './views/overview/Registry'    // 注册表管理

/* 分析功能 */
import AnalysisHome from './views/analysis/Home'    // 首页
import AnalysisUser from './views/analysis/User'    // 用户分析
import AnalysisAndroid from './views/analysis/Android'  // android 设备分析
import AnalysisIOS from './views/analysis/iOS'      // ios 设备分析
import AnalysisArea from './views/analysis/Area'    // 区域分析
import AnalysisVersion from './views/analysis/Version'  // 版本分析
import AnalysisFunction from './views/analysis/Function'    // 功能分析
import AnalysisCrash from './views/analysis/Crash'  // 异常分析

// 错误页
import Error403 from './views/errors/403'
import Error404 from './views/errors/404'
import Error500 from './views/errors/500'
// 测试页
import Test from './views/test/test'

Vue.use(Router);

let router = new Router({
    // mode: 'history',
    // base: process.env.BASE_URL,
    routes: [{
        path: '/',
        redirect: '/login'
    },
        {
            path: '/',
            component: LayoutPage,
            children: [
                {
                    path: 'login',
                    component: Login
                },
                {
                    path: '403',
                    component: Error403
                },
                {
                    path: '404',
                    component: Error404
                },
                {
                    path: '500',
                    component: Error500
                }
            ]
        },
        {
            path: "/",
            component: LayoutHeader,
            children: [
                {
                    path: 'applicationList',
                    component: ApplicationList
                },
                {
                    path: 'authCheck',
                    component: AuthCheck
                }
            ]
        },
        {
            path: '/overview',
            component: Layout,
            children: [
                {
                    path: 'home',
                    component: Home
                },
                {
                    path: 'files',
                    name: 'files',
                    component: Files,
                },
                {
                    path: 'templateList',
                    component: TemplateList
                },
                {
                    path: 'template/:index',
                    name: 'template',
                    component: Template
                },
                {
                    path: 'componentList',
                    component: ComponentList
                },
                {
                    path: "component/:index",
                    name: 'component',
                    component: Component
                },
                {
                    path: 'stageList',
                    component: StageList
                },
                {
                    path: 'normalSetting',
                    component: NormalSetting
                },
                {
                    path: 'hostsSetting',
                    component: HostsSetting
                },
                {
                    path: 'cacheSetting',
                    component: CacheSetting
                },
                {
                    path: 'safeSetting',
                    component: SafeSetting
                },
                {
                    path: 'versionManager',
                    component: VersionManager
                },
                {
                    path: 'grayScaleManager',
                    component: GrayScaleManager
                },
                {
                    path: 'grayScale/:index',
                    name: 'grayScale',
                    component: GrayScale
                },
                {
                    path: 'registry',
                    component: Registry
                },
                {
                    path: 'test',
                    component: Test
                }
            ]
        },
        {
            path: '/analysis',
            component: Layout,
            children: [
                {
                    path: 'home',
                    component: AnalysisHome
                },
                {
                    path: 'user',
                    component: AnalysisUser
                },
                {
                    path: 'android',
                    component: AnalysisAndroid
                },
                {
                    path: 'ios',
                    component: AnalysisIOS
                },
                {
                    path: 'area',
                    component: AnalysisArea
                },
                {
                    path: 'version',
                    component: AnalysisVersion
                },
                {
                    path: 'function',
                    component: AnalysisFunction
                },
                {
                    path: 'crash',
                    component: AnalysisCrash
                }
            ]
        },
        // Not found route
        {
            path: '*',
            redirect: '/404'
        }
    ]
})

var menuClient = new MenuServiceClient(store.getters.getSetting.gRPC_url, null, null);

router.beforeEach((to, from, next) => {

    if (store.getters.getSetting.isDebug) {
        next();
        return ;
    }

    let arr = ['/403', '/404', '/500', '/login', '/applicationList'];
    let flag = false;
    for (let index in arr) {
        if (arr[index] == to.path) {
            flag = true;
        }
    }

    if (flag){
        next();
    } else {
        let commonRequest = new CommonRequest();
        // let commonRequest = mixins.methods.addCommonRequest();
        let request = new Request();
        request.setUserid(store.getters.getSetting.userId);
        request.setAppid(store.getters.getSetting.applicationObj.appId);

        let routerList = ['overview/component', 'overview/template', 'overview/grayScale'];
        let pathList = ['overview/componentList', 'overview/templateList', 'overview/grayScaleManager'];
        let path = to.path.substr(1);
        // console.log('before router: ' + path);
        for (let index in routerList) {
            if (path.indexOf(routerList[index]) != -1) {
                // console.log("index: " + path.indexOf(routerList[index]));
                path = pathList[index];
            }
        }
        // console.log('router: ' + path);
        request.setMenuid(path);
        commonRequest.setRequest(request);

        menuClient.verifyMenu(commonRequest, {}, (err, response) => {
            mixins.methods.doFilter(err, response, success => {
                next();
            }, fail => {
                next('/403')
            })
        })
    }

});

export default router
