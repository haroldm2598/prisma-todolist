import ModalCreate from '@/components/ModalCreate';
import prisma from '@/lib/db';
import React from 'react';

export default async function TodolistPage() {
	const todolistPost = await prisma.todolist.findMany();

	// use a typescript for button should i change the prisma into server side actions folder then insert inside client component
	// const showModalList = () => {
	// 	const modalList = document.getElementById('modalCreate');
	// 	if (modalList) return (modalList as HTMLDialogElement).showModal();
	// };

	return (
		<section className='p-2'>
			<button
				className='p-2 bg-blue-400 text-white rounded-md text-sm'
				// onClick={showModalList}
			>
				add new list
			</button>

			<div className='p-10 flex flex-col lg:flex-row flex-wrap justify-center gap-6'>
				{todolistPost.map((list) => {
					return (
						<div
							key={list.id}
							className='p-4 max-w-sm w-96 min-h-64 border border-gray-300 rounded-lg shadow-lg'
						>
							<h1 className='font-semibold text-xl uppercase'>{list.title}</h1>
							<p>{list.content}</p>
						</div>
					);
				})}
			</div>

			<ModalCreate />
		</section>
	);
}
