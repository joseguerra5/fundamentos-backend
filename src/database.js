import fs from "node:fs/promises"

const databasePath = new URL("db.json", import.meta.url)

export class Database {
  //tornar a propriedade e metodo privado tem quie colocar #, i
  #database = {}

  constructor() {
    fs.readFile(databasePath, "utf-8").then(data => {
      this.#database = JSON.parse(data)
    })
    .catch(() =>{
      this.#persist()
    })
  }

  //usando o filesinten para persistir o arquivo, vai vai criar o arquivo db,json
  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database))
  }
  select(table) {
    const data = this.#database[table] ?? []
    return data
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }

    this.#persist()

    return data
  }
}