import React from 'react';
import prisma from '@/lib/db';
import BtnDelete from '@/components/BtnDelete';
import BtnUpdate from '@/components/BtnUpdate';
import BtnModal from '@/components/BtnModal';
import CreateModal from '@/components/CreateModal';
import UpdateModal from '@/components/UpdateModal';
import Link from 'next/link';

export default async function TodolistPage() {
	const todolistPost = await prisma.todolist.findMany();

	return (
		<section className='p-2'>
			<div className='text-right'>
				<BtnModal name='add new' />
			</div>

			<div className='p-10 flex flex-col lg:flex-row flex-wrap justify-center gap-6'>
				{todolistPost.map(async (list) => {
					const todolist = await prisma.todolist.findUnique({
						where: {
							slug: list.slug
						}
					});

					return (
						<div
							key={list.id}
							className='flex flex-col justify-between p-4 max-w-sm w-96 min-h-64 border border-gray-300 rounded-lg shadow-lg'
						>
							<div>
								<h1 className='font-semibold text-xl uppercase'>
									<Link href={`/list/${list.slug}`}>{list.title}</Link>
								</h1>
								<p>{list.content}</p>
							</div>

							<div className='max-w-sm text-right [&>*]:ml-2'>
								<BtnUpdate />
								<BtnDelete listId={list.id} />
							</div>

							<UpdateModal listId={todolist?.slug as string} />
						</div>
					);
				})}
			</div>

			<CreateModal />
		</section>
	);
}
