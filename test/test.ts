import { assert } from "https://deno.land/std@v0.150.0/testing/asserts.ts";
import { parse, stringify } from "../mod.ts";

function test(result: Record<string, unknown>) {
    Deno.test({
        name: "exclamation_comment",
        fn() {
            assert(
                result["exclamationComment"] == undefined,
                "Key `exclamationComment` should be `undefined`",
            );
        },
    });

    Deno.test({
        name: "hash_comment",
        fn() {
            assert(
                result["hashComment"] == undefined,
                "Key `hashComment` should be `undefined`",
            );
        },
    });

    Deno.test({
        name: "key_eq",
        fn() {
            assert(
                result["keyEq"] == "value",
                "Key `keyEq` should be `value`",
            );
        },
    });

    Deno.test({
        name: "key_eq_wsp_1",
        fn() {
            assert(
                result["keyEqWsp1"] == "value",
                "Key `keyEqWsp1` should be `value`",
            );
        },
    });

    Deno.test({
        name: "key_eq_wsp_2",
        fn() {
            assert(
                result["keyEqWsp2"] == "value",
                "Key `keyEqWsp2` should be `value`",
            );
        },
    });

    Deno.test({
        name: "key_eq_wsp_3",
        fn() {
            assert(
                result["keyEqWsp3"] == "value",
                "Key `keyEqWsp3` should be `value`",
            );
        },
    });

    Deno.test({
        name: "key_eq_wsp_4",
        fn() {
            assert(
                result["keyEqWsp4"] == "value ",
                "Key `keyEqWsp4` should be `value `",
            );
        },
    });

    Deno.test({
        name: "key_col",
        fn() {
            assert(
                result["keyCol"] == "value",
                "Key `keyCol` should be `value`",
            );
        },
    });

    Deno.test({
        name: "key_col_wsp_1",
        fn() {
            assert(
                result["keyColWsp1"] == "value",
                "Key `keyColWsp1` should be `value`",
            );
        },
    });

    Deno.test({
        name: "key_col_wsp_2",
        fn() {
            assert(
                result["keyColWsp2"] == "value",
                "Key `keyColWsp2` should be `value`",
            );
        },
    });

    Deno.test({
        name: "key_col_wsp_3",
        fn() {
            assert(
                result["keyColWsp3"] == "value",
                "Key `keyColWsp3` should be `value`",
            );
        },
    });

    Deno.test({
        name: "key_col_wsp_4",
        fn() {
            assert(
                result["keyColWsp4"] == "value ",
                "Key `keyColWsp4` should be `value `",
            );
        },
    });

    Deno.test({
        name: "cities",
        fn() {
            assert(
                result["targetCities"] == "Detroit,Chicago,Los Angeles",
                "Key `targetCities` should be `Detroit,Chicago,Los Angeles`",
            );
        },
    });

    Deno.test({
        name: "ml_alpha",
        fn() {
            assert(
                result["mlAlpha"] == "abcd",
                "Key `mlAlpha` should be `abcd`",
            );
        },
    });

    Deno.test({
        name: "backslash_escape",
        fn() {
            assert(
                result["path"] == "c:\\docs\\doc1",
                "Key `path` should be `c:\\docs\\doc1`",
            );
        },
    });

    Deno.test({
        name: "period_in_path",
        fn() {
            assert(
                result["period.in.path"] == "value",
                "Key `period.in.path` should be `value`",
            );
        },
    });

    Deno.test({
        name: "greetings",
        fn() {
            assert(
                arraysEqual(result["greetings"] as unknown[], ["hello", "hey"]),
                "Key `greetings` should be `[hello, hey]`",
            );
        },
    });

    Deno.test({
        name: "nested",
        fn() {
            assert(
                (result["nested"] as Record<string, unknown>)["key"] == "value",
                "Key `nested.key` should be `value`",
            );
        },
    });

    Deno.test({
        name: "nested_ml",
        fn() {
            assert(
                (result["nested"] as Record<string, unknown>)["ml"] == "abcd",
                "Key `nested.ml` should be `abcd`",
            );
        },
    });

    Deno.test({
        name: "double_nested",
        fn() {
            assert(
                ((result["nested"] as Record<string, unknown>)[
                    "nested"
                ] as Record<string, unknown>)["key"] == "value",
                "Key `nested.nested.key` should be `value`",
            );
        },
    });

    Deno.test({
        name: "nested_array",
        fn() {
            assert(
                arraysEqual(
                    (result["nested"] as Record<string, unknown>)[
                        "greetings"
                    ] as unknown[],
                    ["hello", "hey"],
                ),
                "Key `nested.greetings` should be `[hello, hey]`",
            );
        },
    });
}

function arraysEqual(a: unknown[], b: unknown[]) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

const file = await Deno.readTextFile("./test/test.properties");
const result = parse(file);
test(result);

const stringified = stringify(result);
const reparsed = parse(stringified);

test(reparsed);
