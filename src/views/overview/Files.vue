<template>
    <div>
        <div id="breadcrumbs" class="pl-2">

            <b-link @click="changeFileUrl('/')" :aria-label="$t('files.home')" :title="$t('files.home')">
                <i class="material-icons">home</i>
            </b-link>

            <span v-for="(link, index) in breadcrumbs" :key="index">
        <span class="chevron"><i class="material-icons">keyboard_arrow_right</i></span>
        <b-link @click="changeFileUrl(link.url)">{{ link.name }}</b-link>
      </span>
        </div>
        <div v-if="error">
            <not-found v-if="error.message === '404'"></not-found>
            <forbidden v-else-if="error.message === '403'"></forbidden>
            <internal-error v-else></internal-error>
        </div>
        <editor v-else-if="isEditor"></editor>
        <listing :class="{ multiple }" v-else-if="isListing"></listing>
        <preview  v-else-if="isPreview"></preview>
        <div v-else>
            <h2 class="message">
                <span>{{ $t('files.loading') }}</span>
            </h2>
        </div>
    </div>
</template>

<script>
    import Prompts from '@/components/prompts/Prompts'
    import Forbidden from '../errors/403'
    import NotFound from '../errors/404'
    import InternalError from '../errors/500'
    import Preview from '@/components/files/Preview'
    import Listing from '@/components/files/Listing'
    import Editor from '@/components/files/Editor'
    import {files as api} from '@/api'
    import { login } from '@/utils/auth'
    import {mapGetters, mapState, mapMutations} from 'vuex'

    function clean(path) {
        return path.endsWith('/') ? path.slice(0, -1) : path
    }

    export default {
        name: 'files',
        components: {
            Forbidden,
            NotFound,
            InternalError,
            Preview,
            Listing,
            Editor,
            Prompts
        },
        computed: {
            fileUrl: {
                get() {
                    return this.getSetting.fileUrl;
                },
                set(value) {
                    this.changeSetting({name: 'fileUrl', value})
                }
            },
            multiple: {
                get() {
                    return this.getSetting.multiple;
                }
            },
            reload: {
                get() {
                    return this.getSetting.reload;
                }
            },
            loading: {
                get() {
                    return this.getSetting.loading;
                }
            },
            applicationObj: {
                get() {
                    return this.getSetting.applicationObj;
                }
            },
            ...mapGetters([
                'getSetting',
                'selectedCount',
                'isListing',
                'isEditor',
                'isFiles'
            ]),
            // ...mapState([
            //     // 'req',
            //     // 'user',
            //     // 'reload',
            //     // 'multiple',
            //     // 'loading'
            // ]),
            isPreview() {
                return !this.loading && !this.isListing && !this.isEditor
            },
            breadcrumbs() {
                if (this.getSetting.req.path == undefined)  {
                    return [];
                }
                let parts = this.getSetting.req.path.split('/') // {#} -i -sign

                if (parts[0] === '') {
                    parts.shift()
                }

                if (parts[parts.length - 1] === '') {
                    parts.pop()
                }

                let outputParts = parts; // {#} -i -sign

                let breadcrumbs = []

                for (let i = 0; i < parts.length; i++) {
                    if (i === 0) {
                        breadcrumbs.push({name: decodeURIComponent(parts[i]), url: '/' + parts[i] + '/'})
                    } else {
                        breadcrumbs.push({
                            name: decodeURIComponent(parts[i]),
                            url: breadcrumbs[i - 1].url + parts[i] + '/'
                        })
                    }
                }

                // breadcrumbs.shift()

                if (breadcrumbs.length > 3) {
                    while (breadcrumbs.length !== 4) {
                        breadcrumbs.shift()
                    }

                    breadcrumbs[0].name = '...'
                }

                let outputBreadcrumbs = breadcrumbs; // {#} -i -sign

                return breadcrumbs
            }
        },
        data: function () {
            return {
                error: null
            }
        },
        created() {
            this.fetchData()
        },
        watch: {
            applicationObj() {
                this.fetchData();
            },
            fileUrl() {
                this.fetchData();
            },
            'reload': function () {
                this.fetchData()
            }
        },
        mounted() {
            window.addEventListener('keydown', this.keyEvent)
            window.addEventListener('scroll', this.scroll)
        },
        beforeDestroy() {
            window.removeEventListener('keydown', this.keyEvent)
            window.removeEventListener('scroll', this.scroll)
        },
        destroyed() {
            this.$store.commit('updateRequest', {})
        },
        methods: {
            ...mapMutations(['changeSetting', 'setLoading']),
            changeFileUrl(url) {
                this.fileUrl = url;
            },
            async fetchData() {
                // Reset view information.
                this.$store.commit('setReload', false)
                this.$store.commit('resetSelected')
                this.$store.commit('multiple', false)
                this.$store.commit('closeHovers')

                // Set loading to true and reset the error.
                this.setLoading(true)
                this.error = null

                let url = this.fileUrl;

                if (url === '') url = '/'
                if (url[0] !== '/') url = '/' + url

                try {

                    await login();

                    const res = await api.fetch(url);
                    // this.$log('params: ', this.$route.params.pathMatch);
                    let path = res.path; // {#} -i -sign
                    let cleanPath = clean(res.path); // {#} -i -sign
                    // if (clean(res.path) !== clean(`/${this.$route.params.pathMatch}`)) {
                    //     return
                    // }

                    this.$store.commit('updateRequest', res)
                    document.title = res.name

                    let req222 = this.getSetting.req; // {#} -i -sign
                } catch (e) {
                    this.error = e
                } finally {
                    this.setLoading(false)
                }
            },
            keyEvent(event) {
                // Esc!
                if (event.keyCode === 27) {
                    this.$store.commit('closeHovers')

                    // If we're on a listing, unselect all
                    // files and folders.
                    if (this.isListing) {
                        this.$store.commit('resetSelected')
                    }
                }

                // Del!
                if (event.keyCode === 46) {
                    if (this.isEditor ||
                        !this.isFiles ||
                        this.loading ||
                        // !this.user.perm.delete ||
                        (this.isListing && this.selectedCount === 0)) return

                    this.$store.commit('showHover', 'delete')
                }

                // F1!
                if (event.keyCode === 112) {
                    event.preventDefault()
                    this.$store.commit('showHover', 'help')
                }

                // F2!
                if (event.keyCode === 113) {
                    if (this.isEditor ||
                        !this.isFiles ||
                        this.loading ||
                        // !this.user.perm.rename ||
                        (this.isListing && this.selectedCount === 0) ||
                        (this.isListing && this.selectedCount > 1)) return

                    this.$store.commit('showHover', 'rename')
                }

                // CTRL + S
                if (event.ctrlKey || event.metaKey) {
                    if (this.isEditor) return

                    if (String.fromCharCode(event.which).toLowerCase() === 's') {
                        event.preventDefault()

                        if (this.req.kind !== 'editor') {
                            document.getElementById('download-button').click()
                        }
                    }
                }
            },
            scroll() {

                // if (this.req.kind !== 'listing' || this.$store.state.user.viewMode === 'mosaic') return

                let top = 112 - window.scrollY

                if (top < 64) {
                    top = 64
                }

                // document.querySelector('#listing.list .item.header').style.top = top + 'px'
            },
            openSidebar() {
                this.$store.commit('showHover', 'sidebar')
            },
            openSearch() {
                this.$store.commit('showHover', 'search')
            }
        }
    }
</script>
