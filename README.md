# DevPortal

Portal corporativo desenvolvido com arquitetura de **microfrontends**, utilizando React, TypeScript, Vite e Module Federation.

Projeto acadêmico da **Pós-Tech FIAP — Engenharia de Front-end | Fase 2**.

## Sobre o projeto

O DevPortal é uma aplicação que demonstra a composição de interfaces independentes em um único portal corporativo.

A arquitetura separa a aplicação principal (**Host**) dos módulos funcionais (**Remotes**), permitindo que cada aplicação tenha seu próprio processo de desenvolvimento, build e execução.

O projeto utiliza dados simulados (mocks), sem necessidade de integração com um backend.

## Objetivos

- Implementar uma arquitetura de microfrontends com Module Federation.
- Integrar aplicações React independentes.
- Carregar componentes remotos dinamicamente.
- Organizar o código em um monorepo.
- Implementar navegação entre módulos com React Router.
- Aplicar hooks avançados e estratégias de gerenciamento de estado.
- Validar o Remote Users com testes automatizados já implementados.
- Avaliar práticas de CI/CD como melhoria opcional futura.
- Documentar as decisões técnicas e a execução do projeto.

## Tecnologias

| Tecnologia        | Finalidade                                     |
| ----------------- | ---------------------------------------------- |
| React 19          | Construção das interfaces                      |
| TypeScript        | Tipagem estática                               |
| Vite 8            | Desenvolvimento e build                        |
| Module Federation | Integração entre microfrontends                |
| React Router 7    | Navegação do Host e rotas internas dos Remotes |
| Vitest            | Execução dos testes automatizados              |
| React Testing Library | Testes de comportamento dos componentes    |
| jsdom             | Ambiente simulado de navegador para os testes |
| npm Workspaces    | Gerenciamento do monorepo                      |
| Git e GitHub      | Versionamento                                  |

## Arquitetura

O DevPortal utiliza uma arquitetura composta por uma aplicação Host e aplicações Remote.

```text
DevPortal
│
├── Host (porta 3000)
│   ├── Interface principal
│   ├── Roteamento principal
│   └── Carregamento dinâmico dos Remotes
│
└── Remote Users (porta 3001)
    ├── Listagem de usuários
    ├── Cadastro simulado
    ├── Detalhes de usuários
    └── Roteamento independente
```

### Host

Responsável por integrar os microfrontends e apresentar a interface principal do portal.

Suas principais responsabilidades são:

- Disponibilizar a página inicial do DevPortal.
- Gerenciar a navegação principal.
- Carregar os microfrontends dinamicamente.
- Compartilhar dependências essenciais com os Remotes.

O Host utiliza React Router 7 e registra a rota `/usuarios/*`, delegando a navegação interna ao Remote Users.

### Remote Users

Microfrontend responsável pelo gerenciamento de usuários.

Atualmente, disponibiliza:

- Listagem de usuários com dados simulados.
- Busca de usuários por nome ou e-mail.
- Formulário de cadastro simulado.
- Visualização dos detalhes de um usuário.
- Tratamento de usuários não encontrados.
- Navegação interna com React Router 7.

O componente `UsersRoutes` é exposto pelo Module Federation e consumido dinamicamente pelo Host.

O Remote também pode ser executado de forma independente, utilizando seu próprio `BrowserRouter`.

### Integração com Module Federation

O Host acessa o módulo remoto por meio do arquivo `remoteEntry.js`, disponibilizado pelo Remote Users.

A importação utiliza `React.lazy` e `Suspense` para permitir o carregamento dinâmico do componente remoto.

O Host importa o módulo:

```tsx
const UsersRoutes = lazy(() => import("remote_users/UsersRoutes"));
```

O Remote Users expõe o componente em sua configuração do Module Federation:

```ts
exposes: {
  './UsersRoutes': './src/UsersRoutes.tsx',
},
```

As dependências React, React DOM, React Router e React Router DOM são compartilhadas como singletons entre as aplicações.

Essa configuração permite reutilizar o contexto de navegação do Host e evita a criação desnecessária de múltiplas instâncias dessas bibliotecas durante a integração.

## Decisões técnicas e benefícios da arquitetura

