interface StringifyOptions {
    /**
     * The assignment string. Defaults to " : ".
     */
    assignment?: string;
    /**
     * Whether to add a newline after each key-value pair. Defaults to false.
     */
    space?: boolean;
}

/**
 * Stringifies an object into a properties string.
 *
 * @param obj - The object to stringify
 * @param opts - Options for stringifying the object
 * @returns A valid properties string representing the object
 */
export function stringify(
    obj: Record<string, unknown>,
    opts?: StringifyOptions,
): string {
    const { assignment = " = ", space = false } = opts || {};

    let result = "";

    for (let key of Object.keys(obj)) {
        const value = obj[key];
        key = key.replaceAll(".", "\\.");

        if (typeof value === "object") {
            if (Array.isArray(value)) {
                result += `${key}${assignment}[${
                    value.map((v) => `,${v}`).join("").substring(1)
                }]\n`;
            } else {
                const stringified = stringify(value as Record<string, unknown>);
                result += `${key}.${
                    stringified.replaceAll("\n", `\n${key}.`)
                }\n`;
            }
        } else {
            result += `${key}${assignment}${value}\n`;
        }

        if (space) {
            result += "\n";
        }
    }

    return result.trim();
}
