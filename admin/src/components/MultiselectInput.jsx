import React, { useMemo } from 'react';
import {
  Box,
  Field,
  Flex,
  Typography,
} from '@strapi/design-system';

const parseOptions = (rawOptions) => {
  if (!rawOptions) {
    return [];
  }

  return rawOptions
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const parts = line.split('|').map((item) => item.trim());

      return {
        value: parts[0] || '',
        label: parts[1] || parts[0] || '',
        tab: parts[2] || 'Общее',
      };
    })
    .filter((item) => item.value);
};

const MultiselectInput = ({
  name,
  value,
  onChange,
  attribute,
  intlLabel,
  description,
  error,
  required,
  disabled,
}) => {
  const delimiter = attribute?.options?.delimiter || ',';

  const options = useMemo(() => {
    return parseOptions(attribute?.options?.options);
  }, [attribute?.options?.options]);

  const selectedValues = useMemo(() => {
    if (!value) {
      return [];
    }

    return String(value)
      .split(delimiter)
      .map((item) => item.trim())
      .filter(Boolean);
  }, [value, delimiter]);

  const tabs = useMemo(() => {
    return Array.from(new Set(options.map((item) => item.tab)));
  }, [options]);

  const toggleValue = (optionValue) => {
    if (disabled) {
      return;
    }

    let nextValues;

    if (selectedValues.includes(optionValue)) {
      nextValues = selectedValues.filter((item) => item !== optionValue);
    } else {
      nextValues = [...selectedValues, optionValue];
    }

    onChange({
      target: {
        name,
        value: nextValues.join(delimiter),
        type: 'string',
      },
    });
  };

  return (
    <Field.Root name={name} error={error} required={required}>
      <Field.Label>
        {intlLabel?.defaultMessage || 'Multiselect tags'}
      </Field.Label>

      {description?.defaultMessage ? (
        <Field.Hint>{description.defaultMessage}</Field.Hint>
      ) : null}

      <Box
        marginTop={2}
        padding={4}
        hasRadius
        borderColor="neutral200"
        background="neutral0"
      >
        {tabs.length === 0 ? (
          <Typography textColor="neutral600">
            Добавь options в настройках поля.
          </Typography>
        ) : null}

        {tabs.map((tab) => {
          const tabOptions = options.filter((item) => item.tab === tab);

          return (
            <Box key={tab} marginBottom={4}>
              <Box marginBottom={2}>
                <Typography variant="delta" fontWeight="bold">
                  {tab}
                </Typography>
              </Box>

              <Flex gap={2} wrap="wrap">
                {tabOptions.map((option) => {
                  const active = selectedValues.includes(option.value);

                  return (
                    <button
                      key={option.value}
                      type="button"
                      disabled={disabled}
                      onClick={() => toggleValue(option.value)}
                      style={{
                        border: active
                          ? '1px solid #4945ff'
                          : '1px solid #dcdce4',
                        background: active ? '#f0f0ff' : '#ffffff',
                        color: active ? '#271fe0' : '#32324d',
                        padding: '6px 12px',
                        borderRadius: '999px',
                        cursor: disabled ? 'not-allowed' : 'pointer',
                        fontSize: '13px',
                        lineHeight: '18px',
                      }}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </Flex>
            </Box>
          );
        })}
      </Box>

      {selectedValues.length > 0 ? (
        <Box marginTop={2}>
          <Typography variant="pi" textColor="neutral600">
            Сохранится в базе как: {selectedValues.join(delimiter)}
          </Typography>
        </Box>
      ) : null}

      <Field.Error />
    </Field.Root>
  );
};

export default MultiselectInput;