import { Loader2, UploadCloud } from "lucide-react";

export default function UploadImageForm({onUpload, isLoading, imagesUrl, removeImage} : {removeImage: (url: string) => void, isLoading: boolean, imagesUrl: string[], onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void }){
    return(
        <>
            <label htmlFor="image" className="h-32 fixed flex justify-center items-center gap-1 z-40 hover:cursor-pointer md:w-[530px] px-6 border-4 rounded-md border-dotted">
                <span className="text-primary">Drag and Drop or upload media</span>
                    <UploadCloud className="text-primary" />
                </label>
            <input id="image" className="opacity-0 border-2 relative h-32 md:w-[530px]" type="file" multiple onChange={onUpload} />
            {isLoading ? (
                <span className="text-2xl w-full my-3 flex gap-2 justify-center items-center"><Loader2 className="animate-spin" /></span> ) : (
                <div className="flex overflow-auto gap-4 mt-4">
                  {imagesUrl.map((url, index) => (
                    <div>
                      <button onClick={() => removeImage(url)} aria-label="remove uploaded image" className="absolute ml-2 hover:scale-110 text-red-500 transition-all z-20 cursor-pointer">X</button>
                      <img key={index} src={url} className="w-32 z-10 border-2 hover:opacity-80 h-32 object-cover rounded-md" />
                    </div>
                  ))}
                </div>
            )}
        </>
    )
}