import { describe, it, expect } from 'vitest';
import { analyzePassword } from '../utils/passwordStrength.js';
import { STRENGTH_LEVELS } from '../constants/index.js';

describe('analyzePassword', () => {
  it('空密码返回最低等级', () => {
    const result = analyzePassword('');
    expect(result.level.key).toBe('veryWeak');
    expect(result.score).toBe(0);
  });

  it('短且单一的密码为弱等级', () => {
    const result = analyzePassword('aaaa');
    expect(result.score).toBeLessThanOrEqual(1);
  });

  it('长且复杂的密码为最高等级', () => {
    const result = analyzePassword('Abc!@#123XYZ_$%^&');
    expect(result.score).toBeGreaterThanOrEqual(3);
  });

  it('返回合法的等级对象', () => {
    const result = analyzePassword('Hello123!');
    const levelKeys = STRENGTH_LEVELS.map((l) => l.key);
    expect(levelKeys).toContain(result.level.key);
  });

  it('crackTimeText 为非空字符串', () => {
    const result = analyzePassword('Test123!');
    expect(typeof result.crackTimeText).toBe('string');
    expect(result.crackTimeText.length).toBeGreaterThan(0);
  });

  it('熵值与等级正相关', () => {
    const r1 = analyzePassword('12345');
    const r2 = analyzePassword('Abc!@#123XYZ_$%^&890QWE');
    expect(r2.entropy).toBeGreaterThan(r1.entropy);
    expect(r2.score).toBeGreaterThanOrEqual(r1.score);
  });
});
