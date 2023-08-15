export interface IUserData{
    username: string
    password: string
    firstName: string 
    lastName: string 
    email: string
}
export interface IUserlogin{
    username: string
    password: string
}
export interface IUser{
    id: number
    username: string
    token: string
}
export interface IResponseUser{
    email: string | undefined
    password: string | undefined
    firstName: string | undefined
    lastName: string | undefined
    username: string | undefined
    createdAt: string | undefined
    updatedAt: string | undefined
    deletedAt: string | undefined
}


export interface IResponseUserData{
     token:string
     user: IResponseUser

}
export interface IPoll {
    id: number;
    title:string;
    explanation: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
}
export interface IPolladd {
    title:string;
    explanation: string;
}

