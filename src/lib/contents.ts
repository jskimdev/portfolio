export const aboutIntro = {
	kicker: 'About',
	title: 'A short introduction to who you are, how you work, and what you are building.',
	summary:
		'Use this space for a concise personal introduction. It should give visitors enough context to understand your perspective before they dive into the full about page.',
	details: [
		'Replace this with a focused paragraph covering your background, current direction, and the kinds of digital experiences you want to create.',
		'You can keep the homepage version brief, then use the dedicated About page for a fuller story, process notes, and collaboration details.'
	]
};

export const projects = [
	{
		slug: 'portfolio-refresh',
		title: 'Portfolio Refresh',
		description:
			'A clean case-study layout for showcasing selected work, process snapshots, and measurable results.',
		stack: ['SvelteKit', 'Tailwind CSS', 'TypeScript'],
		selected: true
	},
	{
		slug: 'product-concept',
		title: 'Product Concept',
		description:
			'A landing experience for a new digital product with strong hierarchy, conversion-focused sections, and clear calls to action.',
		stack: ['SvelteKit', 'Tailwind CSS', 'Figma'],
		selected: true
	},
	{
		slug: 'brand-microsite',
		title: 'Brand Microsite',
		description:
			'A simple editorial web presence designed to present identity, services, and updates in one flow.',
		stack: ['SvelteKit', 'Tailwind CSS', 'MDsveX'],
		selected: true
	}
] as const;

export const blogPosts = [
	{
		title: 'Case study notes from a recent project',
		type: 'Project-related',
		description:
			'Use posts like this to expand on a specific project, explain decisions, and show process that does not fit on the main project page.',
		relatedProjects: ['Portfolio Refresh'],
		selected: true
	},
	{
		title: 'Designing with restraint',
		type: 'General',
		description:
			'This kind of article can capture broader thoughts on interface design, structure, or visual systems beyond one client engagement.',
		relatedProjects: [],
		selected: true
	},
	{
		title: 'What I learned while refining a landing page',
		type: 'Project-related',
		description:
			'A practical way to connect your writing back to portfolio work while still making the post useful on its own.',
		relatedProjects: ['Product Concept'],
		selected: true
	}
] as const;
