'use client';

import { FaTrash } from 'react-icons/fa';
import { deleteList } from '@/actions/contentAction';
import { IdProps } from '@/lib/definition';

export default function DeleteContent({ listId }: IdProps) {
	const handleDelete = async () => {
		try {
			await deleteList(listId);
			console.log('todolist deleted successfully');
		} catch (err) {
			console.error('Error Delete list', err);
		}
	};

	return (
		<button
			className='p-1 md:p-2 bg-red-500 text-white rounded-md text-xs'
			onClick={handleDelete}
		>
			<FaTrash />
		</button>
	);
}
