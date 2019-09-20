<template>
    <ContentWrapper>
        <h3 style="">数据趋势</h3>
        <div style="background-color: white">
            <DatePicker type="daterange" :value="date2" :editable="false" :clearable=false
                        separator=" ~ "  class="date-picker" placeholder="选择起止日期" split-panels confirm
                        :options="options2" @on-change="dateChanged2" @on-ok="confirm2"></DatePicker>
            <b-tabs card v-model="index">
                <b-tab title="新增设备">
                    <ve-line v-if="index == 0" :data="chartData1" :settings="chartSettings1"></ve-line>
                </b-tab>
                <b-tab title="日活跃设备">
                    <ve-line v-if="index == 1" :data="chartData2" :settings="chartSettings2"></ve-line>
                </b-tab>
                <b-tab title="周活跃设备">
                    <ve-line v-if="index == 2" :data="chartData3" :settings="chartSettings3"></ve-line>
                </b-tab>
                <b-tab title="月活跃设备">
                    <ve-line v-if="index == 3" :data="chartData4" :settings="chartSettings4"></ve-line>
                </b-tab>
                <b-tab title="启动次数">
                    <ve-line v-if="index == 4" :data="chartData5" :settings="chartSettings5"></ve-line>
                </b-tab>
                <b-tab title="单次使用时长">
                    <ve-line v-if="index == 5" :data="chartData6" :settings="chartSettings6"></ve-line>
                </b-tab>
            </b-tabs>
        </div>
        <h3 class="mt-3 mb-3">数据详情</h3>
        <div class="card card-body" style="background-color: white">
            <b-table id="table" hover empty-text="数据为空" :items="tableData"  :fields="title"></b-table>
            <b-pagination class="mt-2" align="right" v-model="page"
                          :total-rows="totalNum" :per-page="pageSizeNum" @change="getPageData" aria-controls="table">
            </b-pagination>
        </div>



    </ContentWrapper>
</template>

