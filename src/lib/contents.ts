import brandMicrosite1 from '$lib/assets/projects/brand-microsite-1.svg';
import brandMicrosite2 from '$lib/assets/projects/brand-microsite-2.svg';
import brandMicrosite3 from '$lib/assets/projects/brand-microsite-3.svg';
import portfolioRefresh1 from '$lib/assets/projects/portfolio-refresh-1.svg';
import portfolioRefresh2 from '$lib/assets/projects/portfolio-refresh-2.svg';
import portfolioRefresh3 from '$lib/assets/projects/portfolio-refresh-3.svg';
import productConcept1 from '$lib/assets/projects/product-concept-1.svg';
import productConcept2 from '$lib/assets/projects/product-concept-2.svg';
import productConcept3 from '$lib/assets/projects/product-concept-3.svg';

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

export type ProjectImage = {
	src: string;
	alt: string;
	label: string;
	caption: string;
	width: number;
	height: number;
};

export type ProjectRoadmapItem = {
	majorVersion: string;
	version: string;
	title: string;
	description: string;
};

export type Project = {
	slug: string;
	title: string;
	description: string;
	stack: string[];
	selected: boolean;
	kicker: string;
	hero: string;
	overview: string;
	challenge: string;
	approach: string;
	outcome: string;
	images: ProjectImage[];
	roadmap: ProjectRoadmapItem[];
};

