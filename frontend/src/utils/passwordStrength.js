import { STRENGTH_LEVELS } from '../constants/index.js';
import { calculateEntropy, estimateCrackTimeSeconds, formatDuration } from './passwordEntropy.js';
import { scopedLogger } from './logger.js';

const log = scopedLogger('strengthAnalyzer');

function computeRawScore(password) {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (password.length >= 16) score += 1;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^a-zA-Z0-9]/.test(password)) score += 1;
    return Math.min(score, 4);
}

function adjustByEntropy(score, entropy) {
    if (entropy < 28) return Math.min(score, 0);
    if (entropy < 40) return Math.min(score, 1);
    if (entropy < 60) return Math.min(score, 2);
    if (entropy < 80) return Math.min(score, 3);
    return score;
}

function pickLevel(finalScore) {
    return STRENGTH_LEVELS.reduce((current, level) => (finalScore >= level.minScore ? level : current), STRENGTH_LEVELS[0]);
}

export function analyzePassword(password) {
    if (!password) {
        return {
            score: 0,
            entropy: 0,
            level: STRENGTH_LEVELS[0],
            crackSeconds: 0,
            crackTimeText: '—'
        };
    }

    const entropy = calculateEntropy(password);
    const raw = computeRawScore(password);
    const finalScore = adjustByEntropy(raw, entropy);
    const level = pickLevel(finalScore);
    const crackSeconds = estimateCrackTimeSeconds(entropy);
    const crackTimeText = formatDuration(crackSeconds);

    log.info('分析密码强度完成', { length: password.length, entropy: entropy.toFixed(2), level: level.key });

    return {
        score: finalScore,
        entropy,
        level,
        crackSeconds,
        crackTimeText
    };
}

export default analyzePassword;
