
import { Modal } from "@/shared/components/ui/Modal";
import { ListPageLayout, Button, CardList, ResourceRowCard, RowEditDeleteActions } from "../../../../components";
import type { Cliente } from "../types";
import { Plus } from "lucide-react";

export function ClientesView() {
  const clientes: Cliente[] = [];

  return (
    <>
      <Modal title="Novo cliente"><></></Modal>
      <ListPageLayout
        title="Clientes"
        description="Gerencie seus clientes."
        headerAction={
          <Button className="mt-4 shrink-0" icon={Plus} label="Novo cliente" />
        }
      >

        <CardList
          items={clientes}
          getKey={(c) => c.id}
          empty={
            <p className="text-lg font-medium text-muted-foreground">
              Nenhum cliente encontrado
            </p>
          }
          renderItem={(cliente) => (
            <ResourceRowCard
              title={cliente.name}
              subtitle={cliente.phone}
              description={cliente.notes || undefined}
              actions={<RowEditDeleteActions />}
            />
          )}
        />
      </ListPageLayout>
    </>
  );
}
