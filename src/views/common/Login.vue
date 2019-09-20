<template>
    <div class="block-center mt-4 wd-xl">
        <div class="card card-flat">
            <div class="card-header text-center bg-dark">
                <a href="#">
                    <img class="block-center rounded" src="../../assets/logo.png" alt="Image"/>
                </a>
            </div>
            <div class="card-body">
                <form class="mb-3" @submit.prevent="validateBeforeSubmit('login')" data-vv-scope="login">
                    <div class="form-group">
                        <div class="input-group with-focus">
                            <input :class="{'form-control':true, 'is-invalid': errors.has('login.username')}"
                                   placeholder="请输入用户名" v-model="login.username" v-validate="'required'"
                                   type="text" name="username" data-vv-as="用户名"/>
                            <span v-show="errors.has('login.username')" class="invalid-feedback">{{ errors.first('login.username') }}</span>
                        </div>
                        <div class="email-img">
                            <span class="input-group-text text-muted bg-transparent border-0">
                                <em class="fa fa-envelope"></em>
                            </span>
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="input-group with-focus">
                            <input :class="{'form-control ':true, 'is-invalid': errors.has('login.password')}"
                                   v-model="login.password" v-validate="'required|alpha_num'" type="password" name="password"
                                   placeholder="请输入密码" data-vv-as="密码"/>
                            <span v-show="errors.has('login.password')" class="invalid-feedback">{{ errors.first('login.password') }}</span>
                        </div>
                        <div class="pwd-img" :class="[errors.has('login.username') ? 'error-top' : 'normal-top']">
                            <span class="input-group-text text-muted bg-transparent border-0">
                                <em class="fa fa-lock"></em>
                            </span>
                        </div>
                    </div>
<!--                    <div v-if="hasCid" class="form-group">-->
<!--                        <div class="input-group with-focus">-->
<!--                            <input :class="{'form-control':true, 'is-invalid': errors.has('login.cid')}"-->
<!--                                   placeholder="请输入租户ID" v-model="login.cid" v-validate="'required'"-->
<!--                                   type="text" name="cid" data-vv-as="用户名"/>-->
<!--                            <span v-show="errors.has('login.cid')" class="invalid-feedback">{{ errors.first('login.cid') }}</span>-->
<!--                        </div>-->
<!--                        <div class="email-img">-->
<!--                            <span class="input-group-text text-muted bg-transparent border-0">-->
<!--                                <em class="fa fa-envelope"></em>-->
<!--                            </span>-->
<!--                        </div>-->
<!--                    </div>-->

                    <button class="btn btn-block btn-primary mt-3" type="submit">登录</button>
                </form>
            </div>
        </div>

        <div class="p-3 text-center">
            <span class="mr-2">&copy;</span>
            <span>2019</span>
            <span class="mr-2">-</span>
            <span>CSII</span>
            <br/>
        </div>

        <!-- 提示框 -->
        <b-modal v-model="isShow"
                 @ok="isShow = false"
                 @cancel="isShow = false"
                 title="BootstrapVue">
            <p class="my-4">{{message}}</p>
        </b-modal>
    </div>
</template>
<script>

    import {LoginRequest, LoginResponse} from "../../proto/pb/auth_pb.js"
    import { AuthServiceClient } from "../../proto/pb/auth_grpc_web_pb.js"
    import {mapGetters, mapMutations} from "vuex"

    export default {
        data() {
            return {
                login: {
                    cid: "",
                    username: '',
                    password: '',
                    rememberme: false
                },
                isShow: false,
                message: "",

                hasCid: false
            }
        },
        created() {
            this.client = new  AuthServiceClient(this.gRPC_url, null, null);
        },
        computed: {
            userId: {
                get () { return this.getSetting.userId },
                set (value) { this.changeSetting({name: 'userId', value}) }
            },
            cId: {
                get () { return this.getSetting.cId },
                set (value) { this.changeSetting({name: 'cId', value}) }
            },
            authList: {
                get () { return this.getSetting.authList },
                set (value) { this.changeSetting({name: 'authList', value}) }
            },
            gRPC_url: {
                get () { return this.getSetting.gRPC_url },
                // set (value) { this.changeSetting({name: 'gRPC_url', value}) }
            },
            isErrorAlert: {
                get() { return this.getSetting.isErrorAlert;},
                set(value) { this.changeSetting({name: 'isErrorAlert', value})}
            },
            baseURL: {
                get() { return this.getSetting.baseURL;},
                set(value) { this.changeSetting({name: 'baseURL', value})}
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

            toLogin(name, pwd) {
                let request = new LoginRequest();
                let self = this;

                request.setUsername(name);
                request.setPassword(pwd);
                if (this.hasCid) {
                    // request.setCid(this.login.cid);
                } else {
                    request.setCid("csii");
                }

                this.clearData();

                this.client.login(request, {}, (err, response) => { // {#} -i -t gRPC_login -sign -from

                    let options = {
                        // showErrorAlert: false
                    };
                    self.doFilter(err, response, success => {
                        this.userId = success.getUserid(); // {#} -i -sign
                        this.cId = success.getCid(); // {#} -i -sign
                        this.authList = JSON.parse(success.getAuthlist()); // {#} -i -sign
                        // this.baseURL = success.getBaseurl();
                        self.jumpToDevice();

                    }, (fail, message) => {
                        // console.log("fail: " + message);
                        // message += "，您已经输入错误" + fail.getErrorcounts() + "次"
                        // self.message = message;
                        // self.isShow = true;
                    }, options);
                });
                // call.on('status', function(status) {
                //     if (status.metadata) {
                //         console.log("Received metadata");
                //         console.log(status.metadata);
                //     }
                // });
            },

            jumpToDevice() {
                this.$router.push("/applicationList");
            },

            clearData() {
                this.username = "";
                this.password = "";
            },

            validateBeforeSubmit(scope) {

                this.$validator.validateAll(scope).then((result) => { // {#} -i -t validate -sign
                    if (result) {

                        this.toLogin(this.login.username, this.login.password); // {#} -i -t toLogin() -sign -from
                    } else {

                        let outputErrors = this.errors.items[0].msg; // {#} -i -t errors -sign
                    }
                });
            },
        }
    }
</script>

<style scoped>
    .email-img {
        position: absolute;
        top: 88px;
        right: 15px;
        z-index: 999;
    }
    .pwd-img {
        position: absolute;
        right: 15px;
        z-index: 999;
    }

    .normal-top {
        top: 139px;
    }

    .error-top {
        top: 161px;
    }
</style>
