'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const CreateContentListSchema = z.object({
	content: z.string().min(1, { message: 'Content must not be empty' })
});

export async function createList(formData: FormData) {
	try {
		const { content } = CreateContentListSchema.parse({
			content: formData.get('content') as string
		});

		await prisma.contentList.create({
			data: {
				content
			}
		});

		// revalidatePath('/list');
	} catch (err) {
		console.error('Validation error', err);
	}
}

export async function editList(formData: FormData, id: string) {
	const { content } = CreateContentListSchema.parse({
		content: formData.get('content') as string
	});

	await prisma.contentList.update({
		where: { id },
		data: {
			content
		}
	});
	revalidatePath('/list/testing');
}

export async function deleteList(id: string) {
	await prisma.contentList.delete({ where: { id } });
	revalidatePath('/list');
}
