import { UploadCloud } from "lucide-react";

export default function UploadImageForm({onUpload} : { onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void }){
    return(
        <>
            <label htmlFor="image" className="h-32 absolute flex justify-center items-center gap-1 z-50 hover:cursor-pointer md:w-[530px] border-4 rounded-md border-dotted">
                <span className="text-gray-500">Drag and Drop or upload media</span>
                    <UploadCloud className="text-gray-500" />
                </label>
            <input id="image" className="opacity-0 border-2 relative h-32 md:w-[530px]" type="file" multiple onChange={onUpload} />
        </>
    )
}