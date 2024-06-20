'use client';

import { useRef } from 'react';
import { createList } from '@/actions/actionContent';

export default function ListModal() {
	const ref = useRef<HTMLFormElement>(null);

	return (
		<dialog id='modalAddList' className='modal'>
			<div className='modal-box text-center max-w-[300px]'>
				<form
					ref={ref}
					action={async (formData) => {
						await createList(formData);
						ref.current?.reset();
					}}
					className='flex flex-col gap-y-2 w-full'
				>
					<textarea
						name='content'
						rows={5}
						placeholder='Content'
						className='textarea textarea-bordered px-2 py-1 rounded-sm'
					/>
					<button
						type='submit'
						className='bg-blue-500 py-2 text-white rounded-sm'
					>
						Create Content
					</button>
				</form>
			</div>
			<form method='dialog' className='modal-backdrop'>
				<button>close</button>
			</form>
		</dialog>
	);
}
