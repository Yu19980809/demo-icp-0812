'use client'

import { useState } from 'react'
import { Button } from '../ui/button'
import { initStorageClient } from '@/lib/storage'

const Storage = () => {
  const [file, setFile] = useState<any>(null)
  const [fileName, setFileName] = useState<string>('')
  const [result, setResult] = useState<any>(null)

  const handleChange = (e: any) => {
    const name = e.target.name
    console.log('name', name)

    if (name === 'file') {
      setFile(e.target.files[0])
    } else if (name === 'filename') {
      setFileName(e.target.value)
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    
    const content = 'hello world'
    const blob = new Blob([content], { type: 'text/plain' })

    const client = await initStorageClient()
    const cid = await client.uploadFile(blob)
    console.log('cid: ', cid)
  }

  // const handleSubmit = async (e: any) => {
  //   e.preventDefault()
  //   console.log('fileName', fileName)
  //   console.log('file', file)

  //   try {
  //     let formData = new FormData()
  //     formData.append('filename', fileName)
  //     formData.append('file', file)

  //     const res = await fetch('/api/uploadData', {
  //       method: 'POST',
  //       body: formData
  //     })

  //     if (!res.ok) throw new Error('Network response is not ok')

  //     const data = await res.json()
  //     setResult(data.message)
  //   } catch (err) {
  //     console.error(err)
  //   }
  // }

  return (
    <div className="flex flex-col gap-y-4">
      <h1>Upload file</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="filename">File Name</label>
        <input type="text" name="filename" value={fileName} onChange={handleChange} />
        <br />

        <label htmlFor="file">Select File</label>
        <input type="file" name="file" onChange={handleChange} />
        <br />

        <Button type="submit">Submit</Button>
      </form>

      {result && <p>{result}</p>}
    </div>
  )
}

export default Storage
