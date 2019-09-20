<template>
    <ContentWrapper>

        <list :j-path="jsonPath" :s-path="schemaPath" :to-jump="toJump"
              :hasNewButton="hasNewButton" :opArray="opArray"
              :debug-json-data="jsonData" :debug-schema-data="schemaData"></list>

    </ContentWrapper>
</template>

<script>

    import list from "../../components/Common/list"
    import {mapGetters, mapMutations} from "vuex";

    export default {
        components: {list},
        data() {
            return {

                // jsonPath: "setting/normal.json",
                // schemaPath: "setting/normal.schema.json",

                jsonData: require('../../assets/app/_list.json'),
                schemaData: require('../../assets/app/config.schema.json'),
            }
        },
        computed: {
            applicationObj: {
                get() {
                    return this.getSetting.applicationObj;
                },
                set(value) {
                    this.changeSetting({name: 'applicationObj', value})
                }
            },

            applicationURL: {
                get() {
                    return this.getSetting.applicationURL;
                },
                set(value) {
                    this.changeSetting({name: 'applicationURL', value})
                }
            },
            packageURL: {
                get() {
                    return this.getSetting.packageURL;
                },
            },
            authList: {
                get() {
                    return this.getSetting.authList;
                },
            },
            ...mapGetters(['getSetting']),

            jsonPath() {
                return "shared/apps/_list.json"
            },

            schemaPath() {
                return "apps/config.schema.json"
            },

            hasNewButton() {
                if (this.authList.funcAuth == undefined) {
                    return false;
                }
                if (this.authList.funcAuth.isCreateOrDelApp == undefined) {
                    return false;
                }

                return this.authList.funcAuth.isCreateOrDelApp;

            },

            opArray() {
                let array = [];
                if (this.hasNewButton) {
                    array.push('edit', 'del');
                }
                return array;
            }

        },
        methods: {
            toJump(data) {
                this.applicationObj = data;
                this.applicationURL = this.applicationObj.appId + '/';
                this.$router.push("/overview/templateList");
            },
        }

    }
</script>
