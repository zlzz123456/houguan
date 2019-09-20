<template>
    <ContentWrapper>
        <h3 style="">查询类功能分析</h3>
        <div class="card card-body">
            <div class="row">
                <div class="col"></div>
<!--                v-if="!isNull(chartData0.rows)"-->
                <ve-histogram :data="chartData0" :settings="chartSettings" width="400px"></ve-histogram>
<!--                <div v-else style="font-size: 25px;color: lightgray;">-->
<!--                    <div>数据为空，请稍后再试！</div>-->
<!--                </div>-->
                <div class="col"></div>
            </div>
        </div>
        <h3 style="">转账类功能分析</h3>
        <div class="card card-body">
            <div class="row">
                <div class="col"></div>
                <ve-histogram :data="chartData1" :settings="chartSettings" width="400px"></ve-histogram>
                <div class="col"></div>
            </div>
        </div>
        <h3 style="">存款类功能分析</h3>
        <div class="card card-body">
            <div class="row">
                <div class="col"></div>
                <ve-histogram :data="chartData2" :settings="chartSettings" width="400px"></ve-histogram>
                <div class="col"></div>
            </div>
        </div>
        <h3 style="">理财类功能分析</h3>
        <div class="card card-body">
            <div class="row">
                <div class="col"></div>
                <ve-histogram :data="chartData3" :settings="chartSettings" width="400px"></ve-histogram>
                <div class="col"></div>
            </div>
        </div>
        <h3 style="">缴费类功能分析</h3>
        <div class="card card-body">
            <div class="row">
                <div class="col"></div>
                <ve-histogram :data="chartData4" :settings="chartSettings" width="400px"></ve-histogram>
                <div class="col"></div>
            </div>
        </div>
        <h3 style="">其他功能分析</h3>
        <div class="card card-body">
            <div class="row">
                <div class="col"></div>
                <ve-histogram :data="chartData5" :settings="chartSettings" width="400px"></ve-histogram>
                <div class="col"></div>
            </div>
        </div>

    </ContentWrapper>
</template>

<script>
    export default {
        name: "function",
        data() {
            return {

                chartData0: {
                    columns: ['功能', '平均使用时长'],
                    rows: []
                },

                chartData1: {
                    columns: ['功能', '平均使用时长'],
                    rows: []
                },

                chartData2: {
                    columns: ['功能', '平均使用时长'],
                    rows: []
                },

                chartData3: {
                    columns: ['功能', '平均使用时长'],
                    rows: []
                },

                chartData4: {
                    columns: ['功能', '平均使用时长'],
                    rows: []
                },

                chartData5: {
                    columns: ['功能', '平均使用时长'],
                    rows: []
                },

                chartSettings: {
                    metrics: ['平均使用时长'],
                    dimension: ['功能']
                }
            }
        },
        mounted() {
            this.getData0();
            this.getData1();
            this.getData2();
            this.getData3();
            this.getData4();
            this.getData5();
        },
        methods: {

            isNull(list) {
                if (list == undefined || list == null) {
                    return true;
                }
                if (list.length == 0) {
                    return true;
                }

                return false
            },

            getData0() {
                this.AnalysisQry("EventDurQry", "0", "", success => {
                    if (success.List != null) {
                        this.chartData0.rows = success.List; // {#} -i -sign -t getData
                    }
                })
            },
            getData1() {
                this.AnalysisQry("EventDurQry", "1", "", success => {
                    this.chartData1.rows = success.List; // {#} -i -sign -t getData
                })
            },
            getData2() {
                this.AnalysisQry("EventDurQry", "2", "", success => {
                    this.chartData2.rows = success.List; // {#} -i -sign -t getData
                })
            },
            getData3() {
                this.AnalysisQry("EventDurQry", "3", "", success => {
                    this.chartData3.rows = success.List; // {#} -i -sign -t getData
                })
            },
            getData4() {
                this.AnalysisQry("EventDurQry", "4", "", success => {
                    this.chartData4.rows = success.List; // {#} -i -sign -t getData
                })
            },
            getData5() {
                this.AnalysisQry("EventDurQry", "5", "", success => {
                    this.chartData5.rows = success.List; // {#} -i -sign -t getData
                })
            },
        }
    }
</script>

<style scoped>

</style>
