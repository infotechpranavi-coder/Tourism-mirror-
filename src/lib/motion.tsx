"use client";

import React from 'react';

type AnyProps = Record<string, unknown> & {
  children?: React.ReactNode;
};

const animationPropNames = new Set([
  'animate',
  'exit',
  'initial',
  'layout',
  'transition',
  'variants',
  'viewport',
  'whileHover',
  'whileInView',
  'whileTap',
  'custom',
]);

function stripMotionProps(props: AnyProps) {
  const nextProps: AnyProps = {};

  Object.entries(props).forEach(([key, value]) => {
    if (!animationPropNames.has(key)) {
      nextProps[key] = value;
    }
  });

  return nextProps;
}

const motion = new Proxy(
  {},
  {
    get(_target, tagName: string) {
      const Component = React.forwardRef<HTMLElement, AnyProps>((props, ref) => {
        const cleanProps = stripMotionProps(props);
        return React.createElement(tagName, { ...cleanProps, ref }, props.children as React.ReactNode);
      });

      Component.displayName = `MotionShim(${tagName})`;
      return Component;
    },
  }
) as Record<string, React.ComponentType<any>>;

function AnimatePresence({ children }: { children: React.ReactNode; [key: string]: unknown }) {
  return <>{children}</>;
}

export { AnimatePresence, motion };
