import prisma from '@/lib/db';
import BtnAdd from '@/components/button/BtnAdd';
import BtnUpdate from '@/components/button/BtnUpdate';
import ListModal from '@/components/modal/ListModal';
import DeleteContent from '@/components/button/DeleteContent';
import UpdateModal from '@/components/modal/UpdateModal';

interface ListPageModalProps {
	params: {
		slug: string;
	};
}
export default async function ListPageModal({ params }: ListPageModalProps) {
	const todolist = await prisma.todolist.findUnique({
		where: {
			slug: params.slug
		},
		include: {
			desc: true
		}
	});

	return (
		<>
			<section className='m-2 md:m-10 flex justify-center'>
				<div className='w-96 md:min-w-[32rem] p-4 min-h-96 border border-gray-300 rounded-lg flex flex-col justify-between'>
					<div className=''>
						<h1 className='mb-2 text-2xl font-semibold uppercase'>
							{todolist?.title}
						</h1>
						{todolist?.desc.map((item) => {
							return (
								<div
									key={item.id}
									className='p-1 [&>*]:mb-1.5 flex justify-between items-start'
								>
									<p className='max-w-96 text-sm leading-5'>{item.content}</p>

									<DeleteContent listId={item?.id as string} />
								</div>
							);
						})}
					</div>

					<div className='[&>*]:ml-2 text-right'>
						<BtnAdd />
						<BtnUpdate />
					</div>
				</div>
			</section>

			<UpdateModal listId={todolist?.id as string} />
			<ListModal listId={todolist?.id as string} />
		</>
	);
}
