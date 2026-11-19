# Journal: 100-article SEO plan

Goal: bring people who are searching for an interior designer / interior architect
(Google and AI assistants like ChatGPT, Perplexity, Gemini, Google AI Overviews) to
coco-atelier.com, and turn them into WhatsApp/phone enquiries.

Markets: Israel, Greece, Italy, USA, wider Europe; plus people buying or renovating
abroad (e.g. Americans/Europeans in Tel Aviv, Israelis in Greece).

## Decisions (2026-11-19)

- Languages: English for all 100; Hebrew versions of the Israel-focused articles.
- Review: Coral reviews every batch before it is scheduled.
- Case studies: written only from what is already on the site (no extra project
  details from Coral for now), so they stay factual and shorter.

## Ground rules (these protect rankings and the business)

1. **Experience first.** Google's "helpful content" and E-E-A-T rules, and AI search
   engines, favour pages written from first-hand experience. Every article draws on
   Coral's real projects, process or opinions. Mass-produced generic AI text is what
   Google's "scaled content abuse" policy targets, so no filler articles.
2. **Nothing invented.** No made-up clients, quotes, prices, statistics, awards or
   project details. Facts about projects come from the site or from Coral. Where a
   number is needed (cost, timeline) it is either Coral's own or clearly framed
   as "depends on", with the factors explained.
3. **Titles.** Coral is an interior designer / interior architect. Articles can answer
   "architect" searches (e.g. "architect or interior designer for my apartment?")
   but never call her a licensed architect: in Israel "אדריכל/ית" is a protected,
   registered title.
4. **Coral reviews before publishing.** Each batch is written ahead of time and
   published on a schedule only after she has read it.
5. **Every article ends in a reason to call:** a short, specific next step and
   links to the relevant projects and to WhatsApp/contact.

## Publishing rhythm

- Launch: 10 articles at once (marked ★ below: the strongest lead-generating ones).
- Then 2–3 per day, by date. Articles are written in batches of ~15, reviewed,
  committed with future dates, and a daily automatic rebuild publishes each one
  on its date. 100 articles ≈ 5–6 weeks.
- Each new article is added to sitemap.xml automatically; Google Search Console
  re-reads the sitemap on its own once it has been submitted once.

## Technical SEO to build before launch

- Daily scheduled rebuild (GitHub Actions) so dated articles go live by themselves.
- Structured data (JSON-LD): Article + author (Coral, Person), BreadcrumbList,
  site-wide ProfessionalService/LocalBusiness (Tel Aviv, areas served), FAQ blocks.
- sitemap.xml with `lastmod` dates; RSS feed; `llms.txt` summary for AI crawlers;
  robots.txt explicitly allowing AI search crawlers.
- Canonical URLs, and `hreflang` once Hebrew versions exist.
- Faster images (responsive sizes + WebP). Some photos are still 1–3 MB, which hurts
  Core Web Vitals, a ranking factor.
- Related-article and related-project links on every article; a "Journal" block
  on project pages linking to articles about them.
- Outside the site, also important for local leads: a Google Business Profile for
  the studio, and Bing Webmaster Tools (feeds ChatGPT search).

## The 100 articles

Columns: working title · main search it targets · market · type · real project(s) to draw on.
Types: **Hire** = someone ready to hire · **Plan** = planning a project · **Idea** =
inspiration · **Case** = case study of a real project · **Local** = city/country guide.

### A. Hiring an interior designer (highest intent)

