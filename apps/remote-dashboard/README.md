# DevPortal — Remote Dashboard

Microfrontend de indicadores e métricas do DevPortal, desenvolvido com React, TypeScript, Vite e Module Federation.

## Funcionalidades

- Exibição do total de usuários cadastrados.
- Indicadores de usuários ativos e inativos.
- Cálculo da taxa de atividade.
- Gráfico de distribuição percentual dos usuários.
- Reutilização dos componentes compartilhados de `@devportal/ui`.
- Testes automatizados com Vitest e React Testing Library.

Os indicadores utilizam dados simulados (_mock_), sem dependência de uma API.

## Arquitetura

O Dashboard funciona como um microfrontend independente, integrado ao Host por Module Federation.

| Configuração       | Valor               |
| ------------------ | ------------------- |
| Aplicação          | `remote-dashboard`  |
| Porta              | `3002`              |
| Rota no Host       | `/dashboard`        |
| Nome federado      | `remote_dashboard`  |
| Módulo exposto     | `./DashboardRoutes` |
| Arquivo de entrada | `remoteEntry.js`    |

O Host carrega `DashboardRoutes` dinamicamente, utilizando React Router e `React.lazy`.

## Tecnologias

- React e TypeScript
- Vite
- Module Federation
- React Router
- Vitest
- React Testing Library
- Oxlint

## Executar localmente

Na raiz do monorepo, instale as dependências:

```bash
npm install
```

Inicie o microfrontend:

```bash
npm run dev --workspace=remote-dashboard
```

Acesse:

`http://localhost:3002/dashboard`

Para acessar pelo Host, os dois aplicativos precisam estar em execução, nas portas `3000` e `3002`.

## Testes e validações

Execute os testes automatizados:

```bash
npm run test --workspace=remote-dashboard
```

Execute o build de produção:

```bash
npm run build --workspace=remote-dashboard
```

Execute a análise estática:

```bash
npm run lint --workspace=remote-dashboard
```

## Hooks React

O Dashboard utiliza `useMemo` para calcular e memorizar os indicadores de usuários.

Outros hooks exigidos pelo projeto, como `useReducer`, `useContext` e `useCallback`, são utilizados no microfrontend de usuários.

## Integração com o DevPortal

O Host registra o Remote Dashboard em sua configuração do Module Federation e disponibiliza a rota `/dashboard`.

O Dashboard compartilha as dependências React e React Router com o Host e utiliza os componentes da biblioteca `@devportal/ui`.
