import { Loader2, UploadCloud } from "lucide-react";

export default function UploadImageForm({onUpload} : { onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void }){
    return(
        <>
            <label
                htmlFor="image"
                className="h-32 relative flex justify-center items-center gap-1 z-40 hover:cursor-pointer md:w-[530px] px-6 border-4 rounded-md border-dotted"
                style={{ marginBottom: 0 }}
            >
                <span className="text-primary">Drag and Drop or upload media</span>
                <UploadCloud className="text-primary" />
            </label>
            <input
                id="image"
                className="absolute opacity-0 w-0 h-0"
                type="file"
                multiple
                onChange={onUpload}
                tabIndex={-1}
                aria-hidden="true"
            />
        </>
    )
}