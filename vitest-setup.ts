import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest';

class MockIntersectionObserver {
    constructor(public callback: any, public options?: any) { }
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
}

globalThis.IntersectionObserver = MockIntersectionObserver as any;
