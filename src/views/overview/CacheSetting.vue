<template>
    <ContentWrapper>

        <editor :j-path="jsonPath" :s-path="schemaPath"
                :debug-json-data="jsonData" :debug-schema-data="schemaData"></editor>

    </ContentWrapper>
</template>

<script>

    import editor from "../../components/Common/editor"
    import {mapGetters} from "vuex";

    export default {
        components: {editor},
        data() {
            return {
                jsonData: require('../../assets/setting/cache.json'),
                schemaData: require('../../assets/setting/cache.schema.json'),
            }
        },
        computed: {
            applicationURL: {
                get() {
                    return this.getSetting.applicationURL;
                }
            },
            ...mapGetters(['getSetting']),
            jsonPath() {
                return this.applicationURL + "setting/cache.json"
            },
            schemaPath() {
                return "setting/cache.schema.json";
            }
        }
    }
</script>
