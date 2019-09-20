<template>
    <ContentWrapper>

        <h2>组件名称：{{componentObj.name}}</h2>

<!--        组件子项列表-->
        <template v-if="itemList.length > 0">
            <drag-list v-for="(item, index) in itemList" :key="index" :j-path="getItemJsonPath(item)" :s-path="getItemSchemaPath(item)"
                       :unique-id="index" :debug-json-data="debugData[item].json" :debug-schema-data="debugData[item].schema"></drag-list>
        </template>

        <!-- 组件属性 -->
        <editor :j-path="jsonPath" :s-path="schemaPath" :refresh="refresh" @data="getInit"
                :debug-json-data="jsonData" :debug-schema-data="schemaData"></editor>


    </ContentWrapper>
</template>

<script>

    import editor from "../../components/Common/editor"
    import DragList from "../../components/Common/drag-list"
    import {mapGetters, mapMutations} from "vuex";
    import _ from "lodash"

    export default {
        components: {editor, DragList},
        data() {
            return {
                jsonData: {},
                schemaData: {},
                refresh: "/overview/componentList",
                itemList: [],
                debugData: {},

                controlsFlag: false,
                // random: 1,
            }
        },

        created() {
            if (Object.keys(this.$route.params).length > 1) {
                this.componentObj = this.$route.params; // {#} -i -sign
            }

            if (this.isDebug) {
                let jsonPath = this.componentObj.src.replace('/', '/data/');
                this.jsonData = require('../../assets' + this.debugPath + jsonPath); // {#} -i -sign
                let schemaPath = this.componentObj.type.replace('/', '/schema/');
                this.schemaData = require('../../assets' + this.debugPath + schemaPath); // {#} -i -sign
            }

        },
        computed: {
            componentObj: {
                get() {
                    return this.getSetting.componentObj;
                },
                set(value) {
                    this.changeSetting({name: 'componentObj', value})
                }
            },
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
            debugPath: {
                get() {
                    return this.getSetting.debugPath;
                },
            },
            packageURL: {
                get() {
                    return this.getSetting.packageURL;
                },
            },
            ...mapGetters(['getSetting']),

            jsonPath() {
                return this.applicationURL + this.packageURL + this.componentObj.src;
            },
            schemaPath() {
                return this.packageURL + this.componentObj.type;
            }

        },
        methods: {
            ...mapMutations(['changeSetting']),

            getInit(schema, data) { // {#} -i -t getInitSchema -sign -from

                if (!_.isNil(schema.subSchema)) {
                    this.itemList = schema.subSchema; // {#} -i -sign
                    // return ;
                }

                // this.controlsFlag = true; // {#} -i -sign
                //
                // if (!_.isNil(data) && !_.isNil(data.subType)) {
                //     this.itemList.push(data.subType)
                // } else {
                //     let type = schema.properties.subType.enum[0]; // {#} -i -sign
                //     this.itemList.push(type);
                // }
            },

            getItemJsonPath(item) { // {#} -i -t getItemJsonPath -sign -from
                let itemNameList = this.componentObj.src.split('.'); // {#} -i -t getItemJsonPath -sign
                itemNameList.splice(1, 0, item);
                let jsonPath = itemNameList.join('.'); // {#} -i -t getItemJsonPath -sign
                jsonPath = jsonPath.replace('/', '/data/'); // {#} -i -t getItemSchemaPath -sign

                if (_.isNil(this.debugData[item])) this.debugData[item] = {};
                this.debugData[item].json = this.isDebug ?  require('../../assets' + this.debugPath + jsonPath) : {} ; // {#} -i -t getItemJsonPath -sign

                return this.applicationURL + this.packageURL + itemNameList.join('.');
            },

            getItemSchemaPath(item) { // {#} -i -t getItemSchemaPath -sign -from
                let itemNameList = this.componentObj.type.split('.'); // {#} -i -t getItemSchemaPath -sign
                itemNameList.splice(1, 0, item);
                let schemaPath = itemNameList.join('.'); // {#} -i -t getItemSchemaPath -sign
                schemaPath = schemaPath.replace('/', '/schema/'); // {#} -i -t getItemSchemaPath -sign

                if (_.isNil(this.debugData[item])) this.debugData[item] = {};
                this.debugData[item].schema = this.isDebug ? require('../../assets' + this.debugPath + schemaPath) : {}; // {#} -i -t getItemSchemaPath -sign

                return this.packageURL + itemNameList.join('.');
            },

            // controls(data) {
            //     let self = this;
            //     return [
            //         {
            //             enumName: 'root.subType',
            //             callback: function (key) {
            //
            //                 console.log("callback");
            //
            //                 let value = this.getEditor(key).getValue(); // {#} -i -sign
            //
            //                 self.itemList = [value];
            //                 // self.random = self.getRandom();
            //
            //                 // let element = this.getEditor('root.module'); // {#} -i -sign
            //                 //
            //                 // if (value == 'custom') {
            //                 //     element.container.style.display = null;
            //                 //     element.container.classList.add('col-md-12');
            //                 //     element.setValue('');
            //                 // } else {
            //                 //     // element.container.style.display = 'none';
            //                 //     element.setValue(value);
            //                 // }
            //             }
            //         }
            //     ]
            // }
        }

    }
</script>
