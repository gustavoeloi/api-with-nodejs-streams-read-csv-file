export default async function(req, res) {
  const chunks = []

  for await (let chunk of req) {
    chunks.push(chunk)
  }

  try {
    req.body = JSON.parse(Buffer.concat(chunks).toString())
  } catch {
    req.body = null
  }

  res.setHeader('Content-Type', 'application/json')
}