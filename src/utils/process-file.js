import fs from "node:fs"
import { parse } from "csv";

const pathCSVFile = new URL("../../desafio-01.csv", import.meta.url)

export const processFile = async () => {
  const records = [];
  const parser = fs.createReadStream(pathCSVFile).pipe(parse({
    
  }))

  for await (const record of parser) {
    records.push(record)
  }

  return records
}

// (async () => {
//   const records = await processFile();
//   console.log(records.toString())
// })();