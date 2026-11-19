import { describe, expect, it } from "vitest";

import { projects, galleryImages, gallerySpans } from "@/lib/projects";

describe("Project page gallery layout", () => {
  it("runs the opening photo full width and leaves no half-empty row", () => {
    expect(gallerySpans(1)).toEqual([2]);
    expect(gallerySpans(2)).toEqual([2, 2]);
    expect(gallerySpans(3)).toEqual([2, 1, 1]);
    expect(gallerySpans(4)).toEqual([2, 1, 1, 2]);
    expect(gallerySpans(9)).toEqual([2, 1, 1, 1, 1, 1, 1, 1, 1]);
  });
});

describe("Project page gallery", () => {
  it("shows the cover photo first in the scroll-through gallery", () => {
    const p = projects.find((x) => x.slug === "xl-apt")!;
    const gallery = galleryImages(p);
    expect(gallery[0]).toBe(p.cover);
    expect(gallery).toHaveLength(p.images.length);
  });

  it("keeps every photo exactly once, so nothing repeats", () => {
    const p = projects.find((x) => x.slug === "cr-suites")!;
    const gallery = galleryImages(p);
    expect(new Set(gallery).size).toBe(gallery.length);
    expect(gallery).toEqual([p.cover, ...p.images.filter((x) => x !== p.cover)]);
  });

  it("keeps every visible project's gallery complete and free of repeated photo references", () => {
    for (const p of projects) {
      expect(new Set(p.images).size, `${p.name} photo list`).toBe(p.images.length);
      const gallery = galleryImages(p);
      expect(new Set(gallery).size, `${p.name} gallery`).toBe(gallery.length);
      expect(gallery, `${p.name} cover`).toContain(p.cover);
      expect([...gallery].sort(), `${p.name} photos`).toEqual([...p.images].sort());
    }
  });

  it("shows nothing for a project with no photos yet", () => {
    expect(
      galleryImages({
        slug: "none",
        name: "NONE",
        category: "",
        year: "",
        size: "",
        location: "",
        cover: "",
        lightTop: false,
        text: [],
        images: [],
      }),
    ).toEqual([]);
  });
});

describe("Project dates", () => {
  it("HB HOUSE carries no 'In progress' date", () => {
    expect(projects.find((p) => p.slug === "hb-house")?.year).toBe("");
  });
});

describe("CR Suites facts", () => {
  it("states eight suites, each with its own private pool overlooking the ocean", () => {
    const text = projects.find((x) => x.slug === "cr-suites")!.text.join(" ");
    expect(text).toMatch(/Eight high-end suites/);
    expect(text).toMatch(/private pool/);
    expect(text).toMatch(/overlooking the ocean/);
  });

  it("shows the layout drawing apart from the interior photos", () => {
    const p = projects.find((x) => x.slug === "cr-suites")!;
    expect(p.plans).toHaveLength(1);
    expect(p.plans?.[0]).toContain("cr-suites-plan-1.jpg");
    expect(p.images).not.toContain(p.plans?.[0]);
  });
});

describe("APPCHARGE facts", () => {
  const p = projects.find((x) => x.slug === "appcharge")!;

  it("carries the details Coral gave: 2025, Tel Aviv, 1000 m²", () => {
    expect(p.year).toBe("2025");
    expect(p.location).toBe("Tel Aviv, Israel");
    expect(p.size).toBe("1000 m²");
  });

  it("shows all four office photos", () => {
    expect(p.images).toHaveLength(4);
    expect(p.images.map((x) => x.split("/").pop())).toEqual([
      "appcharge-1.jpg",
      "appcharge-2.jpg",
      "appcharge-3.jpg",
      "appcharge-4.jpg",
    ]);
  });

  it("shows the office layout apart from the interior photos", () => {
    expect(p.plans).toHaveLength(1);
    expect(p.plans?.[0]).toContain("appcharge-plan-1.jpg");
    expect(p.images).not.toContain(p.plans?.[0]);
  });

  it("tells the whole story Coral wrote", () => {
    const text = p.text.join(" ");
    expect(p.text).toHaveLength(5);
    expect(text).toMatch(/reimagine the existing Appcharge offices/);
    expect(text).toMatch(/central lounge, co-working areas, private offices/);
    expect(text).toMatch(/without undergoing a complete renovation/);
    expect(text).toMatch(/custom carpentry/);
    expect(text).toMatch(/feels distinctly Appcharge/);
  });
});

