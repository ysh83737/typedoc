import fs from 'node:fs';
import path from 'node:path';
import i18next from "i18next";
import type { Renderer } from '.';

/**
 * Initialize i18n. Load translation resources
 * @param context renderer ins
 * @returns t function
 */
export function loadI18n(context: Renderer) {
    const { lang, locales } = context

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    i18next.init({
        lng: lang,
        resources: {
            [lang]: { translation: {} },
        },
    });

    // Load preset i18n resource
    const getPresetJsonPath = () => require.resolve(`@typedoc/locales/${lang}`);
    addI18nResource(getPresetJsonPath);

    // Load plugins i18n resource
    const plugins = context.application.options.getValue('plugin')
    plugins.forEach((item) => {
        // e.g. typedoc-plugin-xxx/dist/entry.js
        const pluginEntry = require.resolve(item);
        // e.g. typedoc-plugin-xxx/dist/locales/en.json
        const getPluginJsonPath = () => path.resolve(pluginEntry, '..', `locales/${lang}.json`);
        addI18nResource(getPluginJsonPath);
    })

    // Load user i18n resource
    const getUserJsonPath = () => path.resolve(process.cwd(), locales, `${lang}.json`);
    addI18nResource(getUserJsonPath);

    return i18next.t;

    /**
     * Add i18n resource bundle
     * @param getJsonPath
     */
    function addI18nResource(getJsonPath: () => string) {
        const resource = loadResource(getJsonPath);
        // merge and overrid previous resource
        i18next.addResourceBundle(lang, 'translation', resource, true, true);
    }

    /**
     * Load i18n resource
     * @param getJsonPath
     * @returns i18n resource
     */
    function loadResource(getJsonPath: () => string): Record<string, any> {
        try {
            const path2LangJson = getJsonPath();
            const jsonText = fs.readFileSync(path2LangJson, { encoding: 'utf-8' });
            return JSON.parse(jsonText);
        } catch (error) {
            context.application.logger.warn(`Fail to load resource. ${(error as Error)?.message || error}`);
            return {};
        }
    }
}
