'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

// Schema for todolist with zod
const CreateTodoListSchema = z.object({
	title: z.string().min(1, { message: 'Title must not be empty' }),
	content: z.string().min(1, { message: 'Content must not be empty' })
});

export async function createTodoList(formData: FormData) {
	try {
		const { title, content } = CreateTodoListSchema.parse({
			title: formData.get('title') as string,
			content: formData.get('content') as string
		});

		await prisma.todolist.create({
			data: {
				title,
				slug: (formData.get('title') as string)
					.replace(/\s+/g, '-')
					.toLowerCase(),
				content
			}
		});

		revalidatePath('/list');
	} catch (err) {
		console.error('Validation error', err);
	}
}

export async function editTodoList(formData: FormData, id: string) {
	const { title, content } = CreateTodoListSchema.parse({
		title: formData.get('title') as string,
		content: formData.get('content') as string
	});

	await prisma.todolist.update({
		where: { id },
		data: {
			title,
			slug: (formData.get('title') as string)
				.replace(/\s+/g, '-')
				.toLowerCase(),
			content
		}
	});
	revalidatePath('/list');
}

export async function deleteTodoList(id: string) {
	await prisma.todolist.delete({ where: { id } });
	revalidatePath('/list');
}
