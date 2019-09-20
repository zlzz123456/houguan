<template>
    <ContentWrapper>
        <h3 style="">34个省份用户注册量分析</h3>
        <div class="card card-body">
            <ve-bar :data="chartData" :settings="chartSettings"></ve-bar>
        </div>
    </ContentWrapper>
</template>

<script>
    export default {
        name: "area",
        data() {
            return {
                index: -1,
                chartData: {
                    columns: ['省份','省份'],
                    rows: []
                },
                chartSettings: {
                    metrics: ['注册量'],
                    dataOrder: {
                        label: '注册量',
                        order: 'desc'
                    }
                }
            }
        },
        mounted() {
            this.getData();
        },
        methods: {
            getData() {
                this.AnalysisQry("AreaQry", "", "", success => {
                    this.chartData.rows = success.List; // {#} -i -sign -t getData
                })
            },
        }
    }
</script>

<style scoped>

</style>
