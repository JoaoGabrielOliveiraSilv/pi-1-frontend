import { Button } from "./button";
import { Edit, Trash } from "lucide-react";

export function RowEditDeleteActions() {
  return (
    <>
      <Button
        variant="icon"
        icon={Edit}
        label="Editar"
        iconClassName="text-muted-foreground"
      />
      <Button
        variant="icon"
        icon={Trash}
        label="Excluir"
        iconClassName="text-destructive"
      />
    </>
  );
}
