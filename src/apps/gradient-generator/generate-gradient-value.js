import Color from 'color';
import { useOklchConverter } from '@builtwithjavascript/oklch-converter';

function transformColor(value) {
  if (value.opacity === 100) {
    return value.color;
  }

  return `rgba(${Color(value.color)
    .rgb()
    .array()
    .concat(value.opacity / 100)
    .join(', ')})`;
}
function transformColorOklch(value) {
  const { hexToOklchString } = useOklchConverter();

  let oklchString = hexToOklchString(value.color)

  if (value.opacity === 100) {
    return oklchString;
  }
  oklchString = oklchString.slice(0, -1);
  return `${oklchString} / ${(value.opacity / 100)})`;
}

export function generateGradientColorValues(values) {
  return values.reduce(
    (acc, value, index) =>
      `${acc}${transformColor(value)} ${value.position}%${index !== values.length - 1 ? ', ' : ''}`,
    ''
  );
}

export function generateGradientColorValuesOklch(values) {
  return values.reduce(
    (acc, value, index) =>
      `${acc}${transformColorOklch(value)} ${value.position}%${index !== values.length - 1 ? ', ' : ''}`,
    ''
  );
}

export default function generateGradientValue({ values, angle, type }) {
  const colors = generateGradientColorValues(values);
  console.log(values);

  if (type === 'radial') {
    return `radial-gradient(circle, ${colors})`;
  }

  return `linear-gradient(${angle}deg, ${colors})`;
}

export function generateGradientValueOklch({ values, angle, type }) {
  const colors = generateGradientColorValuesOklch(values);

  if (type === 'radial') {
    return `radial-gradient(circle, ${colors})`;
  }

  return `linear-gradient(${angle}deg, ${colors})`;
}
