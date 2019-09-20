<template>
    <ContentWrapper>
        <h3 style="">Android系统</h3>
        <div class="card card-body">
            <ve-pie :data="chartData1" :settings="chartSettings1"></ve-pie>
        </div>
        <h3 style="">iOS系统</h3>
        <div class="card card-body">
            <ve-pie :data="chartData2" :settings="chartSettings2"></ve-pie>
        </div>
    </ContentWrapper>
</template>

<script>
    export default {
        name: "version",
        data() {
            return {
                chartData1: {
                    columns: ['版本', '数量'],
                    rows: []
                },
                chartSettings1: {
                    dimension: '版本',
                    metrics: '数量'
                },

                chartData2: {
                    columns: ['版本', '数量'],
                    rows: []
                },
                chartSettings2: {
                    dimension: '版本',
                    metrics: '数量'
                }
            }
        },
        mounted() {
            this.getData1();
            this.getData2();
        },
        methods: {
            getData1() {
                this.AnalysisQry("AppVersionQry", "Android", "", success => {
                    this.chartData1.rows = success.List; // {#} -i -sign -t getData
                })
            },
            getData2() {
                this.AnalysisQry("AppVersionQry", "IOS", "", success => {
                    this.chartData2.rows = success.List; // {#} -i -sign -t getData
                })
            },
        }
    }
</script>

<style scoped>

</style>
