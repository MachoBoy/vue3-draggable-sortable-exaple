<template>
    <div class="card" :style="{ 'background-color': card.color }">
        <div>
            {{ card.id }}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        card: {
            type: Object,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
.card {
    margin-top: 10px;
    width: 300px;
    height: 150px;
}
</style>