### Separação entre Host e Remote

O DevPortal utiliza uma arquitetura de microfrontends para separar a aplicação principal dos módulos funcionais.

O Host concentra a navegação principal e a integração dos módulos, enquanto o Remote Users mantém suas próprias páginas, rotas e regras de gerenciamento de usuários.

Essa separação reduz o acoplamento entre as funcionalidades e permite que diferentes equipes desenvolvam e mantenham módulos de forma independente.

### Module Federation

O Module Federation foi escolhido para permitir que o Host consuma componentes de aplicações independentes em tempo de execução.

O Remote Users disponibiliza o componente `UsersRoutes`, permitindo que o Host integre suas funcionalidades sem incorporar diretamente o código-fonte do módulo.

Entre os benefícios estão a modularidade, a possibilidade de evolução independente e a reutilização de funcionalidades entre aplicações.

### Carregamento sob demanda

A integração utiliza `React.lazy` e `Suspense` para carregar o Remote Users quando necessário.

Essa estratégia evita o carregamento antecipado de todas as funcionalidades do portal e permite apresentar uma interface de espera durante a importação do módulo remoto.

### Gerenciamento de estado

A Context API e o `useReducer` foram escolhidos para centralizar o estado dos usuários sem adicionar uma biblioteca externa de gerenciamento global.

Os hooks `useMemo` e `useCallback` são utilizados para memorizar, respectivamente, o resultado da filtragem e a função de cadastro.

Essa abordagem mantém a implementação simples e adequada ao escopo acadêmico do projeto.

### Monorepo com npm Workspaces

O monorepo facilita a organização das aplicações em um único repositório, preservando scripts e configurações independentes para cada workspace.

Essa estrutura também permite evoluir futuramente o pacote `packages/ui` para compartilhar componentes visuais.

### Limitações da implementação

O projeto utiliza dados simulados armazenados em memória, sem backend ou persistência.

Embora a arquitetura permita builds independentes e carregamento remoto, a publicação independente em ambientes de produção não foi implementada nesta etapa.

Os testes automatizados validam os principais comportamentos do Remote Users, mas ainda não incluem testes E2E entre Host e Remote.

## Estrutura do projeto

```text
devportal/
├── apps/
│   ├── host/
│   │   ├── src/
│   │   │   ├── types/
│   │   │   │   └── remotes.d.ts
│   │   │   ├── App.tsx
│   │   │   └── main.tsx
│   │   └── vite.config.ts
│   │
│   └── remote-users/
│       ├── src/
│       │   ├── contexts/
│       │   │   ├── UsersContext.tsx
│       │   │   └── UsersContext.test.tsx
│       │   ├── mocks/
│       │   │   └── users.ts
│       │   ├── pages/
│       │   │   ├── UsersPage.tsx
│       │   │   ├── UsersPage.test.tsx
│       │   │   ├── NewUserPage.tsx
│       │   │   ├── NewUserPage.test.tsx
│       │   │   ├── UserDetailsPage.tsx
│       │   │   └── UserDetailsPage.test.tsx
│       │   ├── reducers/
│       │   │   ├── usersReducer.ts
│       │   │   └── usersReducer.test.ts
│       │   ├── UsersRoutes.tsx
│       │   ├── App.tsx
│       │   └── main.tsx
│       └── vite.config.ts
│
├── packages/
│   └── ui/
│
├── package.json
├── package-lock.json
└── README.md
```

A pasta `packages/ui` está reservada para componentes compartilhados entre as aplicações.

## Roteamento e navegação

O DevPortal utiliza React Router 7 para organizar a navegação entre o Host e os microfrontends.

### Rotas disponíveis

| Rota             | Aplicação    | Descrição                |
| ---------------- | ------------ | ------------------------ |
| `/`              | Host         | Página inicial do portal |
| `/usuarios`      | Remote Users | Listagem de usuários     |
| `/usuarios/novo` | Remote Users | Cadastro simulado        |
| `/usuarios/:id`  | Remote Users | Detalhes do usuário      |

### Roteamento do Host

O Host utiliza `BrowserRouter` para fornecer o contexto de navegação principal.

A rota `/usuarios/*` carrega dinamicamente o componente `UsersRoutes` do Remote Users.

