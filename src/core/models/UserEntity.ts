interface IUserEntity {
    id: string;
    email: string;
    imageUrl: string;
    name: string;
    bio: string;
    postsCount: number;
    followersCount: number;
    followingsCount: number;
}

function emptyUser(): IUserEntity {
    return {
        id: "",
        email: "",
        imageUrl: "",
        name: "",
        bio: "",
        postsCount: 0,
        followersCount: 0,
        followingsCount: 0,
    }
}

export { emptyUser };
export type { IUserEntity };