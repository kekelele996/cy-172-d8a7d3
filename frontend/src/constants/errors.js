export const ERROR_MESSAGES = {
    INVALID_LENGTH: '密码长度无效，长度需介于 {min} 与 {max} 之间。',
    NO_CHAR_SET_SELECTED: '至少需要选择一种字符类型。',
    GENERIC_GENERATION: '生成密码失败，请重试。',
    EMPTY_INPUT: '输入内容不能为空。',
    BASE64_ENCODE_FAILED: 'Base64 编码失败，请稍后重试。',
    BASE64_DECODE_FAILED: 'Base64 解码失败，请检查输入是否为合法的 Base64 字符串。',
    URL_ENCODE_FAILED: 'URL 编码失败，请稍后重试。',
    URL_DECODE_FAILED: 'URL 解码失败，请检查输入是否为合法的编码字符串。',
    COPY_FAILED: '复制到剪贴板失败，请手动复制。',
    CLIPBOARD_UNSUPPORTED: '当前浏览器不支持自动复制。',
    UNEXPECTED: '发生未预期的错误，请稍后再试。'
};

export function formatMessage(template, params = {}) {
    return template.replace(/\{(\w+)\}/g, (_, key) => (params[key] !== undefined ? params[key] : `{${key}}`));
}
