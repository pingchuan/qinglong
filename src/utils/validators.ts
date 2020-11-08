import { RuleObject, Rule } from 'rc-field-form/lib/interface';

// 校验表单字段必填
export const rulesReruired = () => {
  return { required: true, message: '该字段必填' };
};

// 校验表单的最大长度和最小长度的validator
export const validatorLength = (
  value: string,
  { min, max }: { min?: number; max?: number },
  callback?: () => Promise<void>,
): Promise<void> => {
  if (value && min && value.length < min) {
    return Promise.reject(`最少不低于${min}个字符`);
  }
  if (value && max && value.length > max) {
    return Promise.reject(`最多不超过${max}个字符`);
  }
  if (typeof callback === 'function') {
    return callback();
  }
  return Promise.resolve();
};

// 校验表单的最大长度和最小长度的rules
export const rulesLength = ({
  min,
  max,
  required,
}: {
  min?: number;
  max?: number;
  required?: boolean;
}): Rule[] | undefined => {
  const rules: Rule[] = [];
  if (required) {
    rules.push(rulesReruired());
  }
  if (typeof min === 'number' || typeof max === 'number') {
    rules.push({
      validator: (_: RuleObject, value: string | undefined) => {
        if (!value) {
          return Promise.resolve();
        }
        return validatorLength(value, { min, max });
      },
    });
  }
  return rules;
};
