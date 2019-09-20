<template>
    <ContentWrapper>
<!--  -->
        <list :j-path="jsonPath" :s-path="schemaPath" :op-array="opArray"
              :debug-json-data="jsonData" :debug-schema-data="schemaData" :editor-controls-func="controls"></list>

    </ContentWrapper>
</template>

<script>

    import list from "../../components/Common/list"
    import {mapGetters, mapMutations} from "vuex";

    export default {
        components: {list},
        data() {
            return {

                // jsonPath: "setting/normal.json",
                // schemaPath: "setting/normal.schema.json",

                jsonData: require('../../assets/setting/stage.json'),
                schemaData: require('../../assets/setting/stage.schema.json'),

                opArray: ['edit', 'del']

            }
        },
        computed: {
            applicationURL: {
                get() {
                    return this.getSetting.applicationURL;
                },
            },
            packageURL: {
                get() {
                    return this.getSetting.packageURL;
                },
            },
            ...mapGetters(['getSetting']),

            schemaPath() {
                return 'setting/stage.schema.json';
            },
            jsonPath() {
                return this.applicationURL + 'setting/stage.json';
            },

        },
        methods: {
            controls(data) {
                return [
                    {
                        enumName: 'root.moduleType',
                        callback: function (key) {
                            let value = this.getEditor(key).getValue(); // {#} -i -sign
                            let element = this.getEditor('root.module'); // {#} -i -sign

                            if (value == 'custom') {
                                element.container.style.display = null;
                                element.container.classList.add('col-md-12');
                                element.setValue('');
                            } else {
                                // element.container.style.display = 'none';
                                element.setValue(value);
                            }
                        }
                    }
                ]
            }

        }

    }
</script>
