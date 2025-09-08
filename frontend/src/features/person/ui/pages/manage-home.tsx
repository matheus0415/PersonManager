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
import { format } from "date-fns";

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
      <div className="flex flex-col bg-[#f8fafc] sm:flex-row items-center justify-between p-10 mb-8 gap-4 rounded-2xl shadow-sm border border-[#f1f5f9]">
        <div className="flex items-center gap-4 ">
          <div className="p-3 bg-[#ffe0db] rounded-xl shadow-md">
            <User className="h-10 w-10 text-[#ff6b57]" />
          </div>
          <div>
            <h1 className="text-4xl font-bold leading-tight text-[#22223b] flex flex-col sm:flex-row sm:items-end gap-0">
                Gerenciar Pessoas
            </h1>
            <p className="text-[#4a4e69] text-base mt-1">
              Visualize, cadastre e gerencie pessoas do sistema
            </p>
          </div>
        </div>
      </div>
      {/* <div className="min-h-screen bg-[#f7f7f7] rounded-lg shadow-md py-10 font-sans"> */}
      {/* <div className="container mx-auto max-w-6xl bg-[#fff4f5] p-4 rounded-lg shadow-md"> */}
      <Card className="mx-auto max-w-6xl shadow border border-[#f1f5f9] bg-white rounded-2xl">
        <CardHeader className="bg-[#f8fafc] rounded-t-2xl flex flex-row items-center justify-between border-b border-[#f1f5f9]">
          <div>
            <CardTitle className="text-xl font-bold text-[#22223b] tracking-tight">
              Pessoas cadastradas
            </CardTitle>
            <CardDescription className="text-base text-[#4a4e69]">
              {loading
                ? "Carregando..."
                : persons.length === 0
                ? "Nenhuma pessoa cadastrada"
                : `${persons.length} pessoa(s) cadastrada(s)`}
            </CardDescription>
          </div>
          <PersonModal
            key={editingPerson ? editingPerson.id : "new"}
            isOpen={isDialogOpen}
            setIsOpen={setIsDialogOpen}
            onSubmit={onSubmit}
            handleClose={handleCloseDialog}
            handleOpen={handleOpenDialog}
            editingPerson={editingPerson}
          />
        </CardHeader>
        <CardContent className="pt-6">
          {!persons || persons.length === 0 ? (
            <div className="text-center py-12">
              <User className="h-14 w-14 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                Nenhuma pessoa cadastrada ainda.
              </p>
              <p className="text-sm text-gray-400">
                Clique em "Nova Pessoa" para começar.
              </p>
            </div>
          ) : (
            <div className="rounded-xl border border-[#f1f5f9] overflow-x-auto bg-white shadow-sm">
              <Table className="min-w-[800px]">
                <TableHeader className="bg-[#f8fafc]">
                  <TableRow className="text-[#ff6b57] text-base">
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Sexo</TableHead>
                    <TableHead>Data de nascimento</TableHead>
                    <TableHead>Naturalidade</TableHead>
                    <TableHead>Nacionalidade</TableHead>
                    <TableHead>CPF</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {persons.map((person) => (
                    <TableRow key={person.id}>
                      <TableCell className="font-semibold text-[#22223b]">
                        {person.name}
                      </TableCell>
                      <TableCell className="text-[#4a4e69]">
                        {person.email}
                      </TableCell>
                      <TableCell className="text-[#4a4e69]">
                        {person.gender}
                      </TableCell>
                      <TableCell className="text-[#4a4e69]">
                        {person.birthDate
                          ? format(new Date(person.birthDate), "dd/MM/yyyy")
                          : ""}
                      </TableCell>
                      <TableCell className="text-[#4a4e69]">
                        {person.placeOfBirth}
                      </TableCell>
                      <TableCell className="text-[#4a4e69]">
                        {person.nationality}
                      </TableCell>
                      <TableCell className="text-[#4a4e69]">
                        {person.cpf}
                      </TableCell>
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
                            className="gap-1 rounded-lg border-[#ff6b57] hover:border-[#ff9776] bg-[#fff0ec] hover:bg-[#ff6b57] text-[#ff6b57] hover:text-white font-bold shadow-sm hover:scale-105 transition-all duration-150"
                          >
                            <Pencil className="h-3 w-3" />
                            Editar
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-1 rounded-lg border-[#ff6b57] hover:border-[#ff9776] bg-[#ff6b57] hover:bg-[#ff9776] text-white font-bold shadow-sm hover:scale-105 transition-all duration-150"
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
      {/* </div> */}
      {/* </div> */}
    </>
  );
}
