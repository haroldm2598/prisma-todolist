'use client';
import { FormEvent, useState } from 'react';
import { IdProps } from '@/lib/definition';
import { editTodoList } from '@/actions/formActions';

// transfer this code into [slug] page.tsx
// add a parameter called "params"
// add a prisma.list.findUnique

export default function UpdateModal({ listId }: IdProps) {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('title', title);
		formData.append('content', content);
		await editTodoList(formData, listId);
	};

	return (
		<dialog id='modalUpdate' className='modal'>
			<div className='modal-box text-center max-w-[300px]'>
				<form onSubmit={handleSubmit} className='flex flex-col gap-y-2 w-full'>
					<input
						type='text'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className='input input-bordered px-2 py-1 rounded-sm'
					/>

					<textarea
						value={content}
						onChange={(e) => setContent(e.target.value)}
						className='textarea textarea-bordered px-2 py-1 rounded-sm'
					/>

					<button
						type='submit'
						className='bg-blue-500 py-2 text-white rounded-sm'
					>
						Update Post
					</button>
				</form>
			</div>
			<form method='dialog' className='modal-backdrop'>
				<button>close</button>
			</form>
		</dialog>
	);
}
