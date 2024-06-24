import Link from 'next/link';

export default function Home() {
	return (
		<main className='min-h-screen flex flex-col items-center justify-center gap-4 dark:bg-slate-600 dark:text-white '>
			<h1 className='font-semibold text-xl'>Todolist using prisma and zod</h1>
			<Link href='/list' className='hover:underline'>
				View TodoList
			</Link>
		</main>
	);
}
