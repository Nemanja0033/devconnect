export default function ErrorTooltip({ message }: { message: string | undefined}){
    return(
        <span className="text-sm text-red-500">{ message }</span>
    )
}