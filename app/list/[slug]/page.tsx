import prisma from '@/lib/db';
import BtnAdd from '@/components/BtnAdd';
import BtnUpdate from '@/components/BtnUpdate';
import ListModal from '@/components/ListModal';

interface ListPageModalProps {
	params: {
		slug: string;
	};
}
export default async function ListPageModal({ params }: ListPageModalProps) {
	const todolist = await prisma.todolist.findUnique({
		where: {
			slug: params.slug
		}
	});

	const contentList = await prisma.contentList.findMany();

	return (
		<>
			<section className='m-2 md:m-10 flex justify-center'>
				<div className='w-96 md:min-w-[32rem] p-4 min-h-96 border border-gray-300 rounded-lg flex flex-col justify-between'>
					<div>
						<h1 className='mb-2 text-xl font-semibold uppercase'>
							{todolist?.title}
						</h1>
						{contentList.map((item) => {
							return <p key={item.id}>{item.content}</p>;
						})}
					</div>

					<div className='[&>*]:ml-2 text-right'>
						<BtnAdd />
						<BtnUpdate />
					</div>
				</div>
			</section>

			<ListModal />
		</>
	);
}
