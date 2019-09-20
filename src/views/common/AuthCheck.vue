<template>
    <ContentWrapper>
        <b-button variant="primary" @click="goBack">返回</b-button>
        <h3 class="mt-2">功能权限</h3>
        <div style="background-color: white">
            <b-tabs card>
                <b-tab v-for="(item, index) in tabList" :key="index" :title="item.title">
                    <b-button size="sm" variant="danger" class="float-right" @click="closeTab(i)">
                        删除角色
                    </b-button>
                    <b-button size="sm" variant="primary" class="float-right mr-3" @click="closeTab(i)">
                        保存数据
                    </b-button>
                    <Tree ref="tree" :data="data4" show-checkbox multiple @on-check-change="checkChange"></Tree>
                </b-tab>
                <template slot="tabs">
                    <b-nav-item @click.prevent="newTab" href="#" title="添加新角色"><b>+</b></b-nav-item>
                </template>
                <template slot="empty">
                    没有任何一个角色，请新建角色来配置权限
                </template>
            </b-tabs>
        </div>
        <b-modal v-model="isShowNew"></b-modal>
    </ContentWrapper>
</template>

<script>
    import TemplateList from "../overview/TemplateList";
    export default {
        name: "authCheck",
        components: {TemplateList},
        data() {
            return {
                isShowNew: false,
                data4: [
                    {
                        title: 'overview',
                        expand: true,
                        children: [
                            {
                                title: '素材资源',
                                expand: true,
                                children: [
                                    {
                                        title: '组件管理',
                                    },
                                    {
                                        title: '场景管理'
                                    },
                                    {
                                        title: '资源管理'
                                    }
                                ]
                            },
                            {
                                title: '前端展示',
                                expand: true,
                                children: [
                                    {
                                        title: '页面管理',
                                        checked: true
                                    }
                                ]
                            },
                            {
                                title: '配置管理',
                                expand: true,
                                children: [
                                    {
                                        title: '常规配置',
                                    },
                                    {
                                        title: '通讯服务'
                                    },
                                    {
                                        title: '缓存策略'
                                    },
                                    {
                                        title: '安全设置'
                                    }
                                ]
                            },
                        ]
                    }
                ],
                tabList: [
                    {
                        title: "角色1",
                    },
                    {
                        title: "角色2",
                    }
                ]
            }
        },
        mounted() {
        },
        methods: {
            goBack() {
                this.$router.go(-1);
            },
            newTab() {
                this.isShowNew = true;
            },
            closeTab(index) {

            },
            checkChange(data) { // {#} -i -sign -t checkChange -from
                let nodes = this.$refs.tree[0].getCheckedNodes(); // {#} -i -sign -t checkChange
            }
        }
    }
</script>

<style scoped>

</style>
