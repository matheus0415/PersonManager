import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/app/globalStore";
import { createPersonRequest } from "@/features/person/presentation/redux/actions/create-person-actions";
import { updatePersonRequest } from "@/features/person/presentation/redux/actions/update-person-actions";
import { deletePersonRequest } from "@/features/person/presentation/redux/actions/delete-person-actions";
import { getPersonsRequest } from "@/features/person/presentation/redux/actions/get-persons-actions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { personSchema } from "@/features/person/schema/person-schema";
import type { PersonForm } from "@/features/person/schema/person-schema";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { User, Pencil, Trash2 } from "lucide-react";
import { PersonModal } from "@/features/person/ui/components/person-modal";

export default function ManageHome() {
  const dispatch = useDispatch();
  const persons = useSelector((state: RootState) => state.getPersons.persons);
  const loading = useSelector((state: RootState) => state.getPersons.loading);
  const [editingPerson, setEditingPerson] = useState<
    (PersonForm & { id: number }) | null
  >(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const form = useForm<PersonForm>({
    resolver: zodResolver(personSchema),
    defaultValues: {
      name: "",
      gender: "",
      email: "",
      birthDate: "",
      placeOfBirth: "",
      nationality: "",
      taxId: "",
    },
  });
  const { reset } = form;

  const handleOpenDialog = (person?: PersonForm & { id: number }) => {
    if (person) {
      setEditingPerson(person);
      reset(person);
    } else {
      setEditingPerson(null);
      reset();
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingPerson(null);
    reset();
  };

  const onSubmit = (data: PersonForm) => {
    const { taxId, ...rest } = data;
    if (editingPerson) {
      dispatch(updatePersonRequest(editingPerson.id, { ...rest, cpf: taxId }));
      toast("Pessoa atualizada! (aguarde confirmação)");
    } else {
      dispatch(createPersonRequest({ ...rest, cpf: taxId }));
      toast("Pessoa cadastrada! (aguarde confirmação)");
    }
    handleCloseDialog();
    setTimeout(() => dispatch(getPersonsRequest()), 500);
  };

  React.useEffect(() => {
    dispatch(getPersonsRequest());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    dispatch(deletePersonRequest(id));
    toast("Pessoa removida! (aguarde confirmação)");
    setTimeout(() => dispatch(getPersonsRequest()), 500);
  };

  return (
    <>
      <PersonModal
        key={editingPerson ? editingPerson.id : 'new'}
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        onSubmit={onSubmit}
        handleClose={handleCloseDialog}
        handleOpen={handleOpenDialog}
        editingPerson={editingPerson}
      />
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
            <CardTitle>Pessoas cadastradas</CardTitle>
            <CardDescription>
              {loading
                ? "Carregando..."
                : persons.length === 0
                ? "Nenhuma pessoa cadastrada"
                : `${persons.length} pessoa(s) cadastrada(s)`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!persons || persons.length === 0 ? (
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
                      <TableHead>Sexo</TableHead>
                      <TableHead>Data de nascimento</TableHead>
                      <TableHead>Naturalidade</TableHead>
                      <TableHead>Nacionalidade</TableHead>
                      <TableHead>CPF</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {persons.map((person) => (
                      <TableRow key={person.id}>
                        <TableCell className="font-medium">
                          {person.name}
                        </TableCell>
                        <TableCell>{person.email}</TableCell>
                        <TableCell>{person.gender}</TableCell>
                        <TableCell>{person.birthDate}</TableCell>
                        <TableCell>{person.placeOfBirth}</TableCell>
                        <TableCell>{person.nationality}</TableCell>
                        <TableCell>{person.cpf}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleOpenDialog({
                                  ...person,
                                  taxId: person.cpf,
                                })
                              }
                              className="gap-1"
                            >
                              <Pencil className="h-3 w-3" />
                              Editar
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-1 text-destructive hover:text-destructive"
                              onClick={() => handleDelete(person.id)}
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
