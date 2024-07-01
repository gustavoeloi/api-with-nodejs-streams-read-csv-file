import { DataBase } from "./db.js";
import { randomUUID } from "node:crypto";
import { Transform } from "node:stream"
import { buildRoutePath } from "./utils/build-route-path.js";

const database = new DataBase();

// class ReadFileAndPost extends Transform {
//   _transform(chunk, encoding, callback) {
    
//   }
// }

export const routes = [
  {
    method: "POST",
    url: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { title, description } = req.body;

      database.insert("tasks", {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date(),
        updated_at: null,
      });

      return res.writeHead(201).end();
    },
  },
  {
    method: "GET",
    url: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const data = database.select("tasks");

      res.writeHead(202).end(JSON.stringify(data));
    },
  },
  {
    method: "PUT",
    url: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      
      const id = req.params

      const { title, description } = req.body;

      database.update('tasks', id, {title, description})

      return res.writeHead(202).end()
    },
  },
  {
    method: "DELETE",
    url: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {

      const id = req.params

      database.delete("tasks", id)

      return res.writeHead(200).end()
    }
  }, {
    method: "PATCH",
    url: buildRoutePath("/tasks/:id/complete"),
    handler: (req, res) => {
      const id = req.params
      
      database.update("tasks", id, { completed_at: new Date() })

      return res.writeHead(202).end()
    }
  },
];
