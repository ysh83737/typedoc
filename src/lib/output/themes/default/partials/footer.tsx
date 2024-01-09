import { JSX } from "../../../../utils";
import type { DefaultThemeRenderContext } from "../DefaultThemeRenderContext";

export function footer(context: DefaultThemeRenderContext) {
    const hideGenerator = context.options.getValue("hideGenerator");
    if (!hideGenerator)
        return (
            <div class="tsd-generator">
                <p>
                    { context.page.t('footer.generate') }
                    <a href="https://typedoc.org/" target="_blank">
                        TypeDoc
                    </a>
                    { context.page.t('footer.generate2') }
                </p>
            </div>
        );
}
