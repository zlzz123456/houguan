<template>
    <div style="background-color: white">
        <b-tabs card @input="changedIndex">
            <b-tab  v-for="(item, key) in dataList" :key="key" :title="item.title">
                <ve-line :data="item.data" v-if="index == key"  :settings="item.setting"></ve-line>
            </b-tab>
        </b-tabs>

<!--        <div>-->
<!--            <ve-line v-for="(item, key) in dataList" :key="key"-->
<!--                     v-if="index == key" :data="item.data" :settings="item.setting"></ve-line>-->
<!--        </div>-->

    </div>
</template>

<script>

    import Vue from 'vue'
    export default {
        name: "tabs-ve-line",
        props: {
            data: {
                type: Array,
                default : () => []
            }
        },
        data() {
            return {
                index: -1,
                dataList : []
            }
        },
        created() {
            this.dataList = this.data;
        },
        mounted() {
            this.getData(0, () => {
                this.index = 0;
            });
        },
        watch: {
            // index(newIndex) { // {#} -i -sign
            //     this.getData(newIndex);
            // }
        },
        methods: {
            getData(index, callback = () => {}) {
                this.AnalysisQry(this.dataList[index].url, this.dataList[index].flag, success => {
                    // this.dataList[index].data.rows = [];
                    let item = JSON.parse(JSON.stringify(this.dataList[index]));
                    item.data.rows = success.List;
                    this.dataList[index] = item; // {#} -i -sign -t getData
                    // Vue.set(this.dataList, index, item)// {#} -i -sign -t getData
                    // callback();
                    this.index = index;

                })
            },
            changedIndex(index) {
                this.getData(index);
            }
        }

    }
</script>

<style scoped>

</style>
