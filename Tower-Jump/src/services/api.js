// API 基础配置
// 规则：
// - 优先使用 VITE_API_BASE_URL（开发/生产都一致）
// - 否则使用同源相对路径（让部署环境自行决定 API 域名/反代）
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '')

if (typeof window !== 'undefined') {
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  console.log(`[API配置] 当前环境: ${isLocalhost ? '本地开发' : '生产环境'}`)
  console.log(`[API配置] API_BASE_URL: ${API_BASE_URL || '(same-origin)'}`)
  console.log(`[API配置] 当前域名: ${window.location.hostname}`)
}



// 通用请求函数
async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`
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
  updateRatings: (pageId, ratings, token) => {
    // 确保使用字符串键
    const ratingsWithStringKeys = {
      '1': ratings['1'] || ratings[1] || 0,
      '2': ratings['2'] || ratings[2] || 0,
      '3': ratings['3'] || ratings[3] || 0,
      '4': ratings['4'] || ratings[4] || 0,
      '5': ratings['5'] || ratings[5] || 0,
    };
    return request(`/admin/ratings/${pageId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ratingsWithStringKeys),
    });
  },
};

// 健康检查
export const healthCheck = () => request('/health');
