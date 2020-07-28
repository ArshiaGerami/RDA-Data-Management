export class Group {
    page: number;
    per_page: number;
}
export class Item {
    title: string
}
export class CreateGroup {
    item = Item;
}
export class GroupDisable {
    id: string;
}
export class getUpdateGroupDetail {
    id: string;
    title: string;
}
export class UpdateGroup {
    item: getUpdateGroupDetail[];
}
// export class File {

// }
export class FileArray {
    // files: File[];
    file:string;
    userId: string;
    // query: {}
    groupId:string
}
export class GroupFilter {
    page: number;
    per_page: number;
    query: string;
    groupId: string;
}
export class UserFilter {
    page: number;
    per_page: number;
    query: string;
}
export class userCreate {
    password: string;
    name: string;
    email: string;
    relations: [
        {
            "group": string,
            "role": number,
        }
    ]
}
export class CreateUser {
    item: userCreate[]
}
export class UpdateUserItem{
    id:string;
    name:string;
    email:string;
    password:string;
    relations:[
        {
            "group":string,
            "role":number
        }
    ]
}
export class UpdateUser{
    item: UpdateUserItem[]
}

export class ChangePassword{
    id:string;
	currentPassword:string;
	newPassword:string;
	confirmedPassword:string;
}