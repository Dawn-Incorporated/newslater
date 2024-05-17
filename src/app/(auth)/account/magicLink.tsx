import { z } from "zod";
import { toast } from "sonner";
import { signIn } from "next-auth/react";


const MagicLink = z.string().email().min(1).max(255);

export function _onSubmit(value: string) {

    const attempt = new Promise((resolve, reject) => {
        try {
            MagicLink.parse(value);
            const result = signIn('email', {email: value})
            resolve(result)
        } catch (error) {
            reject(error)
        }
    })

    toast.promise(attempt, {
        loading: 'Sending magic link...',
        success: 'Magic link sent!',
        error: 'Failed to send magic link'
    })
}