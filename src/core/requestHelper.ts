import { IPostEntity } from "./models/PostEntity";
import { IUserEntity } from "./models/UserEntity";

function getPath(url: string): string {
    return "http://localhost:5196/" + url;
}

const getFollowerUsers = (id: string) => requestGet<string[]>("users/follower/" + id);

const getFollowingUsers = (id: string) => requestGet<string[]>("users/following/" + id);

const getUser = (id: string) => requestGet<IUserEntity>("users/" + id);

const getPost = (id: string) => requestGet<IPostEntity>("posts/" + id)

function requestGet<T>(url: string): Promise<T> {
    return fetch(getPath(url))
        .then(response => response.json());
}

const executeLogin = (username: string, password: string) => {
    var body = {
        username,
        password
    }

    return executePost("login", body)
}

const executeSignup = (username: string, password: string) => {
    var body = {
        username,
        password
    }

    return executePost("signup", body)
}

const executeUserUpdate = (email: string, name: string, bio: string, image: string) => {
    var body = {
        email,
        name,
        bio,
        image
    }

    return executePost('user', body, 'put')
}

const executePostCreation = (title: string, text: string, image: string) => {
    var body = {
        title,
        text,
        image
    }

    return executePost('posts', body)
}

const executePostModify = (id: string, title: string, text: string, image: string) => {
    var body = {
        id,
        title,
        text,
        image
    }

    return executePost('posts', body, "put")
}

function executePost(url: string, body: any, method: string = 'post') {
    var info = {
        method,
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json; charset=UTF-8' }
    }

    var request = new Request(url, info);

    modifyForAuth(request);

    return fetch(getPath(url), info)
        .then((response) => response.json())
        .catch((error) => console.log(error));
}

const getPosts = (type: string, id: string): Promise<IPostEntity[]> => {
    return requestGet(get(type, id));
}

function get(type: string, id: string) {
    switch (type) {
        case "user":
            return "posts/user/" + id;
        case "like":
            return "posts/userlikes";
        case "sub":
            return "posts/following";

        default:
            return "posts";
    }
}

function executeLike(id: string, value: boolean) {
    request("like/" + id, value ? "put" : "delete");
}

function request(url: string, method: string = "get") {
    let info = { method };

    var request = new Request(getPath(url), info);

    modifyForAuth(request);

    fetch(request).catch(console.log);
}

function modifyForAuth(request: Request) {
    let token = sessionStorage.getItem("accessToken");

    if (token != undefined) {
        request.headers.append("Authorization", "Bearer" + token);
    }
}

export {
    getPath, getPosts, getPost, getUser, getFollowerUsers, getFollowingUsers,
    executeLogin, executeSignup, executeUserUpdate, executePostCreation, executePostModify, executeLike
};