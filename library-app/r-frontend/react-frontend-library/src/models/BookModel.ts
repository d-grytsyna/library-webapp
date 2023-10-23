class BookModel{
    id:number;
    title: string;
    author?: string;
    description: string;
    copies?: number;
    copiesAvailable?:number;
    category?: string;
    img?:Uint8Array;

    constructor(id:number,
        title:string,
        author:string,
        description:string,
        copies:number,
        copiesAvailable:number,
        category: string,
        img:Uint8Array){
            this.id = id;
            this.title = title;
            this.author = author;
            this.description = description;
            this.copies = copies;
            this.copiesAvailable = copiesAvailable;
            this.category = category;
            this.img = img;

    }
}
export default BookModel;