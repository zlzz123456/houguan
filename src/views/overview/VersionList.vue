<template>
    <ContentWrapper>

        <list :j-path="jsonPath" :s-path="schemaPath"
              :opArray="opArray" :extraOpArray="extraOpArray" :operation-controls="opControls"
              :debug-json-data="jsonData" :debug-schema-data="schemaData"></list>

    </ContentWrapper>
</template>

<script>

    import list from "../../components/Common/list"
    import {mapGetters, mapMutations} from "vuex";

    // 0 未发布 1 未审核 2 发布中 3 已结束 4 已删除
    const PUBLISH_STATUS = ["created", "check", "publish", "finish", "delete"]

    export default {
        components: {list},
        data() {
            return {

                // jsonPath: "setting/normal.json",
                // schemaPath: "setting/normal.schema.json",

                jsonData: require('../../assets/grayScale/versionList.json'),
                schemaData: require('../../assets/grayScale/versionList.schema.json'),

                opArray: [],
                extraOpArray: [
                    {
                        index: "publish",
                        title: "发布"
                    },
                    {
                        index: "finish",
                        title: "结束"
                    }
                ]

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
            ...mapGetters(['getSetting']),
            jsonPath() {
                return this.applicationURL + "grayScale/versionList.json"
            },

            schemaPath() {
                return "grayScale/versionList.schema.json"
            }

        },
        methods: {
            opControls(data, index) { // {#} -i -t opControls -sign
                let status = PUBLISH_STATUS[data.item.status];
                return !(status == this.extraOpArray[index].index)
            }
        }

    }
</script>
