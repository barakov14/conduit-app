export interface ImageResponse {
  files: Files[]
}

export interface Files {
  formDataFieldName: string
  accountId: string
  filePath: string
  fileUrl: string
}
