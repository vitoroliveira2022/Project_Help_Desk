
import { PrismaClient } from '@prisma/client';

// Prisma Client padrão, vai usar a DATABASE_URL do .env
export const prisma = new PrismaClient();