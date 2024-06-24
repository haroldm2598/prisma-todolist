'use server';

import Link from 'next/link';
import prisma from '@/lib/db';
import BtnDelete from '@/components/button/BtnDelete';
import BtnExpand from '@/components/button/BtnExpand';
import { revalidatePath } from 'next/cache';
import { PageProps } from '@/lib/definition';
import { Pagination } from './Pagination';

const PAGE_SIZE = 8;
async function fetchFeed({ take = PAGE_SIZE, skip = 0 }) {
	'use server';

	const results = await prisma.todolist.findMany({
		take,
		skip,
		orderBy: {
			title: 'desc'
		},
		include: {
			desc: true
		}
	});

	const total = await prisma.todolist.count();

	revalidatePath('/list');

	return {
		data: results,
		metadata: {
			hasNextPage: skip + take < total,
			totalPages: Math.ceil(total / take)
		}
	};
}

export default async function Feed(props: PageProps) {
	const pageNumber = Number(props?.searchParams?.page || 1);
	const take = PAGE_SIZE;
	const skip = (pageNumber - 1) * take;
	const { data, metadata } = await fetchFeed({ take, skip });

	return (
		<section className='flex flex-col items-center py-4'>
			<div className='p-10 flex flex-col md:flex-row flex-wrap justify-center gap-6 '>
				{data.length === 0 ? (
					<div className='dark:text-white'>Add new Todolist....</div>
				) : (
					data.map((list) => {
						return (
							<div
								key={list.id}
								className='flex flex-col justify-between p-4 max-w-sm w-96 min-h-64 dark:bg-slate-100 dark:text-slate-600 border border-gray-300 rounded-lg shadow-lg dark:shadow-gray-700'
							>
								<div>
									<h1 className='font-semibold text-xl uppercase'>
										{list.title}
									</h1>
									{list?.desc.length > 4
										? list?.desc.slice(0, 4).map((item) => {
												const truncateStr = item?.content;
												const maxLength = 80;

												return (
													<p key={item.id}>
														{truncateStr?.length > maxLength
															? `${truncateStr.substring(0, maxLength)} ...`
															: truncateStr}
													</p>
												);
										  })
										: list?.desc.map((item) => {
												const truncateStr = item?.content;
												const maxLength = 80;

												return (
													<p key={item.id}>
														{truncateStr?.length > maxLength
															? `${truncateStr.substring(0, maxLength)} ...`
															: truncateStr}
													</p>
												);
										  })}
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

			<Pagination {...props.searchParams} {...metadata} />
		</section>
	);
}

// export default async function Feed() {
// 	const todolistPost = await prisma.todolist.findMany({
// 		include: {
// 			desc: true
// 		}
// 	});

// 	return (
// 		<div className='p-10 flex flex-col md:flex-row flex-wrap justify-center gap-6 '>
// 			{todolistPost.length === 0 ? (
// 				<div>add new list... </div>
// 			) : (
// 				todolistPost.map((list) => {
// 					return (
// 						<div
// 							key={list.id}
// 							className='flex flex-col justify-between p-4 max-w-sm w-96 min-h-64 dark:bg-slate-100 dark:text-slate-600 border border-gray-300 rounded-lg shadow-lg dark:shadow-gray-700'
// 						>
// 							<div>
// 								<h1 className='font-semibold text-xl uppercase'>
// 									{list.title}
// 								</h1>
// 								{list?.desc.length > 4
// 									? list?.desc.slice(0, 4).map((item) => {
// 											const truncateStr = item?.content;
// 											const maxLength = 80;

// 											return (
// 												<p key={item.id}>
// 													{truncateStr?.length > maxLength
// 														? `${truncateStr.substring(0, maxLength)} ...`
// 														: truncateStr}
// 												</p>
// 											);
// 									  })
// 									: list?.desc.map((item) => {
// 											const truncateStr = item?.content;
// 											const maxLength = 80;

// 											return (
// 												<p key={item.id}>
// 													{truncateStr?.length > maxLength
// 														? `${truncateStr.substring(0, maxLength)} ...`
// 														: truncateStr}
// 												</p>
// 											);
// 									  })}
// 							</div>

// 							<div className='max-w-sm text-right [&>*]:ml-2'>
// 								<Link href={`/list/${list.slug}`}>
// 									<BtnExpand />
// 								</Link>

// 								<BtnDelete listId={list.id} />
// 							</div>
// 						</div>
// 					);
// 				})
// 			)}
// 		</div>
// 	);
// }
