/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React from 'react';
import { useController, Control } from 'react-hook-form';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

type ControlledInputProps = {
  name: string;
  label: string;
  control?: Control<any>;
  rules?: { required: boolean; pattern?: RegExp; maxLength?: number };
  placeholder?: string;
  type?: string;
  desc?: string;
  className?: string;
  labelClassName?: string;
  minLength?: number;
  maxLength?: number;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'normal';
} & React.ComponentProps<typeof Input>;

const ControlledRangeSelector: React.FC<ControlledInputProps> = ({
  label,
  name,
  control,
  rules,
  placeholder = '',
  type = 'text',
  desc,
  labelClassName,
  maxLength = '0',
  minLength = '200',

  ...props
}) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  return (
    <div className="space-y-1">
      <Label
        htmlFor={name}
        className={`text-paragrah text-sm font-medium capitalize ${labelClassName} `}
      >
        {label}
      </Label>
      {desc && <p className="text-sm text-[#667185]">{desc}</p>}
      <div className="mt-2 flex items-center gap-5">
        <div className="flex-1">
          <input
            id={name}
            name={name}
            type={type}
            min={minLength}
            max={maxLength}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            ref={ref}
            className="slider h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
            {...props}
            style={{
              background: `linear-gradient(to right, #1129A0 0%, #1129A0 ${
                (Number(value) / Number(maxLength)) * 100
              }%, #e5e7eb ${
                (Number(value) / Number(maxLength)) * 100
              }%, #e5e7eb 100%)`,
            }}
          />
        </div>
        <span className="min-w-[60px] text-base font-semibold text-gray-900">
          {value}m
        </span>
      </div>

      {error && (
        <p className="mt-1 text-xs text-red-500 capitalize">{error.message}</p>
      )}

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #ffffff;
          cursor: pointer;
          border: 2px solid #1129a0;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #1129a0;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
};

export default ControlledRangeSelector;
