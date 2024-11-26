export function extractQyeryParams(query) {
  //remove a ? com o substr, faz split no & comercial e depois usa o reduce começando com um obj vazio
  return query.substr(1).split("&").reduce((queryParms, param) => {
    const [key, value] = param.split("=")

    queryParms[key] = value
    return queryParms
  }, {})
}