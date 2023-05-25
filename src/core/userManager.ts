import User from "./models/User";

export default class UserManager {
    private ublogId: string = "ublogId";
    private ublogImg: string = "ublogImg";

    private _user: User;
    private _logout: () => void;

    public getUser(): User {
        return this._user;
    }

    public constructor(logout: () => void) {
        this._user = this.initUser();
        this._logout = logout;
    }

    private initUser(): User {
        var id = localStorage.getItem(this.ublogId)

        if (id == null) {
            return User.empty();
        }
        
        var img = localStorage.getItem(this.ublogImg)

        return new User(id!, img!);
    }

    public setUser(id: string, image: string, token: string) {
        this._user = new User(id, image);

        sessionStorage.setItem("accessToken", token)
        localStorage.setItem("ublogId", id)
        localStorage.setItem("ublogImg", image)
    }

    public logout() {
        localStorage.clear();
        sessionStorage.clear();

        this._logout();
    }
}