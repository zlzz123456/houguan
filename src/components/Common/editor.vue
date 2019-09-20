<template>
    <div>
        <div id="template-attr"></div>
        <div class="mb-3 ml-3">
            <b-button variant="primary" @click="getSaveData">保存</b-button>
        </div>
    </div>
</template>

<script>

    import JSONEditor from '@json-editor/json-editor'
    import {mapGetters, mapMutations} from "vuex";

    import _ from "lodash"

    export default {
        name: "editor",
        props: {
            jPath: {
                type: String
            },
            sPath: {
                type: String
            },
            // 是否要通过页面元素控制其它元素
            editorControlsFunc: {
                type: Function,
                default: (data) => {
                    return []
                }
            },
            // 切换应用时，刷新页面数据or跳转其它页面
            refresh: {
                type: String,
                default: "refresh"
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
                data: {},
                schema: {},
            }
        },
        created() {

        },
        mounted() {

            this.getSchemaJSON();
        },
        computed: {
            applicationURL: {
                get() {
                    return this.getSetting.applicationURL;
                },
            },
            isDebug: {
                get() {
                    return this.getSetting.isDebug;
                },
            },
            packageURL: {
                get() {
                    return this.getSetting.packageURL;
                },
            },
            jsonEditorOptions: {
                get() {
                    return this.getSetting.jsonEditorOptions;
                },
            },
            ...mapGetters(['getSetting']),

            jsonPath() {
                return this.jPath;
                // return this.applicationURL + this.packageURL + this.jPath;
            },

            schemaPath() {
                return this.sPath;
                // return this.packageURL + this.sPath;
            },
        },
        watch: {
            applicationURL() {
                if (this.refresh == 'refresh') {
                    this.getData(true);
                } else {
                    this.$router.push(this.refresh);
                }
            },
            editorControlsFunc(newFunc) {
                this.addEditorListener(this.editor, newFunc);

            }
        },
        methods: {
            async getSchemaJSON() {

                // if (this.isDebug) {
                //     this.schema = this.debugSchemaData // {#} -i -sign
                //     this.getData(false);
                //     return ;
                // }

                this.schema = this.isDebug ? this.debugSchemaData : await this.getSchemaPromise(this.schemaPath); // {#} -i -sign
                this.$emit('schema', this.schema);
                this.getData(false);

                // this.getSchema(this.schemaPath, (jsonObj) => {
                //     this.schema = jsonObj; // {#} -i -sign
                //     this.getData(false);
                // });

            },

            getData(refresh) { // {#} -i -t getData -sign -from

                if (this.isDebug) {
                    this.data = this.debugJsonData // {#} -i -sign
                    let length = Object.keys(this.data).length; // {#} -i -sign
                    if (refresh && length > 0) {
                        this.editor.setValue(this.data);
                    } else {
                        this.doEditor();
                    }
                    this.$emit('data', this.schema, this.data);
                    return;
                }

                this.getJSON(this.jsonPath, (jsonObj) => {
                    this.data = jsonObj; // {#} -i -sign
                    // true 只重新加载数据
                    if (this.data != undefined && this.data != null) {
                        let length = Object.keys(this.data).length; // {#} -i -sign
                        refresh && length > 0 ? this.editor.setValue(this.data) : this.doEditor();
                    } else {
                        this.doEditor();
                    }
                    this.$emit('data', this.schema, this.data);
                });

            },

            doEditor() {

                let element = document.getElementById("template-attr"); // {#} -i -sign
                let jsonEditorOptions = JSON.parse(JSON.stringify(this.jsonEditorOptions)); // {#} -i -sign
                jsonEditorOptions.schema = this.schema;
                this.editor = new JSONEditor(element, jsonEditorOptions);


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


                this.addEditorListener(this.editor, this.editorControlsFunc);

            },

            getSaveData() {
                let errors = this.editor.validate(); // {#} -i -sign
                if (errors.length != 0) {
                    this.checkFailedError(this.schema, errors);
                    return ;
                }

                let saveData = this.editor.getValue(); // {#} -i -sign
                if (_.isNil(this.data)) this.data = {};
                Object.keys(saveData).forEach(key => {
                    this.data[key] = saveData[key];
                }); // 属性更新
                let thisData = this.data; // {#} -i -sign
                // 列表索引更新
                this.updateTemplateJSON();
            },

            updateTemplateJSON() {
                this.updateJSON(this.jsonPath, this.data, () => { // {#} -i -t updateJSON -sign -from
                    // 重新加载数据
                    this.showError('操作成功');
                    this.getData(true);
                });
            },

            addEditorListener(editor, func) {
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

                let controls = func(this.data);

                if (controls.length > 0) {
                    for (let index in controls) {
                        let key = controls[index].enumName; // {#} -i -t addEditorListener -sign
                        let callback = controls[index].callback; // {#} -i -t addEditorListener -sign
                        editor.watch(key, callback.bind(editor, key));
                        callback.bind(editor, key).apply();
                    }
                }


            },
        }
    }
</script>

<style scoped>

</style>
