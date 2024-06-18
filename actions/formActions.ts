'use server';

import prisma from '@/lib/db';

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
}
