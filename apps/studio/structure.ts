import type { StructureResolver } from "sanity/structure";

const V2_TYPES = ["hero", "articleGrid"] as const;

/**
 * Desk structure: AmplifyUP-oriented docs under V2; everything else in the main list.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("V2")
        .id("v2")
        .child(
          S.list()
            .title("V2")
            .items([
              S.documentTypeListItem("hero").title("Hero"),
              S.documentTypeListItem("articleGrid").title("Article Grid"),
            ])
        ),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => {
        const id = item.getId();
        return id ? !V2_TYPES.includes(id as (typeof V2_TYPES)[number]) : true;
      }),
    ]);
