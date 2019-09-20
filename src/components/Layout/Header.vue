<template>
    <header class="topnavbar-wrapper">
        <!-- START Top Navbar-->
        <nav class="navbar topnavbar">
            <!-- START navbar header-->
            <div class="navbar-header">
                <a class="navbar-brand" href="#/">
                    <div class="brand-logo">
                        <img class="img-fluid" src="../../assets/logo.png" alt="App Logo">
                    </div>
                </a>
            </div>
            <!-- END navbar header-->
            <ul class="navbar-nav mr-auto flex-row">
                <li v-if="headerMenuList.length > 0"  v-for="(item, index) in headerMenuList" class="nav-item">
                    <a href="" style="margin: 0 .95rem;" class="nav-link d-none d-md-block d-lg-block d-xl-block" @click.prevent="menuClick(index)">
                        {{$t("headerMenu." + item.name)}}
                    </a>
                </li>
            </ul>

            <template v-if="isLogged">

                <folder-button v-show="showUpload"></folder-button>
                <note-button v-show="showUpload"></note-button>

<!--                <button @click="openSearch" :aria-label="$t('buttons.search')" :title="$t('buttons.search')" class="search-button action">-->
<!--                    <i class="material-icons" style="color: #ffffff;">search</i>-->
<!--                </button>-->

                <button v-show="showSaveButton" :aria-label="$t('buttons.save')" :title="$t('buttons.save')" class="action" id="save-button">
                    <i class="material-icons" style="color: #ffffff;">save</i>
                </button>

                <!-- Menu that shows on listing AND mobile when there are files selected -->
                <div id="file-selection" v-if="isListing">
<!--                    <span v-if="selectedCount > 0">{{ selectedCount }} selected</span>-->
<!--                    <share-button v-show="showShareButton"></share-button>-->
                    <rename-button v-show="showRenameButton"></rename-button>
                    <copy-button v-show="showCopyButton"></copy-button>
                    <move-button v-show="showMoveButton"></move-button>
                    <delete-button v-show="showDeleteButton"></delete-button>
                </div>

                <!-- This buttons are shown on a dropdown on mobile phones -->
                <div :class="{ active: showMore }">
<!--                    <switch-button v-show="isListing"></switch-button>-->
                    <download-button v-show="showDownloadButton"></download-button>
                    <upload-button v-show="showUpload"></upload-button>
                    <upload-zip-button v-show="showUpload"></upload-zip-button>
                    <info-button v-show="isFiles && $route.path == fileRouter"></info-button>

                    <button v-show="showMultiple" @click="openSelect" :aria-label="$t('buttons.selectMultiple')" :title="$t('buttons.selectMultiple')" class="action">
                        <i class="material-icons" style="color: #ffffff;">check_circle</i>
                    </button>
                </div>

                <button v-if="isShowAuthCheck" @click="authCheck" id="more" :aria-label="$t('buttons.auth')" :title="$t('buttons.auth')" class="action">
                    <i class="material-icons" style="color: #ffffff;">group_add</i>
                </button>

                <button @click="preview" :aria-label="$t('sidebar.preview')" :title="$t('sidebar.preview')" class="action">
                    <i class="material-icons" style="color: #ffffff;">remove_red_eye</i>
                </button>

            </template>
            <!-- START Right Navbar-->
            <ul class="navbar-nav flex-row">

                <!-- Search icon-->
<!--                <li class="nav-item">-->
<!--                    <a class="nav-link" href="#" data-search-open="">-->
<!--                        <em class="icon-magnifier"></em>-->
<!--                    </a>-->
<!--                </li>-->
                <!-- Fullscreen (only desktops)-->
<!--                <li class="nav-item d-none d-md-block">-->
<!--                    <button style="width: 43px;height: 43px;margin: auto 0;" :aria-label="$t('sidebar.preview')" :title="$t('sidebar.preview')" class="action">-->
<!--                        <i class="material-icons" style="color: #ffffff;">more_vert</i>-->
<!--                    </button>-->
<!--                    <ToggleFullscreen tag="A" class="nav-link" href="#" />-->
<!--                </li>-->
                <!-- START Alert menu-->
                <b-nav-item-dropdown class="dropdown-list nav-item" no-caret menuClass="animated flipInX" right>
                    <template slot="button-content">
                        <button :aria-label="$t('sidebar.preview')" :title="$t('sidebar.preview')" class="action">
                            <i class="material-icons" style="color: #ffffff;">person</i>
                        </button>
