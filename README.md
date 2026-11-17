# DevPortal

Portal corporativo desenvolvido com arquitetura de **microfrontends**, utilizando React, TypeScript, Vite e Module Federation.

Projeto acadêmico da **Pós-Tech FIAP — Engenharia de Front-end | Fase 2**.

## Sobre o projeto

O DevPortal é uma aplicação que demonstra a composição de interfaces independentes em um único portal corporativo.

A arquitetura separa a aplicação principal (**Host**) dos módulos funcionais (**Remotes**), permitindo que cada aplicação tenha seu próprio processo de desenvolvimento e build.

O projeto utiliza dados simulados (mocks), sem necessidade de integração com um backend.

## Objetivos

- Implementar uma arquitetura de microfrontends com Module Federation.
- Integrar aplicações React independentes.
- Carregar componentes remotos dinamicamente.
- Organizar o código em um monorepo.
- Implementar navegação entre módulos.
- Aplicar hooks avançados e estratégias de gerenciamento de estado.
- Adicionar testes automatizados e práticas de integração contínua.
- Documentar as decisões técnicas e a execução do projeto.

## Tecnologias

| Tecnologia        | Finalidade                      |
| ----------------- | ------------------------------- |
| React 19          | Construção das interfaces       |
| TypeScript        | Tipagem estática                |
| Vite 8            | Desenvolvimento e build         |
| Module Federation | Integração entre microfrontends |
| React Router 7    | Roteamento (em implementação)   |
| npm Workspaces    | Gerenciamento do monorepo       |
| Git e GitHub      | Versionamento                   |

## Arquitetura

O DevPortal utiliza uma arquitetura composta por uma aplicação Host e aplicações Remote.

```text
DevPortal
│
├── Host (porta 3000)
│   └── Carrega módulos remotos
│
└── Remote Users (porta 3001)
    └── Gerenciamento de usuários
```

### Host

Responsável por integrar os microfrontends e apresentar a interface principal do portal.

### Remote Users

Microfrontend responsável pelo módulo de usuários. Atualmente, disponibiliza uma listagem com dados simulados.

O componente `UsersPage` é exposto pelo Module Federation e consumido dinamicamente pelo Host.

### Integração

O Host acessa o módulo remoto por meio do arquivo `remoteEntry.js`, disponibilizado pelo Remote Users.

A importação utiliza `React.lazy` e `Suspense` para permitir o carregamento dinâmico do componente.

## Estrutura do projeto

```text
devportal/
├── apps/
│   ├── host/
│   │   ├── src/
│   │   └── vite.config.ts
│   │
│   └── remote-users/
│       ├── src/
│       │   └── pages/
│       │       └── UsersPage.tsx
│       └── vite.config.ts
│
├── packages/
│   └── ui/
│
├── package.json
├── package-lock.json
└── README.md
```

A pasta `packages/ui` está reservada para componentes compartilhados.

## Pré-requisitos

- Node.js 22
- npm 10 ou superior
- Git

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

## Execução local

Atualmente, a integração foi validada utilizando o build do Remote Users e o servidor de desenvolvimento do Host.

**Terminal 1 — Gerar o build do Remote Users**

```bash
npm run build -w apps/remote-users
```

**Terminal 1 — Executar o Remote Users**

```bash
npm run preview -w apps/remote-users
```

O Remote estará disponível em `http://localhost:3001`.

**Terminal 2 — Executar o Host**

```bash
npm run dev -w apps/host
```

O Host estará disponível em `http://localhost:3000`.

O Host carrega o componente remoto a partir de `http://localhost:3001/remoteEntry.js`.

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

## Estado atual

- [x] Monorepo configurado
- [x] Host criado com React e TypeScript
- [x] Remote Users criado com React e TypeScript
- [x] Module Federation configurado
- [x] Carregamento dinâmico do componente remoto validado
- [x] Builds do Host e do Remote validados
- [x] Repositório Git configurado
- [ ] Navegação com React Router
- [ ] Rotas internas do Remote
- [ ] Hooks avançados e gerenciamento de estado
- [ ] Testes automatizados
- [ ] Docker
- [ ] CI/CD
- [ ] Documentação final e vídeo de demonstração

## Desenvolvimento

O projeto utiliza branches de funcionalidades e Pull Requests.

- `main`: versão estável.
- `develop`: integração das funcionalidades.
- `feat/*`: desenvolvimento de funcionalidades.
- `docs/*`: documentação.
- `fix/*`: correções.

As funcionalidades são integradas à `develop` por meio de Pull Requests.

## Licença

Projeto desenvolvido para fins acadêmicos e de aprendizado.
