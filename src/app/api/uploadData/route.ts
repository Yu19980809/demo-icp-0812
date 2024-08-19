import { NextResponse } from 'next/server'
import formidable from 'formidable'
import path from 'path'

// 1. Move file to local server
// 2. Store file in IPFS
// 3. Store IPFS cid hash in blockchain
export async  function POST(req: Request) {
  try {
    console.log('req', req)
    // await moveFileToServer(req)
    // const {actualFileName, uniqueFileName} = await moveFileToServer(req)
    // console.log('Files are stored in local server')

    // await new Promise(resolve => setTimeout(resolve, 2000))

    // const response = await storeDataInBlockchain(actualFileName, uniqueFileName)
    // console.log('Hash stored in smart contract')

    return NextResponse.json('ok')
  } catch (err) {
    console.error(err)
  }
}

const moveFileToServer = (req: any) => {
  return new Promise((resolve, reject) => {
    const options = {}
    // @ts-ignore
    options.uploadDir = path.join(process.cwd(), '/pages/uploads')
    // @ts-ignore
    options.filename = (name, ext, path, form) => path.originalFilename
    const form = formidable(options)

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error(err)
        reject('Something went wrong')
        return
      }

      console.log('fields', fields)
      console.log('files', files)

      // const uniqueFileName = fields.filename
      // const actualFileName = files.file!.originalFilename

      // resolve({ uniqueFileName, actualFileName })
    })
  })
}

// const storeDataInBlockchain(actualFileName: string, uniqueFileName: string) => {}
