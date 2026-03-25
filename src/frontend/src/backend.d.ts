import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ArticleInput {
    title: string;
    content: string;
    author: string;
    excerpt: string;
    category: string;
}
export type Time = bigint;
export interface Project {
    title: string;
    featured: boolean;
    year: bigint;
    description: string;
    category: string;
}
export interface Article {
    id: bigint;
    title: string;
    content: string;
    date: Time;
    author: string;
    excerpt: string;
    category: string;
}
export interface backendInterface {
    addArticle(input: ArticleInput): Promise<bigint>;
    addProject(project: Project): Promise<bigint>;
    getAllArticles(): Promise<Array<Article>>;
    getAllProjects(): Promise<Array<Project>>;
    getArticleById(id: bigint): Promise<Article>;
    submitContactForm(name: string, email: string, message: string): Promise<void>;
}
