export function stringify(obj: Record<string, unknown>): string {
    let result = "";

    for (const key of Object.keys(obj)) {
        const value = obj[key];

        if (typeof value === "object") {
            if (Array.isArray(value)) {
                result += `${key} = [${
                    value.map((v) => `,${v}`).join("").substring(1)
                }]\n`;
            } else {
                const stringified = stringify(value as Record<string, unknown>);
                result += `${key}.${
                    stringified.replaceAll("\n", `\n${key}.`)
                }\n`;
            }
        } else {
            result += `${key} = ${value}\n`;
        }
    }

    return result.trim();
}
