// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			isAdmin: boolean;
		}
		interface PageData {
			isAdmin: boolean;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
