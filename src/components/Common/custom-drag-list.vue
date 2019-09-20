<template>
    <div>
        <div class="card">
            <div v-if="!selectFlag" style="margin-left: 15px;margin-top: 20px">
                <b-button variant="primary" @click="toAdd">{{newTitle}}</b-button>
            </div>
            <div class="card-body">

                <div class="row pl-3 pr-3">
                    <div class="col p-3 text-bold" v-for="item in title">{{item.label}}</div>
                </div>

                <draggable class="list-group" :sortable="false" v-model="jsonData" v-bind="dragOptions"
                           @start="drag = true" @end="endDrag" tag="ul">
                    <transition-group type="transition" name="flip-list">
                        <li class="list-group-item border-left-0 border-right-0 p-0" v-for="(data, key) in jsonData"
                            :key="data.index">
                            <div class="row m-0">
                                <div class="col p-3" v-for="head in title">
                                    <i v-if="head.key == 'select'" class="fa fa-bars"></i>
                                    <template v-if="head.key == 'operation'" v-for="(item, index) in operationArray">
                                        <template v-if="index > 0">&nbsp;&nbsp;|&nbsp;&nbsp;</template>
                                        <b-link v-if="item == 'jump'" @click="toJump(key)">配置</b-link>
                                        <b-link v-if="item == 'edit'" @click="toEdit(key)">编辑</b-link>
                                        <b-link v-if="item == 'del'" @click="toDel(key)">删除</b-link>
                                    </template>
                                    <span v-if="head.type == 'enum'">{{enumList[head.key][data[head.key]]}}</span>
                                    <span v-else>{{data[head.key]}}</span>
                                </div>
                            </div>
                        </li>
                    </transition-group>
                </draggable>
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
    import draggable from "vuedraggable";
    import $ from "jquery"

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
            uniqueId: {
                type: [String, Number],
                require: true
            },
            operationArray: {
                type: Array,
                default: () => {
                    return ['edit', 'del']
                }
            },
            editorControls: {
                type: Array,
                default: () => {
                    return [];
                }
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
                type: Number,
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
        components: {draggable},
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
                jsonData: []
            }
        },
        created() {
            this.jsonData = JSON.parse(JSON.stringify(this.dataList)); // {#} -i -t created -sign
        },
        mounted() {
            this.getTableTitle();
        },
        watch: {
            schema(newValue) {
                this.getTableTitle();
            },
            dataList(newValue) {
                this.jsonData = JSON.parse(JSON.stringify(this.dataList)); // {#} -i -t dataList -sign
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
                    if (this.selectIndexList.indexOf(item.index) > -1) {
                        flag[i] = 1
                        // flag.push(true);
                    } else {
                        // flag.push(false);
                    }
                });
                let outputSelectFlag = flag; // {#} -i -sign
                return flag;
            },

            dragOptions() {
                return {
                    animation: 200,
                    disabled: false,
                    ghostClass: "ghost"
                };
            },
        },
        methods: {

            // 得到列表标题
            getTableTitle() {

                let outputSchema = this.schema;  // {#} -i -sign

                if (this.schema == undefined || this.schema == {}) {
                    this.hasError = true; // {#} -i -sign
                    return;
                }

                let obj = this.schema.properties; // {#} -i -sign
                this.listShowProps = this.schema.listShowProps; // {#} -i -sign

                if (obj == undefined || this.listShowProps == undefined) {
                    this.hasError = true; // {#} -i -sign
                    return;
                }
                this.hasError = false;

                this.title = [];
                let self = this;

                // if (this.selectFlag) {
                this.title.push(
                    {
                        key: 'select',
                        label: '拖拽调整位置',
                        type: 'select'
                    }
                );
                // }

                this.listShowProps.forEach(key => {
                    let outputKey = key; // {#} -i -sign
                    let outputEnum = obj[key].enum; // {#} -i -sign
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
                        fixed: false
                    })
                });

                let outputTitle = this.title; // {#} -i -sign

                if (!this.selectFlag) {
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

                let element = document.getElementById("new-template" + this.uniqueId);
                $(element).empty();
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
                $(element).empty();
                let jsonEditorOptions = JSON.parse(JSON.stringify(this.jsonEditorOptions)); // {#} -i -sign
                jsonEditorOptions.schema = this.editSchema;
                this.editEditor = new JSONEditor(element, jsonEditorOptions);

                this.addEditorListener(this.editEditor);
            },

            addEditorListener(editor) {

                // 复制函数
                Function.prototype.clone = function () {
                    var that = this;
                    var temp = function temporary() {
                        return that.apply(this, arguments);
                    };
                    for (var key in this) {
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

                let errors = this.newEditor.validate();
                if (errors.length != 0) {
                    this.checkFailedError(this.schema, errors);
                    return ;
                }

                let obj = this.newEditor.getValue(); // {#} -i -sign

                if (_.isNil(this.dataList)) {
                    this.dataList = [];
                }
                this.dataList.push(obj);

                this.$emit('update', this.actionNames.save, obj);
            },

            toEdit(index) { // {#} -i -sign -from
                this.editIndex = index;
                this.editEditor.setValue(this.dataList[index]);
                this.isShowEditPage = true;
            },

            editTemplateOk(bvModalEvt) {
                bvModalEvt.preventDefault();

                let errors = this.editEditor.validate();
                if (errors.length != 0) {
                    this.checkFailedError(this.editSchema, errors);
                    return ;
                }

                let json = this.editEditor.getValue(); // {#} -i -sign

                this.dataList.splice(this.editIndex, 1, json);

                this.$emit('update', this.actionNames.update, json);


            },

            toDel(index) {
                this.delIndex = index;
                this.isShowDelPage = true;
            },

            delTemplateOk() {
                let obj = this.dataList[this.delIndex];

                // 更新列表数据
                this.dataList.splice(this.delIndex, 1);

                this.$emit('update', this.actionNames.del, obj);

            },

            toJump(index) {
                let data = this.dataList[index]; // {#} -i -sign
                this.$emit('jump', data);
            },

            pageChanged(page) {
                this.$emit('page', page);
            },

            selectChange(index) { // {#} -i -sign
                // this.$log(`index: ${index}`);
                // this.$log(`flag: ${this.selectFlagList}`);
                // 第一个参数 true添加，false删除，第二个参数表示添加或删除的索引
                this.$emit('select', true, this.dataList[index].index);
            },

            endDrag() {
                this.drag = false;
                this.$emit('change', this.jsonData);
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

    .flip-list-move {
        transition: transform 0.5s;
    }

    .no-move {
        transition: transform 0s;
    }

    .ghost {
        opacity: 0.5;
        background: #c8ebfb;
    }

    .list-group {
        min-height: 20px;
    }

    .list-group-item {
        cursor: move;
    }

    .list-group-item i {
        cursor: pointer;
    }

</style>

