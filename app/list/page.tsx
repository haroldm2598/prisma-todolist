import React from 'react';
import prisma from '@/lib/db';
import BtnDelete from '@/components/BtnDelete';
import BtnModal from '@/components/BtnModal';
import CreateModal from '@/components/CreateModal';

export default async function TodolistPage() {
	const todolistPost = await prisma.todolist.findMany();

	return (
		<section className='p-2'>
			<div className='text-right'>
				<BtnModal name='add new' />
			</div>

			<div className='p-10 flex flex-col lg:flex-row flex-wrap justify-center gap-6'>
				{todolistPost.map((list) => {
					return (
						<div
							key={list.id}
							className='flex flex-col justify-between p-4 max-w-sm w-96 min-h-64 border border-gray-300 rounded-lg shadow-lg'
						>
							<div>
								<h1 className='font-semibold text-xl uppercase'>
									{list.title}
								</h1>
								<p>{list.content}</p>
							</div>

							<div className='max-w-sm text-right'>
								<BtnDelete listId={list.id} />
							</div>
						</div>
					);
				})}
			</div>

			<CreateModal />
		</section>
	);
}
