import { describe, it, expect } from 'vitest';
import { encodeURL, decodeURL } from '../utils/urlcodec.js';

describe('urlcodec', () => {
  it('编码特殊字符后解码能还原', () => {
    const original = 'a=1&b=hello world';
    expect(decodeURL(encodeURL(original))).toBe(original);
  });

  it('编码中文后解码能还原', () => {
    const original = 'keyword=你好世界';
    expect(decodeURL(encodeURL(original))).toBe(original);
  });

  it('空字符串抛出异常', () => {
    expect(() => encodeURL('')).toThrow();
    expect(() => decodeURL('')).toThrow();
  });

  it('无效的 URL 编码字符串解码抛出异常', () => {
    expect(() => decodeURL('%E4%B8%E4%B8')).toThrow();
  });

  it('编码结果中不含空格', () => {
    const encoded = encodeURL('hello world');
    expect(encoded).not.toContain(' ');
  });
});
