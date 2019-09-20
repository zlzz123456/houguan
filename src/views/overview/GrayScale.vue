<template>
    <ContentWrapper>
        <editor :j-path="jsonPath" :s-path="schemaPath" :debug-json-data="jsonData" :debug-schema-data="schemaData"></editor>
    </ContentWrapper>
</template>

<script>
    import Editor from "../../components/Common/editor";
    import {mapGetters, mapMutations} from "vuex";
    export default {
        name: "GrayScale",
        components: {Editor},
        data() {
            return {
                jsonData: {},
                schemaData: {}
            }
        },
        computed: {
            isDebug: {
                get() {
                    return this.getSetting.isDebug;
                },
            },
            grayScaleObj: {
                get() {
                    return this.getSetting.grayScaleObj;
                },
                set(value) {
                    this.changeSetting({name: 'grayScaleObj', value})

                }
            },
            applicationURL: {
                get() {
                    return this.getSetting.applicationURL;
                }
            },
            ...mapGetters(['getSetting']),
            jsonPath() {
                return this.applicationURL + this.grayScaleObj.src
            },
            schemaPath() {
                return this.grayScaleObj.type;
            }
        },
        created() {
            if (Object.keys(this.$route.params).length > 1) {
                this.grayScaleObj = this.$route.params; // {#} -i -sign
            }

            if (this.isDebug) {
                this.jsonData = require('../../assets/' + this.grayScaleObj.src); // {#} -i -sign
                this.schemaData = require('../../assets/' + this.grayScaleObj.type); // {#} -i -sign
            }
        },
        methods: {
            ...mapMutations(['changeSetting']),

        }
    }
</script>

<style scoped>

</style>