describe("Projects page order", () => {
  it("puts construction first, then the existing projects, with Monday and GY APT moved up", () => {
    expect(projects.map((p) => p.slug)).toEqual([
      "net-project",
      "mes-apt",
      "hy-apt",
      "xl-apt",
      "cr-suites",
      "hb-house",
      "ter",
      "hoa",
      "appcharge",
      "student-apts-01",
      "student-apts-02",
      "student-apts-03",
      "gy-apt",
      "monday",
      "ei-library",
      "brodt-lobby",
      "coi",
      "dup20",
      "dr-clinic",
    ]);
  });

  it("swaps Monday into COI's old row and COI down, and GY APT into DUP20's old row", () => {
    const at = (slug: string) => projects.findIndex((p) => p.slug === slug);
    expect(at("gy-apt")).toBe(12);
    expect(at("monday")).toBe(13);
    expect(at("coi")).toBe(16);
    expect(at("dup20")).toBe(17);
  });
});

describe("Under-construction first row", () => {
  it("marks all three first-row projects as under construction", () => {
    expect(projects.slice(0, 3).map((p) => [p.name, p.underConstruction])).toEqual([
      ["NET PROJECT", true],
      ["MES APT", true],
      ["HY APT", true],
    ]);
  });

  it("keeps the previous first row together in the second row", () => {
    expect(projects.slice(3, 6).map((p) => p.name)).toEqual(["XL APT", "CR SUITES", "HB HOUSE"]);
  });
});

describe("STUDENT APTS", () => {
  const flats = ["student-apts-01", "student-apts-02", "student-apts-03"].map(
    (slug) => projects.find((x) => x.slug === slug)!,
  );

  it("is three separate flats", () => {
    expect(flats).toHaveLength(3);
    expect(flats.every(Boolean)).toBe(true);
  });

  it("each is Residential in Thessaloniki, Greece", () => {
    for (const p of flats) {
      expect(p.category).toBe("Residential");
      expect(p.location).toBe("Thessaloniki, Greece");
    }
  });

  it("all three carry Coral's shared description", () => {
    for (const p of flats) {
      expect(p.text).toHaveLength(3);
      expect(p.text[0]).toContain("university district of Thessaloniki");
      expect(p.text[1]).toContain("every square meter serves a purpose");
      expect(p.text[2]).toContain("a place to study, unwind, and host friends");
    }
  });

  it("flat 01 has Coral's three photos, with the wide room shot as the cover", () => {
    const p = flats[0]!;
    expect(p.images).toHaveLength(3);
    expect(p.cover).toBe(p.images[0]);
    expect(p.cover).toContain("student-apts-01-1.jpg");
  });

  it("flat 01 keeps the light logo in the header — the cover's top is bright and even", () => {
    expect(flats[0]?.lightTop).toBe(true);
  });

  it("flat 02 has Coral's three photos, with the living room as the cover", () => {
    const p = flats[1]!;
    expect(p.images).toHaveLength(3);
    expect(p.cover).toBe(p.images[0]);
    expect(p.cover).toContain("student-apts-02-1.jpeg");
  });

  it("flat 02 shows the light logo in the header — the living room's top reads dark", () => {
    expect(flats[1]?.lightTop).toBe(false);
  });

  it("flat 03 has Coral's three photos, with the living room as the cover", () => {
    const p = flats[2]!;
    expect(p.images).toHaveLength(3);
    expect(p.cover).toBe(p.images[0]);
    expect(p.cover).toContain("student-apts-03-1.jpeg");
  });
});

