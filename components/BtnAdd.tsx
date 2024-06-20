'use client';

import { FaPlus } from 'react-icons/fa';

export default function BtnAdd() {
	const showModalList = () => {
		const modalList = document.getElementById('modalAddList');
		if (modalList) return (modalList as HTMLDialogElement).showModal();
	};

	return (
		<button
			onClick={showModalList}
			className='p-2 rounded-md text-sm bg-blue-400 text-white'
		>
			<FaPlus />
		</button>
	);
}
