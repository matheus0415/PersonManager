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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Trash2, Edit, Plus, Search, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Pessoa {
  id: string;
  nome: string;
  sexo?: string;
  email?: string;
  dataNascimento: string;
  naturalidade?: string;
  nacionalidade?: string;
  cpf: string;
  dataCadastro: string;
  dataAtualizacao: string;
}

export default function GerenciamentoPessoas() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [pessoaEditando, setPessoaEditando] = useState<Pessoa | null>(null);
  const [dialogAberto, setDialogAberto] = useState(false);
  const [busca, setBusca] = useState("");
  const [formData, setFormData] = useState({
    nome: "",
    sexo: "",
    email: "",
    dataNascimento: "",
    naturalidade: "",
    nacionalidade: "",
    cpf: "",
  });
  const [erros, setErros] = useState<Record<string, string>>({});
  const { toast } = useToast();

  // Validação de CPF
  const validarCPF = (cpf: string): boolean => {
    const cpfLimpo = cpf.replace(/\D/g, "");
    if (cpfLimpo.length !== 11) return false;

    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cpfLimpo)) return false;

    // Validação dos dígitos verificadores
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += Number.parseInt(cpfLimpo.charAt(i)) * (10 - i);
    }
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== Number.parseInt(cpfLimpo.charAt(9))) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += Number.parseInt(cpfLimpo.charAt(i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === Number.parseInt(cpfLimpo.charAt(10));
  };

  // Validação de email
  const validarEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Formatação de CPF
  const formatarCPF = (cpf: string): string => {
    const cpfLimpo = cpf.replace(/\D/g, "");
    return cpfLimpo.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };

  // Validação do formulário
  const validarFormulario = (): boolean => {
    const novosErros: Record<string, string> = {};

    if (!formData.nome.trim()) {
      novosErros.nome = "Nome é obrigatório";
    }

    if (!formData.dataNascimento) {
      novosErros.dataNascimento = "Data de nascimento é obrigatória";
    }

    if (!formData.cpf.trim()) {
      novosErros.cpf = "CPF é obrigatório";
    } else if (!validarCPF(formData.cpf)) {
      novosErros.cpf = "CPF inválido";
    } else {
      // Verificar unicidade do CPF
      const cpfExiste = pessoas.some(
        (p) => p.cpf === formData.cpf && p.id !== pessoaEditando?.id
      );
      if (cpfExiste) {
        novosErros.cpf = "CPF já cadastrado";
      }
    }

    if (formData.email && !validarEmail(formData.email)) {
      novosErros.email = "Email inválido";
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  // Salvar pessoa
  const salvarPessoa = () => {
    if (!validarFormulario()) return;

    const agora = new Date().toISOString();

    if (pessoaEditando) {
      // Editar pessoa existente
      setPessoas((prev) =>
        prev.map((p) =>
          p.id === pessoaEditando.id
            ? { ...p, ...formData, dataAtualizacao: agora }
            : p
        )
      );
      toast("Pessoa atualizada", {
        description: "Os dados foram atualizados com sucesso.",
      });
    } else {
      // Criar nova pessoa
      const novaPessoa: Pessoa = {
        id: Date.now().toString(),
        ...formData,
        dataCadastro: agora,
        dataAtualizacao: agora,
      };
      setPessoas((prev) => [...prev, novaPessoa]);
      toast("Pessoa cadastrada", {
        description: "Nova pessoa foi cadastrada com sucesso.",
      });
    }

    fecharDialog();
  };

  // Excluir pessoa
  const excluirPessoa = (id: string) => {
    setPessoas((prev) => prev.filter((p) => p.id !== id));
    toast("Pessoa excluída", {
      description: "A pessoa foi removida do sistema.",
      className: "bg-destructive text-destructive-foreground",
    });
  };

  // Abrir dialog para edição
  const editarPessoa = (pessoa: Pessoa) => {
    setPessoaEditando(pessoa);
    setFormData({
      nome: pessoa.nome,
      sexo: pessoa.sexo || "",
      email: pessoa.email || "",
      dataNascimento: pessoa.dataNascimento,
      naturalidade: pessoa.naturalidade || "",
      nacionalidade: pessoa.nacionalidade || "",
      cpf: pessoa.cpf,
    });
    setDialogAberto(true);
  };

  // Fechar dialog
  const fecharDialog = () => {
    setDialogAberto(false);
    setPessoaEditando(null);
    setFormData({
      nome: "",
      sexo: "",
      email: "",
      dataNascimento: "",
      naturalidade: "",
      nacionalidade: "",
      cpf: "",
    });
    setErros({});
  };

  // Filtrar pessoas pela busca
  const pessoasFiltradas = pessoas.filter(
    (pessoa) =>
      pessoa.nome.toLowerCase().includes(busca.toLowerCase()) ||
      pessoa.cpf.includes(busca) ||
      (pessoa.email && pessoa.email.toLowerCase().includes(busca.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">
                Gerenciamento de Pessoas
              </h1>
            </div>
            <Badge variant="secondary" className="text-sm">
              {pessoas.length} pessoa{pessoas.length !== 1 ? "s" : ""}{" "}
              cadastrada{pessoas.length !== 1 ? "s" : ""}
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Controles */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Buscar por nome, CPF ou email..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="pl-10"
            />
          </div>
          <Dialog open={dialogAberto} onOpenChange={setDialogAberto}>
            <DialogTrigger asChild>
              <Button onClick={() => fecharDialog()}>
                <Plus className="h-4 w-4 mr-2" />
                Nova Pessoa
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>
                  {pessoaEditando ? "Editar Pessoa" : "Cadastrar Nova Pessoa"}
                </DialogTitle>
                <DialogDescription>
                  Preencha os dados da pessoa. Campos marcados com * são
                  obrigatórios.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome *</Label>
                    <Input
                      id="nome"
                      value={formData.nome}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          nome: e.target.value,
                        }))
                      }
                      className={erros.nome ? "border-destructive" : ""}
                    />
                    {erros.nome && (
                      <p className="text-sm text-destructive">{erros.nome}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sexo">Sexo</Label>
                    <Select
                      value={formData.sexo}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, sexo: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="masculino">Masculino</SelectItem>
                        <SelectItem value="feminino">Feminino</SelectItem>
                        <SelectItem value="outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
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
                      className={erros.email ? "border-destructive" : ""}
                    />
                    {erros.email && (
                      <p className="text-sm text-destructive">{erros.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dataNascimento">Data de Nascimento *</Label>
                    <Input
                      id="dataNascimento"
                      type="date"
                      value={formData.dataNascimento}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          dataNascimento: e.target.value,
                        }))
                      }
                      className={
                        erros.dataNascimento ? "border-destructive" : ""
                      }
                    />
                    {erros.dataNascimento && (
                      <p className="text-sm text-destructive">
                        {erros.dataNascimento}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="naturalidade">Naturalidade</Label>
                    <Input
                      id="naturalidade"
                      value={formData.naturalidade}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          naturalidade: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nacionalidade">Nacionalidade</Label>
                    <Input
                      id="nacionalidade"
                      value={formData.nacionalidade}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          nacionalidade: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cpf">CPF *</Label>
                  <Input
                    id="cpf"
                    value={formData.cpf}
                    onChange={(e) => {
                      const valor = e.target.value.replace(/\D/g, "");
                      setFormData((prev) => ({ ...prev, cpf: valor }));
                    }}
                    placeholder="000.000.000-00"
                    maxLength={11}
                    className={erros.cpf ? "border-destructive" : ""}
                  />
                  {erros.cpf && (
                    <p className="text-sm text-destructive">{erros.cpf}</p>
                  )}
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={fecharDialog}>
                  Cancelar
                </Button>
                <Button onClick={salvarPessoa}>
                  {pessoaEditando ? "Atualizar" : "Cadastrar"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Tabela */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Pessoas</CardTitle>
            <CardDescription>
              Gerencie as informações das pessoas cadastradas no sistema.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {pessoasFiltradas.length === 0 ? (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  {pessoas.length === 0
                    ? "Nenhuma pessoa cadastrada ainda."
                    : "Nenhuma pessoa encontrada com os critérios de busca."}
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>CPF</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Data Nascimento</TableHead>
                    <TableHead>Sexo</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pessoasFiltradas.map((pessoa) => (
                    <TableRow key={pessoa.id}>
                      <TableCell className="font-medium">
                        {pessoa.nome}
                      </TableCell>
                      <TableCell>{formatarCPF(pessoa.cpf)}</TableCell>
                      <TableCell>{pessoa.email || "-"}</TableCell>
                      <TableCell>
                        {new Date(pessoa.dataNascimento).toLocaleDateString(
                          "pt-BR"
                        )}
                      </TableCell>
                      <TableCell>
                        {pessoa.sexo ? (
                          <Badge variant="secondary" className="capitalize">
                            {pessoa.sexo}
                          </Badge>
                        ) : (
                          "-"
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => editarPessoa(pessoa)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => excluirPessoa(pessoa.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
