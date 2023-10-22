import { postsFetcher } from './posts_fetcher';
import { marked } from 'marked';

export const fetchPost = async (name: string) => {
    const res = await postsFetcher.get(`/${name}.md`);
    const data = marked.parse(res.data);
    return data;
};
