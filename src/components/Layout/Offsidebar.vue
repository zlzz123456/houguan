<template>
    <aside class="offsidebar d-none">
        <b-tabs nav-class="nav-justified">
            <b-tab title="first" active>
                <template slot="title">
                    <em class="icon-equalizer fa-lg"></em>
                </template>
                <h3 class="text-center text-thin mt-4">设置</h3>
                <div class="p-2">
                    <h4 class="text-muted text-thin">主题</h4>
                    <div class="row row-flush mb-2">
                        <div class="col mb-2">
                            <div class="setting-color">
                                <label>
                                    <input type="radio" name="setting-theme" checked="checked" v-model="themePath" value="static/themes/theme-a.css">
                                    <span class="icon-check"></span>
                                    <span class="split">
                                        <span class="color bg-info"></span>
                                        <span class="color bg-info-light"></span>
                                    </span>
                                    <span class="color bg-white"></span>
                                </label>
                            </div>
                        </div>
                        <div class="col mb-2">
                            <div class="setting-color">
                                <label>
                                    <input type="radio" name="setting-theme" v-model="themePath" value="static/themes/theme-b.css">
                                    <span class="icon-check"></span>
                                    <span class="split">
                                        <span class="color bg-green"></span>
                                        <span class="color bg-green-light"></span>
                                    </span>
                                    <span class="color bg-white"></span>
                                </label>
                            </div>
                        </div>
                        <div class="col mb-2">
                            <div class="setting-color">
                                <label>
                                    <input type="radio" name="setting-theme" v-model="themePath" value="static/themes/theme-c.css">
                                    <span class="icon-check"></span>
                                    <span class="split">
                                        <span class="color bg-purple"></span>
                                        <span class="color bg-purple-light"></span>
                                    </span>
                                    <span class="color bg-white"></span>
                                </label>
                            </div>
                        </div>
                        <div class="col mb-2">
                            <div class="setting-color">
                                <label>
                                    <input type="radio" name="setting-theme" v-model="themePath" value="static/themes/theme-d.css">
                                    <span class="icon-check"></span>
                                    <span class="split">
                                        <span class="color bg-danger"></span>
                                        <span class="color bg-danger-light"></span>
                                    </span>
                                    <span class="color bg-white"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="row row-flush mb-2">
                        <div class="col mb-2">
                            <div class="setting-color">
                                <label>
                                    <input type="radio" name="setting-theme" v-model="themePath" value="static/themes/theme-e.css">
                                    <span class="icon-check"></span>
                                    <span class="split">
                                        <span class="color bg-info-dark"></span>
                                        <span class="color bg-info"></span>
                                    </span>
                                    <span class="color bg-gray-dark"></span>
                                </label>
                            </div>
                        </div>
                        <div class="col mb-2">
                            <div class="setting-color">
                                <label>
                                    <input type="radio" name="setting-theme" v-model="themePath" value="static/themes/theme-f.css">
                                    <span class="icon-check"></span>
                                    <span class="split">
                                        <span class="color bg-green-dark"></span>
                                        <span class="color bg-green"></span>
                                    </span>
                                    <span class="color bg-gray-dark"></span>
                                </label>
                            </div>
                        </div>
                        <div class="col mb-2">
                            <div class="setting-color">
                                <label>
                                    <input type="radio" name="setting-theme" v-model="themePath" value="static/themes/theme-g.css">
                                    <span class="icon-check"></span>
                                    <span class="split">
                                        <span class="color bg-purple-dark"></span>
                                        <span class="color bg-purple"></span>
                                    </span>
                                    <span class="color bg-gray-dark"></span>
                                </label>
                            </div>
                        </div>
                        <div class="col mb-2">
                            <div class="setting-color">
                                <label>
                                    <input type="radio" name="setting-theme" v-model="themePath" value="static/themes/theme-h.css">
                                    <span class="icon-check"></span>
                                    <span class="split">
                                        <span class="color bg-danger-dark"></span>
                                        <span class="color bg-danger"></span>
                                    </span>
                                    <span class="color bg-gray-dark"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="p-2">
                    <h4 class="text-muted text-thin">语言</h4>
                    <div class="clearfix" v-for="item in languages">
                        <p class="float-left">{{item.title}}</p>
                        <div class="float-right">
                            <label class="switch">
                                <input type="checkbox" name="isFixed" v-model="item.status" @change="changeLanguage(item.name)">
                                <span></span>
                            </label>
                        </div>
                    </div>
