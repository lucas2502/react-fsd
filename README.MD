# 📚 Monorepo Frontend - React + TypeScript + Clean Architecture + FSD + Atomic Design
Este projeto é um monorepo frontend SPA utilizando React, Vite, TypeScript, pnpm workspaces e uma arquitetura baseada em camadas isoladas e versionadas.

## 🎯 Foco: Isolamento da camada de lógica de negócio, reutilização de pacotes globais, testabilidade (com Jest) e evolução desacoplada dos apps e libs.


## 📂 Estrutura de Pastas
```
├── apps/                  # Aplicações (SPA's) que consomem os pacotes
│   └── my-spa-app/        # Exemplo de uma aplicação React
├── packages/              # Pacotes globais versionáveis
│   ├── ui/                # Componentes de UI compartilhados (Atomic Design)
│   ├── http-adapter/      # Infraestrutura HTTP (Axios wrapper, interceptors, etc)
│   └── helpers/           # Funções utilitárias globais
│   └── domain/               # <<< Novo: Lógica de domínio (UseCases, Services, Mocks)
├── pnpm-workspace.yaml    # Configuração dos workspaces
└── package.json           # Configuração raiz
```

## 🎨 Design de Arquitetura
Feature-Sliced Design (FSD) + Clean Architecture

Domain-driven logic isolada: Casos de uso (useCases), services e mocks ficam nos pacotes internos (se quiser, você pode futuramente criar um @my-org/domain também).

| Camada            | Exemplo                   | Localização             |
| ----------------- | ------------------------- | ----------------------- |
| UI (Presentation) | Botões, Inputs, Modals    | `packages/ui`           |
| Infra             | HTTP Adapters, APIs       | `packages/http-adapter` |
| Helpers           | Formatadores, Validadores | `packages/helpers`      |
| App               | My SPA React              | `apps/my-spa-app`       |



## 📦 Como versionar os pacotes internos (UI, HTTP, Helpers)
Cada pacote em packages/* possui seu próprio package.json com versionamento independente:

Exemplo do packages/ui/package.json:
 ```       
{
  "name": "@my-org/ui",
  "version": "1.0.0",
  ...
}

````

Se você fizer uma alteração na UI e quiser lançar uma nova versão:
```
cd packages/ui
pnpm version patch
pnpm install
```

Isso cria algo como 1.0.1.

Dentro do seu app (apps/my-spa-app), o package.json referencia essa versão:
```
"dependencies": {
  "@my-org/ui": "1.0.1"
}
```
## ✅ Conteúdo do novo pacote /packages/domain
Exemplo de estrutura dentro de domain:
```
domain/
├── src/
│   ├── useCases/
│   │   └── GetUserUseCase.ts
│   ├── services/
│   │   └── UserService.ts
│   ├── mocks/
│   │   └── UserServiceMock.ts
│   └── types/
│       └── User.ts
├── package.json
├── tsconfig.json
└── jest.config.ts
```

Exemplo de um UseCase simples (GetUserUseCase.ts):
```
import { UserService } from '../services/UserService';
import { User } from '../types/User';

export class GetUserUseCase {
  constructor(private userService: UserService) {}

  async execute(userId: string): Promise<User> {
    return this.userService.getUserById(userId);
  }
}
````

Exemplo de Service + Mock:
```
// services/UserService.ts
import { User } from '../types/User';

export class UserService {
  async getUserById(userId: string): Promise<User> {
    throw new Error('Not implemented');
  }
}
````
```
// mocks/UserServiceMock.ts
import { UserService } from '../services/UserService';
import { User } from '../types/User';

export class UserServiceMock extends UserService {
  async getUserById(userId: string): Promise<User> {
    return { id: userId, name: 'Mock User' };
  }
}
```




## ✅ Desenvolvimento
Instalar dependências:

```
pnpm install
```

Rodar a aplicação SPA:
```
cd apps/my-spa-app
pnpm dev
```

Rodar testes unitários em todos os pacotes (Recursivamente):
```
pnpm -r test
```

Ou para rodar apenas os testes do ui:
```
cd packages/ui
pnpm test
```

##  🔁 Como consumir os pacotes internos no App
Exemplo (apps/my-spa-app/src/main.tsx):
```
import { Button } from '@my-org/ui';
import { get } from '@my-org/http-adapter';
import { formatDate } from '@my-org/helpers';

console.log(Button());
console.log(get('/api/users'));
console.log(formatDate(new Date()));
```

#🚀 Benefícios da Arquitetura
✅ Cada camada é independente e testável
✅ Componentes globais versionados
✅ Possível publicação futura no npm privado (ex.: Verdaccio)
✅ Alinhado com FSD e Clean Architecture
✅ Base para escalar com múltiplos apps ou microfrontends

#🧱 Tecnologias Base
React + Vite
TypeScript
Jest (para testes unitários)
pnpm Workspaces
Atomic Design (UI)
Feature Sliced Design (FSD) + Clean Architecture
Monorepo pattern


