'use server';

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';
import { cn } from '@/lib/cn';
import { PaginationProps } from '@/lib/definition';

export async function Pagination(props: PaginationProps) {
	const { page = 1, totalPages, hasNextPage } = props;

	const currentPage = Math.min(Math.max(Number(page), 1), totalPages);
	const getPagesToShow = () => {
		let startPage = currentPage - 2;
		let endPage = currentPage + 2;

		if (currentPage <= 3) {
			startPage = 1;
			endPage = totalPages;
		} else if (currentPage >= totalPages - 2) {
			startPage = totalPages - 4;
			endPage = totalPages;
		} else if (!hasNextPage) {
			startPage = 1;
			endPage = 1;
		}

		return Array.from(
			{ length: endPage - startPage + 1 },
			(_, i) => startPage + i
		);
	};

	const pages = getPagesToShow();

	return (
		<div className='flex items-center justify-center text-black mt-4 md:mt-0 md:space-x-6'>
			<Link
				className={cn(
					'rounded-md border border-gray-300 px-3 py-2 text-sm font-medium hover:bg-gray-50',
					currentPage === 1 ? 'pointer-events-none bg-gray-300' : 'bg-white'
				)}
				href={`?page=${currentPage - 1}`}
			>
				<FaArrowLeft />
			</Link>

			<nav
				aria-label='Pagination'
				className='relative z-0 inline-flex -space-x-px rounded-md'
			>
				{pages.map((page, i) => (
					<Link
						key={page}
						className={cn(
							'relative inline-flex items-center border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50',
							page === currentPage
								? 'pointer-events-none bg-gray-300'
								: 'bg-white',
							i === 0 ? 'rounded-l-md' : '',
							i === pages.length - 1 ? 'rounded-r-md' : ''
						)}
						href={`?page=${page}`}
					>
						{page}
					</Link>
				))}
			</nav>

			<Link
				className={cn(
					'rounded-md border border-gray-300 px-3 py-2 text-sm font-medium hover:bg-gray-50',
					!hasNextPage ? 'pointer-events-none bg-gray-300' : 'bg-white'
				)}
				href={`?page=${currentPage + 1}`}
			>
				<FaArrowRight />
			</Link>
		</div>
	);
}
