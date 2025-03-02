// import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// export async function DELETE(
//   {params}: {params: {id: string}}
// ) {
//   try {

//     await prisma.entry.delete({
//       where: { id: params.id }
//     });
//     return NextResponse.json({ message: 'Entry deleted successfully' }, { status: 200 });
//   } catch (error) {
//     console.error('Erreur dans la fonction DELETE:', error);
//     return NextResponse.json(
//       { 
//         error: 'Une erreur est survenue lors de la suppression de l\'entrée',
//       },
//       { status: 500 }
//     );
//   } finally {
//     await prisma.$disconnect();
//   }
// }


import { NextResponse } from 'next/server';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    if (!id) {
      alert("Tsy hitany lty le id ")
      return NextResponse.json({ error: 'ID manquant' }, { status: 400 });
    }

    const deletedEntry = await prisma.entry.delete({
      where: { id }
    });

    if (!deletedEntry) {
      alert("Ilay entrée ndray no tsy hitany")
      return NextResponse.json({ error: 'Entrée non trouvée' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Entrée supprimée avec succès' }, { status: 200 });
  } catch (error) {
    console.error('Erreur dans la fonction DELETE:', error);
    
    if (error instanceof Error && error.message.includes('Record to delete does not exist')) {
      return NextResponse.json({ error: 'Entrée non trouvée' }, { status: 404 });
    }
    
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la suppression de l\'entrée' },
      { status: 500 }
    );
  }
}