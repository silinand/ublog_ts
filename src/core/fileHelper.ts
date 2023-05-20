export default function readImage(path: string): Promise<string> {

    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            resolve(event.target?.result as string);
        };

        reader.onerror = (err) => {
            reject(err);
        };

        reader.readAsDataURL(new Blob([path]));
    });
}