<!--                    <div class="clearfix">-->
<!--                        <p class="float-left">中文</p>-->
<!--                        <div class="float-right">-->
<!--                            <label class="switch">-->
<!--                                <input type="checkbox" name="isBoxed" @change="changeLanguage('zh')">-->
<!--                                <span></span>-->
<!--                            </label>-->
<!--                        </div>-->
<!--                    </div>-->
                </div>
<!--                <div class="p-2">-->
<!--                    <h4 class="text-muted text-thin">Layout</h4>-->
<!--                    <div class="clearfix">-->
<!--                        <p class="float-left">Fixed</p>-->
<!--                        <div class="float-right">-->
<!--                            <label class="switch">-->
<!--                                <input type="checkbox" name="isFixed" v-model="isFixed">-->
<!--                                <span></span>-->
<!--                            </label>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div class="clearfix">-->
<!--                        <p class="float-left">Boxed</p>-->
<!--                        <div class="float-right">-->
<!--                            <label class="switch">-->
<!--                                <input type="checkbox" name="isBoxed" v-model="isBoxed">-->
<!--                                <span></span>-->
<!--                            </label>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div class="p-2">-->
<!--                    <h4 class="text-muted text-thin">Aside</h4>-->
<!--                    <div class="clearfix">-->
<!--                        <p class="float-left">Collapsed</p>-->
<!--                        <div class="float-right">-->
<!--                            <label class="switch">-->
<!--                                <input type="checkbox" name="isCollapsed" v-model="isCollapsed">-->
<!--                                <span></span>-->
<!--                            </label>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div class="clearfix">-->
<!--                        <p class="float-left">Collapsed Text</p>-->
<!--                        <div class="float-right">-->
<!--                            <label class="switch">-->
<!--                                <input type="checkbox" name="isCollapsedText" v-model="isCollapsedText">-->
<!--                                <span></span>-->
<!--                            </label>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div class="clearfix">-->
<!--                        <p class="float-left">Float</p>-->
<!--                        <div class="float-right">-->
<!--                            <label class="switch">-->
<!--                                <input type="checkbox" name="isFloat" v-model="isFloat">-->
<!--                                <span></span>-->
<!--                            </label>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div class="clearfix">-->
<!--                        <p class="float-left">Hover</p>-->
<!--                        <div class="float-right">-->
<!--                            <label class="switch">-->
<!--                                <input type="checkbox" name="asideHover" v-model="asideHover">-->
<!--                                <span></span>-->
<!--                            </label>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div class="clearfix">-->
<!--                        <p class="float-left">Show Scrollbar</p>-->
<!--                        <div class="float-right">-->
<!--                            <label class="switch">-->
<!--                                <input type="checkbox" name="asideScrollbar" v-model="asideScrollbar">-->
<!--                                <span></span>-->
<!--                            </label>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
            </b-tab>