describe("EI LIBRARY", () => {
  const p = projects.find((x) => x.slug === "ei-library");

  it("is a Library in Tel Aviv, Israel", () => {
    expect(p?.category).toBe("Library");
    expect(p?.location).toBe("Tel Aviv, Israel");
  });

  it("has the four photos Coral sent, with 33.jpg as the cover", () => {
    expect(p?.images).toHaveLength(4);
    expect(p?.cover).toBe(p?.images[0]);
    expect(p?.cover).toContain("ei-library-1.jpg");
  });

  it("keeps the light logo in the header — every photo's top edge is busy", () => {
    expect(p?.lightTop).toBe(false);
  });

  it("reads 200 m² as the size", () => {
    expect(p?.size).toBe("200 m²");
  });

  it("carries Coral's description of the library", () => {
    expect(p?.text).toHaveLength(3);
    expect(p?.text[0]).toContain("A new addition to a central museum");
    expect(p?.text[1]).toContain("Designed for students and museum team members alike");
    expect(p?.text[2]).toContain("a thoughtful extension of the museum");
  });
});

describe("Under-construction first row details", () => {
  it("NET PROJECT reads Residential · 3 Houses · Netayim, Israel", () => {
    const p = projects.find((x) => x.slug === "net-project");
    expect(p?.category).toBe("Residential");
    expect(p?.detail).toBe("3 Houses");
    expect(p?.location).toBe("Netayim, Israel");
  });

  it("MES APT and HY APT read Residential · Tel Aviv, Israel", () => {
    for (const slug of ["mes-apt", "hy-apt"]) {
      const p = projects.find((x) => x.slug === slug);
      expect(p?.category).toBe("Residential");
      expect(p?.location).toBe("Tel Aviv, Israel");
      expect(p?.detail).toBeUndefined();
    }
  });
});

describe("MES APT", () => {
  const p = projects.find((x) => x.slug === "mes-apt");

  it("has Coral's photo as its cover", () => {
    expect(p?.images).toHaveLength(1);
    expect(p?.cover).toBe(p?.images[0]);
    expect(p?.cover).toContain("mes-apt-1.jpg");
  });

  it("keeps the dark logo in the header — the cover's top is a plain bright ceiling", () => {
    expect(p?.lightTop).toBe(true);
  });
});

describe("HY APT", () => {
  const p = projects.find((x) => x.slug === "hy-apt");

  it("has Coral's photo as its cover", () => {
    expect(p?.images).toHaveLength(1);
    expect(p?.cover).toBe(p?.images[0]);
    expect(p?.cover).toContain("hy-apt-1.jpg");
  });

  it("keeps the dark logo in the header — the cover's top is a plain bright ceiling", () => {
    expect(p?.lightTop).toBe(true);
  });

  it("is still flagged under construction", () => {
    expect(p?.underConstruction).toBe(true);
  });
});

describe("NET PROJECT", () => {
  const p = projects.find((x) => x.slug === "net-project");

  it("has Coral's aerial drone cover and one pool photo, with the duplicate removed", () => {
    expect(p?.images).toHaveLength(2);
    expect(p?.cover).toBe(p?.images[0]);
    expect(p?.cover).toBe("/assets/net-project/net-project-0.jpg");
    expect(p?.images[1]).toBe("/assets/net-project/net-project-1.jpg");
    expect(galleryImages(p!)).toHaveLength(2);
  });

  it("shows the light logo in the header — the cover's top is a busy sky, trees and rooftops", () => {
    expect(p?.lightTop).toBe(false);
  });

  it("is still flagged under construction", () => {
    expect(p?.underConstruction).toBe(true);
  });
});

