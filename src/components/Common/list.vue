<template>
    <div>

        <h3 class="text-thin">{{this.schema.listTitle || '列表'}}</h3>
        <div class="container-fluid">
            <custom-schema-table
                    :pageFlag="pageFlag" :perPage="perPage" :count="total" @page="getPageData" :uniqueId="uniqueId"
                    :dataList="data" :schema="schema" @update="updateTemplate" @extra="publishTemplate" @jump="toJump"
                    :hasNewButton="hasNewButton" :operationArray="opArray" :extraOpArray="extraOpArray" :editorControls="controls"
                    :opControls="operationControls"></custom-schema-table>
        </div>
    </div>

</template>

<script>


    import {mapGetters, mapMutations} from "vuex";

    import CustomSchemaTable from "@/components/Common/custom-schema-table.vue"

    export default {
        name: "list",
        components: {CustomSchemaTable},
        props: {
            jPath: {
                type: String,
                require: true
            },
            sPath: {
                type: String,
                require: true
            },
            pageFlag: {
                type: Boolean,
                default: true
            },
            uniqueId: {
                type: String,
                default: ''
            },
            hasNewButton: {
                type: Boolean,
                default: true
            },
            isCustomUpdate: {
                type: Boolean,
                default: false
            },
            opArray: {
                type: Array,
                default: () => ["edit", "del"]
            },
            extraOpArray: {
                type: Array,
                default: () => []
            },
            toJump: {
                type: Function,
                default: (data) => {
                    // this.$router.push({
                    //     name: 'files',
                    //     params: data
                    // })
                }
            },
            editorControlsFunc: {
                type: Function,
                default: (data) => {
                    return []
                }
            },
            operationControls: {
                type: Function,
                default: (data, index) => {return true}
            },
            debugJsonData: {
                type: [Object, Array]
            },
            debugSchemaData: {
                type: Object
            }
        },
        data() {
            return {
                data: [],
                schema: {},

                total: -1,
            }
        },
        computed: {
            perPage: {
                get() {
                    return this.getSetting.perPage;
                },
            },
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
            isLoading: {
                get() {
                    return this.getSetting.isLoading;
                },
                set(value) { this.changeSetting({name: 'isLoading', value})}

            },
            ...mapGetters(['getSetting']),

            schemaPath() {
                return this.sPath;
            },
            jsonPath() {
                return this.jPath;
            },
            controls() {
                return this.editorControlsFunc(this.data);
            }
        },
        watch: {
            applicationURL(newValue) {
                this.getData();
            }
        },
        created() {

        },
        mounted() {
            this.getSchemaJSON();
        },
        methods: {
            ...mapMutations(['changeSetting']),
            getSchemaJSON() {

                if (this.isDebug) {
                    this.schema = this.debugSchemaData;  // {#} -i -sign
                    this.getData();
                    return;
                }

                this.getSchema( this.schemaPath, (schema) => { // {#} -i -t getSchema -sign
                    this.schema = schema;
                    this.getData();
                });
            },

            getData() {
                let appURL = this.applicationURL; // {#} -i -t getData -sign

                // if (this.applicationURL != "") {
                    if (this.pageFlag) {
                        this.getPageData(1);
                    } else {
                        this.getAllData();
                    }
                // }

            },

            getPageData(page) {
                if (this.isDebug) {
                    this.total = this.debugJsonData.length; // {#} -i -sign
                    let data = [];
                    this.debugJsonData.forEach((item, index) => {
                        if (index >= (page - 1) * this.perPage && index < page * this.perPage) {
                            data.push(item);
                        }
                    });
                    this.data = data;
                    return ;
                }

                this.getPageList(this.jsonPath, page, this.perPage, jsonObj => {
                    this.data = jsonObj.Data;
                    this.total = jsonObj.Count;
                }, fail => {
                    this.data = [];
                    this.total = -1;
                })
            },

            getAllData() {
                if (this.isDebug) {
                    this.data = this.debugJsonData;
                    return ;
                }

                this.getJSON(this.jsonPath, jsonObj => { // {#} -i -sign
                    this.data = jsonObj;
                })
            },
            // 增删改功能
            updateTemplate(type, object) { // {#} -i -t updateTemplate -sign -from
                if (this.isCustomUpdate) {
                    this.$emit('update', type, object);
                    return ;
                }
                this.updateList(this.jsonPath, type, object, () => {
                    this.showError("操作成功");
                    this.getData();
                }, () => {
                    this.getData();
                })
            },
            // 发布功能
            publishTemplate(type, object) { // {#} -i -t publishTemplate -sign -from

                this.isLoading = true;

                this.updatePublish(type, object, () => {
                    this.isLoading = false;
                    this.showError("操作成功");
                    this.getData();
                }, () => {
                    this.isLoading = false;
                    this.getData();
                })
            }
        }
    }
</script>

<style scoped>

</style>
