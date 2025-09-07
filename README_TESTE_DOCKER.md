# Como rodar o projeto PersonManager com PostgreSQL no Docker

## 1. Suba o banco de dados PostgreSQL com Docker

Execute o comando abaixo (ajuste usuário e senha conforme seu `appsettings.json`):

```
docker run --name personmanager-db -e POSTGRES_USER=seu_usuario -e POSTGRES_PASSWORD=sua_senha -e POSTGRES_DB=personmanager -p 5432:5432 -d postgres:latest
```

## 2. Configure a string de conexão

No arquivo `backend/appsettings.json`, verifique se a string de conexão está assim:

```
Host=localhost;Port=5432;Database=personmanager;Username=seu_usuario;Password=sua_senha
```

## 3. Restaure os pacotes e aplique as migrations

No diretório do projeto backend, execute:

```
dotnet restore
dotnet ef database update --project backend/PersonManage.csproj
```

## 4. Rode a aplicação backend

```
dotnet run --project backend/PersonManage.csproj
```

## 5. (Opcional) Rodando o frontend

No diretório `frontend`:

```
npm install
npm run dev
```

---

Pronto! Agora a aplicação estará rodando e conectada ao banco PostgreSQL no Docker.
