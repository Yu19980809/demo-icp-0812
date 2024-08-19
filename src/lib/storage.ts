import { create } from '@web3-storage/w3up-client'

export const initStorageClient = async () => {
  const account = process.env.STORAGE_ACCOUNT!
  const space = process.env.STORAGE_SPACE!

  const client = await create()
  // @ts-ignore
  await client.login(account)
  // @ts-ignore
  await client.setCurrentSpace(space)

  return client
}
