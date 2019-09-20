<template>
    <ContentWrapper>
        <drag-list :j-path="jsonPath" :s-path="schemaPath" :op-array="opArray" :to-jump="toJump"
                   unique-id="gray" :debug-schema-data="schemaData" :debug-json-data="jsonData"></drag-list>
        <b-button variant="primary" @click="toGray">发布</b-button>
    </ContentWrapper>
</template>

<script>

    import DragList from "../../components/Common/drag-list"
    import {mapGetters} from "vuex";


    export default {
        name: "GrayScaleManager",
        components: {DragList},
        data() {
            return {
                jsonData: require('../../assets/grayScale/_list.json'),
                schemaData: require('../../assets/grayScale/config.schema.json'),
                opArray: ['jump', 'edit', 'del']
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
                return this.applicationURL + "grayScale/_list.json"
            },

            schemaPath() {
                return "grayScale/config.schema.json"
            },
        },

        methods: {
            toJump(data) {
                this.$router.push({
                    name: 'grayScale',
                    params: data
                })
            },
            toGray() {
                this.updatePublish('gray', '', () => {
                    this.showError("操作成功");
                })
            }
        }
    }
</script>

<style scoped>

</style>
