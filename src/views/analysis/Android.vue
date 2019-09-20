<template>
    <ContentWrapper>
        <h3 class="mt-3 mb-3">系统版本分析</h3>
        <div class="card card-body">
            <ve-funnel :data="chartData1" :settings="chartSettings1"></ve-funnel>
        </div>
        <h3 class="mt-3 mb-3">手机品牌分析</h3>
        <div class="card card-body">
            <ve-ring :data="chartData2" :settings="chartSettings2"></ve-ring>
        </div>
        <h3 class="mt-3 mb-3">屏幕分辨率分析</h3>
        <div class="card card-body">
            <ve-ring :data="chartData3" :settings="chartSettings3"></ve-ring>
        </div>

    </ContentWrapper>
</template>

<script>
    export default {
        name: "android",
        data() {
            return {
                chartData1: {
                    columns: ['系统版本', '数量'],
                    rows: []
                },
                chartSettings1: {
                    sequence: []
                },
                chartData2: {
                    columns: ['品牌', '数量'],
                    rows: []
                },
                chartSettings2: {
                    roseType: 'radius'
                },
                chartData3: {
                    columns: ['分辨率', '数量'],
                    rows: []
                },
                chartSettings3: {
                    dimension: '分辨率',
                    metrics: '数量'
                }
            }
        },
        mounted() {
            this.getData1();
            this.getData2();
            this.getData3();
        },
        methods: {
            getData1() {
                this.AnalysisQry("OSVersionQry", "Android", "", success => {
                    this.chartData1.rows = success.List; // {#} -i -sign -t getData
                    this.chartSettings1.sequence = success.VersionList;
                })
            },
            getData2() {
                this.AnalysisQry("DeviceQry", "Android", "", success => {
                    this.chartData2.rows = success.List; // {#} -i -sign -t getData
                })
            },
            getData3() {
                this.AnalysisQry("ResolutionQry", "Android", "", success => {
                    this.chartData3.rows = success.List; // {#} -i -sign -t getData
                })
            }
        }
    }
</script>

<style scoped>

</style>
