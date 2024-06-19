import prisma from '@/lib/db';

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

	return (
		<div className='min-h-screen flex flex-col items-center justify-center'>
			<h1>{todolist?.title}</h1>
			<h2>{todolist?.content}</h2>
		</div>
	);
}
