import prisma from '@/lib/db';
import BtnDelete from '@/components/BtnDelete';
import BtnExpand from '@/components/BtnExpand';
import BtnModal from '@/components/BtnModal';
import CreateModal from '@/components/CreateModal';
import Link from 'next/link';

export default async function TodolistPage() {
	const todolistPost = await prisma.todolist.findMany({
		include: {
			desc: true
		}
	});

	console.log(todolistPost);

	return (
		<section className='p-2'>
			<div className='text-right'>
				<BtnModal name='add new' />
			</div>

			<div className='p-10 flex flex-col lg:flex-row flex-wrap justify-center gap-6'>
				{todolistPost.length === 0 ? (
					<div>add new list... </div>
				) : (
					todolistPost.map((list) => {
						return (
							<div
								key={list.id}
								className='flex flex-col justify-between p-4 max-w-sm w-96 min-h-64 border border-gray-300 rounded-lg shadow-lg'
							>
								<div>
									<h1 className='font-semibold text-xl uppercase'>
										{list.title}
									</h1>
									{list.desc?.map((item) => (
										<p key={item.id}>{item.content}</p>
									))}
								</div>

								<div className='max-w-sm text-right [&>*]:ml-2'>
									<Link href={`/list/${list.slug}`}>
										<BtnExpand />
									</Link>

									<BtnDelete listId={list.id} />
								</div>
							</div>
						);
					})
				)}
			</div>

			<CreateModal />
		</section>
	);
}
