export default class PostEntity
{
    public id: string = "";
    public userId: string = "";
    public imageUrl: string = "";
    public text: string = "";
    public title: string = "";
    public creationTime: Date = new Date();
    public likes: number = 0;
    public isLiked: boolean = false;

    static empty(): PostEntity {
        return new PostEntity();
    }
}