O caractere `*` permite que o Remote gerencie suas próprias subrotas.

### Roteamento do Remote Users

O componente `UsersRoutes` centraliza as rotas internas do microfrontend.

```tsx
<Routes>
  <Route index element={<UsersPage />} />
  <Route path="novo" element={<NewUserPage />} />
  <Route path=":id" element={<UserDetailsPage />} />
</Routes>
```

As páginas utilizam links relativos para permitir a navegação tanto no Host quanto na execução independente.

### Execução independente

O Remote Users possui seu próprio ponto de entrada e pode funcionar sem o Host.

Nesse modo, utiliza:

```tsx
<BrowserRouter basename="/usuarios">
  <App />
</BrowserRouter>
```

O `basename` define o prefixo das URLs do Remote independente.

Quando integrado ao Host, apenas `UsersRoutes` é carregado pelo Module Federation, reutilizando o contexto de navegação da aplicação principal.

Dessa forma, não é necessário criar outro `BrowserRouter` dentro do Host.

## Dados simulados

O Remote Users utiliza dados simulados definidos em:

`apps/remote-users/src/mocks/users.ts`

Atualmente, existem três usuários para demonstração:

- Ana Silva.
- Carlos Souza.
- Mariana Costa.

O formulário de cadastro utiliza estado local com `useState`, inputs controlados e validação HTML.

O envio adiciona o novo usuário ao estado compartilhado em memória:

- Nenhuma requisição HTTP é realizada.
- A listagem é atualizada com os usuários cadastrados.
- Os dados não são persistidos e são perdidos ao atualizar a página ou desmontar o microfrontend.

## Gerenciamento de estado

O Remote Users utiliza a Context API e hooks do React 19
para compartilhar e atualizar os dados dos usuários.

### useReducer

O `usersReducer` centraliza as alterações na lista de usuários.

Atualmente, implementa a ação `ADD_USER`, responsável por
adicionar um novo usuário sem modificar o estado anterior.

### useContext

O `UsersContext` disponibiliza o estado compartilhado
para as páginas do Remote Users.

O hook personalizado `useUsers()` permite acessar:

- `users`: lista atualizada de usuários.
- `addUser`: função para cadastrar um usuário.

O `UsersProvider` envolve as rotas do microfrontend,
funcionando tanto na execução independente quanto
na integração com o Host.

### useMemo

A página `UsersPage` utiliza `useMemo` para memorizar
o resultado da filtragem de usuários.

A busca permite localizar usuários pelo nome ou e-mail,
sem diferenciar letras maiúsculas e minúsculas.

A lista filtrada é recalculada quando os usuários
ou o texto pesquisado são alterados.

### useCallback

O `UsersProvider` utiliza `useCallback` para manter
estável a referência da função `addUser` entre
renderizações.

### Persistência dos dados

O gerenciamento de estado ocorre exclusivamente em memória.

Os usuários cadastrados permanecem disponíveis durante
a navegação pelo módulo, mas são perdidos ao atualizar
a página ou desmontar o microfrontend.

Não há integração com backend ou armazenamento persistente.

## Pré-requisitos

- Node.js 22.
- npm 10 ou superior.
- Git.

## Instalação

Clone o repositório:

```bash
git clone git@github.com:RomualdoBorges/devportal.git
cd devportal
```

Instale as dependências:

```bash
npm install
```

O projeto utiliza npm Workspaces para gerenciar as dependências das aplicações.

## Execução local

A integração foi validada utilizando o build do Remote Users e o servidor de desenvolvimento do Host.

### Terminal 1 — Remote Users

Primeiro, gere o build:

```bash
npm run build -w apps/remote-users
```

Depois, execute:

```bash
npm run preview -w apps/remote-users
```

O Remote Users estará disponível de forma independente em:

http://localhost:3001/usuarios

O arquivo do Module Federation estará disponível em:

http://localhost:3001/remoteEntry.js

### Terminal 2 — Host

Em outro terminal, execute:

```bash
npm run dev -w apps/host
```

O Host estará disponível em:

http://localhost:3000

Acesse a página inicial e utilize o menu **Usuários** para carregar o microfrontend.

