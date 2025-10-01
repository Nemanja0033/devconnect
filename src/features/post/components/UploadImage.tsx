import { UploadCloud } from "lucide-react";

export default function UploadImageForm({onUpload, isInModal } : { onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void, isInModal?: boolean }){
    // ** Aded isInModal boolean to adjust size for modals
    // ** - e.g isInModal = true then className={`w-adjusted to whatever to fit in modal . . .`} 
    return(
        <>
            <label
                htmlFor="image"
                className={`h-32 relative flex justify-center items-center gap-1 z-40 hover:cursor-pointer ${isInModal ? 'md:w-full' : 'md:w-[530px]'} px-6 border-4 rounded-md border-dotted`}
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