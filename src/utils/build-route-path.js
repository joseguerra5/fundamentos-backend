
// /user/:id
export function buildRoutePath(path) {
  const routeParametersRegex = /:([a-zA-Z]+)/g

  const pathWithParms = path.replaceAll(routeParametersRegex, "(?<$1>[a-z0-9\-_]+)")
  //nomear grupos precisa colocar ?<$1> da primeira regex, routeParametersRegex

  const pathRegex = new RegExp(`^${pathWithParms}(?<query>\\?(.*))?$`)


  return pathRegex
  
}