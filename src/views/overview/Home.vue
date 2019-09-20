<template>
    <div>
        <div class="row mt-3">
            <div class="col p-0 ml-3">
                <component-list></component-list>
            </div>
            <div class="col p-0 mr-3">
                <template-list></template-list>
            </div>
        </div>
    </div>

</template>

<script>
    import ComponentList from './ComponentList'
    import TemplateList from './TemplateList'

    export default {
        name: "Home",
        components: {
            ComponentList,
            TemplateList
        }
    }
</script>

<style scoped>

</style>
