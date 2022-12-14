/**
 * Parses a properties string into an object.
 *
 * @remarks
 * A type parameter can be used to specify the type of the object.
 * No type checking is performed, so you must ensure that the object is of the correct type.
 *
 * @param input - The properties string to parse
 * @returns A parsed object according to the type parameter
 */
export function parse<T = Record<string, unknown>>(input: string): T {
    const obj: { [key: string]: unknown } = {};
    const lines = input.split("\n");

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        if (
            line.trimStart().startsWith("!") || line.trimStart().startsWith("#")
        ) {
            continue;
        }

        if (line.trimEnd().endsWith("\\")) {
            let end = i + 1;

            while (lines[end].trimEnd().endsWith("\\")) {
                end++;
            }

            const key = line.includes("=")
                ? line.split("=")[0]
                : line.split(":")[0];

            const value = lines.slice(i, end + 1).map((v) => v.trimStart())
                .join(
                    "",
                ).substring(key.length + 1).replaceAll("\\", "");

            set(
                obj,
                key,
                value,
            );
            i = end - 1;
        } else if (line.includes("=")) {
            const [key, value] = line.split("=");
            set(obj, key, value);
        } else if (line.includes(":")) {
            const [key, value] = line.split(":");
            set(obj, key, value);
        }
    }

    return obj as unknown as T;
}

function set(obj: Record<string, unknown>, key: string, value: string) {
    key = key.trim();
    value = value.trimStart().replaceAll("\\\\", "\\");

    if (key.includes(".") && !key.includes("\\.")) {
        const keys = key.split(".");

        if (keys.length > 1) {
            const first = keys.shift();
            const rest = keys.join(".");

            if (obj[first!] === undefined) {
                obj[first!] = {};
            }

            set(obj[first!] as Record<string, unknown>, rest, value);
        }
    } else {
        if (value.startsWith("[") && value.endsWith("]")) {
            obj[key.replaceAll("\\.", ".")] = value.substring(
                1,
                value.length - 1,
            ).split(",").map((v) => v.trim());
        } else {
            obj[key.replaceAll("\\.", ".")] = value;
        }
    }
}
