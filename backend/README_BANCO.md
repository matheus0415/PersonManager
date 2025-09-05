# Banco de Teste Rápido (PostgreSQL via Docker)

Execute este comando no terminal:

```
docker run --name postgres-personmanager -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=personmanager -p 5432:5432 -d postgres:16
```

Conexão:

- Host: localhost
- Porta: 5432
- Banco: personmanager
- Usuário: postgres
- Senha: postgres
