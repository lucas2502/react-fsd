
# 🧱 FSD Boilerplate (Feature-Sliced Design) – React + TypeScript + Vite + Jest

Este projeto é um boilerplate baseado em **Feature-Sliced Design (FSD)** com **React**, **TypeScript**, **Vite**, e **Jest**, ideal para aplicações frontend com arquitetura escalável, modular e altamente testável.

---

## 📁 Estrutura de Pastas

```
src/
│
├── app/                   # Entry point da aplicação, providers globais, layouts
│
├── pages/                 # Entrypoints das páginas (SPA-like)
│   └── home/              # Página inicial da aplicação
│
├── features/              # Funcionalidades da aplicação
│   └── fetch-user/        # Feature: buscar usuário
│       ├── model/         # Casos de uso e regras de negócio
│       ├── ui/            # Componentes específicos da feature
│       └── lib/           # Funções utilitárias internas da feature
│
├── entities/              # Modelos e lógica das entidades de domínio
│   └── user/              # Entidade "User"
│
├── shared/                # Código reutilizável entre features
│   ├── ui/                # Componentes reutilizáveis
│   ├── lib/               # Utilitários gerais
│   ├── api/               # Adaptadores de comunicação HTTP (fetch/axios/etc.)
│   └── types/             # Tipagens globais
│
└── __tests__/             # Testes unitários dos use cases
```

---

## 🚀 Tecnologias Utilizadas

- **React 18** – Biblioteca principal para UI
- **TypeScript** – Tipagem estática
- **Vite** – Build tool moderna
- **Jest** – Testes unitários
- **pnpm + workspaces** (suporte) – Gerenciamento de pacotes monorepo

---

## 🧠 Padrões e Convenções

- **FSD (Feature Sliced Design)** para separação por responsabilidade e contexto
- **DDD-inspired**: cada feature tem sua lógica isolada (`model/`)
- Casos de uso (`usecase.ts`) são puramente funcionais e facilmente testáveis
- Serviços e dependências são injetadas via parâmetros ou mocks

---

## ✅ Testes

Os testes ficam no diretório `__tests__`, e você pode executá-los com:

```bash
pnpm install
pnpm test
```

---

## 📦 Scripts Disponíveis

```bash
pnpm install    # Instalar dependências
pnpm dev        # Iniciar servidor de desenvolvimento Vite
pnpm build      # Build de produção
pnpm test       # Rodar testes unitários com Jest
```

---

## 🧪 Exemplo de Use Case

`features/fetch-user/model/fetchUser.usecase.ts`

```ts
export const fetchUser = async (userId: string) => {
  return { id: userId, name: 'John Doe' };
};
```

Testável com:

```ts
test('fetchUser returns mock data', async () => {
  const user = await fetchUser('1');
  expect(user.name).toBe('John Doe');
});
```

---

## 📌 Recomendado

- Utilize `ui/` somente para componentes de UI da feature.
- Exporte lógica de domínio para `entities/` se for usada em múltiplas features.
- Use `shared/` apenas para elementos verdadeiramente globais.

---

## ✨ Objetivo

Essa arquitetura permite:

- Isolamento de responsabilidades
- Testes unitários eficientes
- Crescimento modular da aplicação
- Facilidade de onboarding de times

---

Criado por ChatGPT com ❤️ para aplicações profissionais frontend.
