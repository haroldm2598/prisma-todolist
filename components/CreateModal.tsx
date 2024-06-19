import { createTodoList } from '@/actions/formActions';
import React from 'react';

export default function CreateModal() {
	return (
		<dialog id='modalCreate' className='modal'>
			<div className='modal-box text-center'>
				<form
					action={createTodoList}
					className='flex flex-col gap-y-2 w-[300px]'
				>
					<input
						type='text'
						name='title'
						placeholder='Title'
						className='px-2 py-1 rounded-sm'
						required
					/>
					<textarea
						name='content'
						rows={5}
						placeholder='Content'
						className='px-2 py-1 rounded-sm'
						required
					/>
					<button
						type='submit'
						className='bg-blue-500 py-2 text-white rounded-sm'
					>
						Create Post
					</button>
				</form>
			</div>
			<form method='dialog' className='modal-backdrop'>
				<button>close</button>
			</form>
		</dialog>
	);
}
