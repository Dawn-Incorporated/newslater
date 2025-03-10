export type ComponentType =
    | 'text'
    | 'image'
    | 'link'
    | 'video'
    | 'audio'
    | 'iframe'
    | 'header'
    | 'paragraph'
    | 'list'
    | 'blockquote'
    | 'em'
    | 'strong'
    | 'custom';

export interface ArticleComponent {
    type: ComponentType;
    tagName?: string;
    content?: string;
    attributes?: { [key: string]: string };
    children?: ArticleComponent[];
}

function getComponentType(tag: string): ComponentType {
    switch (tag) {
        case 'img':
            return 'image';
        case 'a':
            return 'link';
        case 'video':
            return 'video';
        case 'audio':
            return 'audio';
        case 'iframe':
            return 'iframe';
        case 'h1':
        case 'h2':
        case 'h3':
        case 'h4':
        case 'h5':
        case 'h6':
            return 'header';
        case 'p':
            return 'paragraph';
        case 'ul':
        case 'ol':
            return 'list';
        case 'blockquote':
            return 'blockquote';
        case 'em':
        case 'i':
            return 'em';
        case 'strong':
        case 'b':
            return 'strong';
        default:
            return 'custom';
    }
}

function extractAttributes(element: HTMLElement): { [key: string]: string } {
    const attrs: { [key: string]: string } = {};
    Array.from(element.attributes).forEach((attr) => {
        attrs[attr.name] = attr.value;
    });
    return attrs;
}

function parseElement(element: HTMLElement): ArticleComponent {
    const tag = element.tagName.toLowerCase();
    const compType = getComponentType(tag);
    const attributes = extractAttributes(element);
    let children: ArticleComponent[] = [];
    element.childNodes.forEach((child) => {
        children = children.concat(parseNode(child));
    });
    if (children.length > 0) {
        children = mergeAdjacentTextNodes(children);
    }
    const comp: ArticleComponent = {
        type: compType,
        tagName: tag,
        attributes,
        children: children.length > 0 ? children : undefined,
    };
    if (
        !comp.children &&
        (compType === 'paragraph' ||
            compType === 'header' ||
            compType === 'blockquote' ||
            compType === 'custom')
    ) {
        comp.content = element.textContent?.trim();
    }
    return comp;
}

function parseNode(node: Node): ArticleComponent[] {
    if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent;
        if (text && text.trim().length > 0) {
            return [{ type: 'text', content: text.replace(/\s+/g, ' ') }];
        }
        return [];
    }
    if (node.nodeType === Node.ELEMENT_NODE) {
        return [parseElement(node as HTMLElement)];
    }
    return [];
}

function mergeAdjacentTextNodes(components: ArticleComponent[]): ArticleComponent[] {
    const merged: ArticleComponent[] = [];
    components.forEach((comp) => {
        if (
            comp.type === 'text' &&
            merged.length > 0 &&
            merged[merged.length - 1].type === 'text'
        ) {
            merged[merged.length - 1].content = `${
                merged[merged.length - 1].content || ''
            } ${comp.content || ''}`;
        } else {
            if (comp.children) {
                comp.children = mergeAdjacentTextNodes(comp.children);
            }
            merged.push(comp);
        }
    });
    return merged;
}

export function parseArticleContent(htmlContent: string): ArticleComponent[] {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    let components: ArticleComponent[] = [];
    doc.body.childNodes.forEach((child) => {
        components = components.concat(parseNode(child));
    });
    components = mergeAdjacentTextNodes(components);
    return components;
}

export function parseRssItem(
    itemXml: Element
): { components: ArticleComponent[]; keyImage?: string } {
    let contentHtml = '';
    const contentEncoded = itemXml.getElementsByTagName('content:encoded');
    if (contentEncoded.length > 0) {
        contentHtml = contentEncoded[0].textContent || '';
    } else {
        const description = itemXml.getElementsByTagName('description');
        if (description.length > 0) {
            contentHtml = description[0].textContent || '';
        }
    }
    const components = parseArticleContent(contentHtml);
    const findFirstImage = (comps: ArticleComponent[]): string | undefined => {
        for (const comp of comps) {
            if (comp.type === 'image' && comp.attributes?.src) {
                return comp.attributes.src;
            }
            if (comp.children) {
                const found = findFirstImage(comp.children);
                if (found) {
                    return found;
                }
            }
        }
        return undefined;
    };
    const keyImage = findFirstImage(components);
    return { components, keyImage };
}
