# Convites Frontend

Aplicação Vue 3 + Vite para criação e gerenciamento de convites digitais.

## Requisitos

- Node.js 24 LTS
- PNPM 9.12.2

## Desenvolvimento

```bash
pnpm install
pnpm dev
```

O frontend inicia por padrão em `http://localhost:5173`. Em desenvolvimento, a API usada por padrão é `http://localhost:3000`; para apontar para outro backend, defina `VITE_API_URL` em `.env`.

## Build

```bash
pnpm build
```

Os assets binários são mantidos no Git LFS.
