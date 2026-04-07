# PI-1 — Frontend

Painel administrativo construído com **Next.js 16** (App Router), **React 19**, **TypeScript** e **Tailwind CSS v4**. Interface em **português**, tema claro e componentes reutilizáveis.

## Requisitos

- **Node.js** 20 ou superior (recomendado)
- **npm** (ou outro gerenciador compatível)

## Comandos básicos

| Comando | Descrição |
|--------|-----------|
| `npm install` | Instala as dependências do projeto. |
| `npm run dev` | Sobe o servidor de desenvolvimento com **Webpack** (porta padrão **3000**). Indicado quando o hot reload falha em pastas sincronizadas (ex.: iCloud em `Documents`). |
| `npm run dev:turbo` | Mesmo fluxo de desenvolvimento usando **Turbopack** (mais rápido, porém sensível a alguns ambientes de arquivo). |
| `npm run build` | Gera a build de produção (Turbopack no build, padrão do Next 16). |
| `npm run start` | Executa a aplicação já compilada (rode `build` antes). |
| `npm run lint` | Executa o ESLint com a configuração do Next.js. |

Abra [http://localhost:3000](http://localhost:3000) após `npm run dev`.

### Variáveis opcionais (desenvolvimento)

O arquivo `next.config.ts` configura **polling** do watcher de arquivos para reduzir problemas de HMR:

- `NEXT_DISABLE_WATCH_POLL=1` — desliga o polling e volta ao watcher nativo.
- `NEXT_WATCH_POLL_MS=250` — intervalo do polling em milissegundos (padrão interno: 500).

Exemplo:

```bash
NEXT_WATCH_POLL_MS=250 npm run dev
```

## Arquitetura do projeto

Organização **orientada a features**: cada domínio agrupa tipos, telas e lógica relacionados; rotas do Next permanecem finas e só conectam URLs às views.

```
app/
  (app)/                 # Grupo de rotas: layout com shell (sidebar), sem alterar a URL
    layout.tsx           # AppShell + sidebar
    page.tsx             # Início
    clientes/page.tsx    # /clientes
    marmitas/page.tsx    # /marmitas
  layout.tsx             # Raiz: fonte DM Sans, metadados, estilos globais
  globals.css            # Tokens de cor, @theme Tailwind, variante `dark` desativada (só light)

components/              # UI genérica reutilizável em qualquer feature
  button.tsx
  card-list.tsx
  list-page-layout.tsx
  resource-row-card.tsx
  row-edit-delete-actions.tsx
  index.ts

features/
  shell/                 # Layout do painel (sidebar, marca, navegação)
    nav.config.tsx       # Itens do menu (href, label, ícone) — fonte única da navegação
    components/
    index.ts

  clientes/
    types.ts             # Tipo `Cliente`
    ui/clientes-view.tsx
    index.ts

  marmitas/
    types.ts             # Tipo `Marmita`
    ui/marmitas-view.tsx
    index.ts
```

### Decisões rápidas

- **`app/(app)/`**: todas as páginas autenticadas/admin compartilham o mesmo layout com menu lateral; o parêntese em `(app)` é só organização de pastas.
- **`features/*`**: concentra o que é específico do produto (clientes, marmitas, shell). Facilita evoluir cada módulo sem espalhar detalhes nas rotas.
- **`components/*`**: primitivos de interface (lista, cartão de linha, botões, layout de listagem) sem regra de negócio.
- **Tema**: cores e aliases Tailwind vivem em `app/globals.css` (`:root` + `@theme inline`), com paleta semântica (`primary`, `muted`, `sidebar-*`, etc.).

## Rotas atuais

| Caminho | Conteúdo |
|---------|----------|
| `/` | Página inicial (links para módulos) |
| `/clientes` | Lista de clientes |
| `/marmitas` | Lista de marmitas |

O menu lateral lê os mesmos caminhos em `features/shell/nav.config.tsx` — ao criar uma nova rota, alinhe o `href` ali.

## Transparência no uso de inteligência artificial

Parte do código e da documentação deste repositório foi elaborada com apoio de **ferramentas de IA assistiva** (por exemplo, editores com agente ou assistente integrado).

Nesse contexto, a IA foi utilizada principalmente como:

- **Controladora de qualidade do código** — revisão de consistência, detecção de trechos frágeis ou desalinhados com o restante do projeto e sugestões de correção.
- **Assessora de soluções** — comparação de abordagens, alinhamento a convenções do ecossistema (Next.js, React, TypeScript, Tailwind) e redução de retrabalho em decisões repetitivas.

O objetivo é **transferir conhecimento à equipe**: ao expor boas práticas, padrões de mercado e alternativas com trade-offs claros, o uso da IA complementa o trabalho humano e apoia a **formação contínua** dos desenvolvedores — não substitui revisão, testes nem responsabilidade técnica de quem mantém o produto.

Sugestões geradas por IA devem sempre ser **validadas** por pessoas (revisão de PR, lint, build e critérios do negócio).

## Documentação externa

- [Next.js](https://nextjs.org/docs)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
