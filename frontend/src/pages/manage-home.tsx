import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Plus, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Pessoa {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  idade: number;
}

export default function ManageHome() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([
    {
      id: 1,
      nome: "João Silva",
      email: "joao@email.com",
      telefone: "(11) 99999-9999",
      idade: 30,
    },
    {
      id: 2,
      nome: "Maria Santos",
      email: "maria@email.com",
      telefone: "(11) 88888-8888",
      idade: 25,
    },
    {
      id: 3,
      nome: "Pedro Costa",
      email: "pedro@email.com",
      telefone: "(11) 77777-7777",
      idade: 35,
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPessoa, setEditingPessoa] = useState<Pessoa | null>(null);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    idade: "",
  });

  const { toast } = useToast();

  const resetForm = () => {
    setFormData({ nome: "", email: "", telefone: "", idade: "" });
    setEditingPessoa(null);
  };

  const handleOpenDialog = (pessoa?: Pessoa) => {
    if (pessoa) {
      setEditingPessoa(pessoa);
      setFormData({
        nome: pessoa.nome,
        email: pessoa.email,
        telefone: pessoa.telefone,
        idade: pessoa.idade.toString(),
      });
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    resetForm();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.nome ||
      !formData.email ||
      !formData.telefone ||
      !formData.idade
    ) {
      toast(
        <span style={{ color: "red" }}>Todos os campos são obrigatórios</span>
      );
      return;
    }

    const pessoaData = {
      nome: formData.nome,
      email: formData.email,
      telefone: formData.telefone,
      idade: Number.parseInt(formData.idade),
    };

    if (editingPessoa) {
      // Editar pessoa existente
      setPessoas((prev) =>
        prev.map((p) =>
          p.id === editingPessoa.id
            ? { ...pessoaData, id: editingPessoa.id }
            : p
        )
      );
      toast("Pessoa atualizada com sucesso!");
    } else {
      // Adicionar nova pessoa
      const newId = Math.max(...pessoas.map((p) => p.id)) + 1;
      setPessoas((prev) => [...prev, { ...pessoaData, id: newId }]);
      toast("Pessoa adicionada com sucesso!");
    }

    handleCloseDialog();
  };

  const handleDelete = (id: number) => {
    setPessoas((prev) => prev.filter((p) => p.id !== id));
    toast(<span>Pessoa removida com sucesso!</span>);
  };

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button
            onClick={() => handleOpenDialog()}
            className="gap-2 fixed top-8 right-8 z-40"
          >
            <Plus className="h-4 w-4" />
            Nova Pessoa
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>
                {editingPessoa ? "Editar Pessoa" : "Nova Pessoa"}
              </DialogTitle>
              <DialogDescription>
                {editingPessoa
                  ? "Atualize as informações da pessoa."
                  : "Preencha os dados para cadastrar uma nova pessoa."}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="nome">Nome</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, nome: e.target.value }))
                  }
                  placeholder="Digite o nome completo"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  placeholder="Digite o email"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  value={formData.telefone}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      telefone: e.target.value,
                    }))
                  }
                  placeholder="(11) 99999-9999"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="idade">Idade</Label>
                <Input
                  id="idade"
                  type="number"
                  value={formData.idade}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      idade: e.target.value,
                    }))
                  }
                  placeholder="Digite a idade"
                  min="1"
                  max="120"
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseDialog}
              >
                Cancelar
              </Button>
              <Button type="submit">
                {editingPessoa ? "Atualizar" : "Cadastrar"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <div className="container mx-auto p-6 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-balance">
                Gerenciar Pessoas
              </h1>
              <p className="text-muted-foreground">
                Cadastre e gerencie informações de pessoas
              </p>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lista de Pessoas</CardTitle>
            <CardDescription>
              {pessoas.length}{" "}
              {pessoas.length === 1
                ? "pessoa cadastrada"
                : "pessoas cadastradas"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {pessoas.length === 0 ? (
              <div className="text-center py-8">
                <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Nenhuma pessoa cadastrada ainda.
                </p>
                <p className="text-sm text-muted-foreground">
                  Clique em "Nova Pessoa" para começar.
                </p>
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Telefone</TableHead>
                      <TableHead>Idade</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pessoas.map((pessoa) => (
                      <TableRow key={pessoa.id}>
                        <TableCell className="font-medium">
                          {pessoa.nome}
                        </TableCell>
                        <TableCell>{pessoa.email}</TableCell>
                        <TableCell>{pessoa.telefone}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{pessoa.idade} anos</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleOpenDialog(pessoa)}
                              className="gap-1"
                            >
                              <Pencil className="h-3 w-3" />
                              Editar
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(pessoa.id)}
                              className="gap-1 text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-3 w-3" />
                              Excluir
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
