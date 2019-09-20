<template>
    <ContentWrapper>
        <div class="row mt-3">
            <div class="col">
                <div class="card card-body">
                    <div class="row">
                        <div class="col align-items-center">
                            <i class="material-icons ml-3" style="font-size: 50px;margin-top: 3px">remove_red_eye</i>
                        </div>
                        <div class="col-auto mr-3">
                            <div>累计设备</div>
                            <count-to style="font-size: 24px;font-weight: bolder;" :startVal="0" :endVal="showData1" :duration="2600"></count-to>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card card-body">
                    <div class="row">
                        <div class="col align-items-center">
                            <i class="material-icons ml-3" style="font-size: 50px;margin-top: 3px">remove_red_eye</i>
                        </div>
                        <div class="col-auto mr-3">
                            <div>近7日活跃设备</div>
                            <count-to style="font-size: 24px;font-weight: bolder;" :startVal="0" :endVal="showData2" :duration="3000"></count-to>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card card-body">
                    <div class="row">
                        <div class="col align-items-center">
                            <i class="material-icons ml-3" style="font-size: 50px;margin-top: 3px">remove_red_eye</i>
                        </div>
                        <div class="col-auto mr-3">
                            <div>近30日活跃设备</div>
                            <count-to style="font-size: 24px;font-weight: bolder;" :startVal="0" :endVal="showData3" :duration="3200"></count-to>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card card-body">
                    <div class="row">
                        <div class="col align-items-center">
                            <i class="material-icons ml-3" style="font-size: 50px;margin-top: 3px">remove_red_eye</i>
                        </div>
                        <div class="col-auto mr-3">
                            <div>单设备日均时长</div>
                            <count-to style="font-size: 24px;font-weight: bolder;" :startVal="0" :endVal="showData4" :duration="3600"></count-to>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <h3 style="">时段分布</h3>
        <div style="background-color: white">
<!--            -->
            <DatePicker type="date" :value="date" :editable="false" :clearable=false
                        class="date-picker" placeholder="选择起止日期" split-panels confirm
                        :options="options" @on-change="dateChanged" @on-ok="confirm" ></DatePicker>
            <b-tabs card v-model="index">
                <b-tab title="新增设备">
                    <ve-line v-if="index == 0" :data="chartData1" :settings="chartSettings1"></ve-line>
                </b-tab>
                <b-tab title="启动次数">
                    <ve-line v-if="index == 1" :data="chartData2" :settings="chartSettings2"></ve-line>
                </b-tab>
            </b-tabs>
        </div>
        <h3 style="margin-top: 20px">数据趋势</h3>
        <div style="background-color: white">
            <DatePicker type="daterange" :value="date2" :editable="false" :clearable=false
                        separator=" ~ "  class="date-picker" placeholder="选择起止日期" split-panels confirm
                        :options="options2" @on-change="dateChanged2" @on-ok="confirm2"></DatePicker>
            <b-tabs card v-model="index2">
                <b-tab title="新增设备">
                    <ve-line v-if="index2 == 0" :data="chartData3" :settings="chartSettings3"></ve-line>
                </b-tab>
                <b-tab title="活跃设备">
                    <ve-line v-if="index2 == 1" :data="chartData4" :settings="chartSettings4"></ve-line>
                </b-tab>
                <b-tab title="启动次数">
                    <ve-line v-if="index2 == 2" :data="chartData5" :settings="chartSettings5"></ve-line>
                </b-tab>
                <b-tab title="单设备使用时长">
                    <ve-line v-if="index2 == 3" :data="chartData6" :settings="chartSettings6"></ve-line>
                </b-tab>
                <b-tab title="留存率">
                    <ve-line v-if="index2 == 4" :data="chartData7" :settings="chartSettings7"></ve-line>
                </b-tab>

            </b-tabs>
        </div>


    </ContentWrapper>
</template>

