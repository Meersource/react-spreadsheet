import LocalizedStrings from "react-localization";

interface StringMap {
  [key: string]: string;
}

export interface IStrings {
  en: { [key: string]: string };
  it: { [key: string]: string };
}

export let strings = new LocalizedStrings({
  en: {
    how: "How do you want your egg today?",
    boiledEgg: "Boiled egg",
    softBoiledEgg: "Soft-boiled egg",
    choice: "How to choose the egg",
  },
  it: {
    how: "Come vuoi il tuo uovo oggi?",
    boiledEgg: "Uovo sodo",
    softBoiledEgg: "Uovo alla coque",
    choice: "Come scegliere l'uovo",
  },
});