<!--                        <em class="icon-bell"></em>-->
                        <!--<span class="badge badge-danger">11</span>-->
                    </template>
                    <b-dropdown-item style="min-width: 100px;">
                        <!-- START list group-->
                        <div class="list-group">

                            <div class="list-group-item list-group-item-action">
                                <span class="d-flex align-items-center">
                                    <span class="text-sm">修改密码</span>
                                    <!--<span class="badge badge-danger ml-auto">14</span>-->
                                </span>
                            </div>
                            <div class="list-group-item list-group-item-action">
                                <span class="d-flex align-items-center" @click="logout()">
                                    <span class="text-sm">退出</span>
                                    <!--<span class="badge badge-danger ml-auto">14</span>-->
                                </span>
                            </div>
                        </div>
                        <!-- END list group-->
                    </b-dropdown-item>
                </b-nav-item-dropdown>
                <!-- END Alert menu-->
                <!-- START Offsidebar button-->


<!--                <li>-->
                    <button style="width: 43px;height: 43px;margin: auto 0;" @click="toggleOffsidebar" :aria-label="$t('sidebar.preview')" :title="$t('sidebar.preview')" class="action">
                        <i class="material-icons" style="color: #ffffff;">more_vert</i>
                    </button>
<!--                    <a href="" class="nav-link" @click.prevent.prevent="toggleOffsidebar">-->
<!--                        <em class="icon-notebook"></em>-->
<!--                    </a>-->
<!--                </li>-->
                <!-- END Offsidebar.prevent menu-->
            </ul>
            <!-- END Right Navbar-->
            <HeaderSearch />
        </nav>
        <!-- END Top Navbar-->

        <b-modal title="预览" ok-only ok-title="确认" v-model="showPreview">
            <div class="container">
                <div class="row">
                    <div class="col"></div>
                    <div class="col-auto mt-3 mb-3">
                        <img v-if="qrcode_src" :src="qrcode_src" class="qrcode_img" />
                        <div v-if="previewLoading" class="qrcode_img text-center" style="line-height: 175px; position: absolute;top: 0; background-color: rgba(255, 255, 255, 0.5)">
                            <b-spinner></b-spinner>
                        </div>
                    </div>
                    <div class="col"></div>
                </div>
            </div>

        </b-modal>

    </header>
</template>

