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
  select(table, search) {
    //let it change
    let data = this.#database[table] ?? []

    if (search) {
      data = data.filter(row => {
        //Object entries transforma o objeto em array
        //some percorre o array e se retornar true é incluido no filtro
        return Object.entries(search).some(([key, value]) => {
          return row[key].toLowerCase().includes(value.toLowerCase())
        })
      })
    }
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

  update(table, id, data) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)

    //se não encontrou index retorna -1
    if (rowIndex > -1) {
      this.#database[table][rowIndex] = {id, ...data}
      this.#persist()
    }
  }

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)

    //se não encontrou index retorna -1
    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1)
      this.#persist()
    }
  }
}