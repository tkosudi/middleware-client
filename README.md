# LIVE TEST Integra.do

## Introdução

Este projeto é um SDK para integrar com a API da Integra.do, permitindo o login e o envio de produtos. As rotinas de execução são configuradas através de um arquivo `routines.json`.

## Pré-requisitos

- Node.js versão 18.19.0
- npm (gerenciador de pacotes do Node.js)

## 1) Fazer o clone do projeto

```sh
git clone <repository_url>
```

## 2) Navegue até o diretório

```sh
cd <project_directory>
```

## 3) Instalar as depedências do SDK

```sh
npm install
```

## 4) Configurar as variáveis de ambiente

- Crie um arquivo .env na raiz do projeto com as seguintes variáveis:

    1. `API_UR`
    2. `USER_EMAIL`
    3. `USER_PASSWORD`

## 5) Adicionar arquivo de rotinas com o nome de `routines.json`

- O exemplo de arquivo de routine você pode encontrar em: `routines.example.json`

## 6) Executar o script para execução da rotina

```npm run dev```

