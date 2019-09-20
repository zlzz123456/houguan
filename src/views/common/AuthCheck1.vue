<template>
    <ContentWrapper>
        <b-button variant="primary" style="margin-bottom: 15px" @click="goBack">返回</b-button>
        <list :j-path="jsonPath" :s-path="schemaPath" :op-array="opArray"
              unique-id="role" :debug-json-data="jsonData" :debug-schema-data="schemaData"></list>
        <list :j-path="userJsonPath" :s-path="userSchemaPath" :op-array="opArray"
              unique-id="user" :debug-json-data="userJsonData" :debug-schema-data="userSchemaData"></list>
    </ContentWrapper>
</template>

<script>
    import list from "../../components/Common/list"
    export default {
        name: "authCheck1",
        components: {list},
        data() {
            return {
                opArray: ['edit', 'del'],

                jsonData: require('../../assets/user/role.json'),
                schemaData: require('../../assets/user/role.schema.json'),

                userJsonData: require('../../assets/user/_list.json'),
                userSchemaData: require('../../assets/user/config.schema.json')
            }
        },
        mounted() {},
        computed: {
            jsonPath() {
                return "shared/users/role.json"
            },
            schemaPath() {
                return "users/role.schema.json"
            },

            userJsonPath() {
                return "shared/users/_list.json"
            },
            userSchemaPath() {
                return "users/config.schema.json"
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1);
            }
        }
    }
</script>

<style scoped>

</style>
