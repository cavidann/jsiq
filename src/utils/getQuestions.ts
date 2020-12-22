import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

interface QuestionData {
  data: FrontMatter;
  content: string;
}

export type NextLink = string | undefined;
export type PrevLink = string | undefined;

export interface QuestionProps extends QuestionData {
  slug: string;
  nextLink: NextLink;
  prevLink: PrevLink;
  pagesMeta: PageMeta[];
}

export interface FrontMatter {
  id: string;
  title: string;
  slug: string;
  tags: string;
  editLink: string;
  original: string;
}

export type PageMeta = {
  id: string;
  title: string;
  href: string;
};

export type QuestionType = 'javascript' | 'react' | 'angular' | 'vue';

export function readFilesByType(type: QuestionType) {
  const directory = join(process.cwd(), `questions/theory/${type}`);
  return fs.readdirSync(directory);
}

export function getQuestionDataByFile(filename: string, type: QuestionType): QuestionData {
  const directory = join(process.cwd(), `questions/theory/${type}`);

  const realFileName = filename.replace(/\.md$/, '');
  const fullPath = join(directory, `${realFileName}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const { data, content } = matter(fileContents);
  return { data, content } as QuestionData;
}

export function getQuestionBySlug(slug: string): QuestionProps {
  const data = readFilesByType('javascript');

  const questionsData = data.map((filename) => getQuestionDataByFile(filename, 'javascript'));
  const question = questionsData.find((item) => item.data.slug === slug);

  const prevQuestion = questionsData.find((item) => +item.data.id === +question.data.id - 1);
  const nextQuestion = questionsData.find((item) => +item.data.id === +question.data.id + 1);

  const pagesMeta: PageMeta[] = questionsData.map(({ data }) => ({
    id: data.id,
    title: data.title,
    href: `/overview/${data.slug}`,
  }));

  return {
    ...question,
    slug,
    nextLink: nextQuestion?.data?.slug || null,
    prevLink: prevQuestion?.data?.slug || null,
    pagesMeta,
  };
}

export function getAllQuestionsMeta() {
  const data = readFilesByType('javascript');

  return data
    .map((filename) => {
      const { data } = getQuestionDataByFile(filename, 'javascript');
      return data;
    })
    .sort((a, b) => +a.id - +b.id);
}
