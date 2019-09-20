<template>
    <ContentWrapper>

        <list :j-path="jsonPath" :s-path="schemaPath" :to-jump="toJump"
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

                jsonData: [],
                schemaData: {},
            }
        },
        created() {
            if (this.isDebug) {
                this.jsonData = require('../../assets' + this.debugPath + 'components/data/_list.json'); // {#} -i -sign
                this.schemaData = require('../../assets' + this.debugPath + 'components/schema/config.schema.json') // {#} -i -sign
            }
        },
        computed: {
            applicationURL: {
                get() {
                    return this.getSetting.applicationURL;
                },
            },
            packageURL: {
                get() {
                    return this.getSetting.packageURL;
                },
            },
            isDebug: {
                get() {
                    return this.getSetting.isDebug;
                },
            },
            debugPath: {
                get() {
                    return this.getSetting.debugPath;
                },
            },
            ...mapGetters(['getSetting']),
            jsonPath() {
                return this.applicationURL + this.packageURL + "components/_list.json"
            },

            schemaPath() {
                return this.packageURL + "components/config.schema.json"
            },


        },
        methods: {
            toJump(data) {
                this.$router.push({
                    name: 'component',
                    params: data
                })
            }
        }

    }
</script>
