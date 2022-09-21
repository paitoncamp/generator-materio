<template>
  
  <v-card id="todo-list">
    <!-- search -->
    <v-card-text class="d-flex align-center flex-wrap pb-0">
      <div class="d-flex align-center pb-5">
        <!-- actions -->
        <v-select
          v-model="selectedAction"
          label="Actions"
          single-line
          outlined
          dense
          :items="actions"
          hide-details
          :disabled="Boolean(!selectedTableData.length)"
          class="todo-list-actions me-3"
        ></v-select>

        <!-- create todo -->
        <v-btn
          color="primary"
          class="me-3"
          :to="{ name: 'apps-todo-add' }"
        >
          <v-icon
            size="18"
            class="me-1"
          >
            {{ icons.mdiPlus }}
          </v-icon>
          <span>Create Todo</span>
        </v-btn>
      </div>

      <v-spacer></v-spacer>

      <div class="d-flex align-center pb-5">
        <v-text-field
          v-model="searchQuery"
          single-line
          dense
          outlined
          hide-details
          placeholder="Search Todo"
          class="todo-list-search me-3"
        ></v-text-field>

        <v-select
          v-model="statusFilter"
          :items="statusOptions"
          single-line
          outlined
          dense
          hide-details
          clearable
          placeholder="Select Status"
          class="todo-list-status"
        ></v-select>
      </div>
    </v-card-text>

    <!-- table -->
    <v-data-table
      v-model="selectedTableData"
      :headers="tableColumns"
      :items="todoListTable"
      :options.sync="options"
      :server-items-length="totalTodoListTable"
      :loading="loading"
      show-select
      class="text-no-wrap"
    >
      

      <!-- id -->
      <template #[`item.id`]="{item}">
        <router-link
          class="font-weight-medium text-decoration-none"
          :to="{ name: 'apps-todo-preview', params: { id: item.id } }"
        >
          #{{ item.id }}
        </router-link>
      </template>

      <!-- status  -->
      <template #[`item.status`]="{item}">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-avatar
              size="30"
              :color="resolveTodoStatusVariantAndIcon(item.status).variant"
              :class="`v-avatar-light-bg ${resolveTodoStatusVariantAndIcon(item.status).variant}--text`"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon
                size="18"
                :color="resolveTodoStatusVariantAndIcon(item.status).variant"
              >
                {{ resolveTodoStatusVariantAndIcon(item.status).icon }}
              </v-icon>
            </v-avatar>
          </template>
          <span>{{ item.status }}</span>
        </v-tooltip>
      </template>

      

      <!-- item -->
      <template #[`item.item`]="{item}">
        ${{ item.item }}
      </template>

      

      <!-- userid -->
      <template #[`item.user_id`]="{item}">
        <span class="text-no-wrap">{{ item.user_id }}</span>
      </template>

      <!-- actions -->
      <template #[`item.actions`]="{item}">
        <div class="d-flex align-center justify-center">
          <!-- delete -->
          <v-tooltip bottom>
            <template #activator="{ on, attrs }">
              <v-btn
                icon
                small
                v-bind="attrs"
                v-on="on"
              >
                <v-icon size="18">
                  {{ icons.mdiDeleteOutline }}
                </v-icon>
              </v-btn>
            </template>
            <span>Delete</span>
          </v-tooltip>

          <!-- view  -->
          <v-tooltip bottom>
            <template #activator="{ on, attrs }">
              <v-btn
                icon
                small
                v-bind="attrs"
                :to="{ name: 'apps-invoice-preview', params: { id: item.id } }"
                v-on="on"
              >
                <v-icon size="18">
                  {{ icons.mdiEyeOutline }}
                </v-icon>
              </v-btn>
            </template>
            <span>View Invoice</span>
          </v-tooltip>

          <!-- dropdown -->
          <v-menu
            bottom
            left
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                small
                icon
                v-bind="attrs"
                v-on="on"
              >
                <v-icon size="18">
                  {{ icons.mdiDotsVertical }}
                </v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item
                v-for="(option, i) in actionOptions"
                :key="i"
                href="javascript:void(0)"
              >
                <v-list-item-title>
                  <v-icon
                    size="18"
                    class="me-2"
                  >
                    {{ option.icon }}
                  </v-icon>
                  <span>{{ option.title }}</span>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </template>
    </v-data-table>
	
	
  </v-card>
  
</template>

  

<script>
import {
  mdiTrendingUp,
  mdiPlus,
  mdiDeleteOutline,
  mdiDotsVertical,
  mdiEyeOutline,
  mdiDownloadOutline,
  mdiPencilOutline,
  mdiContentCopy,
} from '@mdi/js'

import { onUnmounted, ref } from '@vue/composition-api'
import { avatarText } from '@core/utils/filter'
import store from '@/store'

// store module
import todoStoreModule from '../todoStoreModule'

// composition function
import useTodosList from './useTodoList'

export default {
  setup() {
    
    const TODO_APP_STORE_MODULE_NAME = 'app-todo'
	
    // Register module
    if (!store.hasModule(TODO_APP_STORE_MODULE_NAME)) {
      store.registerModule(TODO_APP_STORE_MODULE_NAME, todoStoreModule)
    }

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(TODO_APP_STORE_MODULE_NAME)) store.unregisterModule(TODO_APP_STORE_MODULE_NAME)
    })

    const {
      todoListTable,
      searchQuery,
      tableColumns,
      options,
      statusFilter,
      totalTodoListTable,
      loading,
      selectedTableData,
      resolveTodoStatusVariantAndIcon,
      
    } = useTodosList()

    const statusOptions = ref(['belum', 'sudah'])

    const actions = ['Delete', 'Edit', 'Send']

    const selectedAction = ref('')

    const actionOptions = [
      { title: 'Download', icon: mdiDownloadOutline },
      { title: 'Edit', icon: mdiPencilOutline },
      { title: 'Delete', icon: mdiDeleteOutline },
      { title: 'Duplicate', icon: mdiContentCopy },
    ]

    const checkType = data => {
      if (typeof data === 'number') return 'number'
      if (typeof data === 'string') return 'string'

      return 0
    }

    return {
      tableColumns,
      searchQuery,
      statusOptions,
      statusFilter,
      options,
      totalTodoListTable,
      todoListTable,
      loading,
      actions,
      selectedTableData,
      actionOptions,
      selectedAction,

      checkType,
      avatarText,
      resolveTodoStatusVariantAndIcon,
      

      icons: {
        mdiTrendingUp,
        mdiPlus,
        mdiDeleteOutline,
        mdiDotsVertical,
        mdiEyeOutline,
      },
    }
  },
  
}
</script>

<style lang="scss" scoped>
#todo-list {
  .todo-list-actions {
    max-width: 7.81rem;
  }
  .todo-list-search {
    max-width: 10.625rem;
  }
  .todo-list-status {
    max-width: 11.3rem;
  }
}
</style>
