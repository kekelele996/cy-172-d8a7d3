import { describe, it, expect } from 'vitest';
import { CHAR_SETS } from '../constants/index.js';
import { calculateEntropy, detectCharsetSize, estimateCrackTimeSeconds, formatDuration } from '../utils/passwordEntropy.js';

describe('passwordEntropy', () => {
  it('detectCharsetSize 对空字符串返回最小字符集', () => {
    expect(detectCharsetSize('')).toBe(0);
  });

  it('detectCharsetSize 对只含小写字母的字符串返回小写字母数量', () => {
    const size = detectCharsetSize('abcdef');
    expect(size).toBe(CHAR_SETS.lowercase.length);
  });

  it('detectCharsetSize 对混合字符累加数量', () => {
    const size = detectCharsetSize('Abc123!');
    expect(size).toBe(
      CHAR_SETS.lowercase.length +
      CHAR_SETS.uppercase.length +
      CHAR_SETS.digits.length +
      CHAR_SETS.symbols.length
    );
  });

  it('calculateEntropy 对空字符串返回 0', () => {
    expect(calculateEntropy('')).toBe(0);
  });

  it('calculateEntropy 对相同长度不同字符集的熵值不同', () => {
    const e1 = calculateEntropy('abcdef');
    const e2 = calculateEntropy('AbC123!');
    expect(e2).toBeGreaterThan(e1);
  });

  it('estimateCrackTimeSeconds 与熵值成正比', () => {
    const t1 = estimateCrackTimeSeconds(40);
    const t2 = estimateCrackTimeSeconds(80);
    expect(t2).toBeGreaterThan(t1 * 1000);
  });

  it('formatDuration 输出可读时间', () => {
    expect(formatDuration(0)).toContain('不到');
    expect(formatDuration(30)).toContain('秒');
    expect(formatDuration(3600)).toContain('小时');
    expect(formatDuration(3600 * 24 * 400)).toContain('年');
  });
});
