'use client';
import { FormEvent, useRef, useState } from 'react';
import { IdProps } from '@/lib/definition';
import { editTodoList } from '@/actions/todoAction';

export default function UpdateModal({ listId }: IdProps) {
	const ref = useRef<HTMLFormElement>(null);
	const [title, setTitle] = useState('');

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('title', title);
		await editTodoList(formData, listId);
	};

	return (
		<dialog id='modalUpdate' className='modal'>
			<div className='modal-box text-center max-w-[300px]'>
				<form
					ref={ref}
					onSubmit={async (formData) => {
						await handleSubmit(formData);
						ref.current?.reset();
					}}
					className='flex flex-col gap-y-2 w-full'
				>
					<input
						type='text'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className='input input-bordered px-2 py-1 rounded-sm'
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