<script>

    import TabsVeLine from '../../components/Common/tabs-ve-line'
    import CountTo from 'vue-count-to'


    export default {
        name: "home",
        components: { TabsVeLine, CountTo},
        data() {
            return {

                showData1: 0,
                showData2: 0,
                showData3: 0,
                showData4: 0,

                index: -1,
                index2: -1,
                data: [
                    {
                        title: "新增设备",
                        data: {
                            columns: ['时间', '今日新增', '昨日新增'],
                            rows: []
                        },
                        setting: {
                            metrics: ['今日新增', '昨日新增'],
                            dimension: ['时间']
                        },
                        url: "NewDeviceQry",
                        flag: "TodayAndYesterday"
                    },
                    {
                        title: "启动次数",
                        data: {
                            columns: ['时间', '今日启动', '昨日启动'],
                            rows: []
                        },
                        setting: {
                            metrics: ['今日启动', '昨日启动'],
                            dimension: ['时间']
                        },
                        url: "StartCountQry",
                        flag: "TodayAndYesterday"
                    }
                ],
                data2: [
                    {
                        title: "新增设备",
                        data: {
                            columns: ['日期', '新增设备', '新增用户'],
                            rows: []
                        },
                        setting: {
                            metrics: ['新增设备', '新增用户'],
                            dimension: ['日期']
                        },
                        url: "NewDeviceQry",
                        flag: "30DayByDayUser"
                    },
                    {
                        title: "活跃设备",
                        data: {
                            columns: ['日期', '活跃设备', '活跃用户'],
                            rows: []
                        },
                        setting: {
                            metrics: ['活跃设备', '活跃用户'],
                            dimension: ['日期']
                        },
                        url: "ActiveDeviceQry",
                        flag: "30DayByDayUser"
                    },
                    {
                        title: "启动次数",
                        data: {
                            columns: ['日期', '启动次数'],
                            rows: []
                        },
                        setting: {
                            stack: {'日期': ['启动次数']},
                            area: true
                        },
                        url: "StartCountQry",
                        flag: "30DayByDay"
                    },
                ],

                chartData1: {
                    columns: ['时间', '今日新增', '昨日新增'],
                    rows: []
                },
                chartSettings1: {
                    metrics: ['今日新增', '昨日新增'],
                    dimension: ['时间']
                },

                chartData2: {
                    columns: ['时间', '今日启动', '昨日启动'],
                    rows: []
                },
                chartSettings2: {
                    metrics: ['今日启动', '昨日启动'],
                    dimension: ['时间']
                },

                chartData3: {
                    columns: ['日期', '新增设备', '新增用户'],
                    rows: []
                },

                chartSettings3: {
                    metrics: ['新增设备', '新增用户'],
                    dimension: ['日期']
                },

                chartData4: {
                    columns: ['日期', '活跃设备', '活跃用户'],
                    rows: []
                },

                chartSettings4: {
                    metrics: ['活跃设备', '活跃用户'],
                    dimension: ['日期']
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
                    columns: ['日期', '单设备使用时长'],
                    rows: []
                },

                chartSettings6: {
                    stack: {'日期': ['单设备使用时长']},
                    area: true
                },

                chartData7: {
                    columns: ['日期', '次日留存率', '7日留存率', '30日留存率'],
                    rows: []
                },

                chartSettings7: {
                    metrics: ['次日留存率', '7日留存率', '30日留存率'],
                    dimension: ['日期']
                },

                options: {
                    // 禁用今天之后的日期
                    disabledDate (date) {
                        return date && date.valueOf() >= Date.now();
                    },
                    shortcuts: [
                        {
                            text: '今天',
                            value () {
                                return new Date();
                            }
                        },
                        {
                            text: '昨天',
                            value () {
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24);
                                return start;
                            }
                        },
                        {
                            text: '一周前',
                            value () {
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                                return start;
                            }
                        },
                        {
                            text: '一月前',
                            value () {
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                                return start;
                            }
                        },
                    ]
                },
                dateData: '',

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
            this.getShowData();
            this.getData1();
            this.getData3();

        },
        computed: {
            date() {
                const now = new Date();
                this.dateData = this.getFormatDate(now);
                return now;
            },
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
        watch: {
            index(newIndex) {
                this.getIndexData(newIndex);
            },
            index2(newIndex) {
                this.getIndexData2(newIndex);
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

            getShowData() {
                this.AnalysisQry("ActiveDeviceQry", "All", "", success => {
                    this.showData1 = success.count * 1; // {#} -i -sign -t getData
                });
                this.AnalysisQry("ActiveDeviceQry", "7Day", "", success => {
                    this.showData2 = success.count * 1; // {#} -i -sign -t getData
                });
                this.AnalysisQry("ActiveDeviceQry", "30Day", "", success => {
                    this.showData3 = success.count * 1; // {#} -i -sign -t getData
                });
                this.AnalysisQry("UseTimeQry", "ForDeviceid", "", success => {
                    this.showData4 = success.usetime * 1; // {#} -i -sign -t getData
                });
            },
            getData1() {
                this.AnalysisQry("NewDeviceQry", "TodayAndYesterday", this.dateData, success => {
                    this.chartData1.rows = success.List; // {#} -i -sign -t getData
                })
            },
            getData2() {
                this.AnalysisQry("StartCountQry", "TodayAndYesterday", this.dateData, success => {
                    this.chartData2.rows = success.List; // {#} -i -sign -t getData
                })
            },
            getData3() {
                this.AnalysisQry("NewDeviceQry", "30DayByDayUser", this.dateData2, success => {
                    this.chartData3.rows = success.List; // {#} -i -sign -t getData
                })
            },
            getData4() {
                this.AnalysisQry("ActiveDeviceQry", "30DayByDayUser", this.dateData2, success => {
                    this.chartData4.rows = success.List; // {#} -i -sign -t getData
                })
            },
            getData5() {
                this.AnalysisQry("StartCountQry", "30DayByDay", this.dateData2, success => {
                    this.chartData5.rows = success.List; // {#} -i -sign -t getData
                })
            },
            getData6() {
                this.AnalysisQry("UseTimeQry", "30DayByDayForDeviceid", this.dateData2, success => {
                    this.chartData6.rows = success.List; // {#} -i -sign -t getData
                })
            },
            getData7() {
                this.AnalysisQry("RetentionRateQry", "",  this.dateData2, success => {
                    this.chartData7.rows = success.List; // {#} -i -sign -t getData
                })
            },

            getIndexData(index) {
                switch (index) {
                    case 0:
                        this.getData1();
                        break;
                    case 1:
                        this.getData2();
                        break;
                    default:
                        break;
                }
            },

            getIndexData2(index) {
                switch (index) {
                    case 0:
                        this.getData3();
                        break;
                    case 1:
                        this.getData4();
                        break;
                    case 2:
                        this.getData5();
                        break;
                    case 3:
                        this.getData6();
                        break;
                    case 4:
                        this.getData7();
                        break;
                    default:
                        break;
                }
            },

            dateChanged(date) { // {#} -i -sign -t dateChanged -from
                this.dateData = date; // {#} -i -sign
            },
            confirm() { // {#} -i -sign -t dateChanged -from
                this.getIndexData(this.index);
            },

            dateChanged2(date) { // {#} -i -sign -t dateChanged -from
                this.dateData2 = date.join(' '); // {#} -i -sign
            },
            confirm2() { // {#} -i -sign -t dateChanged -from
                this.getIndexData2(this.index2);
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
    /*.ivu-picker-panel-shortcut {*/
    /*    padding: 6px 15px 7px;*/
    /*    transition: all .2s ease-in-out;*/
    /*    cursor: pointer;*/
    /*    overflow: hidden;*/
    /*    text-overflow: ellipsis;*/
    /*    white-space: nowrap;*/
    /*}*/
</style>
