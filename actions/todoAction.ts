'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const CreateTodoListSchema = z.object({
	title: z.string().min(1, { message: 'Title must not be empty' })
});

export async function createTodoList(formData: FormData) {
	try {
		const { title } = CreateTodoListSchema.parse({
			title: formData.get('title') as string
		});

		await prisma.todolist.create({
			data: {
				title,
				slug: (formData.get('title') as string)
					.replace(/\s+/g, '-')
					.toLowerCase()
			}
		});

		revalidatePath('/list');
	} catch (err) {
		console.error('Validation error', err);
	}
}

export async function editTodoList(formData: FormData, id: string) {
	const { title } = CreateTodoListSchema.parse({
		title: formData.get('title') as string
	});

	// kailangan updated yung slug na kukunin dine
	const updateTodolist = await prisma.todolist.findUnique({
		where: { id: id },
		include: {
			desc: true
		}
	});

	await prisma.todolist.update({
		where: { id },
		data: {
			title,
			slug: (formData.get('title') as string).replace(/\s+/g, '-').toLowerCase()
		}
	});
	revalidatePath(`/list/${updateTodolist?.slug}`);
}

export async function deleteTodoList(id: string) {
	await prisma.todolist.delete({ where: { id } });
	revalidatePath('/list');
}
