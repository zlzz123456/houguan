<template>
    <div>
        <div class="card">
            <div v-if="!selectFlag && hasNewButton" style="margin-left: 15px;margin-top: 20px">
                <b-button variant="primary" @click="toAdd">{{newTitle}}</b-button>
            </div>
            <div class="card-body">
                <b-table id="table" hover :items="dataList"  :fields="title">
                    <template v-for="item in title" :slot="item.key" slot-scope="data">
                        <b-button v-if="item.type == 'select'"  class="pt-0 pb-0" :variant="selectFlagList[data.index] ? 'primary' : 'light'" @click="selectChange(data.index)" style="width: 56px;" >
                            <i class="fa fa-plus"></i>
                        </b-button>
                        <span v-else-if="item.type == 'enum'">{{enumList[item.key][data.value]}}</span>
                        <b-link v-else-if="item.key == 'name'" @click="toJump(data.index)">{{data.value}}</b-link>
                        <span v-else>{{data.value}}</span>
                    </template>
                    <template slot-scope="data" slot="operation">
                        <template v-for="(item, index) in operationArray">
                            <template v-if="index > 0">&nbsp;&nbsp;|&nbsp;&nbsp;</template>
                            <b-link v-if="item == 'jump'" @click="toJump(data.index)">配置</b-link>
                            <b-link v-if="item == 'edit'" @click="toEdit(data.index)">编辑</b-link>
                            <b-link v-if="item == 'del'" @click="toDel(data.index)">删除</b-link>
                        </template>
                        <template v-for="(item, index) in extraOpArray">
                            <template v-if="index > 0">&nbsp;&nbsp;|&nbsp;&nbsp;</template>
                            <b-link v-if="opControls(data, index)" @click="toExtra(item, data.item)">{{item.title}}</b-link>
                            <a v-else>{{item.title}}</a>
                        </template>
                    </template>
                </b-table>
                <b-pagination v-if="pageFlag" class="mt-2" align="right" v-model="currentPage"
                              :total-rows="count" :per-page="perPage" @change="pageChanged" aria-controls="table">
                </b-pagination>
                <div v-if="pageFlag" class="total">共 {{count}} 个，每页 {{perPage}} 个</div>
                <div v-if="!pageFlag" style="height: 30px;"></div>
            </div>
        </div>
        <b-modal hide-header centered size="lg" v-model="isShowNewPage" @ok="newTemplateOk">
            <div :id="'new-template' + uniqueId"></div>
        </b-modal>
        <b-modal hide-header centered size="lg" v-model="isShowEditPage" @ok="editTemplateOk">
            <div :id="'edit-template' + uniqueId"></div>
        </b-modal>
        <b-modal title="提示" v-model="isShowDelPage" @ok="delTemplateOk">
            确定删除？
        </b-modal>
    </div>
</template>

