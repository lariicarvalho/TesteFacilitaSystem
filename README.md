# TesteFacilitaSystem

O projeto consiste em um Sistema de Gerenciamento de Tarefas onde você pode adicionar uma nova tarefa com descrição, data para conclusão e classificação entre Normal, Alta e Urgente. Dentro do projeto o objetivo era construir uma API para o consumo dos dados no banco e um Frontend onde você pudesse Criar, Listar, Atualizar e Deletar as tarefas. 

## 🚀 Começando

Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local. O projeto foi desenvolvido utilizando TypeScript e a API utilizando o banco de dados MongoDB.


### 🔧 Instalação

Para iniciar o projeto:

```
npm init -y
```

Instalando Typescript como dependência de desenvolvimento:

```
npm install typescript --save-dev
```


Criando arquivo de configuração do TS:
```
tsc --init
```
​
Instalando Fastify e Cors:
```
npm install fastify @fastify/cors
```

Instalando TSX:
```
npm install tsx
```

Rodar aplicação:
```
npm run dev
```


Instalar Prisma em desenvolvimento:
```
npm install prisma --save-dev
npm install @prisma/client
npx prisma init
```
​
Mapear entidades:
```
npx prisma generate
```
​
Verificar conexão com o banco via Prisma Studio
```
npx prisma studio
```

## Para obter dados do sistema

Cadastro de tarefas:
```
curl --request POST \
  --url http://localhost:3333/task \
  --header 'Content-Type: application/json' \
  --data '{
"taskName": "teste delete",
"dueDate": "2024-04-25T01:47:38.950Z",
"priority": "Urgente",
"description": ""
}'
```

Listagem de tarefas:
```
curl --request GET \
  --url http://localhost:3333/tasks \
```

Update de tarefas:
```
curl --request POST \
  --url http://localhost:3333/update \
  --header 'Content-Type: application/json' \
  --data '{
"id": "6625164e883b52b24b34f069",
"taskName": "teste update",
"dueDate": "2024-04-25T01:47:38.950Z",
"priority": "alta",
"description": "não esquecer do remedio"
}'
```

Apagar tarefa:
```
curl --request DELETE \
  --url 'http://localhost:3333/task?id=6625164e883b52b24b34f069' \
```



## 🛠️ Construído com

Mencione as ferramentas que você usou para criar seu projeto

* [Fastify](https://fastify.dev/) - Framework NodeJS utilizado no backend
* [Prisma](https://www.prisma.io/) - ORM utilizado no projeto
* [MongoDB](https://www.mongodb.com/) - Banco de dados utilizado
* [Tailwind](https://tailwindui.com/) - Framework CSS utilizado no Front
* [Vite](https://tailwindui.com/) - Framework ReactJS utilizado no Front 


