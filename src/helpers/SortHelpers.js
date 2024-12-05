export const handleSort = (column, sortColumn, setSortColumn, sortOrder, setSortOrder) => {
  if (column === sortColumn) {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
  } else {
    setSortColumn(column)
    setSortOrder('asc')
  }
}

export const sortData = (data, column, order, columnToDataMap) => {
  return [...data].sort((a, b) => {
    const path = columnToDataMap[column]
    let aValue = a
    let bValue = b
    if (path) {
      for (const key of path) {
        aValue = aValue[key]
        bValue = bValue[key]
      }
    }

    if (aValue < bValue) return order === 'asc' ? -1 : 1
    if (aValue > bValue) return order === 'asc' ? 1 : -1
    return 0
  })
}
