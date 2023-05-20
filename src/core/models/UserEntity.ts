export default class UserEntity
{
    public id: string = "";
    public email: string = "";
    public imageUrl: string = "";
    public name: string = "";
    public bio: string = "";
    public postsCount: number = 0;
    public followersCount: number = 0;
    public followingsCount: number = 0;

    static empty(): UserEntity {
        return new UserEntity();
    }
}