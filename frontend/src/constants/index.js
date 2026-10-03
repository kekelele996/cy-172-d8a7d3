export const CHAR_SETS = {
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    digits: '0123456789',
    symbols: '!@#$%^&*()-_=+[]{};:,.<>/?'
};

export const CHAR_SET_LABELS = {
    lowercase: '小写字母 (a-z)',
    uppercase: '大写字母 (A-Z)',
    digits: '数字 (0-9)',
    symbols: '特殊符号 (!@#$...)'
};

export const PASSWORD_LENGTH = {
    MIN: 4,
    MAX: 128,
    DEFAULT: 16
};

export const STRENGTH_LEVELS = [
    { key: 'veryWeak', label: '非常弱', minScore: 0, color: '#e74c3c', crackTime: '不到 1 秒' },
    { key: 'weak', label: '弱', minScore: 1, color: '#e67e22', crackTime: '数秒至数分钟' },
    { key: 'fair', label: '一般', minScore: 2, color: '#f1c40f', crackTime: '数小时至数天' },
    { key: 'strong', label: '强', minScore: 3, color: '#2ecc71', crackTime: '数月至数年' },
    { key: 'veryStrong', label: '非常强', minScore: 4, color: '#27ae60', crackTime: '数百年以上' }
];

export const HOME_ENTRIES = [
    { key: 'generator', title: '随机密码生成器', desc: '自定义长度与字符类型，一键生成并复制。', icon: '🔐' },
    { key: 'strength', title: '密码强度检测器', desc: '实时评估强度等级，预估破解时间。', icon: '🛡️' },
    { key: 'base64', title: 'Base64 编解码', desc: '文本与 Base64 互相转换。', icon: '📦' },
    { key: 'url', title: 'URL 编解码', desc: 'URL 的 encode / decode 转换。', icon: '🔗' }
];

export const COPY_FEEDBACK_MS = 1500;
