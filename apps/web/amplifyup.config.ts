import { defineAmplifyConfig } from "@amplifyup/sdk/config";

/**
 * AmplifyUP component registry. Only files in `placeables/` are registered —
 * file name = Composer component_id. Keep helpers out of this folder.
 */
export default defineAmplifyConfig({
  components: {
    roots: ["src/components/amplifyup/placeables"],
    output: "src/.amplifyup/component-registry",
  },
});