export const projects: Project[] = [
	{
		slug: 'portfolio-refresh',
		title: 'Portfolio Refresh',
		description:
			'A clean case-study layout for showcasing selected work, process snapshots, and measurable results.',
		stack: ['SvelteKit', 'Tailwind CSS', 'TypeScript'],
		selected: true,
		kicker: 'Portfolio system',
		hero: 'A portfolio structure that moves from introduction to featured work without losing visual rhythm.',
		overview:
			'This concept rethinks a personal site as a lightweight case-study platform. The goal is to make selected work easy to scan at a glance while still supporting deeper project pages for context and outcomes.',
		challenge:
			'The main challenge was balancing clarity and personality. The layout needed to feel editorial and calm, but still leave room for project metadata, navigation, and future writing.',
		approach:
			'I focused on a modular page structure, clear typography, and reusable design tokens so the homepage, projects index, and project detail pages all feel connected without becoming repetitive.',
		outcome:
			'The result is a portfolio foundation that can scale as more work is added. Each project now has a dedicated route, making the site easier to navigate and much better suited to case-study storytelling.',
		images: [
			{
				src: portfolioRefresh1,
				alt: 'Desktop layout for the Portfolio Refresh homepage case study.',
				label: 'Homepage system',
				caption:
					'A wide composition showing the homepage rhythm, type scale, and featured-work structure.',
				width: 1600,
				height: 1000
			},
			{
				src: portfolioRefresh2,
				alt: 'Portrait layout for the Portfolio Refresh project detail page.',
				label: 'Case-study page',
				caption:
					'A taller layout meant for process notes, longer storytelling, and stacked content modules.',
				width: 1080,
				height: 1350
			},
			{
				src: portfolioRefresh3,
				alt: 'Wide supporting visual for the Portfolio Refresh content sections.',
				label: 'Supporting sections',
				caption:
					'A landscape frame for secondary sections that sit between the intro and outcomes.',
				width: 1400,
				height: 820
			}
		],
		roadmap: [
			{
				majorVersion: '1',
				version: '1.0.0',
				title: 'Foundation',
				description:
					'Established the overall site structure, shared layout system, and visual direction for the portfolio.'
			},
			{
				majorVersion: '1',
				version: '1.1.0',
				title: 'Project detail flow',
				description:
					'Introduced dedicated project pages so each piece of work could expand into a fuller case study.'
			},
			{
				majorVersion: '2',
				version: '2.0.0',
				title: 'Content-ready scaling',
				description:
					'Prepared the system for future additions like more projects, writing, and admin-driven content updates.'
			}
		]
	},
	{
		slug: 'product-concept',
		title: 'Product Concept',
		description:
			'A landing experience for a new digital product with strong hierarchy, conversion-focused sections, and clear calls to action.',
		stack: ['SvelteKit', 'Tailwind CSS', 'Figma'],
		selected: true,
		kicker: 'Landing experience',
		hero: 'A focused product page concept built to explain value quickly and guide visitors toward one primary action.',
		overview:
			'This project explores how a digital product could be introduced through a sharp landing page with crisp hierarchy, concise messaging, and supporting visual sections.',
		challenge:
			'The core problem was deciding how much information to show above the fold versus further down the page. Too much detail slows the first read; too little weakens credibility.',
		approach:
			'I organized the page into a sequence of value proposition, product proof, and action-oriented sections. Typography and spacing carry most of the hierarchy so the interface stays simple.',
		outcome:
			'The concept gives the product a clearer narrative from headline to call to action. It is flexible enough to support future additions like testimonials, pricing, or FAQ content.',
		images: [
			{
				src: productConcept1,
				alt: 'Primary desktop hero for the Product Concept landing page.',
				label: 'Landing page hero',
				caption:
					'The main desktop view focuses on hierarchy, value messaging, and one dominant action.',
				width: 1600,
				height: 1000
			},
			{
				src: productConcept2,
				alt: 'Tall mobile-first composition for the Product Concept page.',
				label: 'Mobile narrative',
				caption:
					'A vertical sequence that tests how the product story reads when content stacks tightly.',
				width: 1200,
				height: 1500
			},
			{
				src: productConcept3,
				alt: 'Supporting visual for the Product Concept feature modules.',
				label: 'Feature breakdown',
				caption:
					'A wider frame for product proof, supporting features, and lower-page conversion sections.',
				width: 1440,
				height: 900
			}
		],
		roadmap: [
			{
				majorVersion: '1',
				version: '1.0.0',
				title: 'Positioning and headline',
				description:
					'Defined the initial value proposition and top-of-page hierarchy to clarify what the product offers.'
			},
			{
				majorVersion: '1',
				version: '1.2.0',
				title: 'Proof and feature sections',
				description:
					'Added structured product proof, feature breakdowns, and supporting sections to build trust.'
			},
			{
				majorVersion: '2',
				version: '2.0.0',
				title: 'Conversion path refinement',
				description:
					'Refined the CTA flow so the page leads visitors from understanding to action with less friction.'
			}
		]
	},
	{
		slug: 'brand-microsite',
		title: 'Brand Microsite',
		description:
			'A simple editorial web presence designed to present identity, services, and updates in one flow.',
		stack: ['SvelteKit', 'Tailwind CSS', 'MDsveX'],
		selected: true,
		kicker: 'Editorial presence',
		hero: 'A small, expressive site for presenting a brand voice, a service offering, and ongoing updates in one place.',
		overview:
			'This microsite concept is designed for a studio or individual who needs an online presence that feels intentional without becoming heavy or overbuilt.',
		challenge:
			'The design needed to present multiple kinds of information, identity, offerings, and updates, while preserving a single cohesive reading flow.',
		approach:
			'I treated the site like a compact editorial system: strong section pacing, restrained color usage, and a content model that can support both static pages and lightweight publishing.',
		outcome:
			'The final direction creates a more memorable brand surface than a generic brochure site while staying easy to maintain as content grows.',
		images: [
			{
				src: brandMicrosite1,
				alt: 'Primary desktop composition for the Brand Microsite homepage.',
				label: 'Brand homepage',
				caption: 'The main visual introduces the brand voice, section pacing, and editorial tone.',
				width: 1600,
				height: 1000
			},
			{
				src: brandMicrosite2,
				alt: 'Portrait editorial layout for the Brand Microsite.',
				label: 'Editorial mobile flow',
				caption:
					'A taller format that shows how service, identity, and updates can live in one scroll.',
				width: 1100,
				height: 1400
			},
			{
				src: brandMicrosite3,
				alt: 'Wide supporting image for the Brand Microsite content modules.',
				label: 'Content modules',
				caption:
					'A landscape frame for service modules, update blocks, and secondary editorial sections.',
				width: 1440,
				height: 840
			}
		],
		roadmap: [
			{
				majorVersion: '1',
				version: '1.0.0',
				title: 'Brand voice setup',
				description:
					'Set the tone, type direction, and editorial framing so the site feels distinct from a generic brochure.'
			},
			{
				majorVersion: '1',
				version: '1.1.0',
				title: 'Service and update structure',
				description:
					'Built the content sequence to hold offerings, identity, and updates within one connected experience.'
			},
			{
				majorVersion: '2',
				version: '2.0.0',
				title: 'Lightweight publishing path',
				description:
					'Prepared the microsite to support ongoing updates without making the system heavy to maintain.'
			}
		]
	}
];

