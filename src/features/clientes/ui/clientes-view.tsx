"use client"

import { useState } from "react";
import { ModalClientes } from "./modal-clientes";
import { ModalEditClientes } from "./modal-edit-clientes";
import { ListPageLayout, FloatingActionButton, CardList, ResourceRowCard, RowEditDeleteActions } from "../../../../components";
import { Plus } from "lucide-react";
import { useClientes } from "../hooks/use-clientes";
import { useDeleteCliente } from "../hooks/use-delete-cliente";
import { Input } from "@/shared/components/ui/input";
import { Cliente } from "../types";
import { useDebounce } from "@/shared/hooks/use-debounce";
import { applyPhoneMask } from "../utils";

export function ClientesView() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCliente, setEditingCliente] = useState<Cliente | null>(null);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const { clientes, loading } = useClientes({ search: debouncedSearch });
  const { mutate: deleteCliente } = useDeleteCliente();

  return (
    <>
      <ModalClientes open={modalOpen} onClose={() => setModalOpen(false)} />
      <ModalEditClientes cliente={editingCliente} onClose={() => setEditingCliente(null)} />
      <FloatingActionButton icon={Plus} label="Novo cliente" onClick={() => setModalOpen(true)} />
      <ListPageLayout
        title="Clientes"
        description="Gerencie seus clientes."
      >
        <Input
          placeholder="Buscar clientes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <CardList
          items={loading ? [] : clientes}
          getKey={(c) => c.idClientes}
          empty={
            <p className="text-lg font-medium text-muted-foreground">
              {loading ? "Carregando..." : "Nenhum cliente encontrado"}
            </p>
          }
          renderItem={(cliente) => (
            <ResourceRowCard
              title={cliente.nome}
              subtitle={applyPhoneMask(cliente.telefone)}
              description={cliente.obs ?? undefined}
              actions={
                <RowEditDeleteActions
                  onEdit={() => setEditingCliente(cliente)}
                  onDelete={() => deleteCliente(cliente.idClientes)}
                />
              }
            />
          )}
        />
      </ListPageLayout>
    </>
  );
}
