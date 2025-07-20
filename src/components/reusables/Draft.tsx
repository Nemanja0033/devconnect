export default function Draft({ title, img, type }: { title: string, img?: string, type: string }){
    return(
        <div className="w-full h-32 flex justify-baseline p-1 rounded-md shadow-md">
            {/* <img src={img} alt={title} /> */}
            <span>{title}</span>
            <span>{type}</span>
        </div>
    )
}