import { describe, it, expect } from 'vitest';
import { ToolboxError, isToolboxError, safeExecute, toUserMessage } from '../utils/errors.js';
import { ERROR_MESSAGES } from '../constants/errors.js';

describe('errors', () => {
  it('ToolboxError 有 name  name 属性和 code', () => {
    const err = new ToolboxError('INVALID_LENGTH', { min: 4, max: 128 });
    expect(err).toBeInstanceOf(Error);
    expect(err.name).toBe('ToolboxError');
    expect(err.code).toBe('INVALID_LENGTH');
    expect(err.message).toContain('4');
    expect(err.message).toContain('128');
  });

  it('isToolboxError 正确识别', () => {
    const err = new ToolboxError('EMPTY_INPUT');
    expect(isToolboxError(err)).toBe(true);
    expect(isToolboxError(new Error('普通错误'))).toBe(false);
  });

  it('safeExecute 捕获异常并返回 fallback', () => {
    const result = safeExecute(() => {
      throw new ToolboxError('EMPTY_INPUT');
    }, 'fallback-value');
    expect(result).toBe('fallback-value');
  });

  it('safeExecute 正常返回', () => {
    const result = safeExecute(() => 42);
    expect(result).toBe(42);
  });

  it('toUserMessage 返回可读文案', () => {
    const msg = toUserMessage(new ToolboxError('EMPTY_INPUT'));
    expect(msg).toBe(ERROR_MESSAGES.EMPTY_INPUT);
  });

  it('toUserMessage 对未知错误返回通用文案', () => {
    const msg = toUserMessage(new Error('未知'));
    expect(msg).toBe(ERROR_MESSAGES.UNEXPECTED);
  });
});
