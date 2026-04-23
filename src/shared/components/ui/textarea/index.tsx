export interface ITextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
}

export function TextArea(props: ITextAreaProps) {
    return (
        <textarea
            {...props}
            className={`flex min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none ${props.className ?? ""}`}
        />
    )
}
