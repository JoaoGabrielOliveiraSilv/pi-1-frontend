import { Input } from "../input"
import { TextArea } from "../textarea"

export interface IFormFieldProps {
    label?: string
    error?: string
    type?: 'input' | 'textarea'
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>
    textAreaProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>
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
                : <Input {...props.inputProps} />
            }
            {props.error && (
                <span className="text-xs text-destructive">{props.error}</span>
            )}
        </div>
    )
}