export type Window = browser.windows.Window;

// FIXME: wrapping this in a function so browser.windows.* won't be evaluated and build time
export const get = (id: number): Promise<Window> => browser.windows.get(id);
