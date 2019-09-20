<template>
    <div class="wrapper">

        <!-- top navbar-->
        <Header />

        <!-- sidebar-->
<!--        <Sidebar />-->

        <!-- offsidebar-->
        <Offsidebar />

        <!-- Main section-->
        <section class="section-container" style="margin-right: 220px">
            <!-- Page content-->
            <router-view/>
        </section>

        <!-- Page footer-->
        <Footer style="margin-right: 220px"/>

        <!-- 提示框 -->
        <b-modal v-model="isErrorAlert"
                 ok-only
                 no-close-on-backdrop
                 @ok="isErrorAlert = false"
                 @cancel="isErrorAlert = false"
                 title="提示">
            <p class="my-4">{{alertMessage}}</p>
        </b-modal>

    </div>
</template>

<script>
    import Vue from 'vue';
    import Header from './Header'
    import Sidebar from './Sidebar'
    import Offsidebar from './Offsidebar'
    import Footer from './Footer'
    import ContentWrapper from './ContentWrapper'
    import {mapGetters, mapMutations} from "vuex";

    Vue.component('ContentWrapper', ContentWrapper)

    export default {
        name: 'Layout',
        components: {
            Header,
            Sidebar,
            Offsidebar,
            Footer
        },
        computed: {
            alertMessage: {
                get () { return this.getSetting.alertMessage },
                set (value) { this.changeSetting({name: 'alertMessage', value}) }
            },
            isErrorAlert: {
                get() { return this.getSetting.isErrorAlert;},
                set(value) { this.changeSetting({name: 'isErrorAlert', value})}
            },
            ...mapGetters([
                'getSetting',
                'getTheme'
            ])
        },
        methods: {
            // 修改全局变量 需要导入
            ...mapMutations([
                'changeSetting',
                'changeTheme'
            ])
        }
    }
</script>
