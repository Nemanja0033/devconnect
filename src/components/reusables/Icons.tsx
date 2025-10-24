import { Edit, Trash2 } from "lucide-react";

export function EditIcon(){
    return <Edit className="text-primary cursor-pointer" />

}

export function DeleteIcon(){
    return <Trash2 className="text-red-500 hover:text-red-700 cursor-pointer transition-all" size={20} />
}