export function getProjectBySlug(slug: string) {
	return projects.find((project) => project.slug === slug);
}

export type BlogPostType = 'Project-related' | 'General';

export type BlogParagraphBlock = {
	type: 'paragraph';
	content: string;
};

export type BlogImageBlock = {
	type: 'image';
	src: string;
	alt: string;
	caption: string;
	width: number;
	height: number;
};

export type BlogContentBlock = BlogParagraphBlock | BlogImageBlock;

export type BlogPost = {
	slug: string;
	title: string;
	type: BlogPostType;
	description: string;
	content: BlogContentBlock[];
	relatedProjects: string[];
	selected: boolean;
	publishedOn: string;
	readTime: string;
};

export const blogPosts: BlogPost[] = [
	{
		slug: 'case-study-notes-from-a-recent-project',
		title: 'Case study notes from a recent project',
		type: 'Project-related',
		description:
			'Use posts like this to expand on a specific project, explain decisions, and show process that does not fit on the main project page.',
		content: [
			{
				type: 'paragraph',
				content:
					'This post can open with a short framing paragraph that explains the project context, the decision being documented, and why the detail matters beyond the main case study page.'
			},
			{
				type: 'image',
				src: portfolioRefresh2,
				alt: 'A tall case-study layout used to support writing about the Portfolio Refresh project.',
				caption: 'A supporting visual placed between sections of the article.',
				width: 1080,
				height: 1350
			},
			{
				type: 'paragraph',
				content:
					'After the image, the post can continue with process notes, tradeoffs, and what changed after testing or iteration. This keeps the writing flow editorial instead of forcing all images to the top or bottom.'
			}
		],
		relatedProjects: ['Portfolio Refresh'],
		selected: true,
		publishedOn: 'April 12, 2026',
		readTime: '6 min read'
	},
	{
		slug: 'designing-with-restraint',
		title: 'Designing with restraint',
		type: 'General',
		description:
			'This kind of article can capture broader thoughts on interface design, structure, or visual systems beyond one client engagement.',
		content: [
			{
				type: 'paragraph',
				content:
					'Some posts may stay text-heavy and never use inline imagery. The content model still supports that cleanly by allowing paragraphs only.'
			},
			{
				type: 'paragraph',
				content:
					'That flexibility matters because not every article needs a visual break, while others may benefit from one or two supporting frames placed exactly where they help the narrative.'
			}
		],
		relatedProjects: [],
		selected: true,
		publishedOn: 'March 29, 2026',
		readTime: '4 min read'
	},
	{
		slug: 'what-i-learned-while-refining-a-landing-page',
		title: 'What I learned while refining a landing page',
		type: 'Project-related',
		description:
			'A practical way to connect your writing back to portfolio work while still making the post useful on its own.',
		content: [
			{
				type: 'paragraph',
				content:
					'This article could walk through one refinement at a time, using each section to explain what changed in the landing page and what insight came from the adjustment.'
			},
			{
				type: 'image',
				src: productConcept1,
				alt: 'Desktop landing page concept used as a supporting image inside a blog article.',
				caption: 'An inline screenshot that sits between two explanatory paragraphs.',
				width: 1600,
				height: 1000
			},
			{
				type: 'paragraph',
				content:
					'With the image placed mid-article, the post can point to a specific section of the page and then move back into analysis without breaking the reading rhythm.'
			}
		],
		relatedProjects: ['Product Concept'],
		selected: true,
		publishedOn: 'February 18, 2026',
		readTime: '5 min read'
	}
];

export function getBlogPostBySlug(slug: string) {
	return blogPosts.find((post) => post.slug === slug);
}
