'use server';
import Feed from '@/components/Feed';
import ThemeSwitch from '@/components/ThemeSwitch';
import BtnModal from '@/components/button/BtnModal';
import CreateModal from '@/components/modal/CreateModal';
import { PageProps } from '@/lib/definition';

export default async function TodolistPage(props: PageProps) {
	return (
		<section className='p-2 dark:bg-main100 dark:text-white min-h-screen'>
			<div className='space-x-4 flex justify-end items-center'>
				<ThemeSwitch />

				<div>
					<BtnModal name='add new' />
				</div>
			</div>

			<Feed {...props} />

			<CreateModal />
		</section>
	);
}
