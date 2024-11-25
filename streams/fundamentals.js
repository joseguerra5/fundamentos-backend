import {Readable, Writable, Transform} from "node:stream"

class OneToHundredStream extends Readable {
  index = 1

  _read() {
    const i = this.index++

    setTimeout(() => {
      if (i > 10) {
        this.push(null)
      } else {
        const buf = Buffer.from(String(i))
  
        this.push(buf)
      }
    },1000)
    
  }
}

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1

    //primeiro parametro é o error
    callback(null, Buffer.from(String(transformed)))
  }
}

class MultiplyByTenStram extends Writable {
  //chunk é o pedaço da stream de leitura(buf)
  //encoding é como a informação está codificada
  //callback é a função a ser chamada quando termina de fazer com a informação
  //stram de leitura nunca retorna nada
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10)
    callback()
  }
}
new OneToHundredStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyByTenStram())
//tudo que recebe é encaminhado pelo pipe para process.stdout 


//um chunk sempre tem que ser um buffer


