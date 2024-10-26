'use server'

export const reservePrint = async (recievedFormData: FormData) => {
  const loginFormData = new FormData()
  loginFormData.append(
    'userAgent',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36'
  )
  const loginResponse: {
    result: string
    authToken: string
    userCode: string
  } = await (
    await fetch('https://networkprint.ne.jp/LiteServer/app/login', {
      method: 'POST',
      body: loginFormData,
      cache: 'no-cache',
    })
  ).json()
  const uploadFormData = new FormData()
  uploadFormData.append('file', recievedFormData.get('file') as Blob)
  uploadFormData.append('authToken', loginResponse.authToken)
  uploadFormData.append('registerName', `new_year_card_${Date.now()}.png`)

  await fetch('https://networkprint.ne.jp/LiteServer/app/upload', {
    method: 'POST',
    body: uploadFormData,
    cache: 'no-cache',
  })

  const qrcodeResponse = await (
    await fetch('https://networkprint.ne.jp/nwpsapi/v1/login/qrcode', {
      method: 'GET',
      headers: {
        'X-NWPSToken': loginResponse.authToken,
      },
    })
  ).blob()
  return {
    base64QrCode: await blobToBase64(qrcodeResponse),
    userCode: loginResponse.userCode,
  }
}

async function blobToBase64(blob: Blob): Promise<string> {
  const arrayBuffer = await blob.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  return `data:${blob.type};base64,${buffer.toString('base64')}`
}
