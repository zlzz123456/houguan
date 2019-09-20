<template>
    <ContentWrapper>
        <!--         class="text-thin"-->
        <h2 v-if="listSchemaName != ''">模板名称：{{templateObj.name}}</h2>
        <div id="template-attr"></div>
        <h3>布局</h3>
        <custom-drag-table :listSchema="listSchema" :list="list" :perPage="perPage" :total="total" @page="getPageData"
                           :indexList="listDataIndex" :indexListData="listData" @jump="toJump"
                           @change="changeIndexList"></custom-drag-table>
        <div class="mb-3 ml-3">
            <b-button variant="primary" @click="getSaveData">保存</b-button>
        </div>
    </ContentWrapper>
</template>

<script>

    import JSONEditor from '@json-editor/json-editor'
    import CustomDragTable from "@/components/Common/custom-drag-table.vue"
    import {mapGetters, mapMutations} from "vuex";

    import _ from "lodash"

    export default {
        name: "TemplateList",
        components: {CustomDragTable},
        data() {
            return {

                // 组件列表的路径
                jsonPath: 'components/_list.json',
                schemaPath: 'components/config.schema.json',

                data: {},
                schema: {},
                list: [],
                listSchema: {},

                listSchemaName: "",

                listDataIndex: [],  // 从data数据里面的组件索引数据
                listData: [],       // 上面索引数据对应的数据

                // perPage: 3,
                total: 0,

            }
        },
        created() {


        },
        mounted() {

            let isNil = _.isNil(this.hello); // {#} -i -sign

            // let template = this.$route.params; // {#} -i -sign
            if (Object.keys(this.$route.params).length > 1) {
                this.templateObj = this.$route.params; // {#} -i -sign
            }

            let outputTemplate = this.templateObj; // {#} -i -sign

            this.getSchemaJSON();
        },
        computed: {
            applicationURL: {
                get() {
                    return this.getSetting.applicationURL;
                }
            },
            perPage: {
                get() {
                    return this.getSetting.perPage;
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
            templateObj: {
                get() {
                    return this.getSetting.templateObj;
                },
                set(value) {
                    this.changeSetting({name: 'templateObj', value})
                }
            },
            packageURL: {
                get() {
                    return this.getSetting.packageURL;
                },
            },
            jsonEditorOptions: {
                get() {
                    return this.getSetting.jsonEditorOptions;
                }
            },
            ...mapGetters(['getSetting'])
        },
        watch: {
            applicationURL() {
                this.$router.push("/overview/templateList");
            }
        },
        methods: {
            ...mapMutations(['changeSetting']),
            getSchemaJSON() {

                if (this.isDebug) {
                    let schemaPath = this.templateObj.type.replace('/', '/schema/');
                    this.schema = require('../../assets' + this.debugPath + schemaPath); // {#} -i -sign
                    // this.listSchemaName = this.schema.componentList; // {#} -i -sign
                    this.getData(false);
                    return;
                }

                let outputSchema = this.templateObj.type;// {#} -i -sign
                this.getSchema(this.packageURL + this.templateObj.type, (jsonObj) => {
                    this.schema = jsonObj; // {#} -i -sign
                    // this.listSchemaName = this.schema.componentList; // {#} -i -sign
                    this.getData(false);
                });

            },
            getData(refresh) {

                if (this.isDebug) {
                    let jsonPath = this.templateObj.src.replace('/', '/data/');
                    this.data = require('../../assets' + this.debugPath + jsonPath); // {#} -i -sign
                    if (refresh) {
                        this.findListData();
                        this.editor.setValue(this.data);
                    } else {
                        this.getListSchema();
                        this.doEditor();
                    }
                    return;
                }

                let getJSONPath = this.packageURL + this.templateObj.src; // {#} -i -sign
                this.getJSON(this.applicationURL + this.packageURL + this.templateObj.src, (jsonObj) => {
                    let isNil = _.isNil(jsonObj); // {#} -i -sign
                    if (jsonObj != null) {
                        this.data = jsonObj; // {#} -i -sign
                    }
                    // 保存之后的刷新，只重新加载数据
                    if (refresh) {
                        this.findListData();
                        this.editor.setValue(this.data);
                    } else {
                        this.getListSchema();
                        this.doEditor();
                    }

                });


            },
            getListSchema() {

                if (this.isDebug) {
                    let schemaPath = this.schemaPath.replace('/', '/schema/');
                    this.listSchema = require('../../assets' + this.debugPath + schemaPath); // {#} -i -sign
                    this.getAllListData();
                    return;
                }

                this.getSchema(this.packageURL + this.schemaPath, (jsonObj) => {
                    this.listSchema = jsonObj; // {#} -i -sign
                    this.getAllListData();
                })
            },

            getAllListData() {

                this.bindProp = this.listSchema.bindProp;// {#} -i -sign
                if (!_.isNil(this.data) && !_.isNil(this.data[this.bindProp])) {
                    this.listDataIndex = this.data[this.bindProp]; // {#} -i -sign
                }

                // 得到具体数据
                this.getPageData(1);
                this.findListData();

            },

            getPageData(page) {
                if (this.isDebug) {
                    let jsonPath = this.jsonPath.replace('/', '/data/');
                    this.LIST_DATA = require('../../assets' + this.debugPath + jsonPath); // {#} -i -sign
                    this.total = this.LIST_DATA.length; // {#} -i -sign
                    let data = [];
                    this.LIST_DATA.forEach((item, index) => {
                        if (index >= (page - 1) * this.perPage && index < page * this.perPage) {
                            data.push(item);
                        }
                    });
                    this.list = data; // {#} -i -sign
                    return;
                }

                let path = this.applicationURL + this.packageURL + this.jsonPath; // {#} -i -sign
                this.getPageList(this.applicationURL + this.packageURL + this.jsonPath, page, this.perPage, jsonObj => {
                    this.list = jsonObj.Data; // {#} -i -sign
                    this.total = jsonObj.Count;// {#} -i -sign
                })
            },

            findListData() {
                if (this.isDebug) {
                    this.listData = [];
                    if (this.listDataIndex != undefined && this.listDataIndex.length > 0) {
                        this.listDataIndex.forEach(index => {
                            this.LIST_DATA.forEach(item => {
                                if (item.index == index) {
                                    this.listData.push(item);
                                }
                            });
                        })
                    }
                    let outputListData = this.listData; // {#} -i -sign
                    return;
                }
                let listDataIndexString = JSON.stringify(this.listDataIndex); // {#} -i -sign
                this.getIndexList(this.applicationURL + this.packageURL + this.jsonPath, this.listDataIndex, jsonObj => {
                    if (jsonObj != null) {
                        this.listData = jsonObj; // {#} -i -sign
                    }
                })

            },

            doEditor() {
                let element = document.getElementById("template-attr"); // {#} -i -sign
                let jsonEditorOptions = JSON.parse(JSON.stringify(this.jsonEditorOptions)); // {#} -i -sign
                jsonEditorOptions.schema = this.schema;
                this.editor = new JSONEditor(element, jsonEditorOptions);
                let outputData = this.data; // {#} -i -sign


                if (this.data != undefined && this.data != null) {
                    let type = typeof this.data;// {#} -i -sign
                    let length = -1;
                    if (type == 'object') {
                        length = Object.keys(this.data).length; // {#} -i -sign
                    } else if (type == 'array') {
                        length = this.data.length;
                    }

                    if (length > 0) {
                        this.editor.setValue(this.data);
                    }
                }

            },

            getSaveData() {
                let saveData = this.editor.getValue(); // {#} -i -sign
                Object.keys(saveData).forEach(key => {
                    this.data[key] = saveData[key];
                }); // 属性更新
                saveData = this.data; // {#} -i -sign

                // 列表索引更新
                this.data[this.bindProp] = this.listDataIndex; // {#} -i -sign
                // this.updateActionsJSON(this.listDataIndex, this.actions);
                let listDataIndex = this.listDataIndex; // {#} -i -sign
                this.updateTemplateJSON();
            },

            updateTemplateJSON() {
                let path = this.applicationURL + this.packageURL + this.templateObj.src; // {#} -i -sign
                this.updateJSON(this.applicationURL + this.packageURL + this.templateObj.src, this.data, () => { // {#} -i -t updateJSON -sign -from
                    // 重新加载数据
                    this.showError("操作成功");
                    this.getData(true);
                });
            },

            changeIndexList(list) {
                this.listDataIndex = list;
            },

            toJump(data) {
                this.$router.push({
                    name: 'component',
                    params: data
                })
            }
        }
    }
</script>

<style scoped>

</style>
