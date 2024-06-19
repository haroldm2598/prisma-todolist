'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function createTodoList(formData: FormData) {
	await prisma.todolist.create({
		data: {
			title: formData.get('title') as string,
			slug: (formData.get('title') as string)
				.replace(/\s+/g, '-')
				.toLowerCase(),
			content: formData.get('content') as string
		}
	});

	revalidatePath('/list');
}

export async function deleteTodoList(id: string) {
	await prisma.todolist.delete({ where: { id } });
	revalidatePath('/list');
}
