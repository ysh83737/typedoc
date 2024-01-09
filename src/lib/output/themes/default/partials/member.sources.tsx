import type { DefaultThemeRenderContext } from "../DefaultThemeRenderContext";
import { JSX } from "../../../../utils";
import type { DeclarationReflection, SignatureReflection, SourceReference } from "../../../../models";

function sourceLink(context: DefaultThemeRenderContext, item: SourceReference) {
    if (!item.url) {
        return (
            <li>
                { context.page.t('member.defined') } {item.fileName}:{item.line}
            </li>
        );
    }

    if (context.options.getValue("sourceLinkExternal")) {
        return (
            <li>
                { context.page.t('member.defined') }
                <a href={item.url} class="external" target="_blank">
                    {item.fileName}:{item.line}
                </a>
            </li>
        );
    }

    return (
        <li>
            { context.page.t('member.defined') }
            <a href={item.url}>
                {item.fileName}:{item.line}
            </a>
        </li>
    );
}

export const memberSources = (
    context: DefaultThemeRenderContext,
    props: SignatureReflection | DeclarationReflection,
) => {
    const sources: JSX.Element[] = [];

    if (props.implementationOf) {
        sources.push(
            <p>
                { context.page.t('member.implementation') }
                {context.typeAndParent(props.implementationOf)}
            </p>,
        );
    }
    if (props.inheritedFrom) {
        sources.push(
            <p>
                { context.page.t('member.inherited') }
                {context.typeAndParent(props.inheritedFrom)}
            </p>,
        );
    }
    if (props.overwrites) {
        sources.push(
            <p>
                { context.page.t('member.overrides') }
                {context.typeAndParent(props.overwrites)}
            </p>,
        );
    }
    if (props.sources?.length) {
        sources.push(<ul>{props.sources.map((item) => sourceLink(context, item))}</ul>);
    }

    if (sources.length === 0) {
        return <></>;
    }

    return <aside class="tsd-sources">{sources}</aside>;
};
