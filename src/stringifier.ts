interface StringifyOptions {
    assignment?: string;
    space?: boolean;
}

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
