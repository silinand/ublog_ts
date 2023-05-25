interface IPostEntity
{
    id: string;
    userId: string;
    imageUrl: string;
    text: string;
    title: string;
    creationTime: Date;
    likes: number;
    isLiked: boolean;
}

function emptyPost(): IPostEntity {
    return {
        id: "",
        userId: "",
        imageUrl: "",
        text: "",
        title: "",
        creationTime: new Date(),
        likes: 0,
        isLiked: false,
    };
}

export { emptyPost };
export type { IPostEntity };
