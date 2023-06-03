import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import type { ComponentType, SvelteComponentTyped } from "svelte";
import { flexRender as flexRenderOrig } from "@tanstack/svelte-table";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const flexRender = <P extends Record<string, any>, C = any>(
	component: C,
	props: P
): ComponentType<SvelteComponentTyped> =>
	flexRenderOrig(component, props) as ComponentType<SvelteComponentTyped>;