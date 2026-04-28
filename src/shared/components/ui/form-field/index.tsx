import { Input } from "../input"
import { TextArea } from "../textarea"

export interface IFormFieldProps {
    label?: string
    error?: string
    type?: 'input' | 'textarea' | 'select'
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>
    textAreaProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>
    selectProps?: React.SelectHTMLAttributes<HTMLSelectElement>
    children?: React.ReactNode
}

export const FormField = (props: IFormFieldProps) => {
    return (
        <div className="flex flex-col gap-1">
            {props.label && (
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {props.label}
                </label>)
            }
            {props.type === 'textarea'
                ? <TextArea {...props.textAreaProps} />
                : props.type === 'select'
                ? (
                    <select
                        {...props.selectProps}
                        className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ${props.selectProps?.className ?? ""}`}
                    >
                        {props.children}
                    </select>
                )
                : <Input {...props.inputProps} />
            }
            {props.error && (
                <span className="text-xs text-destructive">{props.error}</span>
            )}
        </div>
    )
}
