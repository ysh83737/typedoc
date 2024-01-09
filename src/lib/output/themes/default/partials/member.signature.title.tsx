import { getKindClass, join, renderTypeParametersSignature, wbr } from "../../lib";
import type { DefaultThemeRenderContext } from "../DefaultThemeRenderContext";
import { JSX } from "../../../../utils";
import { ParameterReflection, ReflectionKind, SignatureReflection } from "../../../../models";

function renderParameterWithType(context: DefaultThemeRenderContext, item: ParameterReflection) {
    return (
        <>
            {!!item.flags.isRest && <span class="tsd-signature-symbol">...</span>}
            <span class="tsd-kind-parameter">{item.name}</span>
            <span class="tsd-signature-symbol">
                {!!item.flags.isOptional && "?"}
                {!!item.defaultValue && "?"}
                {": "}
            </span>
            {context.type(item.type)}
        </>
    );
}

function renderParameterWithoutType(item: ParameterReflection) {
    return (
        <>
            {!!item.flags.isRest && <span class="tsd-signature-symbol">...</span>}
            <span class="tsd-kind-parameter">{item.name}</span>
            {(item.flags.isOptional || item.defaultValue) && <span class="tsd-signature-symbol">?</span>}
        </>
    );
}

export function memberSignatureTitle(
    context: DefaultThemeRenderContext,
    props: SignatureReflection,
    { hideName = false, arrowStyle = false }: { hideName?: boolean; arrowStyle?: boolean } = {},
) {
    const hideParamTypes = context.options.getValue("hideParameterTypesInTitle");
    const renderParam = hideParamTypes ? renderParameterWithoutType : renderParameterWithType.bind(null, context);

    return (
        <>
            {!hideName ? (
                <span class={getKindClass(props)}>{wbr(props.name)}</span>
            ) : (
                <>
                    {props.kind === ReflectionKind.ConstructorSignature && (
                        <>
                            {!!props.flags.isAbstract && <span class="tsd-signature-keyword">{ context.page.t('member.abstract') } </span>}
                            <span class="tsd-signature-keyword">{ context.page.t('member.new') } </span>
                        </>
                    )}
                </>
            )}
            {renderTypeParametersSignature(context, props.typeParameters)}
            <span class="tsd-signature-symbol">(</span>
            {join(", ", props.parameters ?? [], renderParam)}
            <span class="tsd-signature-symbol">)</span>
            {!!props.type && (
                <>
                    <span class="tsd-signature-symbol">{arrowStyle ? " => " : ": "}</span>
                    {context.type(props.type)}
                </>
            )}
        </>
    );
}
