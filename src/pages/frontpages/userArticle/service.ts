import request from '@/utils/request';
import { stringify } from 'qs';

// 获取文章列表
export function getArticleList(): Promise<Article[]> {
  return request('/api/article');
}

// 新增文章
export function postArticle(params: Article) {
  return request('/api/article', {
    method: 'POST',
    body: params,
    hasTip: true,
  });
}

// 获取文章详情
export function getArticle(params: { id: string }): Promise<Article> {
  return request(`/api/article?${stringify(params)}`);
}

// 修改文章内容
export function putArticleValue(params: Article, autoSave?: boolean) {
  return request('/api/article/value', {
    method: 'PUT',
    body: params,
    hasTip: true,
    tipText: autoSave ? '自动保存成功' : '',
  });
}

// 修改文章
export function putArticle(params: Article) {
  return request('/api/article', {
    method: 'PUT',
    body: params,
    hasTip: true,
  });
}

// 删除文章
export function deleteArticle(params: { id: string }) {
  return request(`/api/article?${stringify(params)}`, {
    method: 'DELETE',
    hasTip: true,
  });
}
