import http from "node:http" 
import { json } from "../streams/middlewares/json.js"
import { routes } from "./routes.js"
import { extractQyeryParams } from "./utils/extract-query-params.js"

//Query Parameteres:  URL Stateful(fica armazenado na URL, informações não sensíveis - Filtros, paginação, não obrigatórios)
//Route Parameter: Indentificação de recursos user/1
//Request Body:Envio de informações de form 




//criou o primeiro servidor http que vai lidar com o servidor
const server = http.createServer(async (req, res) => {
  const {method, url} = req

  //todo middleware precisa mandar o req e o res
  await json(req, res)

  const route = routes.find(route => {
    return route.method === method && route.path.test(url)
  })

  if (route) {
    const routeParams = req.url.match(route.path)

    const {query, ...params} = routeParams.groups

    req.params = params
    req.query = query ? extractQyeryParams(query) : {}
    

    return route.handler(req, res)
  }

  return res.writeHead(404).end()
})

//quer que o servidor escute a porta 33333
server.listen(3333)