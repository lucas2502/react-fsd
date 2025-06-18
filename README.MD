
# 🏗️ Arquitetura Frontend: SPA + Microfrontend + Monorepo + Turborepo + FSD + Changesets

## 📌 Visão Geral da Arquitetura

Este projeto adota um modelo moderno de desenvolvimento frontend com foco em escalabilidade, autonomia entre times e performance de build.

---

## ✅ Stack Tecnológica

| Camada                          | Tecnologia/Ferramenta                          |
|--------------------------------|-----------------------------------------------|
| Build Tool                      | **Vite**                                       |
| Linguagem                       | **TypeScript**                                 |
| Framework UI                    | **React**                                      |
| Design System                   | **Mantine**                                    |
| Testes Unitários                | **Jest**                                       |
| Monorepo                        | **Turborepo + PNPM Workspaces**               |
| Microfrontend Loader            | **Module Federation (via vite-plugin-federation)** |
| Gerenciamento de Versão de Pacotes | **Changesets (versão interna, sem publish NPM)** |
| Estilo de Arquitetura Frontend  | **Feature Sliced Design (FSD)**               |

---

## ✅ Estrutura de Pastas (Simplificada)

```
.
├── apps/                    # Microfrontends (MFE)
│   ├── mfe-dashboard/
│   └── mfe-profile/
├── packages/                # Pacotes globais compartilhados
│   ├── ui/                  # Componentes UI reutilizáveis
│   ├── http/                # Adapters HTTP (Axios, Fetch, etc)
│   ├── domain/              # Casos de uso, services, lógica de domínio
│   └── utils/               # Helpers e funções utilitárias
├── .changeset/              # Configuração e pending changes do Changesets
├── turbo.json               # Configuração Turborepo (cache, pipelines)
├── pnpm-workspace.yaml      # Configuração dos workspaces PNPM
└── package.json             # Root do projeto
```

---

## ✅ Organização por FSD (Feature Sliced Design) + Camadas DDD-like

Cada MFE segue a estrutura FSD:

```
src/
├── app/                 # Inicialização, contextos globais
├── entities/            # Modelos e entidades de domínio
├── features/            # Blocos funcionais (Login, UserList, etc)
├── shared/              # Componentes e libs reutilizáveis
├── pages/               # Entry points por rota
└── widgets/             # Componentes compostos por features
```

---

## ✅ Versionamento interno com Changesets (sem publish público)

### 📌 Como funciona:

- Cada pacote em `/packages` tem **sua própria versão (1.0.0, 1.1.0, etc)**.
- Quando houver mudança, o time roda:

```bash
npx changeset
```

- O Changesets vai gerar um arquivo de alteração.
- O comando:

```bash
npx changeset version
```

Gera o bump automático de versão + changelog interno.

- As versões são consumidas via PNPM workspace:

```json
"@myorg/ui": "workspace:^1.2.0"
```

---

## ✅ Module Federation com Vite

Cada MFE será exposto como Remote Module.

Exemplo de configuração (vite.config.ts):

```ts
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    federation({
      name: 'mfe-dashboard',
      remotes: {},
      exposes: {
        './UserList': './src/features/UserList/index.tsx',
      },
    }),
  ],
});
```

---

## ✅ CI/CD com Turborepo + Cache Inteligente

- Build incremental com cache de tarefas por pacote.
- Pipelines por MFE e por pacote.
- Cache inteligente baseado em `inputs`, `outputs` e versão do pacote.

Exemplo de step de cache no GitHub Actions:

```yaml
- name: Cache Turborepo
  uses: actions/cache@v3
  with:
    path: .turbo
    key: ${{ runner.os }}-turbo-${{ hashFiles('**/pnpm-lock.yaml') }}
```

---

## ✅ Resumo das Decisões Arquiteturais

| Decisão | Motivo |
|--|--|
| Monorepo (Turborepo + PNPM Workspaces) | Melhor gerenciamento de pacotes, cache de build e compartilhamento |
| Microfrontend com Module Federation | Autonomia de deploy por MFE |
| FSD (Feature Sliced Design) | Melhor organização por feature |
| Changesets para versionamento interno | Rastreabilidade de mudanças por pacote sem necessidade de publicar no NPM |
| Vite + React + TS | Build rápido + tipagem + experiência moderna de DX |

---

## ✅ Próximos Passos Recomendados

✅ Automatizar versão e changelogs no CI com Changesets  
✅ Definir contratos de integração entre MFEs via Typescript  
✅ (Opcional) Adotar um NPM Registry privado no futuro, se quiser externalizar os packages  
