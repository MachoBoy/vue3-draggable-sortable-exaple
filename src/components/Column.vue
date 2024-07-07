<template>
    <div class="column_container">
        <div class="column_container-header">{{ column.id }}</div>
        <div class="column-wrapper">
            <Sortable
                :key="JSON.stringify(column.cards)"
                draggable=".card"
                class="card-inner-wrapper"
                :options="cardDraggableOptions"
                :list="column.cards"
                :item-key="name"
                @start="onStart"
                @remove="onRemove"
                @add="onAdd"
                @update="onUpdate"
            >
                <template #item="{ element: card, index }">
                    <Card class="card" :card="card" :key="index" />
                </template>
            </Sortable>
        </div>
    </div>
</template>

<script>
import { Sortable } from 'sortablejs-vue3'
import Card from '../components/Card.vue'

export default {
    components: {
        Card,
        Sortable
    },
    props: {
        column: {
            type: Object,
            required: true
        }
    },
    computed: {
        cardDraggableOptions() {
            return {
                group: 'card',
                animation: 200,
                ghostClass: 'draggable-card-ghost'
            }
        }
    },
    methods: {
        onStart() {
            this.$store.commit('columns/SET_FROM_COLUMN_ID', this.column.id)
        },
        onUpdate(event) {
            const { oldIndex, newIndex } = event

            this.$store.commit('columns/MOVE_CARD_WITHIN_COLUMN', {
                oldIndex,
                newIndex,
                targetColumn: this.column
            })
        },
        onAdd(event) {
            const { oldIndex, newIndex } = event

            this.$store.commit('columns/ADD_CARD_TO_COLUMN', {
                oldIndex,
                newIndex,
                addedColumn: this.column
            })
        },
        onRemove(event) {
            const { oldIndex } = event

            this.$store.commit('columns/REMOVE_CARD_TO_COLUMN', { oldIndex })
        }
    }
}
</script>

<style lang="scss" scoped>
.column_container {
    overflow: auto;
    width: 316px;
    flex: 1 1 auto;
    background: black;
    color: white;
    display: flex;
    flex-direction: column;

    &-header {
        width: 100%;
        height: 80px;
        text-align: center;
    }
}

.card-inner-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
