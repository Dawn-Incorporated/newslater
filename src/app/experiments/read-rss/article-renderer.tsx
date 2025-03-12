"use client"

import React, { type CSSProperties, type JSX, useState } from "react"
import type { ArticleComponent } from "./rss-parser"

export interface PreviewOptions {
    maxParagraphs?: number
    maxWords?: number
    maxLines?: number
}

export interface ArticleRendererProps {
    components: ArticleComponent[]
    previewOptions?: PreviewOptions
}

const isInline = (comp: ArticleComponent): boolean => ["text", "link", "em", "strong"].includes(comp.type)

const ArticleRenderer: React.FC<ArticleRendererProps> = ({components = [], previewOptions}) => {
    const [expanded, setExpanded] = useState<boolean>(false)
    
    let renderComponents = components
    if (previewOptions && !expanded) {
        if (previewOptions.maxParagraphs) {
            renderComponents = truncateComponentsByParagraphs(renderComponents, previewOptions.maxParagraphs)
        }
        if (previewOptions.maxWords) {
            renderComponents = truncateComponentsByWords(renderComponents, previewOptions.maxWords)
        }
    }
    
    const containerStyle: CSSProperties = {
        wordWrap: "break-word",
        wordBreak: "break-word"
    }
    if (previewOptions?.maxLines && !expanded) {
        Object.assign(containerStyle, {
            display: "-webkit-box",
            WebkitLineClamp: previewOptions.maxLines,
            WebkitBoxOrient: "vertical",
            overflow: "hidden"
        })
    }
    
    const renderComponent = (comp: ArticleComponent, key: string): JSX.Element | JSX.Element[] | null => {
        const children = comp.children
            ? comp.children.map((child, index) => renderComponent(child, `${ key }-${ index }`))
            : null
        
        switch (comp.type) {
            case "text":
                return <span key={ key }>{ comp.content }</span>
            case "image":
                return (
                    <div key={ key } className="flex justify-center my-4">
                        <img
                            src={ comp.attributes?.src || "/placeholder.svg" }
                            alt={ comp.attributes?.alt || "image" }
                            className="max-w-[70%] mx-auto"
                        />
                    </div>
                )
            case "link":
                return (
                    <a
                        key={ key }
                        href={ comp.attributes?.href }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline"
                    >
                        { children || comp.content }
                    </a>
                )
            case "video":
                return (
                    <div key={ key } className="flex justify-center my-4">
                        <video controls src={ comp.attributes?.src } className="max-w-[70%] mx-auto">
                            { children }
                        </video>
                    </div>
                )
            case "audio":
                return (
                    <div key={ key } className="flex justify-center my-4">
                        <audio controls src={ comp.attributes?.src } className="w-full max-w-[70%]">
                            { children }
                        </audio>
                    </div>
                )
            case "iframe":
                return (
                    <div key={ key } className="flex justify-center my-4">
                        <iframe src={ comp.attributes?.src } title="embedded content" className="max-w-[70%] mx-auto"/>
                    </div>
                )
            case "header": {
                const HeaderTag = (comp.tagName as keyof JSX.IntrinsicElements) || "h3"
                return (
                    <HeaderTag key={ key } className="font-serif font-bold my-4">
                        { children || comp.content }
                    </HeaderTag>
                )
            }
            case "paragraph": {
                if (comp.children && comp.children.some((child) => !isInline(child))) {
                    return renderParagraph(comp, key)
                }
                return (
                    <p key={ key } className="my-3 leading-relaxed">
                        { children || comp.content }
                    </p>
                )
            }
            case "list": {
                const ListTag = comp.tagName === "ol" ? "ol" : "ul"
                return (
                    <ListTag key={ key } className="ml-6 my-4 list-disc">
                        { children }
                    </ListTag>
                )
            }
            case "blockquote":
                return (
                    <blockquote key={ key } className="border-l-4 border-gray-300 pl-4 italic my-4">
                        { children || comp.content }
                    </blockquote>
                )
            case "em":
                return <em key={ key }>{ children || comp.content }</em>
            case "strong":
                return <strong key={ key }>{ children || comp.content }</strong>
            case "custom":
            default:
                return <div key={ key }>{ children || comp.content }</div>
        }
    }
    
    const renderParagraph = (comp: ArticleComponent, key: string): JSX.Element => {
        const inlineBuffer: (JSX.Element | string)[] = []
        const results: JSX.Element[] = []
        comp.children?.forEach((child, index) => {
            const renderedChild = renderComponent(child, `${ key }-${ index }`)
            if (isInline(child)) {
                if (Array.isArray(renderedChild)) {
                    inlineBuffer.push(...renderedChild)
                } else {
                    if (renderedChild) {
                        inlineBuffer.push(renderedChild)
                    }
                }
            } else {
                if (inlineBuffer.length > 0) {
                    results.push(
                        <p key={ `${ key }-inline` } className="my-3 leading-relaxed">
                            { inlineBuffer }
                        </p>
                    )
                    inlineBuffer.length = 0
                }
                if (Array.isArray(renderedChild)) {
                    results.push(...renderedChild)
                } else {
                    if (renderedChild) {
                        results.push(renderedChild)
                    }
                }
            }
        })
        if (inlineBuffer.length > 0) {
            results.push(
                <p key={ `${ key }-inline-end` } className="my-3 leading-relaxed">
                    { inlineBuffer }
                </p>
            )
        }
        return <React.Fragment key={ key }>{ results }</React.Fragment>
    }
    
    return (
        <div className="article-container mx-auto px-4 font-serif" style={ containerStyle }>
            { Array.isArray(renderComponents) ? (
                renderComponents.map((comp, idx) => renderComponent(comp, `comp-${ idx }`))
            ) : (
                <p>No content to display</p>
            ) }
            { previewOptions && !expanded && renderComponents && renderComponents.length > 0 && (
                <div
                    onClick={ () => setExpanded(true) }
                    role="button"
                    tabIndex={ 0 }
                    onKeyPress={ () => setExpanded(true) }
                    className="cursor-pointer mt-4 text-primary font-sans font-medium"
                >
                    Read More
                </div>
            ) }
        </div>
    )
}

function truncateComponentsByParagraphs(components: ArticleComponent[], maxParagraphs: number): ArticleComponent[] {
    if (!Array.isArray(components)) return []
    
    let paragraphCount = 0
    const truncated: ArticleComponent[] = []
    for (const comp of components) {
        if (comp.type === "paragraph") {
            paragraphCount++
            if (paragraphCount > maxParagraphs) {
                break
            }
        }
        truncated.push(comp)
    }
    return truncated
}

function truncateComponentsByWords(components: ArticleComponent[], maxWords: number): ArticleComponent[] {
    if (!Array.isArray(components)) return []
    
    let remaining = maxWords
    const process = (comps: ArticleComponent[]): ArticleComponent[] => {
        const newComps: ArticleComponent[] = []
        for (const comp of comps) {
            if (remaining <= 0) {
                break
            }
            if (comp.type === "text" && comp.content) {
                const words = comp.content.split(" ")
                if (words.length > remaining) {
                    const newContent = words.slice(0, remaining).join(" ")
                    remaining = 0
                    newComps.push({...comp, content: newContent})
                } else {
                    remaining -= words.length
                    newComps.push(comp)
                }
            } else if (comp.children) {
                const newChildren = process(comp.children)
                newComps.push({...comp, children: newChildren})
            } else {
                newComps.push(comp)
            }
        }
        return newComps
    }
    return process(components)
}

export default ArticleRenderer

