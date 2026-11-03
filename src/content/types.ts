export interface Project {
    id: string;
    slug: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    technologies: string[];
    category: string[];
    date: string;
    image: string;
    gallery: string[];
    highlights: string[];
    metrics: {
        value: string;
        label: string;
    }[];
    githubUrl?: string;
    liveUrl?: string;
    featured: boolean;
    published: boolean;
    displayOrder: number;
    problem?: string;
    solution?: string;
    architecture?: string;
    challenges?: string;
}
export interface Experience {
    id: string;
    company: string;
    role: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
    achievements: string[];
    technologies: string[];
    published: boolean;
    displayOrder: number;
}
