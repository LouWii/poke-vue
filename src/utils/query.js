
/**
 * Generate WHERE conditions from an object for querying DB
 * @param {*} filters 
 */
export const buildQueryFilter = function(filters) {
  let query = ''
  let queryParameters = {}
  Object.keys(filters).forEach((key, index) => {
    if (filters.hasOwnProperty(key)) {
      if (index > 0) {
        query += ' AND '
      }
      query += key + ' = $'+ key
      queryParameters['$'+key] = filters[key]
    }
  })

  return {query, queryParameters}
}