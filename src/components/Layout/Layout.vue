<template>
    <div class="wrapper">

        <!-- top navbar-->
        <Header />

        <!-- sidebar-->
        <Sidebar />

        <!-- offsidebar-->
        <Offsidebar />

        <!-- Main section-->
        <section class="section-container">
            <!-- Page content-->
            <main>
                <router-view/>
            </main>
        </section>

        <!-- Page footer-->
        <Footer />

        <prompts></prompts>

        <!-- 提示框 -->
        <b-modal v-model="isErrorAlert"
                 ok-only
                 no-close-on-backdrop
                 @ok="isErrorAlert = false"
                 @cancel="isErrorAlert = false"
                 title="提示">
            <p class="my-4">{{alertMessage}}</p>
        </b-modal>

        <div v-if="isLoading" class="text-center modal fade show d-block" style="background-color: rgba(255, 255, 255, 0.5)">
            <b-spinner style="margin-top: 300px" variant="primary" label="Spinning"></b-spinner>
        </div>

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

    import Prompts from '@/components/prompts/Prompts'


    Vue.component('ContentWrapper', ContentWrapper)

    export default {
        name: 'Layout',
        components: {
            Header,
            Sidebar,
            Offsidebar,
            Footer,
            Prompts
        },
        computed: {
            alertMessage: {
                get () { return this.getSetting.alertMessage },
                set (value) { this.changeSetting({name: 'alertMessage', value}) }
            },
            isLoading: {
                get() { return this.getSetting.isLoading;},
                set(value) { this.changeSetting({name: 'isLoading', value})}
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
