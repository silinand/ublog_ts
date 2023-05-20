import PostEntity from "./models/PostEntity";
import UserEntity from "./models/UserEntity";

function getPath(url: string): string {
    return "http://localhost:5196/" + url;
}

/*function modifyHeaders(info: RequestInit) {
    var token = sessionStorage.getItem("accessToken");
    token != null ?? info.headers!.add(['Authorization', "Bearer " + token]);
}*/

const getUsers = () => request("users");

const getFollowerUsers = (id: string) => request<string[]>("users/follower/" + id);

const getFollowingUsers = (id: string) => request<string[]>("users/following/" + id);

const getUser = (id: string) => request<UserEntity>("users/" + id);

const getPost = (id: string) => request<PostEntity>("posts/" + id)

function request<T>(url: string): Promise<T> {
    return fetch(getPath(url))
        .then((response) => response.json());
}

const executeLogin = (username: string, password: string) => {
    var body = {
        username: username,
        password: password
    }

    var info = {
        method: 'post',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json; charset=UTF-8' }
    }

    return fetch(getPath('login'), info)
        .then((response) => response.json())
        .catch((error) => console.log(error));
}

const executeSignup = (username: string, password: string) => {
    var body = {
        username: username,
        password: password
    }

    var info = {
        method: 'post',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json; charset=UTF-8' }
    }

    return fetch(getPath('signup'), info)
        .then((response) => response.json())
        .catch((error) => console.log(error));
}

const executeUserUpdate = (email: string, name: string, bio: string, image: string) => {
    var body = {
        email: email,
        name: name,
        bio: bio,
        image: image
    }

    return executePost('user', body, 'put')
}

const executePostCreation = (title: string, text: string, image: string) => {
    var body = {
        title: title,
        text: text,
        image: image
    }

    return executePost('posts', body)
}

const executePostModify = (id: string, title: string, text: string, image: string) => {
    var body = {
        id: id,
        title: title,
        text: text,
        image: image
    }

    return executePost('posts', body, "put")
}

function executePost(url: string, body: any, method: string = 'post') {
    var info = {
        method: method,
        body: JSON.stringify(body),
        credentials: 'include',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' }
    }

    return fetch(getPath(url))
        .then((response) => response.json())
        .catch((error) => console.log(error));
}

const getPosts = (type: string, id: string): Promise<PostEntity[]> => {
    return request(get(type, id));
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
    var info = {
        method: value ? 'put' : 'delete'
    }
    /*var info = {
        method: value ? 'put' : 'delete',
        headers: { 'Authorization': "Bearer " + sessionStorage.getItem("accessToken") }
    }*/

    //modifyHeaders(info);

    fetch(getPath("like/" + id), info)
        .catch((error) => console.log(error));
}

export {
    getPath, getPosts, getPost, getUsers, getUser, getFollowerUsers, getFollowingUsers,
    executeLogin, executeSignup, executeUserUpdate, executePostCreation, executePostModify, executeLike
};