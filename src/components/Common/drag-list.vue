<template>
    <div>

        <h3>{{this.schema.listTitle || '列表'}}</h3>
        <div class="container-fluid">
            <custom-drag-list
                    @change="dragChanged" :unique-id="uniqueId" @jump="toJump"
                    :dataList="data" :schema="schema" @update="updateTemplate" :operationArray="opArray" ></custom-drag-list>
        </div>
    </div>

</template>

<script>


    import {mapGetters} from "vuex";

    import CustomDragList from "./custom-drag-list"

    export default {
        name: "list",
        components: {CustomDragList},
        props: {
            jPath: {
                type: String,
                require: true
            },
            sPath: {
                type: String,
                require: true
            },
            uniqueId: {
                type: [String, Number],
                require: true
            },
            // pageFlag: {
            //     type: Boolean,
            //     default: true
            // },
            opArray: {
                type: Array,
                default: () => ['edit', 'del']
            },
            toJump: {
                type: Function,
                default: (data) => {
                    this.$router.push({
                        name: 'files',
                        params: data
                    })
                }
            },
            editorControlsFunc: {
                type: Function,
                default: (data) => {
                    return []
                }
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
            },
            jPath() {
                this.getSchemaJSON();
            },
            debugJsonData() {
                this.getSchemaJSON();
            }
        },
        created() {

        },
        mounted() {
            this.getSchemaJSON();
        },
        methods: {

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

                if (this.applicationURL != "") {
                    // if (this.pageFlag) {
                    //     this.getPageData(1);
                    // } else {
                        this.getAllData();
                    // }

                }

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

            updateTemplate(type, object) { // {#} -i -t updateTemplate -sign -from
                this.updateList(this.jsonPath, type, object, () => {
                    this.showError("操作成功");
                    this.getData();
                }, () => {
                    this.getData();
                })
            },

            dragChanged(data) { // {#} -i -t dragChanged -sign -from

                this.updateJSON(this.jsonPath, data, () => {
                    // this.showError("操作成功");
                    this.getData();
                })
            }
        }
    }
</script>

<style scoped>

</style>
