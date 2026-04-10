export type Project = {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string | null;
  liveUrl?: string | null;
  imageUrl?: string | null;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Post = {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string | null;
  published: boolean;
  publishedAt?: string | null;
  createdAt: string;
  updatedAt: string;
};
