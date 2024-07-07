const state = () => {
    return {
        fromColumnId: null,
        columns: [
            {
                id: 'column_1',
                sort_order: 0,
                cards: [
                    {
                        id: 'column_1, card_1',
                        name: 'card_1',
                        card_sort_order: 0,
                        color: 'green'
                    },
                    {
                        id: 'column_1, card_2',
                        name: 'card_2',
                        card_sort_order: 1,
                        color: 'green'
                    },
                    {
                        id: 'column_1, card_3',
                        name: 'card_3',
                        card_sort_order: 2,
                        color: 'green'
                    },
                    {
                        id: 'column_1, card_4',
                        name: 'card_4',
                        card_sort_order: 3,
                        color: 'green'
                    }
                ]
            },
            {
                id: 'column_2',
                sort_order: 1,
                cards: [
                    {
                        id: 'column_2, card_1',
                        name: 'card_1',
                        card_sort_order: 0,
                        color: 'red'
                    },
                    {
                        id: 'column_2, card_2',
                        name: 'card_2',
                        card_sort_order: 1,
                        color: 'red'
                    },
                    {
                        id: 'column_2, card_3',
                        name: 'card_3',
                        card_sort_order: 2,
                        color: 'red'
                    },
                    {
                        id: 'column_2, card_4',
                        name: 'card_4',
                        card_sort_order: 3,
                        color: 'red'
                    }
                ]
            },
            {
                id: 'column_3',
                sort_order: 2,
                cards: [
                    {
                        id: 'column_3, card_1',
                        name: 'card_1',
                        card_sort_order: 0,
                        color: 'blue'
                    },
                    {
                        id: 'column_3, card_2',
                        name: 'card_2',
                        card_sort_order: 1,
                        color: 'blue'
                    },
                    {
                        id: 'column_3, card_3',
                        name: 'card_3',
                        card_sort_order: 2,
                        color: 'blue'
                    },
                    {
                        id: 'column_3, card_4',
                        name: 'card_4',
                        card_sort_order: 3,
                        color: 'blue'
                    }
                ]
            },
            {
                id: 'column_4',
                sort_order: 3,
                cards: [
                    {
                        id: 'column_4, card_1',
                        name: 'card_1',
                        card_sort_order: 0,
                        color: 'purple'
                    },
                    {
                        id: 'column_4, card_2',
                        name: 'card_2',
                        card_sort_order: 1,
                        color: 'purple'
                    },
                    {
                        id: 'column_4, card_3',
                        name: 'card_3',
                        card_sort_order: 2,
                        color: 'purple'
                    },
                    {
                        id: 'column_4, card_4',
                        name: 'card_4',
                        card_sort_order: 3,
                        color: 'purple'
                    }
                ]
            }
        ]
    }
}

const mutations = {
    MOVE_COLUMN(state, { oldIndex, newIndex }) {
        const item = state.columns.splice(oldIndex, 1)[0]
        state.columns.splice(newIndex, 0, item)

        // Assign new order
        state.columns.forEach((column, index) => {
            column.sort_order = index
        })
    },
    SET_FROM_COLUMN_ID(state, columnId) {
        state.fromColumnId = columnId
    },
    MOVE_CARD_WITHIN_COLUMN(state, { oldIndex, newIndex, targetColumn }) {
        const targetColumnIndex = state.columns.findIndex((column) => column.id === targetColumn.id)
        if (targetColumnIndex !== -1) {
            const targetColumn = state.columns[targetColumnIndex]
            // Copy the target card
            const movedCard = { ...targetColumn.cards[oldIndex] }
            // Remove the target card from its old position
            targetColumn.cards.splice(oldIndex, 1)
            // Insert the copied target card into its new position
            targetColumn.cards.splice(newIndex, 0, movedCard)
            // Update card_sort_order for each card
            targetColumn.cards.forEach((card, index) => {
                card.card_sort_order = index
            })
            // Update state
            state.columns.splice(targetColumnIndex, 1, targetColumn)
        }
    },
    ADD_CARD_TO_COLUMN(state, { oldIndex, newIndex, addedColumn }) {
        const fromColumn = state.columns.find((column) => column.id === state.fromColumnId)
        const fromCard = fromColumn.cards.find((card) => card.card_sort_order === oldIndex)
        const addColumn = state.columns.find((column) => column.id === addedColumn.id)

        addColumn.cards.splice(newIndex, 0, fromCard)

        addColumn.cards.forEach((card, index) => {
            card.card_sort_order = index
        })
    },
    REMOVE_CARD_TO_COLUMN(state, { oldIndex }) {
        const updatedColumns = state.columns.map((column) => {
            // Find the column with the matching id
            if (column.id === state.fromColumnId) {
                // Create a copy of the column object
                const updatedColumn = { ...column }
                // Remove the card at the specified oldIndex
                updatedColumn.cards.splice(oldIndex, 1)
                // Update card_sort_order for each card
                updatedColumn.cards.forEach((card, index) => {
                    card.card_sort_order = index
                })
                // Return the updated column
                return updatedColumn
            }
            // For other columns, return them unchanged
            return column
        })

        // Update the state with the new columns array
        state.columns = updatedColumns
    }
}

export default {
    namespaced: true,
    state,
    mutations
}
