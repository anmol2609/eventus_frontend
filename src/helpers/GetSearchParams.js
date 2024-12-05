export const getSearchParams = (searchParams) => {
  const entries = searchParams.entries()
  const params = {}
  for (const [key, value] of entries) {
    params[key] = value
  }
  return params
}
