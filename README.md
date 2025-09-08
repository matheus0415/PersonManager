# PersonManager

API .NET para gerenciamento de pessoas com frontend React (Vite) e PostgreSQL. Inclui Swagger, EF Core (Npgsql), camadas de Repositório/Serviço e CORS para o frontend local.

## Stack

- Backend: .NET 8, EF Core, Npgsql
- Banco: PostgreSQL (pode rodar via Docker)
- Frontend: React + Vite + TypeScript
- Docs: Swagger/OpenAPI com comentários XML

## Pré‑requisitos

- Windows, PowerShell 5.1+
- .NET SDK 8.0+
- Node.js 18+ e npm
- Docker Desktop (opcional para PostgreSQL)

## Banco (Docker opcional)

```powershell
# Ajuste usuário/senha se quiser
docker run --name personmanager-db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=personmanager -p 5432:5432 -d postgres:16
```

String de conexão esperada em `backend/appsettings.json`:

```
Host=localhost;Port=5432;Database=personmanager;Username=postgres;Password=postgres
```

Detalhes: `README_TESTE_DOCKER.md` e `backend/README_BANCO.md`.

## Migrações EF Core

- Em Desenvolvimento, o app aplica migrações no startup (`ApplyMigrations`).
- Manual:

```powershell
# Na raiz do repositório
dotnet restore
dotnet ef database update --project backend/PersonManage.csproj
```

## Rodar o backend

```powershell
# Na raiz do repositório
dotnet run --project backend/PersonManage.csproj
```

- Swagger em `/swagger` (veja a porta no console).
- CORS permite `http://localhost:5173`.

## Rodar o frontend

```powershell
cd frontend
npm install
npm run dev
```

Acesse http://localhost:5173

## Endpoints (Person)

Base: `/api/person`

- GET `/api/person`
- GET `/api/person/{id}`
- POST `/api/person`
- PUT `/api/person/{id}`
- DELETE `/api/person/{id}`

Teste via Swagger.

## Decisões técnicas

- Hosting minimal, Swagger em Dev com comentários XML.
- EF Core + Npgsql, code‑first com migrations.
- `ApplyMigrations` apenas em Dev.
- Camadas: Controllers → Services → Repositories → EF Core.
- CORS: `http://localhost:5173`.

## Troubleshooting

- Banco: confirme container ativo (`docker ps`) e string de conexão.
- Migrações: `dotnet ef database update --project backend/PersonManage.csproj`.
- Swagger/porta: verifique a porta do `dotnet run`.
- CORS: ajuste a policy `AllowFrontend` em `Program.cs` se mudar a origem.
