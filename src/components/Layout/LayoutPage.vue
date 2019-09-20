<template>
    <div class="wrapper">
        <!-- Page content-->
        <router-view/>
        <!-- 提示框 -->
        <b-modal v-model="isErrorAlert"
                 no-close-on-backdrop
                 @ok="isErrorAlert = false"
                 @cancel="isErrorAlert = false"
                 title="提示">
            <p class="my-4">{{alertMessage}}</p>
        </b-modal>
    </div>


</template>

<script>
    import {mapGetters, mapMutations} from "vuex";

    export default {
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
