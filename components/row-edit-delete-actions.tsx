import { Button } from "./button";
import { Edit, Trash } from "lucide-react";

interface RowEditDeleteActionsProps {
  onEdit?: () => void
  onDelete?: () => void
}

export function RowEditDeleteActions({ onEdit, onDelete }: RowEditDeleteActionsProps) {
  return (
    <div className="flex">
      <Button
        variant="icon"
        icon={Edit}
        label="Editar"
        iconClassName="text-muted-foreground"
        onClick={onEdit}
      />
      <Button
        variant="icon"
        icon={Trash}
        label="Excluir"
        iconClassName="text-destructive"
        onClick={onDelete}
      />
    </div>
  );
}
