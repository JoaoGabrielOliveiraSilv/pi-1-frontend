import { PedidoDetailView } from "@/features/pedidos/ui/pedido-detail-view"

interface PageProps {
    params: Promise<{ id: string }>
}

export default async function PedidoDetailPage({ params }: PageProps) {
    const { id } = await params
    return <PedidoDetailView id={Number(id)} />
}
