import http from "node:http" 
import {Transform} from "node:stream"

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1

    console.log(transformed)
    //primeiro parametro é o error
    callback(null, Buffer.from(String(transformed)))
  }
}

//req => ReadableStream
//res => WritableStream



const server = http.createServer(async (req, res) => {
  //trabalhar com as informações completas, precisa da sintax a seguir
  //espera todas as informações serem incluiidas na stream para retornar a informação 
  const buffers = []

  for await(const chunk of req) {
    buffers.push(chunk)
  }

  const fullStreanContent = Buffer.concat(buffers).toString()

  console.log(fullStreanContent)

  return res.end(fullStreanContent)
})

server.listen(3334)