### Testando a navegação

Com as duas aplicações em execução, acesse:

| Endereço                              | Resultado esperado     |
| ------------------------------------- | ---------------------- |
| `http://localhost:3000`               | Página inicial do Host |
| `http://localhost:3000/usuarios`      | Listagem de usuários   |
| `http://localhost:3000/usuarios/novo` | Formulário de cadastro |
| `http://localhost:3000/usuarios/1`    | Detalhes de Ana Silva  |

Para testar o Remote independentemente:

| Endereço                              | Resultado esperado       |
| ------------------------------------- | ------------------------ |
| `http://localhost:3001/usuarios`      | Listagem de usuários     |
| `http://localhost:3001/usuarios/novo` | Formulário de cadastro   |
| `http://localhost:3001/usuarios/2`    | Detalhes de Carlos Souza |

A navegação pode ser realizada sem recarregar a aplicação inteira.

As rotas também podem ser acessadas diretamente pelo navegador.

## Build

Para gerar o build de todas as aplicações:

```bash
npm run build
```

Para gerar o build de uma aplicação específica:

```bash
npm run build -w apps/host
npm run build -w apps/remote-users
```

Os builds utilizam TypeScript para verificação de tipos e Vite para gerar os arquivos de produção.

## Testes automatizados

O DevPortal utiliza **Vitest** e **React Testing Library** para validar o comportamento do microfrontend Remote Users.

Os testes são executados em um ambiente simulado com **jsdom**, sem necessidade de iniciar o Host, o Remote ou um backend.

### Executar os testes

Na raiz do projeto:

```bash
npm run test -w apps/remote-users
```

Para executar os testes automaticamente durante o desenvolvimento:

```bash
npm run test:watch -w apps/remote-users
```

### Cenários testados

| Módulo          | Testes | Funcionalidades                                                        |
| --------------- | ------ | ---------------------------------------------------------------------- |
| usersReducer    | 4      | Cadastro, preservação de usuários, imutabilidade e ações desconhecidas |
| UsersContext    | 2      | Estado inicial e atualização do estado compartilhado                   |
| UsersPage       | 4      | Listagem, busca por nome, busca por e-mail e limpeza da busca          |
| NewUserPage     | 3      | Formulário, cadastro e navegação                                       |
| UserDetailsPage | 3      | Detalhes, usuário inexistente e retorno à listagem                     |
| **Total**       | **16** | **Todos aprovados na última execução**                                 |

Os testes verificam o comportamento dos componentes e suas interações com o estado compartilhado e o React Router.

A aplicação utiliza dados simulados em memória, sem integração com um backend real.

## Estado atual

- [x] Monorepo configurado.
- [x] Host criado com React e TypeScript.
- [x] Remote Users criado com React e TypeScript.
- [x] Module Federation configurado.
- [x] Carregamento dinâmico do Remote validado.
- [x] Builds do Host e do Remote validados.
- [x] Repositório Git configurado.
- [x] Navegação do Host com React Router 7.
- [x] Rotas internas do Remote Users.
- [x] Execução independente do Remote Users.
- [x] Compartilhamento de dependências entre Host e Remote.
- [x] Cadastro simulado e detalhes de usuários.
- [x] Hooks avançados e gerenciamento de estado.
- [x] Testes automatizados (Vitest + React Testing Library).
- [ ] Documentação final e vídeo de demonstração.

### Melhorias opcionais futuras

- [ ] Testes E2E com Playwright.
- [ ] Docker.
- [ ] CI/CD.

## Desenvolvimento

O projeto utiliza branches de funcionalidades e Pull Requests.

- `main`: versão estável.
- `develop`: integração das funcionalidades.
- `feat/*`: desenvolvimento de funcionalidades.
- `docs/*`: documentação.
- `fix/*`: correções.

As funcionalidades são integradas à `develop` por meio de Pull Requests.

Os commits seguem o padrão Conventional Commits, com descrições em português.

Exemplos:

```text
feat: implementa roteamento do host e navegação do remote users
fix: corrige navegação interna do microfrontend de usuários
docs: atualiza documentação da arquitetura
```

## Licença

Projeto desenvolvido para fins acadêmicos e de aprendizado.
