export interface ILoginParams {
  userName: string
  passWord: string | number
}
export interface ILanzouyun {
  getLinkHtml: () => Promise<any>;
}