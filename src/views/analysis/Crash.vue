<template>
    <ContentWrapper>
        <h3 class="mt-3 mb-3">数据详情</h3>
        <div class="card card-body" style="background-color: white">
            <b-table id="table" empty-text="数据为空" hover :items="tableData"  :fields="title">
                <template slot-scope="data" slot="right">
                    <b-link @click="toShowCrash(data.index)">分析</b-link>
                </template>
            </b-table>
            <b-pagination class="mt-2" align="right" v-model="page"
                          :total-rows="totalNum" :per-page="pageSizeNum" @change="getPageData" aria-controls="table">
            </b-pagination>
        </div>
        <b-modal title="日志" size="lg" v-model="isShowCrash" >
            <pre>{{crashError}}</pre>
        </b-modal>
    </ContentWrapper>

</template>

<script>
    export default {
        name: "debug",
        data() {
            return {
                title: [
                    {
                        key: 'userdetailsname',
                        label: '用户名'
                    },
                    {
                        key: 'crashfuncname',
                        label: '功能'
                    },
                    {
                        key: 'time',
                        label: '时间'
                    },
                    {
                        key: 'phoneos',
                        label: '手机系统'
                    },
                    {
                        key: 'metricsdevice',
                        label: '设备型号'
                    },
                    {
                        key: 'metricsappversion',
                        label: 'app版本号'
                    },
                    {
                        key: 'right',
                        label: '日志查看'
                    }
                ],
                tableData: [],
                pageSizeNum: 10,
                totalNum: 0,
                page: 1,

                isShowCrash: false,
                crashError: ''
            }
        },
        mounted() {
            this.getTableData();
        },
        methods: {
            getTableData() {
                this.AnalysisQry("CrashQry", "1", "", success => {
                    this.tableData = success.List; // {#} -i -sign -t getData
                    this.pageSizeNum = success.pageSize * 1;//每页的条数
                    this.totalNum = success.recordNumber * 1;//总共几条
                    let a = (success.recordNumber * 1) / (success.pageSize * 1);
                    this.page = Math.ceil(a);//总页数
                })
            },

            getPageData(page) {
                this.AnalysisQry("CrashQry", page.toString(), "", success => {
                    this.tableData = success.List; // {#} -i -sign -t getData
                })
            },

            toShowCrash(index) {
                this.crashError = this.tableData[index].crasherror;
                this.isShowCrash = true;
            }
        }
    }
</script>

<style scoped>

</style>
