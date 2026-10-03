import { CHAR_SETS } from '../constants/index.js';

export function detectCharsetSize(password) {
    if (!password) return 0;
    let size = 0;
    if (/[a-z]/.test(password)) size += CHAR_SETS.lowercase.length;
    if (/[A-Z]/.test(password)) size += CHAR_SETS.uppercase.length;
    if (/[0-9]/.test(password)) size += CHAR_SETS.digits.length;
    if (/[^a-zA-Z0-9]/.test(password)) size += CHAR_SETS.symbols.length;
    return Math.max(size, 10);
}

export function calculateEntropy(password) {
    if (!password) return 0;
    const charsetSize = detectCharsetSize(password);
    return password.length * Math.log2(charsetSize);
}

export function estimateCrackTimeSeconds(entropy, guessesPerSecond = 1e10) {
    if (!Number.isFinite(entropy) || entropy <= 0) return 0;
    const combinations = Math.pow(2, entropy);
    return combinations / 2 / guessesPerSecond;
}

export function formatDuration(seconds) {
    if (!Number.isFinite(seconds) || seconds <= 0) return '不到 1 秒';
    if (seconds < 1) return '不到 1 秒';
    if (seconds < 60) return `${seconds.toFixed(0)} 秒`;
    const minutes = seconds / 60;
    if (minutes < 60) return `${minutes.toFixed(0)} 分钟`;
    const hours = minutes / 60;
    if (hours < 24) return `${hours.toFixed(0)} 小时`;
    const days = hours / 24;
    if (days < 365) return `${days.toFixed(0)} 天`;
    const years = days / 365;
    if (years < 1000) return `${years.toFixed(0)} 年`;
    if (years < 1e6) return `${(years / 1000).toFixed(1)} 千年`;
    if (years < 1e9) return `${(years / 1e6).toFixed(1)} 百万年`;
    return `${(years / 1e9).toFixed(1)} 十亿年以上`;
}