<script>

    import JSONEditor from '@json-editor/json-editor'
    import {mapGetters} from "vuex";


    export default {
        name: "custom-schema-table",
        props: {
            dataList: {
                type: Array,
                default: []
            },
            schema: {
                type: Object,
                default: {}
            },
            hasNewButton: {
                type: Boolean,
                default: true
            },
            // 内置操作
            operationArray: {
                type: Array,
                default: () => {
                    return ['edit', 'del']
                }
            },
            // 额外操作
            extraOpArray: {
                type: Array,
                default: () => []
            },
            // 对json-editor生成的输入域进行控制
            editorControls: {
                type: Array,
                default: () => {
                    return [];
                }
            },
            // 对显示的可操作项进行控制，data为每一行的数据，index操作项的索引
            opControls: {
                type: Function,
                default: (data, index) => {
                    return true;
                }
            },
            uniqueId: {
                type: [String, Number],
                default: ''
            },
            // 分页模式参数
            pageFlag: {
                type: Boolean,
                default: false
            },
            page: {
                type: Number,
                default: 1
            },
            perPage: {
                type:Number,
                default: 10
            },
            count: {
                type: Number,
                default: -1
            },
            // 选择模式参数
            selectFlag: {
                type: Boolean,
                default: false
            },
            selectIndexList: {
                type: Array,
                default: () => {
                    return []
                }
            }
        },
        data() {
            return {
                // update type names
                actionNames: {
                    save: 'save',
                    update: 'update',
                    del: 'del'
                },

                title: [],      //
                enumList: [],

                currentPage: this.page, // 当前显示页数

                newTitle: "新建",

                isShowNewPage: false,
                isShowEditPage: false,
                isShowDelPage: false,

                listShowProps: [],
                readonlyProps: [],

                hasError: false,
            }
        },
        mounted() {
            this.getTableTitle();
        },
        watch: {
            schema(newValue) {
                this.getTableTitle();
            }
        },
        computed: {
            jsonEditorOptions: {
                get() {
                    return this.getSetting.jsonEditorOptions;
                },
                // set(value) {
                //     this.changeSetting({name: 'packageURL', value})
                // }
            },
            ...mapGetters([
                'getSetting',
                'getTheme'
            ]),

            selectFlagList() {
                // let outputDataList = this.dataList; // {#} -i -sign
                // let outputIndexList = this.selectIndexList;// {#} -i -sign
                let flag = Array(this.dataList.length).fill(0); // {#} -i -sign
                this.dataList.forEach((item, i) => {
                    // let outputIndex = item.index; // {#} -i -sign
                    // let searchIndex = this.selectIndexList.indexOf(item.index);  // {#} -i -sign
                    if (this.selectIndexList.indexOf(item.index) > -1){
                        flag[i] = 1
                        // flag.push(true);
                    } else {
                        // flag.push(false);
                    }
                });
                let outputSelectFlag = flag; // {#} -i -sign
                return flag;
            }
        },
        methods: {

            // 得到列表标题
            getTableTitle() {

                let outputSchema = this.schema;  // {#} -i -sign

                if (this.schema == undefined || this.schema == {}) {
                    this.hasError = true; // {#} -i -sign
                    return ;
                }

                let obj = this.schema.properties; // {#} -i -sign
                this.listShowProps = this.schema.listShowProps; // {#} -i -sign

                if (obj == undefined || this.listShowProps == undefined) {
                    this.hasError = true; // {#} -i -sign
                    return ;
                }
                this.hasError = false;

                this.title = [];
                let self = this;

                if (this.selectFlag) {
                    this.title.push(
                        {
                            key: 'select',
                            label: '选择',
                            type: 'select'
                        }
                    );
                }

                this.listShowProps.forEach(key => {
                    let outputKey = key; // {#} -i -sign
                    let outputEnum  = obj[key].enum; // {#} -i -sign
                    if (obj[key].enum) { // 得到枚举类型的对象
                        self.enumList[key] = {};
                        obj[key].enum.forEach((enumKey, index) => {
                            self.enumList[key][enumKey] = obj[key].options && obj[key].options.enum_titles
                             ? obj[key].options.enum_titles[index] : obj[key].enum[index];
                        })
                    }
                    let outputEnumList = self.enumList;// {#} -i -sign
                    self.title.push({
                        key: key,
                        label: obj[key].title ? obj[key].title : key,
                        type: obj[key].enum ? 'enum' : obj[key].type,
                    })
                });

                let outputTitle = this.title; // {#} -i -sign

                if (!this.selectFlag
                    &&
                    (this.operationArray.length > 0 || this.extraOpArray.length > 0)
                ) {
                    this.title.push(
                        {
                            key: 'operation',
                            label: '操作',
                            type: 'operation'
                        }
                    );
                }


                this.getNewSchema();
                this.getEditSchema();

            },

            getNewSchema(schema) {

                this.newTitle = this.schema.title;

                let element = document.getElementById("new-template" + this.uniqueId); // {#} -i -sign
                let jsonEditorOptions = JSON.parse(JSON.stringify(this.jsonEditorOptions)); // {#} -i -sign
                jsonEditorOptions.schema = this.schema;
                this.newEditor = new JSONEditor(element, jsonEditorOptions);

                this.addEditorListener(this.newEditor);
            },

            getEditSchema() {

                let EditSchema = this.schema;// {#} -i -sign

                this.readonlyProps = this.schema.readonlyProps;// {#} -i -sign
                this.editSchema = JSON.parse(JSON.stringify(this.schema));

                this.editSchema.title = this.editSchema.editTitle || this.editSchema.title;

                let obj = this.editSchema.properties; // {#} -i -sign
                if (this.readonlyProps != undefined && this.readonlyProps.length > 0) {
                    this.readonlyProps.forEach(prop => {
                        obj[prop].readonly = true
                    });
                }

                let element = document.getElementById("edit-template" + this.uniqueId);
                let jsonEditorOptions = JSON.parse(JSON.stringify(this.jsonEditorOptions)); // {#} -i -sign
                jsonEditorOptions.schema = this.editSchema;
                this.editEditor = new JSONEditor(element, jsonEditorOptions);

                this.addEditorListener(this.editEditor);
            },

            addEditorListener(editor) {

                // 复制函数
                Function.prototype.clone = function() {
                    var that = this;
                    var temp = function temporary() { return that.apply(this, arguments); };
                    for(var key in this) {
                        if (this.hasOwnProperty(key)) {
                            temp[key] = this[key];
                        }
                    }
                    return temp;
                };

                if (this.editorControls.length > 0) {
                    for (let index in this.editorControls) {
                        let key = this.editorControls[index].enumName; // {#} -i -t addEditorListener -sign
                        let callback = this.editorControls[index].callback.clone(); // {#} -i -t addEditorListener -sign
                        editor.watch(key, callback.bind(editor, key));
                    }
                }
            },

            toAdd() {
                if (!this.hasError) {
                    this.isShowNewPage = true;
                }
            },

            newTemplateOk(bvModalEvt) {

                bvModalEvt.preventDefault();

                let errors = this.newEditor.validate(); // {#} -i -sign
                if (errors.length != 0) {
                    this.checkFailedError(this.schema, errors);
                    return ;
                }

                let obj = this.newEditor.getValue(); // {#} -i -sign
                this.dataList.push(obj);
                this.$emit('update' ,this.actionNames.save, obj);
                this.isShowNewPage = false;

            },

            toEdit(index) { // {#} -i -sign -from
                this.editIndex = index;
                this.editEditor.setValue(this.dataList[index]);
                this.isShowEditPage = true;
            },

            editTemplateOk(bvModalEvt) {
                bvModalEvt.preventDefault();

                let errors = this.editEditor.validate(); // {#} -i -sign
                if (errors.length != 0) {
                    this.checkFailedError(this.editSchema, errors);
                    return ;
                }

                let json =this.editEditor.getValue(); // {#} -i -sign
                this.dataList.splice(this.editIndex, 1, json);
                this.$emit('update' ,this.actionNames.update, json);
                this.isShowEditPage = false;
            },

            toDel(index) {
                this.delIndex = index;
                this.isShowDelPage = true;
            },

            delTemplateOk() {
                let obj = this.dataList[this.delIndex];

                // 更新列表数据
                this.dataList.splice(this.delIndex, 1);

                this.$emit('update' ,this.actionNames.del, obj);

            },

            toJump(index) {
                let data = this.dataList[index]; // {#} -i -sign
                this.$emit('jump', data);
            },

            toExtra(item, data) {
                this.$emit('extra', item.index, data);
            },

            pageChanged(page) {
                this.$emit('page', page);
            },

            selectChange(index) { // {#} -i -sign
                // this.$log(`index: ${index}`);
                // this.$log(`flag: ${this.selectFlagList}`);
                // 第一个参数 true添加，false删除，第二个参数表示添加或删除的索引
                this.$emit('select', true, this.dataList[index].index);
            }
        }
    }
</script>

<style scoped>

    .total {
        position: absolute;
        bottom: 38px;
        left: 27px;
        color: gray;
    }

</style>
