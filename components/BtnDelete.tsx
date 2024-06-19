'use client';

import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { deleteTodoList } from '@/actions/formActions';
import { IdProps } from '@/lib/definition';

export default function BtnDelete({ listId }: IdProps) {
	const handleDelete = async () => {
		try {
			await deleteTodoList(listId);
			console.log('todolist deleted successfully');
		} catch (err) {
			console.error('Error Delete list', err);
		}
	};

	return (
		<button
			onClick={handleDelete}
			className='p-2 rounded-md text-sm bg-red-400 text-white'
		>
			<FaTrash />
		</button>
	);
}