<!--            <b-tab title="second" >-->
<!--                <template slot="title">-->
<!--                    <em class="icon-user fa-lg"></em>-->
<!--                </template>-->
<!--                <h3 class="text-center text-thin mt-4">Connections</h3>-->
<!--                <div class="list-group">-->
<!--                    &lt;!&ndash; START list title&ndash;&gt;-->
<!--                    <div class="list-group-item border-0">-->
<!--                        <small class="text-muted">ONLINE</small>-->
<!--                    </div>-->
<!--                    &lt;!&ndash; END list title&ndash;&gt;-->
<!--                    <div class="list-group-item list-group-item-action border-0">-->
<!--                        <div class="media">-->
<!--                            <img class="align-self-center mr-3 rounded-circle thumb48" src="img/user/05.jpg" alt="Image">-->
<!--                            <div class="media-body text-truncate">-->
<!--                                <a href="#">-->
<!--                                    <strong>Juan Sims</strong>-->
<!--                                </a>-->
<!--                                <br>-->
<!--                                <small class="text-muted">Designeer</small>-->
<!--                            </div>-->
<!--                            <div class="ml-auto">-->
<!--                                <span class="circle bg-success circle-lg"></span>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div class="list-group-item list-group-item-action border-0">-->
<!--                        <div class="media">-->
<!--                            <img class="align-self-center mr-3 rounded-circle thumb48" src="img/user/06.jpg" alt="Image">-->
<!--                            <div class="media-body text-truncate">-->
<!--                                <a href="#">-->
<!--                                    <strong>Maureen Jenkins</strong>-->
<!--                                </a>-->
<!--                                <br>-->
<!--                                <small class="text-muted">Designeer</small>-->
<!--                            </div>-->
<!--                            <div class="ml-auto">-->
<!--                                <span class="circle bg-success circle-lg"></span>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div class="list-group-item list-group-item-action border-0">-->
<!--                        <div class="media">-->
<!--                            <img class="align-self-center mr-3 rounded-circle thumb48" src="img/user/07.jpg" alt="Image">-->
<!--                            <div class="media-body text-truncate">-->
<!--                                <a href="#">-->
<!--                                    <strong>Billie Dunn</strong>-->
<!--                                </a>-->
<!--                                <br>-->
<!--                                <small class="text-muted">Designeer</small>-->
<!--                            </div>-->
<!--                            <div class="ml-auto">-->
<!--                                <span class="circle bg-danger circle-lg"></span>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div class="list-group-item list-group-item-action border-0">-->
<!--                        <div class="media">-->
<!--                            <img class="align-self-center mr-3 rounded-circle thumb48" src="img/user/08.jpg" alt="Image">-->
<!--                            <div class="media-body text-truncate">-->
<!--                                <a href="#">-->
<!--                                    <strong>Tomothy Roberts</strong>-->
<!--                                </a>-->
<!--                                <br>-->
<!--                                <small class="text-muted">Designeer</small>-->
<!--                            </div>-->
<!--                            <div class="ml-auto">-->
<!--                                <span class="circle bg-warning circle-lg"></span>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    &lt;!&ndash; START list title&ndash;&gt;-->
<!--                    <div class="list-group-item border-0">-->
<!--                        <small class="text-muted">OFFLINE</small>-->
<!--                    </div>-->
<!--                    &lt;!&ndash; END list title&ndash;&gt;-->
<!--                    <div class="list-group-item list-group-item-action border-0">-->
<!--                        <div class="media">-->
<!--                            <img class="align-self-center mr-3 rounded-circle thumb48" src="img/user/09.jpg" alt="Image">-->
<!--                            <div class="media-body text-truncate">-->
<!--                                <a href="#">-->
<!--                                    <strong>Lawrence Robinson</strong>-->
<!--                                </a>-->
<!--                                <br>-->
<!--                                <small class="text-muted">Designeer</small>-->
<!--                            </div>-->
<!--                            <div class="ml-auto">-->
<!--                                <span class="circle bg-warning circle-lg"></span>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div class="list-group-item list-group-item-action border-0">-->
<!--                        <div class="media">-->
<!--                            <img class="align-self-center mr-3 rounded-circle thumb48" src="img/user/10.jpg" alt="Image">-->
<!--                            <div class="media-body text-truncate">-->
<!--                                <a href="#">-->
<!--                                    <strong>Tyrone Owens</strong>-->
<!--                                </a>-->
<!--                                <br>-->
<!--                                <small class="text-muted">Designeer</small>-->
<!--                            </div>-->
<!--                            <div class="ml-auto">-->
<!--                                <span class="circle bg-warning circle-lg"></span>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div class="px-3 py-4 text-center">-->
<!--                    &lt;!&ndash; Optional link to list more users&ndash;&gt;-->
<!--                    <a class="btn btn-purple btn-sm" href="#" title="See more contacts">-->
<!--                        <strong>Load more..</strong>-->
<!--                    </a>-->
<!--                </div>-->
<!--                &lt;!&ndash; Extra items&ndash;&gt;-->
<!--                <div class="px-3 py-2">-->
<!--                    <p>-->
<!--                        <small class="text-muted">Tasks completion</small>-->
<!--                    </p>-->
<!--                    <div class="progress progress-xs m-0">-->
<!--                        <div class="progress-bar bg-success" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style="width: 80%">-->
<!--                            <span class="sr-only">80% Complete</span>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div class="px-3 py-2">-->
<!--                    <p>-->
<!--                        <small class="text-muted">Upload quota</small>-->
<!--                    </p>-->
<!--                    <div class="progress progress-xs m-0">-->
<!--                        <div class="progress-bar bg-warning" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: 40%">-->
<!--                            <span class="sr-only">40% Complete</span>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </b-tab>-->

        </b-tabs>

    </aside>
