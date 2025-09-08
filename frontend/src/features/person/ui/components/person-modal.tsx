import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Plus } from "lucide-react";
import type { PersonForm } from "@/features/person/schema/person-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { personSchema } from "@/features/person/schema/person-schema";

interface PersonModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  handleClose: () => void;
  handleOpen: () => void;
  editingPerson: (PersonForm & { id: number }) | null;
  onSubmit: (data: PersonForm) => void;
}

export function PersonModal({
  isOpen,
  setIsOpen,
  handleClose,
  handleOpen,
  editingPerson,
  onSubmit,
}: PersonModalProps) {
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
    values: editingPerson || undefined,
  });
  const { control, handleSubmit, reset } = form;

  React.useEffect(() => {
    if (isOpen) {
      if (editingPerson) {
        reset(editingPerson);
      } else {
        reset();
      }
    }
  }, [isOpen, editingPerson, reset]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => handleOpen()}
          className="px-6 py-2 rounded-lg bg-[#ff6b57] text-white font-semibold shadow-lg hover:scale-105 hover:bg-[#ff9776] transition-all duration-200"
          style={{ color: "#fff", backgroundColor: "#ff6b57" }}
        >
          <Plus className="h-4 w-4" />
          Nova Pessoa
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white rounded-2xl border border-[#f1f5f9] p-0 max-h-[90vh] overflow-y-auto">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader className="bg-[#ffe0db] rounded-t-lg px-6 py-4">
            <DialogTitle className="text-[#ff6b57] text-2xl font-bold">
              {editingPerson ? "Editar Pessoa" : "Nova Pessoa"}
            </DialogTitle>
            <DialogDescription className="text-[#4a4e69]">
              {editingPerson
                ? "Atualize as informações da pessoa."
                : "Preencha os dados para cadastrar uma nova pessoa."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 px-6 py-6">
            <FormField
              control={control}
              name="name"
              render={({ value, onChange, onBlur, name, ref, error }) => (
                <FormItem>
                  <FormLabel htmlFor="name">Nome</FormLabel>
                  <FormControl>
                    <Input
                      id="name"
                      placeholder="Nome completo"
                      name={name}
                      ref={ref}
                      value={typeof value === "string" ? value : ""}
                      onChange={onChange}
                      onBlur={onBlur}
                    />
                  </FormControl>
                  <FormMessage error={error} />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="gender"
              render={({ value, onChange, onBlur, name, ref, error }) => (
                <FormItem>
                  <FormLabel htmlFor="gender">Sexo</FormLabel>
                  <FormControl>
                    <Input
                      id="gender"
                      placeholder="M/F/Outro"
                      name={name}
                      ref={ref}
                      value={typeof value === "string" ? value : ""}
                      onChange={onChange}
                      onBlur={onBlur}
                    />
                  </FormControl>
                  <FormMessage error={error} />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="email"
              render={({ value, onChange, onBlur, name, ref, error }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      placeholder="E-mail"
                      name={name}
                      ref={ref}
                      value={typeof value === "string" ? value : ""}
                      onChange={onChange}
                      onBlur={onBlur}
                    />
                  </FormControl>
                  <FormMessage error={error} />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="birthDate"
              render={({ value, onChange, onBlur, name, ref, error }) => (
                <FormItem>
                  <FormLabel htmlFor="birthDate">Data de Nascimento</FormLabel>
                  <FormControl>
                    <Input
                      id="birthDate"
                      type="date"
                      placeholder="AAAA-MM-DD"
                      name={name}
                      ref={ref}
                      value={typeof value === "string" ? value : ""}
                      onChange={onChange}
                      onBlur={onBlur}
                    />
                  </FormControl>
                  <FormMessage error={error} />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="placeOfBirth"
              render={({ value, onChange, onBlur, name, ref, error }) => (
                <FormItem>
                  <FormLabel htmlFor="placeOfBirth">Naturalidade</FormLabel>
                  <FormControl>
                    <Input
                      id="placeOfBirth"
                      placeholder="Naturalidade"
                      name={name}
                      ref={ref}
                      value={typeof value === "string" ? value : ""}
                      onChange={onChange}
                      onBlur={onBlur}
                    />
                  </FormControl>
                  <FormMessage error={error} />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="nationality"
              render={({ value, onChange, onBlur, name, ref, error }) => (
                <FormItem>
                  <FormLabel htmlFor="nationality">Nacionalidade</FormLabel>
                  <FormControl>
                    <Input
                      id="nationality"
                      placeholder="Nacionalidade"
                      name={name}
                      ref={ref}
                      value={typeof value === "string" ? value : ""}
                      onChange={onChange}
                      onBlur={onBlur}
                    />
                  </FormControl>
                  <FormMessage error={error} />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="taxId"
              render={({ value, onChange, onBlur, name, ref, error }) => (
                <FormItem>
                  <FormLabel htmlFor="taxId">CPF</FormLabel>
                  <FormControl>
                    <Input
                      id="taxId"
                      placeholder="000.000.000-00"
                      name={name}
                      ref={ref}
                      value={typeof value === "string" ? value : ""}
                      onChange={onChange}
                      onBlur={onBlur}
                    />
                  </FormControl>
                  <FormMessage error={error} />
                </FormItem>
              )}
            />
          </div>

          <DialogFooter className="px-6 pb-6">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="rounded-lg border-[#ff6b57] text-[#ff6b57] bg-white hover:bg-[#ffe0db] hover:border-[#ff9776] font-bold shadow-none"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="rounded-lg bg-[#ff6b57] hover:bg-[#ff9776] text-white font-bold shadow-none"
              style={{ color: "#fff", backgroundColor: "#ff6b57" }}
            >
              {editingPerson ? "Atualizar" : "Cadastrar"}
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