<script>
    export default {
        name: "User",
        data() {
            return {
                index: -1,

                chartData1: {
                    columns: ['时间', '今日新增', '昨日新增'],
                    rows: []
                },

                chartSettings1: {
                    metrics: ['今日新增', '昨日新增'],
                    dimension: ['时间']
                },

                chartData2: {
                    columns: ['日期', '活跃设备', '活跃用户'],
                    rows: []
                },

                chartSettings2: {
                    metrics: ['活跃设备', '活跃用户'],
                    dimension: ['日期']
                },

                chartData3: {
                    columns: ['日期', '周活跃设备'],
                    rows: []
                },
                chartSettings3: {
                    stack: {'日期': ['周活跃设备']},
                    area: true
                },

                chartData4: {
                    columns: ['日期', '月活跃设备'],
                    rows: []
                },
                chartSettings4: {
                    stack: {'日期': ['月活跃设备']},
                    area: true
                },

                chartData5: {
                    columns: ['日期', '启动次数'],
                    rows: []
                },
                chartSettings5: {
                    stack: {'日期': ['启动次数']},
                    area: true
                },

                chartData6: {
                    columns: ['日期', '单次使用时长'],
                    rows: []
                },
                chartSettings6: {
                    stack: {'日期': ['单设备使用时长']},
                    area: true
                },

                title: [
                    {
                        key: 'date',
                        label: '日期'
                    },
                    {
                        key: 'device',
                        label: '新增设备'
                    },
                    {
                        key: 'day',
                        label: '日活跃设备'
                    },
                    {
                        key: 'week',
                        label: '周活跃设备'
                    },
                    {
                        key: 'month',
                        label: '月活跃设备'
                    },
                    {
                        key: 'count',
                        label: '启动次数'
                    },
                    {
                        key: 'long',
                        label: '单次使用时长'
                    }
                ],
                tableData: [],
                pageSizeNum: 10,
                totalNum: 0,
                page: 1,

                options2: {
                    // 禁用今天之后的日期
                    disabledDate (date) {
                        return date && date.valueOf() >= Date.now();
                    },
                    shortcuts: [
                        {
                            text: '最近一周',
                            value () {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                                return [start, end];
                            }
                        },
                        {
                            text: '最近一个月',
                            value () {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                                return [start, end];
                            }
                        },
                        {
                            text: '最近三个月',
                            value () {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                                return [start, end];
                            }
                        },
                        {
                            text: '最近半年',
                            value () {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);
                                return [start, end];
                            }
                        },
                        {
                            text: '最近一年',
                            value () {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
                                return [start, end];
                            }
                        }
                    ]
                },
                dateData2: '',  // 日期段数据
            }
        },
        mounted() {
            this.getTableData();
        },
        watch: {
            index(newIndex) {
                this.getIndexData2(newIndex);
            },
        },
        computed: {
            date2() {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                let startStr = this.getFormatDate(start); // {#} -i -sign
                let endStr = this.getFormatDate(end);   // {#} -i -sign
                this.dateData2 = [startStr, endStr].join(' ');
                return [start, end];
            }
        },
        methods: {

            getFormatDate(date) {
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                let day = date.getDate();
                return '' + year + '-' + (month < 10 ? '0' : '') +  month
                    + '-' + (day < 10 ? '0' : '') + day;
            },

            getData1() {
                this.AnalysisQry("NewDeviceQry", "TodayAndYesterday", this.dateData2, success => {
                    this.chartData1.rows = success.List; // {#} -i -sign -t getData
                })
            },
            getData2() {
                this.AnalysisQry("ActiveDeviceQry", "30DayByDayUser", this.dateData2, success => {
                    this.chartData2.rows = success.List; // {#} -i -sign -t getData
                })
            },
            getData3() {
                this.AnalysisQry("ActiveDeviceQry", "30DayEveryWeekByDay", this.dateData2, success => {
                    this.chartData3.rows = success.List; // {#} -i -sign -t getData
                })
            },
            getData4() {
                this.AnalysisQry("ActiveDeviceQry", "30DayEvery30DayByDay", this.dateData2, success => {
                    this.chartData4.rows = success.List; // {#} -i -sign -t getData
                })
            },
            getData5() {
                this.AnalysisQry("StartCountQry", "30DayByDay", this.dateData2, success => {
                    this.chartData5.rows = success.List; // {#} -i -sign -t getData
                })
            },
            getData6() {
                this.AnalysisQry("UseTimeQry", "30DayByDayForOnce", this.dateData2, success => {
                    this.chartData6.rows = success.List; // {#} -i -sign -t getData
                })
            },

            getTableData() {
                this.AnalysisQry("UserDetailQry", "1", "", success => {
                    if (success.List != null) {
                        this.tableData = success.List; // {#} -i -sign -t getData
                        this.pageSizeNum = success.pageSize * 1;//每页的条数
                        this.totalNum = success.recordNumber * 1;//总共几条
                        let a = (success.recordNumber * 1) / (success.pageSize * 1);
                        this.page = Math.ceil(a);//总页数
                    }

                })
            },
            getPageData(page) {
                this.AnalysisQry("UserDetailQry", page.toString(), "", success => {
                    this.tableData = success.List; // {#} -i -sign -t getData
                })
            },

            getIndexData2(index) {
                switch (index) {
                    case 0:
                        this.getData1();
                        break;
                    case 1:
                        this.getData2();
                        break;
                    case 2:
                        this.getData3();
                        break;
                    case 3:
                        this.getData4();
                        break;
                    case 4:
                        this.getData5();
                        break;
                    case 5:
                        this.getData6();
                        break;
                    default:
                        break;
                }
            },


            dateChanged2(date) { // {#} -i -sign -t dateChanged -from
                this.dateData2 = date.join(' '); // {#} -i -sign
            },
            confirm2() { // {#} -i -sign -t dateChanged -from
                this.getIndexData2(this.index);
            }

        }
    }
</script>

<style scoped>
    .date-picker {
        position: absolute;
        margin-top: 12px;
        margin-right: 20px;
        right: 0;
        width: 300px;
        font-size: 12px;
    }
</style>
