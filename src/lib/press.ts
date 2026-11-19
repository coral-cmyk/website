// Press coverage, in the order Coral gave them.
// Each entry is one published piece about the studio or one of its projects.
export type PressItem = {
  publication: string;
  title: string;
  year: string;
  kind: string;
  url: string;
  // Hebrew (and other right-to-left) titles need their own direction to read correctly.
  rtl?: boolean;
};

export const PRESS: PressItem[] = [
  {
    publication: "Portfolio",
    title: "כמה קטנה ככה גדולה: המהפך שעברה דירה במגדל מגורים בתל אביב",
    year: "2022",
    kind: "Feature — XL Apt",
    url: "https://www.prtfl.co.il/archives/161020",
    rtl: true,
  },
  {
    publication: "A' Design Award & Competition",
    title: "TER Restaurant — winning design #99479",
    year: "2019",
    kind: "Award",
    url: "https://competition.adesignaward.com/design.php?ID=99479",
  },
  {
    publication: "Best Design Israel",
    title: "TER Restaurant",
    year: "2020",
    kind: "Feature",
    url: "https://bestdesignisrael.com/?ID=99479",
  },
  {
    publication: "Home Adore",
    title: "DUP20 by Coral Mesika",
    year: "2021",
    kind: "Feature",
    url: "https://homeadore.com/2021-09-07/dup20-by-coral-mesika/",
  },
  {
    publication: "Design Interviews",
    title: "TER Restaurant by Coral Mesika",
    year: "2020",
    kind: "Interview",
    url: "https://www.design-interviews.com/design.php?ID=99479",
  },
];
