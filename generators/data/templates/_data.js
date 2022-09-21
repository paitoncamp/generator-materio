import mock from '@/@fake-db/mock'

const data = [
	
		{
		  id: 2,
		  item: "jadwal mand",
		  user_id: 1,
		  status: "belum"
		},
		{
		  id: 3,
		  item: "jadwal mand",
		  user_id: 1,
		  status: "belum"
		},
		{
		  id: 4,
		  item: "jadwal mand",
		  user_id: 1,
		  status: "belum"
		},
		{
		  id: 5,
		  item: "jadwal mand",
		  user_id: 1,
		  status: "belum"
		},
		{
		  id: 6,
		  item: "jadwal mand",
		  user_id: 1,
		  status: "sudah"
		}
	 
]



/* eslint-enable */

// ------------------------------------------------
// GET: Return Data
// ------------------------------------------------

mock.onGet('/apps/<%= dataName%>/<%= dataName%>s').reply(config => {
  // eslint-disable-next-line object-curly-newline
  const { q = '', status = '', options = {} } = config.params

  // eslint-disable-next-line object-curly-newline
  const { sortBy = '', sortDesc = '', page, itemsPerPage } = options

  /* eslint-enable */

  const queryLowered = q.toLowerCase()

  let filteredData = data.filter(
    <%= dataName%> =>
      /* eslint-disable operator-linebreak, implicit-arrow-linebreak */
      (<%= dataName%>.item.toLowerCase().includes(queryLowered) ) &&
      <%= dataName%>.status === (status || <%= dataName%>.status),
  )
  /* eslint-enable  */

  // sorting
  if (sortBy.length === 1 && sortDesc.length === 1) {
    filteredData = filteredData.sort((a, b) => {
      let sortA = ''
      let sortB = ''
      if (sortBy[0] === 'item') {
        sortA = a[sortBy[0]].item
        sortB = b[sortBy[0]].item
      } else {
        sortA = a[sortBy[0]]
        sortB = b[sortBy[0]]
      }

      if (sortDesc[0]) {
        if (sortA < sortB) return 1
        if (sortA > sortB) return -1

        return 0
      }

      if (sortA < sortB) return -1
      if (sortA > sortB) return 1

      return 0
    })
  }

  return [
    200,
    {
      filteredData:
        itemsPerPage !== -1 ? filteredData.slice((page - 1) * itemsPerPage, page * itemsPerPage) : filteredData,
      total: filteredData.length,
	  total_records: filteredData.length,
	  record_count: filteredData.length,
	  total_page: 1
    },
  ]
})

// ------------------------------------------------
// GET: Return Single Record
// ------------------------------------------------
mock.onGet(/\/apps\/<%= dataName%>\/<%= dataName%>s\/\d+/).reply(config => {
  // Get event id from URL
  let <%= dataName%>Id = config.url.substring(config.url.lastIndexOf('/') + 1)

  // Convert Id to number
  <%= dataName%>Id = Number(<%= dataName%>Id)

  const <%= dataName%>Index = data.findIndex(e => e.id === <%= dataName%>Id)
  const <%= dataName%> = data[<%= dataName%>Index]
  const responseData = {
    <%= dataName%>
  }

  if (<%= dataName%>) return [200, responseData]

  return [404]
})


