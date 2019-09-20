<template>
    <ContentWrapper>
<!--:editor-controls-func="editorControls"-->
        <editor :j-path="jsonPath" :s-path="schemaPath"
                :debug-json-data="jsonData" :debug-schema-data="schemaData"></editor>

    </ContentWrapper>
</template>

<script>

    import editor from "../../components/Common/editor"
    import {mapGetters} from "vuex";

    export default {
        components: {editor},
        data() {
            return {
                jsonData: require('../../assets/setting/normal.json'),
                schemaData: require('../../assets/setting/normal.schema.json'),
            }
        },
        computed: {
            applicationURL: {
                get() {
                    return this.getSetting.applicationURL;
                }
            },
            ...mapGetters(['getSetting']),

            jsonPath() {
                return this.applicationURL + "setting/normal.json"
            },
            schemaPath() {
                return "setting/normal.schema.json";
            }
        },
        methods: {

            editorControls(data) {

                let enumFunc = function (key) {

                    let keyArray = key.split('.'); // {#} -i -sign
                    let type = typeof keyArray; // {#} -i -sign
                    keyArray.splice(keyArray.length - 1, 1, "alg"); // {#} -i -sign
                    let algElement = this.getEditor(keyArray.join('.')); // {#} -i -sign
                    keyArray.splice(keyArray.length - 1, 1, "key"); // {#} -i -sign
                    let keyElement = this.getEditor(keyArray.join('.')); // {#} -i -sign

                    let algBlock = algElement.container.getElementsByClassName('form-group');// {#} -i -sign
                    let keyBlock = keyElement.container.getElementsByClassName('form-group');// {#} -i -sign
                    // algBlock[0].style.display = 'none';
                    let value = this.getEditor(key).getValue(); // {#} -i -sign

                    // keyBlock[0].style.display = 'none'; // {#} -i -sign
                    // algBlock[0].style.display = 'none';

                    let output = value ? '1': "-1";  // {#} -i -sign

                    if (value) {
                        keyBlock[0].style.display = null; // {#} -i -sign
                        algBlock[0].style.display = null;
                    } else {
                        keyBlock[0].style.display = 'none'; // {#} -i -sign
                        algBlock[0].style.display = 'none';
                    }
                }

                let controls = [];
                if (data["repos"].length > 0) {
                    data["repos"].forEach((item, index) => {
                        controls.push({
                            enumName: `root.repos.${index}.isEncrypt`,
                            callback: enumFunc.clone()
                        })
                    })

                }

                return controls
            }
        }
    }
</script>
