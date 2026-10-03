import { describe, it, expect } from 'vitest';
import { encodeBase64, decodeBase64 } from '../utils/base64.js';

describe('base64', () => {
  it('编码 ASCII 文本后解码能还原', () => {
    const original = 'hello world';
    expect(decodeBase64(encodeBase64(original))).toBe(original);
  });

  it('编码中文后解码能还原', () => {
    const original = '你好，世界！密码工具箱。';
    expect(decodeBase64(encodeBase64(original))).toBe(original);
  });

  it('空字符串抛出异常', () => {
    expect(() => encodeBase64('')).toThrow();
    expect(() => decodeBase64('')).toThrow();
  });

  it('无效的 Base64 字符串解码抛出异常', () => {
    expect(() => decodeBase64('!!!not@@base64%%%')).toThrow();
  });

  it('编码结果符合 Base64 字符集', () => {
    const encoded = encodeBase64('test');
    expect(encoded).toMatch(/^[A-Za-z0-9+/=]+$/);
  });
});
