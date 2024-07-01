import fs from 'node:fs/promises'

const pathDBJson = new URL('../db.json', import.meta.url)

export class DataBase {

  #database = {};

  constructor() {
    fs.readFile(pathDBJson, 'utf-8').then((data) => (
      this.#database = JSON.parse(data)
    )).catch(() => {
      this.#persist()
    })
  }

  #persist() {
    fs.writeFile(pathDBJson, JSON.stringify(this.#database))
  }

  select(table) {
    const db = this.#database[table] ?? []

    return db
  }

  insert(table, data) {

    if(Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }

    this.#persist()

    return data
  }

  update(table, id, data) {
    const indexRow = this.#database[table].findIndex((row) => row.id === id)

    const currentData = this.#database[table][indexRow]

    if(indexRow > -1) {
      this.#database[table][indexRow] = {
        id, 
        title: data.title ?? currentData.title,
        description: data.description ?? currentData.description,
        completed_at: currentData.completed_at !== null ? null : new Date(),
        created_at: currentData.created_at,
        updated_at: new Date()
      }

      this.#persist()
    } 
  }

  delete(table, id) {
    const indexRow = this.#database[table].findIndex((row) => row.id === id)

    if(indexRow > -1) {
      this.#database[table].splice(indexRow, 1)
      this.#persist()
    }
  }


}