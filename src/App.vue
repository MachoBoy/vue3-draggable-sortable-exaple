<template>
    <main>
        <div class="wrapper">
            <Sortable
                draggable=".column"
                class="inner-wrapper"
                :options="draggableOptions"
                :list="columns"
                item-key="id"
                group="column"
                @update="onUpdate"
            >
                <template #item="{ element: column, index }">
                    <Column class="column" :column="column" :key="index" />
                </template>
            </Sortable>
        </div>
    </main>
</template>

<script>
import { Sortable } from 'sortablejs-vue3'
import { mapState } from 'vuex'
import Column from './components/Column.vue'

export default {
    components: {
        Column,
        Sortable
    },
    computed: {
        ...mapState('columns', ['columns']),
        draggableOptions() {
            return {
                handle: '.column_container-header',
                animation: 200,
                ghostClass: 'draggable-ghost'
            }
        }
    },
    methods: {
        onUpdate(event) {
            console.log(event)
            const { oldIndex, newIndex } = event

            this.$store.commit('columns/MOVE_COLUMN', { oldIndex, newIndex })
        }
    }
}
</script>

<style lang="scss" scoped>
.wrapper {
    width: 100%;
    display: flex;
}

.inner-wrapper {
    display: flex;
    gap: 15px;
}

.column_wrapper {
    display: flex;
    height: 100%;
}

.draggable-ghost {
    opacity: 0.5;
}
</style>
