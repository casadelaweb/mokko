export interface elementData {
    details: HTMLDetailsElement,
    summary: HTMLElement,
    content: HTMLElement,
    parameters: {
        isOpen: boolean,
        isClosing: boolean,
        isOpening: boolean,
        animation?: any
    }
}

export interface selectors {
    details: string,
    summary: string,
    content: string,
    scrollbars: {
        vertical: string,
    }
}
