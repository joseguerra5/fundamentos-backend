export async function json(req, res) {
  const buffers = []

  for await(const chunk of req) {
    buffers.push(chunk)
  }

  try {
    //pego a requisição http, converto em json depois dela estar completa
    req.body = JSON.parse(Buffer.concat(buffers).toString())
  } catch {
    //se não tiver um body enão coloco como null
    req.body = null
  }

  res.setHeader("Content-type", "application/json")
}