import { PedidoDetailView } from "@/features/pedidos/ui/pedido-detail-view"

interface Props {
    params: Promise<{ id: string }>
}

export default async function PedidoDetailPage({ params }: Props) {
    const { id } = await params
    return <PedidoDetailView id={Number(id)} />
}
