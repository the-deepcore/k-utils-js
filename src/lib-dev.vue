<script>
import { KUtilsJsSample } from './entry';
export default {
    name:  'KUtilsJsLibDev', // vue library dev component
    components: {
        KUtilsJsSample,
    },
}
</script>

<template>
    <div class="k-utils-js-lib-dev">
        <k-utils-js-sample></k-utils-js-sample>
    </div>
</template>

<style scoped>
    .k-utils-js-lib-dev {
        display: block;
        width: 400px;
        margin: 25px auto;
    }
</style>
