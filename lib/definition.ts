import { ReactNode } from 'react';

export interface PageProps {
	params: { [key: string]: string | string[] | undefined };
	searchParams?: { [key: string]: string | string[] | undefined };
}

export interface ChildrenProps {
	children: ReactNode;
}

export interface PaginationProps {
	page?: string;
	totalPages: number;
	hasNextPage: boolean;
}

export interface IdProps {
	listId: string;
}
