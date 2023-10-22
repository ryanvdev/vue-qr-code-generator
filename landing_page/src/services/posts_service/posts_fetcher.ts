import __env from '@/utils/env';
import axios from 'axios';

const postsFetcher = axios.create({ baseURL: __env.HOST + '/posts' });

export { postsFetcher };
