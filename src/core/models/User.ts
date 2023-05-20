export default class User {
    id: string;
    image: string;
    public isEmpty: boolean;

    constructor(id: string, image: string) {
        this.id = id;
        this.image = image;
        this.isEmpty = false;
    }

    static empty(): User {
        var user = new User("", "");
        user.isEmpty = true;

        return user;
    }
}