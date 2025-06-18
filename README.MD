
# 🏗️ Arquitetura Frontend: Monorepo + Microfrontends + FSD + Clean Architecture

## 📌 Visão Geral

Este projeto adota uma arquitetura moderna e escalável que combina:

- ✅ **Monorepo** (com Turborepo + pnpm Workspaces)
- ✅ **Microfrontends (MFE)** com **Module Federation (Vite)**
- ✅ **Feature Sliced Design (FSD)**
- ✅ **Clean Architecture**
- ✅ **Typescript + React + Vite + Jest**
- ✅ **CI/CD incremental com cache (Turbo + GitHub Actions)**

---

## 📂 Estrutura de Pastas (Exemplo)

```
.
├── apps/
│   ├── shell/                  # App container (host / shell)
│   ├── mfe-user-profile/       # Microfrontend 1 (ex: Perfil do Usuário)
│   ├── mfe-dashboard/          # Microfrontend 2 (ex: Dashboard)
│   └── mfe-reports/            # Microfrontend 3 (ex: Relatórios)
├── packages/
│   ├── ui/                     # Design system: componentes compartilhados (Atomic Design)
│   ├── domain/                 # Camada de Domínio (Entidades, Casos de Uso, etc)
│   ├── utils/                  # Helpers reutilizáveis
│   ├── http/                   # HTTP Client abstraído (ex: fetch, axios)
│   ├── mocks/                  # Serviços mockados para testes/unitários e Storybook
│   └── config/                 # Configuração compartilhada (eslint, tsconfig, vitest config, etc)
├── turbo.json                  # Pipeline de build/test/lint
├── pnpm-workspace.yaml         # Workspaces monorepo
└── .github/workflows/          # CI/CD (build incremental, lint, test, deploy)
```

---

## ✅ Benefícios da Arquitetura

| Área                         | Benefício                                  |
|------------------------------|-------------------------------------------|
| **Escalabilidade**            | Suporte a múltiplas equipes e domínios |
| **Build Performance**         | Turbo + Cache incremental por app/pacote |
| **Reutilização de código**    | Via `packages/` (libs compartilhadas)    |
| **Independência de Deploy**   | Deploy de cada MFE separado (Module Federation) |
| **Testabilidade**             | Lógica isolada (domain, useCases) sem dependência de UI |
| **Padronização de código**    | Configs centralizadas em `/packages/config` |

---

## ✅ Camadas por Projeto (FSD + Clean)

Cada Microfrontend (`apps/`) e cada pacote (`packages/`) segue **Feature Sliced Design** com inspiração em **Clean Architecture**:

```
src/
├── app/           # Configurações de App (routes, providers, etc)
├── pages/         # Rotas / Views
├── features/      # Funcionalidades (Ex: Login, Cadastro)
├── entities/      # Entidades de negócio
├── shared/        # Componentes / Utils / API / UI comuns
├── widgets/       # Componentes grandes (ex: Grids, Sidebars)
└── processes/     # Fluxos maiores (Ex: CheckoutProcess)
```

No caso dos **packages/domain/**:

```
src/
├── entities/        # Modelos de domínio
├── useCases/        # Casos de Uso
├── services/        # Interfaces de serviços (mockáveis)
├── tests/           # Testes unitários focados na lógica
└── errors/          # Classes de erros
```

---

## ✅ Exemplo de CI/CD com Turbo + GitHub Actions

```yaml
name: CI

on:
  push:
    branches: [main, develop]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - run: pnpm install
      - run: pnpm turbo run build --filter=...
```

✅ Suporte a cache de build + cache de node_modules + cache de lint/test por app.

---

## ✅ Tecnologias Envolvidas

| Camada                 | Tecnologia                 |
|------------------------|----------------------------|
| Monorepo               | Turborepo + pnpm Workspaces |
| Build                  | Vite + Module Federation |
| UI                     | React + Mantine + Atomic Design |
| Lógica de Negócio      | Clean Architecture (packages/domain) |
| Design                 | FSD (Feature Sliced Design) |
| Testes                 | Jest |
| CI/CD                  | GitHub Actions + Turbo Cache |

---

## ✅ Quando usar esta Arquitetura?

✅ Times grandes trabalhando em múltiplas features ou domínios  
✅ Projetos com roadmap de longo prazo  
✅ Necessidade de build/deploy independentes por MFE  
✅ Desejo de CI/CD rápido com cache incremental  

---

## ✅ Changesets (Versionamento Automatizado por Pacote) no Monorepo com MFE

📌 Estrutura básica:
```
/apps
  mfe-dashboard/
  mfe-user-profile/

/packages
  ui/
  http/
  domain/
````

## ✅ Como o Changesets funciona nesse cenário:

✅ O Changesets vai controlar a versão individual de cada pacote dentro de /packages, criando changelogs e bumps de versão automaticamente, baseado nas alterações feitas.

✅ Exemplo de fluxo de trabalho com Changesets:

---

## ✅ Exemplo de fluxo de trabalho com Changesets:
👉 Exemplo inicial de versões:
| Pacote          | Versão Atual |
| --------------- | ------------ |
| `@myorg/ui`     | `1.2.0`      |
| `@myorg/http`   | `2.1.0`      |
| `@myorg/domain` | `0.9.0`      |


✅ Passo a passo:
1. Alterou algo no pacote ui/?
👉 Rode o comando:
```
npx changeset

```

O Changesets vai te perguntar:

- Qual pacote foi alterado? → (ex: @myorg/ui)

- Tipo de mudança?

- patch (bugfix)

- minor (nova feature)

- major (breaking change)

- Mensagem de changelog?


---

2. O Changesets cria um arquivo YAML dentro de .changeset/ assim:
```
---
"@myorg/ui": minor
---

Add new Button component to UI lib

```