</template>

<script>
    import { mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'Offsidebar',
        data() {
            return {
                languages: [
                    {
                        name: 'en',
                        title: 'English',
                        status: false
                    },
                    {
                        name: 'zh',
                        title: '中文',
                        status: false
                    }
                ]
            }
        },
        created() {},
        computed: {
            isFixed: {
                get () { return this.getSetting.isFixed },
                set (value) { this.changeSetting({name: 'isFixed', value}) }
            },
            isBoxed: {
                get () { return this.getSetting.isBoxed },
                set (value) { this.changeSetting({name: 'isBoxed', value}) }
            },
            isCollapsed: {
                get () { return this.getSetting.isCollapsed },
                set (value) { this.changeSetting({name: 'isCollapsed', value}) }
            },
            isCollapsedText: {
                get () { return this.getSetting.isCollapsedText },
                set (value) { this.changeSetting({name: 'isCollapsedText', value}) }
            },
            isFloat: {
                get () { return this.getSetting.isFloat },
                set (value) { this.changeSetting({name: 'isFloat', value}) }
            },
            asideHover: {
                get () { return this.getSetting.asideHover },
                set (value) { this.changeSetting({name: 'asideHover', value}) }
            },
            asideScrollbar: {
                get () { return this.getSetting.asideScrollbar },
                set (value) { this.changeSetting({name: 'asideScrollbar', value}) }
            },
            themePath: {
                get () { return this.getTheme },
                set (value) { this.changeTheme(value) }
            },
            ...mapGetters([
                'getSetting',
                'getTheme'
            ])
        },
        methods: {
            ...mapMutations([
                'changeSetting',
                'changeTheme'
            ]),
            changeLanguage(name) {

                this.languages.forEach(item => {
                    item.status = item.name == name;
                });
                this.$i18n.i18next.changeLanguage(name);

                // console.log('current language: ' + this.$i18n.i18next.language);
            },
        },
        mounted() {
            // unhide offsidebar on mounted
            document.querySelector('.offsidebar.d-none').classList.remove('d-none')

            let lng = this.$i18n.i18next.language || window.localStorage.i18nextLng || 'zh';
            // console.log('lng: ' + lng);
            for (let index in this.languages) {
                this.languages[index].status = this.languages[index].name == lng;
            }
            // console.log('languages: ' + JSON.stringify(this.languages))

        }
    }
</script>
