import Link from "next/link";

export default function HomePage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold tracking-tight text-foreground">
        Início
      </h1>
      <p className="mt-2 max-w-prose text-sm text-muted-foreground">
        Use o menu para abrir{" "}
        <Link
          href="/clientes"
          className="font-medium text-primary underline-offset-2 hover:underline"
        >
          Clientes
        </Link>{" "}
        ou{" "}
        <Link
          href="/marmitas"
          className="font-medium text-primary underline-offset-2 hover:underline"
        >
          Marmitas
        </Link>
        .
      </p>
    </div>
  );
}
