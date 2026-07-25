import { listarUsuarios } from "@/actions/usuarios";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatarData } from "@/lib/utils";
import { TipoUsuarioSelect } from "./tipo-select";

export default async function UsuariosAdminPage() {
  const usuarios = await listarUsuarios();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Usuários</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>E-mail</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Desde</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {usuarios.map((u) => (
            <TableRow key={u.id}>
              <TableCell>{u.nome}</TableCell>
              <TableCell>{u.email}</TableCell>
              <TableCell>{u.telefone ?? "-"}</TableCell>
              <TableCell><TipoUsuarioSelect id={u.id} tipo={u.tipo} /></TableCell>
              <TableCell>{formatarData(u.criado_em)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
