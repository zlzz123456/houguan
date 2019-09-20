/**
 * Setting store to control layout behavior
 */

const SettingModule = {
    state: {
        /* Layout fixed. Scroll content only */
        isFixed: true,
        /* Sidebar collapsed */
        isCollapsed: false,
        /* Boxed layout */
        isBoxed: false,
        /* Floating sidebar */
        isFloat: false,
        /* Sidebar show menu on hover only */
        asideHover: false,
        /* Show sidebar scrollbar (dont' hide it) */
        asideScrollbar: false,
        /* Sidebar collapsed with big icons and text */
        isCollapsedText: false,
        /* Toggle for the offsidebar */
        offsidebarOpen: false,
        /* Toggle for the sidebar offcanvas (mobile) */
        asideToggled: false,
        /* Toggle for the sidebar user block */
        showUserBlock: false,
        /* Enables layout horizontal */
        horizontal: false,
        /* Full size layout */
        useFullLayout: false,
        /* Hide footer */
        hiddenFooter: false,

        // grpc 地址
        // gRPC_url: "http://localhost:8081",
        // gRPC_url: "http://10.1.1.203:8081",
        // gRPC_url: "http://10.1.1.218:8081", // 测试地址
        // gRPC_url: "http://10.1.1.22:8081", // 测试地址
         gRPC_url:  "",
        debugPath: "/app01/",   // 测试路径
        isDebug: true,  // 测试模式，数据来自本地
        userId: "",     // 用户ID
        cId: "",        // 租户ID
        authList: {
            // funcAuth: {
            //     isCreateOrDelApp: true
            // }
        },   // 权限对象

        // 公共弹窗
        isErrorAlert: false,        //  不能持久化存储
        alertMessage: "hello world",
        isLoading: false, // 加载浮窗

        // 菜单链
        menuList: [],

        // 保存的一级菜单
        headerMenuList: [],

        // 保存的二级菜单
        sidebarMenuData: [],

        // jsonEditor配置
        jsonEditorOptions: {
            disable_collapse: true,
            disable_properties: true,
            disable_edit_json: true,
            disable_array_reorder: true,
            no_additional_properties: true,
            required_by_default: true,
            theme: 'myTheme',
            iconlib: 'fontawesome5'
        },
        // 分页列表大小
        perPage: 10,
        // 应用
        applicationObj: {},
        applicationURL: "",
        // 主题包管理全局参数
        packageObj: {},
        packageURL: "defaultTheme/admin/",

        templateList: [], //
        componentList: [],
        // 当前页面
        templateObj: {},
        componentObj: {},
        // 灰度对象
        grayScaleObj: {},
        // fileBrowser 配置参数
        user: {
            perm: {
                // create: true
            },
            viewMode: 'mosaic'
        },
        req: {},
        oldReq: {},
        clipboard: {
            key: '',
            items: []
        },
        fileUrl: '/',
        // jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJsb2NhbGUiOiJ6aC1jbiIsInZpZXdNb2RlIjoibW9zYWljIiwicGVybSI6eyJhZG1pbiI6dHJ1ZSwiZXhlY3V0ZSI6dHJ1ZSwiY3JlYXRlIjp0cnVlLCJyZW5hbWUiOnRydWUsIm1vZGlmeSI6dHJ1ZSwiZGVsZXRlIjp0cnVlLCJzaGFyZSI6dHJ1ZSwiZG93bmxvYWQiOnRydWV9LCJjb21tYW5kcyI6W10sImxvY2tQYXNzd29yZCI6ZmFsc2V9LCJleHAiOjE1NTc4MzMxNTQsImlhdCI6MTU1NzgyNTk1NCwiaXNzIjoiRmlsZSBCcm93c2VyIn0.DKiMzBZA7s48V1r4SRjG0qDhHONa4SWPYiFXTnqjuRI',
        jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJsb2NhbGUiOiJ6aC1jbiIsInZpZXdNb2RlIjoibW9zYWljIiwicGVybSI6eyJhZG1pbiI6dHJ1ZSwiZXhlY3V0ZSI6dHJ1ZSwiY3JlYXRlIjp0cnVlLCJyZW5hbWUiOnRydWUsIm1vZGlmeSI6dHJ1ZSwiZGVsZXRlIjp0cnVlLCJzaGFyZSI6dHJ1ZSwiZG93bmxvYWQiOnRydWV9LCJjb21tYW5kcyI6W10sImxvY2tQYXNzd29yZCI6ZmFsc2V9LCJleHAiOjE1NTgwODczODMsImlhdCI6MTU1ODA4MDE4MywiaXNzIjoiRmlsZSBCcm93c2VyIn0.YLfeXCxKz_RadtPVdJD5Ym6TU-5n3gantQAX8hvKtt0',
        progress: 0,
        loading: false,
        unzip: false,
        reload: false,
        selected: [],
        multiple: false,
        show: null,
        showShell: false,
        showMessage: null,
        showConfirm: null

    },
    getters: {
        getSetting(state) {
            return state;
        },

        isLogged: state => state.userId !== null,
        isFiles: state => !state.loading, // && this.$router.name === 'Files',
        isListing: (state, getters) => getters.isFiles && state.req.isDir,
        isEditor: (state, getters) => getters.isFiles && (state.req.type === 'text' || state.req.type === 'textImmutable'),
        selectedCount: state => state.selected.length
    },
    mutations: {
        /**
         * Toggle a setting value (only boolean)
         */
        toggleSetting(state, name) {
            if(name in state)
                state[name] = !state[name];
        },
        /**
         * Change a setting value
         * payload.name: name of the setting prop to change
         * payload.value: new value to apply
         */
        changeSetting(state, {name, value}) {
            if(name in state)
                state[name] = value;
        },


        closeHovers: state => {
            state.show = null
            state.showMessage = null
        },
        toggleShell: (state) => {
            state.showShell = !state.showShell
        },
        showHover: (state, value) => {
            if (typeof value !== 'object') {
                state.show = value
                return
            }

            state.show = value.prompt
            state.showMessage = value.message
            state.showConfirm = value.confirm
        },
        showError: (state, value) => {
            state.show = 'error'
            state.showMessage = value
        },
        showSuccess: (state, value) => {
            state.show = 'success'
            state.showMessage = value
        },
        setLoading: (state, value) => { state.loading = value },
        setReload: (state, value) => { state.reload = value },
        setUser: (state, value) => {
            if (value === null) {
                state.user = null
                return
            }

            // let locale = value.locale
            //
            // if (locale === '') {
            //     locale = i18n.detectLocale()
            // }

            // moment.locale(locale)
            // i18n.default.locale = locale
            state.user = value
        },
        setJWT: (state, value) => (state.jwt = value),
        multiple: (state, value) => (state.multiple = value),
        addSelected: (state, value) => (state.selected.push(value)),
        addPlugin: (state, value) => {
            state.plugins.push(value)
        },
        removeSelected: (state, value) => {
            let i = state.selected.indexOf(value)
            if (i === -1) return
            state.selected.splice(i, 1)
        },
        resetSelected: (state) => {
            state.selected = []
        },
        updateUser: (state, value) => {
            if (typeof value !== 'object') return

            for (let field in value) {
                // if (field === 'locale') {
                //     moment.locale(value[field])
                //     i18n.default.locale = value[field]
                // }

                state.user[field] = value[field]
            }
        },
        updateRequest: (state, value) => {
            state.oldReq = state.req
            state.req = value
        },
        updateClipboard: (state, value) => {
            state.clipboard.key = value.key
            state.clipboard.items = value.items
        },
        resetClipboard: (state) => {
            state.clipboard.key = ''
            state.clipboard.items = []
        },
        setProgress: (state, value) => {
            state.progress = value
        }
    },
    actions: {
    }
}

export default SettingModule
