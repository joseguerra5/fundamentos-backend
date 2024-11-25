import {randomUUID} from "node:crypto"
import { Database } from "./database.js"
import { buidRoutePath } from "./utils/build-route-path.js"

const database = new Database()
export const routes = [
  {
    method: "GET",
    path: buidRoutePath("/users"),
    handler: (req, res) => {
      const users = database.select("users")

    return res
    .setHeader("Content-type", "application/json")
    .end(JSON.stringify(users))
    }
  },
  {
    method: "POST",
    path: buidRoutePath("/users"),
    handler: (req, res) => {
      const {name, email} = req.body
    const user = {
      id: randomUUID(),
      name,
      email,
    }

    database.insert("users", user)

    return res.writeHead(201).end()
    }
  },

  {
    method: "DELETE",
    path: buidRoutePath("/users/:id"),
    handler: (req, res) => {

    return res
    .end()
    }
  },

  
]