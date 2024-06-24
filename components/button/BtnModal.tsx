'use client';
import React from 'react';

interface BtnModalProps {
	name: string;
}

export default function BtnModal({ name }: BtnModalProps) {
	const showModalList = () => {
		const modalList = document.getElementById('modalCreate');
		if (modalList) return (modalList as HTMLDialogElement).showModal();
	};

	return (
		<button
			className='p-2 bg-slate-600 text-white dark:bg-slate-100 dark:text-slate-600 rounded-md text-sm'
			onClick={showModalList}
		>
			{name}
		</button>
	);
}
