import axios from '@axios'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchTodos(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axios
          .get('/apps/todo/todos', { params: queryParams })
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    fetchTodo(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/apps/todo/todos/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    
  },
}
