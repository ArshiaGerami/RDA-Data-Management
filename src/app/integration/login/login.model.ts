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
export class getUpdateGroupDetail{
    id: string;
    title: string;
}
export class UpdateGroup {
  item: getUpdateGroupDetail[];
}
export class File{

}
export class FileArray{
    files:File[]
    userId:string;
    query:{}
}