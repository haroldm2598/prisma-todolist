'use client';

import { ThemeProvider } from 'next-themes';
import { ChildrenProps } from '@/lib/definition';

export function Provider({ children }: ChildrenProps) {
	return (
		<ThemeProvider attribute='class' defaultTheme='system' enableSystem>
			{children}
		</ThemeProvider>
	);
}
