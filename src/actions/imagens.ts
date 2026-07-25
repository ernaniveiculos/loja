"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function enviarImagensVeiculo(veiculoId: string, formData: FormData) {
  const supabase = await createClient();
  const arquivos = formData.getAll("imagens") as File[];
  if (!arquivos.length) return { erro: "Selecione ao menos uma imagem" };

  const { data: existentes } = await supabase
    .from("imagens_veiculos")
    .select("ordem")
    .eq("veiculo_id", veiculoId)
    .order("ordem", { ascending: false })
    .limit(1);

  let ordem = (existentes?.[0]?.ordem ?? -1) + 1;

  for (const arquivo of arquivos) {
    if (!(arquivo instanceof File) || arquivo.size === 0) continue;
    const extensao = arquivo.name.split(".").pop() || "jpg";
    const caminho = `${veiculoId}/${crypto.randomUUID()}.${extensao}`;

    const { error: erroUpload } = await supabase.storage
      .from("imagens-veiculos")
      .upload(caminho, arquivo, { upsert: false, contentType: arquivo.type });
    if (erroUpload) return { erro: erroUpload.message };

    const {
      data: { publicUrl },
    } = supabase.storage.from("imagens-veiculos").getPublicUrl(caminho);

    const { error: erroInsert } = await supabase
      .from("imagens_veiculos")
      .insert({ veiculo_id: veiculoId, url_imagem: publicUrl, ordem });
    if (erroInsert) return { erro: erroInsert.message };
    ordem += 1;
  }

  revalidatePath(`/veiculos/${veiculoId}`);
  revalidatePath("/painel/vendedor");
  return { erro: null };
}

export async function excluirImagemVeiculo(imagemId: string, veiculoId: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("imagens_veiculos").delete().eq("id", imagemId);
  if (error) return { erro: error.message };

  revalidatePath(`/veiculos/${veiculoId}`);
  revalidatePath("/painel/vendedor");
  return { erro: null };
}
