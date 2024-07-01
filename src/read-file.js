import fs from "node:fs";
import { parse } from "csv";

// Aprendi a fazer esse arquivo por esse post da Digital Ocean -> https://www.digitalocean.com/community/tutorials/how-to-read-and-write-csv-files-in-node-js-using-node-csv

const pathCSVFile = new URL("../desafio-01.csv", import.meta.url)

fs
    .createReadStream(pathCSVFile)
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", async function (row) {
      const title = row[0]
      const description = row[1]
      
      await fetch("http://localhost:3333/tasks", {
        method: "POST",
        body: JSON.stringify({
          title,
          description
        })
      })
      
    })
    .on("end", function () {
      console.log("A leitura dos arquivos foram finalizadas!")
    })
    .on("error", function (error) {
      console.log(error.message)
    });
