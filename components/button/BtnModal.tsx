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
			className='p-2 bg-blue-400 text-white rounded-md text-sm'
			onClick={showModalList}
		>
			{name}
		</button>
	);
}
