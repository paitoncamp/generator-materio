import store from '@/store'
import {
  mdiAlertCircleOutline,
  mdiChartTimelineVariant,
  mdiCheckCircleOutline,
  mdiClose,
  mdiContentSaveOutline,
  mdiDownloadCircleOutline,
  mdiEmailOutline,
} from '@mdi/js'
import { ref, watch } from '@vue/composition-api'

export default function useTodosList() {
  const todoListTable = ref([])

  // Table Handlers
  const tableColumns = [
    {
      text: '#ID',
      align: 'start',
      value: 'id',
    },
    //{ text: 'Trending', value: 'trending', sortable: false },
    { text: 'Item', value: 'item' },
    { text: 'User_Id', value: 'user_id' },
    { text: 'Status', value: 'status' },
    {
      text: 'ACTIONS',
      value: 'actions',
      align: 'center',
      sortable: false,
    },
  ]

  const searchQuery = ref('')
  const options = ref({
    sortBy: ['id'],
    sortDesc: [true],
  })
  const totalTodoListTable = ref(0)
  const loading = ref(false)
  const statusFilter = ref(null)
  const selectedTableData = ref([])

  const fetchTodos = () => {
    store
      .dispatch('app-todo/fetchTodos', {
        q: searchQuery.value,
        options: options.value,
        status: statusFilter.value,
      })
      .then(response => {
        const { filteredData, total } = response.data
        todoListTable.value = filteredData
        totalTodoListTable.value = total
        loading.value = false
      })
      .catch(error => {
        console.log(error)
      })
  }

  watch([searchQuery, statusFilter, options], () => {
    // start loading
    loading.value = true
    selectedTableData.value = []
    fetchTodos()
  })

  // *===============================================---*
  // *--------- UI ---------------------------------------*
  // *===============================================---*

  const resolveTodoStatusVariantAndIcon = status => {
    if (status === 'belum') return { variant: 'warning', icon: mdiChartTimelineVariant }
    if (status === 'sudah') return { variant: 'success', icon: mdiCheckCircleOutline }
    

    return { variant: 'secondary', icon: mdiClose }
  }

  

  return {
    tableColumns,
    searchQuery,
    options,
    todoListTable,
    statusFilter,
    totalTodoListTable,
    loading,
    selectedTableData,
    fetchTodos,
    resolveTodoStatusVariantAndIcon,
    
  }
}
