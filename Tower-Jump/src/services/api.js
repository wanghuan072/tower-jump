// API 基础配置
// 自动检测环境：如果是localhost则使用本地API，否则使用生产API
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

// 本地开发时强制使用本地API，生产环境使用环境变量或默认地址
let API_BASE_URL;
if (isLocalhost) {
  // 本地开发环境 - 强制使用本地API
  API_BASE_URL = 'http://localhost:3000';
} else if (import.meta.env.VITE_API_BASE_URL) {
  // 生产环境 - 使用环境变量
  API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
} else {
  // 生产环境 - 使用默认地址
  API_BASE_URL = 'https://tower-jump-api.vercel.app';
}

console.log(`[API配置] 当前环境: ${isLocalhost ? '本地开发' : '生产环境'}`);
console.log(`[API配置] API地址: ${API_BASE_URL}`);
console.log(`[API配置] 当前域名: ${window.location.hostname}`);
console.log(`[API配置] VITE_API_BASE_URL: ${import.meta.env.VITE_API_BASE_URL}`);



// 通用请求函数
async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  console.log(`[API请求] ${config.method || 'GET'} ${url}`);

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[API错误] ${response.status} ${response.statusText}:`, errorText);
      throw new Error(`请求失败: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`[API响应] ${url}:`, data);
    return data;
  } catch (error) {
    console.error('API请求错误:', error);
    console.error('请求URL:', url);
    console.error('请求配置:', config);
    throw error;
  }
}

// 评论相关API
export const commentAPI = {
  // 获取评论
  getComments: (pageId) => request(`/comments?pageId=${pageId}`),
  
  // 提交评论
  submitComment: (commentData) => request('/comments', {
    method: 'POST',
    body: JSON.stringify(commentData),
  }),
};

// 评分相关API
export const ratingAPI = {
  // 获取评分统计
  getRatings: (pageId) => request(`/ratings?pageId=${pageId}`),
  
  // 提交评分
  submitRating: (ratingData) => request('/ratings', {
    method: 'POST',
    body: JSON.stringify(ratingData),
  }),
};

// 管理员API
export const adminAPI = {
  // 管理员登录
  login: (credentials) => request('/admin/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),
  
  // 获取所有反馈数据
  getAllGameData: (token) => request('/admin/feedback', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  }),
  
  // 删除反馈
  deleteFeedback: (pageId, feedbackId, token) => request(`/admin/feedback/${pageId}/${feedbackId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  }),
  
  // 手动添加反馈
  addManualFeedback: (feedbackData, token) => request('/admin/feedback/manual', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(feedbackData),
  }),
  
  // 更新反馈
  updateFeedback: (pageId, feedbackId, feedbackData, token) => request(`/admin/feedback/${pageId}/${feedbackId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(feedbackData),
  }),
  
  // 更新评分
  updateRatings: (pageId, ratings, token) => request(`/admin/ratings/${pageId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(ratings),
  }),
};

// 健康检查
export const healthCheck = () => request('/health');
