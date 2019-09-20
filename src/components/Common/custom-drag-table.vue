<template>
    <div class="row pl-3 pr-3">
        <custom-schema-table class="mr-3 col-5 p-0" v-show="isShowComp" :dataList="list" :schema="listSchema"
                             :pageFlag="true" :perPage="perPage" :count="total" @page="getPageData" @jump="toJump"
                             :selectFlag="true" :selectIndexList="indexList" @select="selectChange"></custom-schema-table>
        <div class="col p-0">
            <div class="card">
                <div class="card-body">
                    <div>
                        <b-button variant="primary" @click="isShowComp = !isShowComp">{{isShowComp ? '添加完成' : '显示组件列表'}}</b-button>
                    </div>

                    <div class="row pl-3 pr-3">
                        <div class="col p-3 text-bold" v-for="item in title">{{item.label}}</div>
                    </div>
                    <draggable class="list-group" :sortable="false" v-model="indexList" v-bind="dragOptions" @start="drag = true" @end="endDrag" tag="ul">
<!--                        :name=""-->
                        <transition-group type="transition" name="flip-list">
                            <li class="list-group-item border-left-0 border-right-0 p-0" v-for="(index, key) in indexList" :key="index">
<!--                                <i :class="mapIndexList[index].fixed ? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'"-->
<!--                                   @click="mapIndexList[index].fixed = !mapIndexList[index].fixed" aria-hidden="true"></i>-->
                                <div class="row m-0">
                                    <div class="col p-3" v-for="head in title">
                                        <i v-if="head.key == 'drag'" class="fa fa-bars"></i>
                                        <b-button v-if="head.key == 'del'" class="pt-0 pb-0" @click="delIndex(key)" variant="danger">
                                            <i  class="fa fa-times"></i>
                                        </b-button>
                                        <span v-else-if="head.type == 'enum'">{{enumList[head.key][mapIndexList[index][head.key]]}}</span>
                                        <b-link v-else-if="head.key == 'name'" @click="toJump(mapIndexList[index])">{{mapIndexList[index][head.key]}}</b-link>
                                        <span v-else>{{mapIndexList[index][head.key]}}</span>
                                    </div>
                                </div>
                            </li>
                        </transition-group>
                    </draggable>

                </div>
            </div>
        </div>

    </div>
</template>

<script>

    import draggable from "vuedraggable";
    import CustomSchemaTable from "@/components/Common/custom-schema-table.vue"


    export default {
        name: "custom-drag-table",
        components: {CustomSchemaTable, draggable},
        model: {
            prop: 'indexList',
            event: 'change'
        },
        props: {
            list: {
                type: Array,
                default: []
            },
            listSchema: {
                type: Object,
                default: {}
            },
            perPage: {
                type: Number,
                default: 10
            },
            total: {
                type: Number,
                default: -1
            },
            indexList: {
                type: Array,
                default: () => []
            },
            indexListData: {
                type: Array,
                default: () => []
            }
        },
        data() {
            return {
                drag: false,
                isShowComp: false,

                title: [
                    //     {
                    //     key: 'drag',
                    //     label: "拖拽调整位置"
                    // }, {
                    //     key: 'index',
                    //     label: '组件ID'
                    // }, {
                    //     key: 'name',
                    //     label: '组件名称'
                    // }
                ],
                enumList: {},
            }
        },
        computed: {
            mapList() {
                let map = {};
                this.list.forEach(item => {
                    if (item != undefined) {
                        map[item.index] = item;
                    }

                });
                return map;
            },
            mapIndexList() {
                let map = {};
                let indexListData = this.indexListData; // {#} -i -sign
                if (this.indexListData != undefined && this.indexListData != null) {
                    this.indexListData.forEach(item => {
                        if (item != undefined) {
                            map[item.index] = item;
                        }

                    });
                }
                let outputMap = map; // {#} -i -sign
                return map;
            },
            dragOptions() {
                return {
                    animation: 200,
                    disabled: false,
                    ghostClass: "ghost"
                };
            }
        },
        watch: {
            listSchema(newValue) {
                this.getTableTitle();
            },
            list(newValue) {
                let outputList = newValue; // {#} -i -sign
            }
        },
        created() {
            this.getTableTitle();
        },
        methods: {
            getTableTitle() {

                let dragSchema = this.listSchema;  // {#} -i -sign

                if (this.listSchema == undefined || this.listSchema == {}) {
                    this.hasError = true; // {#} -i -sign
                    return;
                }
                // this.hasError = false;

                let obj = this.listSchema.properties; // {#} -i -sign
                this.listShowProps = this.listSchema.listShowProps; // {#} -i -sign

                if (obj == undefined || this.listShowProps == undefined) {
                    this.hasError = true; // {#} -i -sign
                    return;
                }
                this.hasError = false;

                this.title = [];
                let self = this;
                this.title.push(
                    {
                        key: 'drag',
                        label: "拖拽调整位置",
                        type: 'drag'
                    },
                );

                this.listShowProps.forEach(key => {
                    let outputKey = key; // {#} -i -sign
                    let outputEnum = obj[key].enum; // {#} -i -sign
                    if (obj[key].enum) { // 得到枚举类型的对象
                        self.enumList[key] = {};
                        obj[key].enum.forEach((enumKey, index) => {
                            self.enumList[key][enumKey] = obj[key].options.enum_titles[index];
                        })
                    }
                    let outputEnumList = self.enumList;// {#} -i -sign
                    self.title.push({
                        key: key,
                        label: obj[key].title ? obj[key].title : key,
                        type: obj[key].enum ? 'enum' : obj[key].type,
                    })
                });

                this.title.push(
                    {
                        key: 'del',
                        label: "删除",
                        type: 'del'
                    },
                );

                let dragTitle = this.title; // {#} -i -sign

            },

            selectChange(flag, index) {
                let hasIndex = this.indexList.indexOf(index);
                // flag = true 添加 && hasIndex < 0
                if (flag) {
                    this.indexList.push(index);
                    this.indexListData.push(this.mapList[index]);
                }
            },
            delIndex(index) { // {#} -i -t delIndex -sign -from
                this.indexList.splice(index, 1);
            },

            getPageData(page) {
                this.$emit('page', page);
            },
            endDrag() {
                this.drag = false;
                this.$emit('change', this.indexList);
            },
            toJump(data) {
                this.$emit('jump', data);

            }
        }
    }
</script>

<style scoped>

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
