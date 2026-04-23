-- DropForeignKey
ALTER TABLE "Solucao" DROP CONSTRAINT "Solucao_chamadoId_fkey";

-- AddForeignKey
ALTER TABLE "Solucao" ADD CONSTRAINT "Solucao_chamadoId_fkey" FOREIGN KEY ("chamadoId") REFERENCES "Chamado"("id") ON DELETE CASCADE ON UPDATE CASCADE;
