import type { DefaultThemeRenderContext } from "../DefaultThemeRenderContext";
import { JSX } from "../../../../utils";
import type { ReferenceReflection } from "../../../../models";

export const memberReference = ({ urlTo, page }: DefaultThemeRenderContext, props: ReferenceReflection) => {
    const referenced = props.tryGetTargetReflectionDeep();

    if (!referenced) {
        return <>{ page.t('member.re-export') } {props.name}</>;
    }

    if (props.name === referenced.name) {
        return (
            <>
                { page.t('member.re-export') } <a href={urlTo(referenced)}>{referenced.name}</a>
            </>
        );
    }

    return (
        <>
            { page.t('member.rename') } <a href={urlTo(referenced)}>{referenced.name}</a>
        </>
    );
};
