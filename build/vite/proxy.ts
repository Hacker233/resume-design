import { ProxyOptions } from 'vite';

/**
 * Generate proxy
 * @param list
 */
export function createProxy(): Record<string, string | ProxyOptions> {
  return {
    '/api': {
      target: 'your https address',
      changeOrigin: true,
      rewrite: (path: string) => path.replace(/^\/api/, '')
    }
  };
}
