import { type ReactNode } from "react";

type EmptyProps = {
    title: string,
    description: string,
    action?: ReactNode
}

/**
 * Empty message component.
 * @param title
 * @param description
 * @param action Action to display in the empty message. Optional.
 * @constructor
 */
export function Empty({title, description, action = null}: EmptyProps) {
    return (
        <div className="flex flex-1 items-center justify-between rounded-lg border border-dashed shadow-sm min-h-48 mt-4">
            <div className="flex flex-col items-center gap-4 text-center flex-1 justify-center py-4">
                <h3 className="text-2xl font-bold tracking-tight">
                    { title }
                </h3>
                <p className="text-sm text-muted-foreground">
                    { description }
                </p>
                { action }
            </div>
        </div>
    )
}