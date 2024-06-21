'use client';

import React from 'react';
import { FaEdit } from 'react-icons/fa';
export default function BtnUpdate() {
	const showModalList = () => {
		const modalList = document.getElementById('modalUpdate');
		if (modalList) return (modalList as HTMLDialogElement).showModal();
	};

	return (
		<button
			className='p-2 bg-green-400 text-white rounded-md text-sm'
			onClick={showModalList}
		>
			<FaEdit />
		</button>
	);
}
