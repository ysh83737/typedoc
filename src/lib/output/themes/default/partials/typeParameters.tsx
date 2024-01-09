import type { DefaultThemeRenderContext } from "../DefaultThemeRenderContext";
import type { TypeParameterReflection } from "../../../../models";
import { JSX } from "../../../../utils";

export function typeParameters(context: DefaultThemeRenderContext, typeParameters: TypeParameterReflection[]) {
    return (
        <>
            <section class="tsd-panel">
                <h4>{ context.page.t('type.parameters') }</h4>
                <ul class="tsd-type-parameter-list">
                    {typeParameters?.map((item) => (
                        <li>
                            <h4>
                                <a id={item.anchor} class="tsd-anchor"></a>
                                {item.flags.isConst && <span class="tsd-signature-keyword">const </span>}
                                {item.varianceModifier && (
                                    <span class="tsd-signature-keyword">{item.varianceModifier} </span>
                                )}
                                <span class="tsd-kind-type-parameter">{item.name}</span>
                                {!!item.type && (
                                    <>
                                        <span class="tsd-signature-keyword"> extends </span>
                                        {context.type(item.type)}
                                    </>
                                )}
                                {!!item.default && (
                                    <>
                                        {" = "}
                                        {context.type(item.default)}
                                    </>
                                )}
                            </h4>
                            {context.commentSummary(item)}
                            {context.commentTags(item)}
                        </li>
                    ))}
                </ul>
            </section>
        </>
    );
}
