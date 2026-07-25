# Sistema de Venda de Veículos

Projeto Next.js (App Router) + TypeScript + Tailwind CSS + shadcn/ui integrado ao Supabase.

## Rodando localmente

1. `npm install`
2. Confirme as variáveis em `.env.local` (já preenchidas com o projeto Supabase `ernaniveiculos`)
3. `npm run dev`

## Banco de dados

O schema (tabela `veiculos` + tabelas novas `usuarios`, `imagens_veiculos`, `favoritos`,
`mensagens`, `agendamentos`, `notificacoes`) e as políticas de RLS já foram aplicados
diretamente no projeto Supabase via migrations. Os tipos gerados estão em
`src/lib/types/database.ts`.

## Observação sobre este ambiente

Este projeto foi criado em um sandbox sem acesso ao registro npm, então as dependências
não puderam ser instaladas nem o build pôde ser validado aqui. Rode `npm install` e
`npm run build` na sua máquina antes do deploy.
