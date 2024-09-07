// CustomUploadAdapter.ts
export default class CustomUploadAdapter {
    private loader: any;

    constructor(loader: any) {
        this.loader = loader;
    }

    upload(): Promise<{ default: string }> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => {
                resolve({
                    default: reader.result as string,
                });
            };

            reader.onerror = (error) => {
                reject(error);
            };

            this.loader.file.then((file: File) => {
                reader.readAsDataURL(file);
            });
        });
    }

    abort(): void {
        // Handle abort functionality if needed
    }
}
