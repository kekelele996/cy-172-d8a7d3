import { describe, it, expect } from 'vitest';
import { generatePassword } from '../utils/passwordGenerator.js';
import { PASSWORD_LENGTH } from '../constants/index.js';

describe('generatePassword', () => {
  it('生成指定长度的密码', () => {
    const pwd = generatePassword({ length: 20, charTypes: ['lowercase', 'uppercase', 'digits'] });
    expect(pwd).toHaveLength(20);
  });

  it('默认长度为 PASSWORD_LENGTH.DEFAULT', () => {
    const pwd = generatePassword();
    expect(pwd).toHaveLength(PASSWORD_LENGTH.DEFAULT);
  });

  it('只包含所选字符类型', () => {
    const pwd = generatePassword({ length: 32, charTypes: ['lowercase'] });
    expect(pwd).toMatch(/^[a-z]+$/);
  });

  it('包含数字和字母时能正常生成', () => {
    const pwd = generatePassword({ length: 32, charTypes: ['lowercase', 'digits'] });
    expect(pwd).toMatch(/^[a-z0-9]+$/);
  });

  it('长度无效时抛出 ToolboxError', () => {
    expect(() => generatePassword({ length: 0 })).toThrow();
    expect(() => generatePassword({ length: 9999 })).toThrow();
    expect(() => generatePassword({ length: PASSWORD_LENGTH.MIN - 1 })).toThrow();
    expect(() => generatePassword({ length: PASSWORD_LENGTH.MAX + 1 })).toThrow();
  });

  it('字符类型为空时抛出 ToolboxError', () => {
    expect(() => generatePassword({ length: 16, charTypes: [] })).toThrow();
  });

  it('不重复字符时各长度均能生成', () => {
    for (let len = PASSWORD_LENGTH.MIN; len <= PASSWORD_LENGTH.MAX; len += 30) {
      const pwd = generatePassword({ length: len });
      expect(pwd).toHaveLength(len);
    }
  });
});
