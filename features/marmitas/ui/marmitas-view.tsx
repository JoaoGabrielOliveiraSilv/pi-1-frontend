import {
  Button,
  CardList,
  ListPageLayout,
  ResourceRowCard,
  RowEditDeleteActions,
} from "@/components";
import type { Marmita } from "../types";
import { Plus } from "lucide-react";

export function MarmitasView() {
  const marmitas: Marmita[] = [];

  return (
    <ListPageLayout
      title="Marmitas"
      description="Gerencie seu cardápio de marmitas."
      headerAction={
        <Button className="mt-4 shrink-0" icon={Plus} label="Nova marmita" />
      }
    >
      <CardList
        items={marmitas}
        getKey={(m) => m.id}
        empty={
          <p className="text-lg font-medium text-muted-foreground">
            Nenhuma marmita encontrada
          </p>
        }
        renderItem={(marmita) => (
          <ResourceRowCard
            title={marmita.name}
            subtitle={marmita.sku}
            description={marmita.description || undefined}
            actions={<RowEditDeleteActions />}
          />
        )}
      />
    </ListPageLayout>
  );
}