<script>

    import Search from '../Search'
    import InfoButton from '../buttons/Info'
    import DeleteButton from '../buttons/Delete'
    import RenameButton from '../buttons/Rename'
    import UploadButton from '../buttons/Upload'
    import UploadZipButton from '../buttons/UploadZip'
    import DownloadButton from '../buttons/Download'
    import SwitchButton from '../buttons/SwitchView'
    import MoveButton from '../buttons/Move'
    import CopyButton from '../buttons/Copy'
    import ShareButton from '../buttons/Share'
    import ShellButton from '../buttons/Shell'
    import {mapState} from 'vuex'
    import { logoURL } from '@/utils/constants'
    import {files as api} from '@/api'
    import {baseURL} from '@/utils/constants'
    import NoteButton from '../buttons/NoteAdd'
    import FolderButton from '../buttons/FolderAdd'

    import {mapGetters, mapMutations} from 'vuex'
    import HeaderSearch from '@/components/Layout/HeaderSearch'
    import ToggleFullscreen from '@/components/Common/ToggleFullscreen'

    import {CommonRequest, CommonResponse} from "../../proto/pb/auth_pb.js"
    import { AuthServiceClient } from "../../proto/pb/auth_grpc_web_pb.js"

    import { MenuRequest, MenuResponse } from "../../proto/pb/menu_pb.js"
    import { MenuServiceClient } from "../../proto/pb/menu_grpc_web_pb.js"

    const MENU_DATA = require('../../assets/menu/menu.json');

    export default {
        name: 'Header',
        components: {
            HeaderSearch,
            ToggleFullscreen,

            Search,
            InfoButton,
            DeleteButton,
            ShareButton,
            RenameButton,
            DownloadButton,
            CopyButton,
            UploadButton,
            UploadZipButton,
            SwitchButton,
            MoveButton,
            ShellButton,
            NoteButton,
            FolderButton,
        },
        data() {
            return {
                menuData: [],
                menuIndex: -1,

                popoverShow: true,
                showPreview: false,
                previewLoading: false,
                qrcode_src: "",

                fileRouter: '/overview/files'

            }
        },
        created() {
            this.authClient = new  AuthServiceClient(this.gRPC_url, null, null);
            this.menuClient = new MenuServiceClient(this.gRPC_url, null, null);

            // if (this.menuList == []) {
                this.getHeaderMenu();
            // }
        },
        computed: {
            req: {
                get () { return this.getSetting.req },
                // set (value) { this.changeSetting({name: 'req', value}) }
            },
            user: {
                get () { return this.getSetting.user },
                // set (value) { this.changeSetting({name: 'req', value}) }
            },
            reload: {
                get () { return this.getSetting.reload },
                // set (value) { this.changeSetting({name: 'req', value}) }
            },
            multiple: {
                get () { return this.getSetting.multiple },
                // set (value) { this.changeSetting({name: 'req', value}) }
            },

            gRPC_url: {
                get () { return this.getSetting.gRPC_url },
                // set (value) { this.changeSetting({name: 'gRPC_url', value}) }
            },
            isDebug: {
                get () { return this.getSetting.isDebug },
                // set (value) { this.changeSetting({name: 'isDebug', value}) }
            },
            headerMenuList: {
                get () { return this.getSetting.headerMenuList },
                set (value) { this.changeSetting({name: 'headerMenuList', value}) }
            },

            menuList: {
                get () { return this.getSetting.menuList },
                set (value) { this.changeSetting({name: 'menuList', value}) }
            },
            authList: {
                get () { return this.getSetting.authList },
                // set (value) { this.changeSetting({name: 'isDebug', value}) }
            },
            ...mapGetters([
                'getSetting',
                'getTheme',

                'selectedCount',
                'isFiles',
                'isEditor',
                'isListing',
                'isLogged'
            ]),
            logoURL: () => logoURL,
            isMobile () {
                return this.width <= 736
            },
            showMultiple() {
                return this.isListing && this.$route.path == this.fileRouter
            },
            showUpload () {
                // return true;
                return this.isListing && this.user.perm.create && this.$route.path == this.fileRouter
            },
            showSaveButton () {
                return this.isEditor && this.user.perm.modify
            },
            showDownloadButton () {
                return this.isFiles && this.user.perm.download && this.$route.path == this.fileRouter
            },
            showDeleteButton () {
                return this.isFiles
                    && (this.isListing
                    ? (this.selectedCount !== 0 && this.user.perm.delete)
                    : this.user.perm.delete)
            },
            showRenameButton () {
                return this.isFiles
                    && (this.isListing
                    ? (this.selectedCount === 1 && this.user.perm.rename)
                    : this.user.perm.rename)
            },
            showShareButton () {
                return this.isFiles
                    && (this.isListing
                    ? (this.selectedCount === 1 && this.user.perm.share)
                    : this.user.perm.share)
            },
            showMoveButton () {
                return this.isFiles
                    && (this.isListing
                    ? (this.selectedCount > 0 && this.user.perm.rename)
                    : this.user.perm.rename)
            },
            showCopyButton () {
                return this.isFiles
                    && (this.isListing
                    ? (this.selectedCount > 0 && this.user.perm.create)
                    : this.user.perm.create)
            },
            showMore () {
                return this.isFiles && this.$store.state.setting.show === 'more'
            },
            showOverlay () {
                return this.showMore
            },
            isShowAuthCheck() {
                return this.authList && this.authList.funcAuth &&
                    this.authList.funcAuth.isAuth;
            }
        },
        watch: {
            menuList(value) {
                // console.log("menuList changed: " + JSON.stringify(value));
            }
        },

        methods: {
            ...mapMutations([
                'changeSetting',
                'toggleSetting'
            ]),
            openSidebar () {
                this.$store.commit('showHover', 'sidebar')
            },
            authCheck () {
                this.$router.push('/authCheck');
            },
            openSearch () {
                this.$store.commit('showHover', 'search')
            },
            openSelect () {
                this.$store.commit('multiple', true)
                this.resetPrompts()
            },
            resetPrompts () {
                this.$store.commit('closeHovers')
            },
            preview() {
                this.showPreview = true;
                this.previewLoading = true;
                api.preview().then(this.getResponse)
                    .catch(this.$showError);
            },
            getResponse(resp) {
                // this.qrcode_src = resp; // {#} -i -sign
                let cId = this.$store.state.setting.cId;
                let appId = this.$store.state.setting.applicationObj.appId;
                this.qrcode_src = `${baseURL}/previews/api/qrcode.png?cId=${cId}&appId=${appId}`
                this.previewLoading = false;
            },
            // 获取一级菜单
            getHeaderMenu() {

                if (this.isDebug) {
                    let headerMenuList = [];
                    let obj = {};
                    Object.keys(MENU_DATA).forEach(key => {
                        let hasSubItem = MENU_DATA[key].subItem != undefined && Object.keys(MENU_DATA[key].subItem).length > 0; // {#} -i -sign
                        headerMenuList.push({
                            name: key,
                            title: MENU_DATA[key].title,
                            hasSubMenu: hasSubItem
                        });
                    });
                    this.headerMenuList = headerMenuList;
                    return ;
                }

                let menuRequest = new MenuRequest();
                menuRequest = this.addCommonRequest(menuRequest);
                let self = this;
                this.menuClient.getMenu(menuRequest, {}, (err, response) => {
                    self.doFilter(err, response, success => {
                        let list = success.getMenulistList();
                        let headerMenuList = [];
                        for (let index in list) {
                            let obj = {
                                name: list[index].getName(),
                                title: list[index].getTitle(),
                                hasSubMenu: list[index].getHassubmenu(),
                            };
                            headerMenuList.push(obj);
                        }
                        self.headerMenuList = headerMenuList;
                    }, fail => {})
                })
            },

            menuClick(index) {
                // this.$debug("click header menu item index: ", this.headerMenuList[index].name);
                this.menuIndex = index;
                this.menuList = [this.headerMenuList[index]];
                // this.$router.push(this.headerMenuList[index].name);
                // this.menuList[0] = this.headerMenuList[index];
            },
            // 退出登录
            logout() {
                let commonRequest = new CommonRequest();
                let self = this;

                this.authClient.logout(commonRequest, {}, (err, response) => {
                    self.doFilter(err, response, success => {
                        this.$router.push('/login');
                    }, fail => {});
                })
            },

            openPopover() {
                this.$refs.popover.$emit('open');
            },
            // 切换语言
            changeLanguage (lang) {
                this.$i18n.i18next.changeLanguage(lang);
            },
            /**
             * Triggers a window resize event when clicked
             * for plugins that needs to be redrawed
             */
            resize: e => {
                // all IE friendly dispatchEvent
                var evt = document.createEvent('UIEvents');
                evt.initUIEvent('resize', true, false, window, 0);
                window.dispatchEvent(evt);
                // modern dispatchEvent way
                // window.dispatchEvent(new Event('resize'));
            },

            toggleOffsidebar() {
                this.toggleSetting('offsidebarOpen')
            },
            toggleOffcanvas() {
                this.toggleSetting('asideToggled')
            },
            toggleAsideCollapsed() {
                this.toggleSetting('isCollapsed')
                this.resize();
            },
            toggleUserBlock() {
                this.toggleSetting('showUserBlock')
            }
        }
    }
</script>

<style scoped>
    .qrcode_img {

        height: 175px;
        width: 175px;
    }
</style>

