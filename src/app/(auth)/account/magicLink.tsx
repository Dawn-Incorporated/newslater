import { z } from "zod";
import { toast } from "sonner";


const MagicLink = z.string().email().min(1).max(255);

export function _onSubmit(value: string) {
    try {
        MagicLink.parse(value);
        toast.success('valid email')
    } catch (error) {
        toast.error('invalid email')
    }
}