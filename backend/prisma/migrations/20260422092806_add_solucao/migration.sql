-- CreateTable
CREATE TABLE "Solucao" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "chamadoId" INTEGER NOT NULL,
    "tecnicoId" INTEGER NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Solucao_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Solucao" ADD CONSTRAINT "Solucao_chamadoId_fkey" FOREIGN KEY ("chamadoId") REFERENCES "Chamado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Solucao" ADD CONSTRAINT "Solucao_tecnicoId_fkey" FOREIGN KEY ("tecnicoId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
