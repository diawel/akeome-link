'use server'

export const reservePrint = async (recievedFormData: FormData) => {
  const userAgent = recievedFormData.get('userAgent')
  const file = recievedFormData.get('file')
  if (!userAgent || !file) {
    throw new Error('Invalid form data')
  }

  const loginFormData = new FormData()
  loginFormData.append('userAgent', userAgent)
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
  uploadFormData.append('file', file)
  uploadFormData.append('authToken', loginResponse.authToken)
  uploadFormData.append('registerName', 'image.png')
  const uploadResponse: {
    result: string
  } = await (
    await fetch('https://networkprint.ne.jp/LiteServer/app/upload', {
      method: 'POST',
      body: uploadFormData,
      cache: 'no-cache',
      headers: {
        contentType: 'multipart/form-data',
      },
    })
  ).json()
  if (uploadResponse.result !== '') {
    throw new Error('Upload failed')
  }

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

const blobToBase64 = async (blob: Blob) => {
  const arrayBuffer = await blob.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  return `data:${blob.type};base64,${buffer.toString('base64')}`
}
