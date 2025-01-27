import http from 'node:http'

import json from './middlewares/json.js'

import { routes } from './routes.js'

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  await json(req, res)
  
  const route = routes.find((route) => {
    return route.method === method && route.url.test(url)
  })

  if(route) {
    const routeParams = url.match(route.url)

    const { id } = {...routeParams.groups}

    req.params = id

    return route.handler(req, res)
  }


  return res.writeHead(404).end()
})

server.listen(3333)