| # | Working title | Target search | Market | Type | Projects |
|---|---|---|---|---|---|
| 1 ★ | How to choose an interior designer in Tel Aviv | interior designer Tel Aviv | Israel | Hire | XL APT, MEL APT |
| 2 ★ | Interior architect, interior designer or architect: who do you actually need? | interior architect vs interior designer | Israel, Global | Hire | — |
| 3 ★ | What does an interior designer cost in Israel? The factors that decide it | interior designer cost Israel | Israel | Hire | — |
| 4 | What happens in the first meeting with an interior designer | first meeting interior designer | Global | Hire | — |
| 5 | The interior design process, step by step: from brief to handover | interior design process | Global | Hire | XL APT |
| 6 ★ | Hiring an interior designer from abroad: how remote projects really work | remote interior designer | USA, Europe | Hire | HB HOUSE, CR SUITES |
| 7 | Full-service design vs consultation only: which fits your project? | interior design consultation | Global | Hire | — |
| 8 | 12 questions to ask an interior designer before you sign | questions to ask interior designer | Global | Hire | — |
| 9 | What an interior design contract should include | interior design contract | Israel, Global | Hire | — |
| 10 | Why hire an interior designer for a renovation (and when you don't need one) | do I need an interior designer | Global | Hire | — |
| 11 | Working with a designer when you live overseas and the apartment is in Israel | renovate apartment in Israel from abroad | USA, Europe | Hire | MES APT, HY APT |
| 12 | How designers work with contractors, and why it saves you money | interior designer and contractor | Israel | Hire | — |

### B. Israel: renovating apartments and homes

| # | Working title | Target search | Market | Type | Projects |
|---|---|---|---|---|---|
| 13 ★ | Renovating an apartment in Tel Aviv: the complete guide | Tel Aviv apartment renovation | Israel | Local | XL APT, MEL APT, MES APT |
| 14 | Designing a high-rise tower apartment in Tel Aviv | tower apartment design Tel Aviv | Israel | Plan | XL APT |
| 15 | Small apartment, big living: space planning lessons from Tel Aviv | small apartment design Tel Aviv | Israel | Idea | MEL APT |
| 16 | Designing the mamad (safe room) so it doesn't feel like one | mamad design ideas | Israel | Idea | — |
| 17 | Renovation timeline in Israel: how long each stage really takes | renovation timeline Israel | Israel | Plan | — |
| 18 | Buying new from a developer? Plan the changes (shinuyei dayarim) early | changes to new apartment Israel | Israel | Plan | NET PROJECT |
| 19 | Designing a private house in central Israel: what changes vs an apartment | private house interior design Israel | Israel | Plan | NET PROJECT, GY APT |
| 20 | Duplex and penthouse design: stairs, light and flow | duplex interior design | Israel | Idea | DUP20 |
| 21 | Designing for Israeli light and heat: shading, materials, orientation | interior design hot climate | Israel | Idea | — |
| 22 | Kitchen renovation in Israel: layout, materials and mistakes to avoid | kitchen renovation Israel | Israel | Plan | — |
| 23 | Bathroom design for small Israeli apartments | small bathroom design | Israel | Idea | — |
| 24 | Glil Yam, Herzliya and the coastal suburbs: designing family homes by the sea | interior designer Herzliya | Israel | Local | GY APT |
| 25 | Interior design in Holon, Ramat Gan and Givatayim: city apartments with character | interior designer Ramat Gan | Israel | Local | DUP20 |
| 26 | Designing a rental investment apartment that rents faster | rental apartment design | Israel, Greece | Plan | STUDENT APTS |
| 27 | Olim and returning residents: furnishing a new home in Israel | furnishing apartment Israel new immigrant | USA, Europe | Plan | — |
| 28 | Living through a renovation in Tel Aviv: permits, neighbours and noise | renovation permits Tel Aviv | Israel | Plan | — |

### C. Commercial, office and hospitality design (high-value leads)

| # | Working title | Target search | Market | Type | Projects |
|---|---|---|---|---|---|
| 29 ★ | Office design for tech companies in Tel Aviv | office interior design Tel Aviv | Israel | Hire | APPCHARGE, MONDAY.COM |
| 30 | Biophilic design at work: what it is and why teams feel the difference | biophilic office design | Global | Idea | MONDAY.COM |
| 31 | Designing a building lobby that sets the tone for every resident | lobby interior design | Israel | Case | BRODT LOBBY |
| 32 | Medical clinic design: calm, hygienic and efficient | clinic interior design | Israel | Plan | DR CLINIC |
| 33 | Designing a library or quiet space people actually want to stay in | library interior design | Global | Idea | EI LIBRARY |
| 34 ★ | Boutique hotel and suites design: what guests remember | boutique hotel interior design | Greece, Europe | Hire | CR SUITES, HOA |
| 35 | Restaurant interior design: from concept to opening night | restaurant interior design | Italy, Europe | Plan | TER |
| 36 | Hospitality design that photographs well (and books well) | hospitality interior design | Global | Idea | CR SUITES |
| 37 | Designing short-term rental apartments for Airbnb and booking sites | Airbnb interior design | Greece, Israel | Plan | STUDENT APTS, CR SUITES |
| 38 | Office refurbishment without stopping work | office renovation | Israel | Plan | APPCHARGE |
| 39 | How to brief a designer for a commercial space | commercial interior design brief | Global | Hire | — |
| 40 | Student housing design: durable, compact and good to live in | student housing interior design | Greece, Europe | Case | STUDENT APTS 01–03 |

### D. Greece

| # | Working title | Target search | Market | Type | Projects |
|---|---|---|---|---|---|
| 41 ★ | Renovating a holiday home in Greece as a foreign owner | renovate house Greece foreigner | Greece, Israel, Europe | Local | CR SUITES |
| 42 | Designing in Crete: materials, light and the local building tradition | interior designer Crete | Greece | Local | CR SUITES |
| 43 | Thessaloniki apartments: renovating for living or renting | apartment renovation Thessaloniki | Greece | Local | STUDENT APTS |
| 44 | Greek island interiors without the clichés | Greek island interior design | Global | Idea | CR SUITES |
| 45 | Golden Visa property: furnishing and designing for rent or residence | Greece golden visa apartment renovation | Greece, Israel, USA | Plan | STUDENT APTS |
| 46 | Managing a renovation in Greece from Israel or abroad | renovation Greece from abroad | Israel, Europe | Plan | CR SUITES, STUDENT APTS |
| 47 | Athens apartment renovation: what to know before you start | Athens apartment renovation | Greece | Local | — |
| 48 | Lime plaster, stone and marble: Greek materials in contemporary interiors | Greek materials interior | Global | Idea | CR SUITES |

### E. Italy

| # | Working title | Target search | Market | Type | Projects |
|---|---|---|---|---|---|
| 49 ★ | Designing hospitality in Turin: lessons from HOA | interior designer Turin | Italy | Case | HOA |
| 50 | Restaurant design in the Italian Alps: TER at Malga Costa | restaurant design Italy | Italy | Case | TER |
| 51 | Renovating an apartment in Italy as a foreigner | renovate apartment Italy foreigner | Italy, USA, Israel | Local | HOA |
| 52 | Italian materials worth knowing: terrazzo, travertine, Venetian plaster | Italian interior materials | Global | Idea | — |
| 53 | Milan vs Mediterranean: two Italian design languages | Italian interior design style | Global | Idea | — |
| 54 | Mountain and alpine interiors: warmth without the chalet clichés | alpine interior design | Italy, Europe | Idea | TER |

### F. USA and wider Europe

| # | Working title | Target search | Market | Type | Projects |
|---|---|---|---|---|---|
| 55 ★ | A California beach house, designed from Tel Aviv | Huntington Beach interior designer | USA | Case | HB HOUSE |
| 56 | Coastal California interiors that aren't "beachy" | California coastal interior design | USA | Idea | HB HOUSE |
| 57 | Working with an international interior designer: time zones, sourcing, site visits | international interior designer | USA, Europe | Hire | HB HOUSE |
| 58 | Mediterranean design for American homes | Mediterranean interior design | USA | Idea | — |
| 59 | E-design vs full design: what works for a home in the US | e-design interior design | USA | Hire | — |
| 60 | Buying a second home in Europe: design decisions that protect its value | second home Europe interior design | USA, Israel | Plan | — |

### G. Style and design ideas (wide reach, builds authority)

| # | Working title | Target search | Market | Type | Projects |
|---|---|---|---|---|---|
| 61 | Quiet drama: designing interiors that feel calm but never boring | quiet luxury interior design | Global | Idea | XL APT |
| 62 | Mediterranean minimalism: a working definition | Mediterranean minimalist interior | Global | Idea | — |
| 63 | Wood slat partitions: dividing space without closing it | wood slat partition | Global | Idea | XL APT |
| 64 | Natural stone in the home: choosing, finishing and caring for it | natural stone interior | Global | Idea | — |
| 65 | Microcement, concrete and plaster: seamless surfaces explained | microcement walls | Global | Idea | — |
| 66 | Building a material palette for your home | interior material palette | Global | Idea | — |
| 67 | Lighting design at home: layers, colour temperature, control | home lighting design | Global | Idea | — |
| 68 | Colour in calm interiors: using restraint well | neutral interior colour palette | Global | Idea | — |
| 69 | Built-in joinery: where custom carpentry is worth paying for | custom cabinetry interior | Global | Idea | — |
| 70 | Open plan living without the echo: zoning, acoustics, rugs | open plan living design | Global | Idea | — |
| 71 | Designing a primary bedroom suite that feels like a hotel | hotel style bedroom | Global | Idea | — |
| 72 | Walk-in wardrobes and storage that disappears | walk-in closet design | Global | Idea | — |
| 73 | Home offices that look like part of the home | home office design | Global | Idea | — |
| 74 | Designing with art you already own | decorating with art | Global | Idea | — |
| 75 | Indoor plants and biophilic touches at home | biophilic design home | Global | Idea | MONDAY.COM |
| 76 | Experimental interiors: what speculative projects teach real homes | experimental interior design | Global | Idea | COI, MH21 |
| 77 | Timeless vs trendy: decisions you won't regret in ten years | timeless interior design | Global | Idea | — |
| 78 | Sustainable interiors: reuse, durable materials and local makers | sustainable interior design | Global | Idea | — |

### H. Planning, budgets and practicalities

| # | Working title | Target search | Market | Type | Projects |
|---|---|---|---|---|---|
| 79 | How to set a renovation budget (and where it usually goes) | renovation budget | Global | Plan | — |
| 80 | What to decide first in a renovation | renovation order of works | Global | Plan | — |
| 81 | Moodboards, 3D renders and drawings: what you'll receive and why | interior design drawings | Global | Hire | — |
| 82 | Furniture sourcing: custom, local makers or international brands | furniture sourcing interior designer | Global | Plan | — |
| 83 | Designing for families with young children (without a playroom look) | family friendly interior design | Global | Idea | GY APT |
| 84 | Designing for pets: materials that survive | pet friendly interior design | Global | Idea | — |
| 85 | Accessible and age-friendly design that still looks beautiful | accessible home design | Global | Idea | — |
| 86 | Smart home basics to plan before the walls close | smart home renovation | Global | Plan | — |
| 87 | Renovating to sell vs renovating to stay | renovate to sell | Global | Plan | — |
| 88 | Common renovation mistakes, and how to avoid them | renovation mistakes | Global | Plan | — |

### I. Case studies (one per project; strongest proof of experience)

Written with Coral's input on the brief, constraints and decisions. Several above
already lead with a project (31, 40, 49, 50, 55); these cover the rest.

| # | Working title | Target search | Market | Type | Projects |
|---|---|---|---|---|---|
| 89 ★ | XL APT: a vacation feeling in a Tel Aviv tower | Tel Aviv apartment design | Israel | Case | XL APT |
| 90 | MEL APT: making a compact Tel Aviv apartment feel generous | small apartment Tel Aviv | Israel | Case | MEL APT |
| 91 | DUP20: a duplex in Holon | duplex design Israel | Israel | Case | DUP20 |
| 92 | GY APT: designing for family life in Glil Yam | family home design Israel | Israel | Case | GY APT |
| 93 | CR SUITES: designing suites on Crete | Crete boutique suites design | Greece | Case | CR SUITES |
| 94 | APPCHARGE: an office for a growing Tel Aviv tech company | tech office design Tel Aviv | Israel | Case | APPCHARGE |
| 95 | MONDAY.COM: a biophilia centre inside a tech campus | monday.com office | Israel, Global | Case | MONDAY.COM |
| 96 | DR CLINIC: a medical clinic that feels like care | medical clinic design Israel | Israel | Case | DR CLINIC |
| 97 | EI LIBRARY: a place for quiet in Tel Aviv | library design Tel Aviv | Israel | Case | EI LIBRARY |
| 98 | Under construction: following NET PROJECT from plans to keys | house construction Israel interior | Israel | Case | NET PROJECT |
| 99 | COI and MH21: experimental work and why it matters | experimental design studio | Global | Case | COI, MH21 |
| 100 | Ten years of projects: what Coco Atelier has learned | Coco Atelier | Global | Case | all |

## Writing standard (for every article)

- Answer the searcher's question in the first two or three sentences; AI search
  engines quote the clearest direct answer they find.
- 1,200–2,000 words where the topic deserves it; shorter is fine for narrow questions.
- Clear H2/H3 structure, a short FAQ at the end (3–5 real questions), real project
  photos with descriptive alt text, links to 2–4 related projects/articles.
- Voice: Coral's (first person where it is her opinion or experience), calm,
  precise, specific; no hype, no clichés ("elevate", "nestled", "timeless elegance").
- Title ≤ 60 characters, description ≤ 155, a short readable URL.
- Hebrew versions for Israel-focused articles once English is established.

## Information needed from Coral

- For case studies: the brief, the main constraint, two or three key decisions, and
  anything the client said about living or working there afterwards.
- Her process: stages, what clients receive, typical timeline, how remote projects work.
- Services and areas she wants to be found for (and any she doesn't want).
- Pricing approach, only as much as she is comfortable stating publicly.
- Credentials to state accurately (studies, awards, years in practice).
