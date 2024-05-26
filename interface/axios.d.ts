import "axios"

declare module "axios" {
  export interface AxiosResponse<T = any> {
    meta?: any
    message?: string
  }
}