describe("GY APT", () => {
  const p = projects.find((x) => x.slug === "gy-apt");

  it("is Residential in Glil Yam, Israel", () => {
    expect(p?.name).toBe("GY APT");
    expect(p?.category).toBe("Residential");
    expect(p?.location).toBe("Glil Yam, Israel");
  });

  it("carries Coral's four paragraphs and the 130 m² size", () => {
    expect(p?.size).toBe("130 m²");
    expect(p?.text).toHaveLength(4);
    expect(p?.text[0]).toBe(
      "Designed for a growing family, this 130 m² apartment in a new residential development in Glil Yam was thoughtfully planned to balance functionality, comfort, and a sense of openness.",
    );
    expect(p?.text[3]).toBe(
      "The result is a thoughtfully considered family home where every square meter serves a purpose, without compromising the feeling of space, flow, or everyday comfort.",
    );
  });

  it("has Coral's three photos, the kitchen/dining one leading", () => {
    expect(p?.images).toHaveLength(3);
    expect(p?.cover).toBe(p?.images[0]);
    expect(p?.cover).toContain("gy-apt-1.jpg");
    expect(p?.images.map((u) => u.split("/").pop())).toEqual([
      "gy-apt-1.jpg",
      "gy-apt-2.jpg",
      "gy-apt-3.jpg",
    ]);
  });

  it("shows the floor plan apart from the interior photos", () => {
    expect(p?.plans).toHaveLength(1);
    expect(p?.plans?.[0]).toContain("gy-apt-plan-1.jpg");
    expect(p?.images).not.toContain(p?.plans?.[0]);
    expect(galleryImages(p!)).toHaveLength(3);
  });

  it("keeps the dark logo in the header — the cover's top is a plain bright ceiling", () => {
    expect(p?.lightTop).toBe(true);
  });
});

describe("DR CLINIC", () => {
  const p = projects.find((x) => x.slug === "dr-clinic");

  it("is Medical in Petah Tikva, Israel", () => {
    expect(p?.name).toBe("DR CLINIC");
    expect(p?.category).toBe("Medical");
    expect(p?.location).toBe("Petah Tikva, Israel");
  });

  it("has Coral's photo as its cover", () => {
    expect(p?.images).toHaveLength(1);
    expect(p?.cover).toBe(p?.images[0]);
    expect(p?.cover).toContain("dr-clinic-1.jpg");
  });

  it("shows the light logo in the header — the cover's top is a patterned wood ceiling", () => {
    expect(p?.lightTop).toBe(false);
  });

  it("reads 40 m² as the size", () => {
    expect(p?.size).toBe("40 m²");
  });

  it("carries Coral's description of the clinic", () => {
    expect(p?.text).toHaveLength(3);
    expect(p?.text[0]).toContain("this intimate gynecology clinic");
    expect(p?.text[1]).toContain("Warm wooden cladding, custom-designed light fixtures");
    expect(p?.text[2]).toContain("balances professionalism with intimacy");
  });
});

describe("MONDAY", () => {
  const p = projects.find((x) => x.slug === "monday");

  it("is named MONDAY.COM and reads Biophilia Center · Offices · Tel Aviv, Israel", () => {
    expect(p?.name).toBe("MONDAY.COM");
    expect(p?.category).toBe("Biophilia Center");
    expect(p?.detail).toBe("Offices");
    expect(p?.location).toBe("Tel Aviv, Israel");
    expect(p?.size).toBe("150 m²");
  });

  it("carries Coral's five paragraphs, opening with the indoor garden line", () => {
    expect(p?.text).toHaveLength(5);
    expect(p?.text[0]).toContain("150 m² indoor garden");
    expect(p?.text[0]).toContain("Monday.com headquarters in Israel");
    expect(p?.text[4]).toBe(
      "The result is a living, evolving indoor garden — a space that encourages employees to slow down, reconnect, and experience a moment of nature within the workplace.",
    );
  });

  it("has Coral's photo as its cover, with the three new views after it", () => {
    expect(p?.images).toHaveLength(4);
    expect(p?.cover).toBe(p?.images[0]);
    expect(p?.cover).toContain("monday-1.png");
    expect(p?.images[1]).toContain("monday-2.webp");
    expect(p?.images[2]).toContain("monday-3.webp");
    expect(p?.images[3]).toContain("monday-4.webp");
  });

  it("shows the light logo in the header — the cover's top is a busy ceiling", () => {
    expect(p?.lightTop).toBe(false);
  });

  it("is not flagged under construction", () => {
    expect(p?.underConstruction).toBeFalsy();
  });
});

describe("Social links", () => {
  it("lists Instagram and WhatsApp only — Facebook was removed", async () => {
    const { SOCIAL } = await import("@/lib/projects");
    expect(Object.keys(SOCIAL).sort()).toEqual(["instagram", "whatsapp"]);
  });
});
