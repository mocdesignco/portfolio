# Megan O’Connor portfolio design system
Version 1 · 9 October 2026 · Reference for page-by-page revisions

## Purpose and status
Make Megan’s leadership, judgement and contribution easy for a hiring manager to find.
This is a proposed shared standard derived from the approved homepage, Riley reading treatments and existing navigation. It is not an endorsement by Flux Academy.
The CSS is opt-in. No existing page has been migrated or redesigned.
The reference is at /portfolio/design-system/. The guide and components are in this directory.

## Design principles
1. One dominant message per section. H1 introduces the page; H2 introduces a section.
2. Related information stays together. A label belongs immediately above its heading.
3. Body copy is body copy. Opening paragraphs use the same size and weight as later paragraphs.
4. Use whitespace to distinguish sections and relationships, rather than adding another text treatment.
5. Use a consistent grid. Opposite body text starts at the top of the heading, not the label.
6. Give recruiters a quick route from responsibility to evidence, then deeper detail.
7. Let the project work supply visual variety. Portfolio interface styling remains consistent.

Flux sources informing the hierarchy and alignment principles:
- https://www.flux-academy.com/blog/understanding-hierarchy-in-design
- https://www.flux-academy.com/blog/how-to-use-a-grid-in-web-design
The precise values below are our implementation choices, not values prescribed by Flux.

## Source audit
Audited current source at commit ea86bbebcf29804be9d287ecc4414b4a582b4c12 across the homepage and all six work pages.
These are source findings, not a claim of rendered testing at every viewport.

| Element | Current variation | Shared rule |
| --- | --- | --- |
| H1 | AI/creative ops max 62px; Riley max 160px; visual work max 165px | One responsive H1 scale, 40–96px |
| H2 | AI/creative ops max 42px; Ashen 70px; visual work 92px | One responsive H2 scale, 30–60px |
| Lead text | Riley 16px; Ashen up to 44px; company OS up to 34px | 16px / 1.68, same as every paragraph |
| Body text | Several 14–23px treatments | 16px / 1.68 for narrative; 14px only for captions/utility |
| Neutrals | Similar but separate page palettes | Five shared surface roles |
| Heading/body layout | Top, bottom and sticky alignment in different sections | Stacked, or heading/body aligned at their top edges |
| Section spacing | 56–150px and separate fixed values | Responsive 64–104px |
| Page measure | Max widths 1440, 1480 and 1500px; different gutters | 1440px shell, responsive 22–64px gutters |
| Summary band | Four fields; different fact/impact structures on other pages | Five fields with stable ordering |
| Navigation/footer | Already shared components | Retain existing components; align tokens during a reviewed migration |

## Typography
Font: Arial, Helvetica, sans-serif. Existing navbar keeps its monospace utility style.

| Role | Desktop/mobile range | Weight | Line height | Use |
| --- | --- | --- | --- | --- |
| H1 | clamp(40px, 6vw, 96px) | 500 | 1.04 | One page title |
| H2 | clamp(30px, 3.6vw, 60px) | 500 | 1.08 | Main sections |
| H3 | 18px | 600 | 1.3 | Genuine subsections |
| Paragraph | 16px | 400 | 1.68 | All narrative, including introduction |
| Label | 11px | 700 | 1.5 | Short uppercase section/field labels |
| Caption/utility | 14px | 400 | 1.6 | Media captions and discreet availability text |

Heading tracking: H1 −.055em, H2 −.04em. Paragraph tracking and word spacing: normal.
No large lead, oversized standalone quote, extra display subheading, or decorative project number.
Use bold only for a specific fact, decision or result that helps scanning.
Use H3 only when it introduces content, never to make an ordinary sentence look important.

### Wrapping and paragraphs
- Aim for at least two words per heading line. Check with the actual copy at 360, 390, 768, 1024 and 1440px widths.
- Balance headings. If an orphan remains, widen the heading or adjust the phrase before changing the type size. Never wrap every word group in nowrap across the site.
- Body measure: up to 56ch. Do not constrain opposing text to an unnecessarily narrow column.
- Narrative paragraphs are justified, with left-aligned final lines and automatic hyphenation, preserving Megan’s requested treatment.
- Keep normal tracking and word spacing. Browser justification necessarily redistributes spaces; inspect real paragraphs for large gaps. Rebalance the measure, wording or approved hyphenation rather than force manual spaces.
- Labels, headings, captions, navigation and short summary fields remain left aligned.
- Paragraph gap: 24px. Label-to-heading gap: 24px. Heading-to-body gap in a stacked section: 24px.
- Do not use widow/orphan CSS as a guarantee against one-word heading lines; inspect the actual rendering.

## Colour
| Token | Value | Use |
| --- | --- | --- |
| Background | #f5f4f0 | Default page surface |
| Paper | #faf9f6 | Light comparison/evidence panels |
| Soft | #e9e8e4 | Secondary grouping |
| Warm | #eeeae3 | Occasional substantial chapter |
| Dark | #151515 | Deliberate emphasis section |
| Ink | #11110f | Headings, active controls |
| Body | #45423d | Narrative |
| Muted | #65615b | Captions and supporting text |
| Divider | #d9d6cf | Subtle, nonessential separators |
| On dark | #f5f4f0 | Dark-section headings |
| Muted on dark | #c7c7c1 | Dark-section paragraphs/captions |

Use colour when the subject changes, not on every small subsection. A subsection inherits its parent surface unless a comparison or evidence panel needs grouping.
No new accent colours in the portfolio interface. Colours inside brand artwork, screenshots, diagrams and semantic data displays belong to the project and are not globally replaced.
Do not place pale divider colours around a control whose boundary is needed to identify it. Buttons use ink borders and visible keyboard focus.
Normal text must reach at least 4.5:1 contrast. Meaningful control indicators and focus states must remain visible.

## Grid and spacing
- Content shell: max 1440px including gutters; centred.
- Outer gutter: clamp(22px, 4vw, 64px).
- Section padding: clamp(64px, 7vw, 104px).
- Use spacing values 4, 8, 12, 16, 24, 32, 48, 64 and 96px; use fluid values only for section/gutter/column relationships.
- Split narrative: 0.86fr heading / 1.14fr body; gap clamp(48px, 6vw, 104px).
- Stack split sections below 800px. Shared navbar keeps its existing 600px breakpoint and 73/65px heights.
- No sticky narrative headings. Gallery viewers and the section navigator may retain their purposeful sticky/fixed behaviour.
- Respect header offset: actual header height plus 24px.
- Do not hide layout overflow to conceal oversized text.

## Two section patterns
### Stacked
Label, H2, then paragraph text on one left alignment. Best for a concise introduction or full-width visual narrative.
### Split
Label above H2 on the left. Paragraph on the right starts at the H2’s top edge.
Use the label as a full grid row; heading and body share the next row. This avoids fragile pixel padding or text-height JavaScript.
Both patterns stack on mobile. Neither adds a larger intermediate paragraph.

## At-a-glance band
Place at the bottom of the case-study hero, before the first main visual. Retain Riley’s thin top rule and small uppercase labels.
Use a semantic definition list.
- Row 1: My role / Scope / Team and stakeholders.
- Row 2: Challenge / Key outcomes, in two wider columns.
- Tablet: two columns. Mobile: one column.
- Same 16px paragraph style; left aligned because these are short factual summaries.
- Copy should state ownership, problem, breadth, collaboration and evidence.
- No invented metrics, collaborators or results. Missing information stays in draft notes, never as a live placeholder.
- Keep outcomes factual and separate personal contribution from team delivery.
- Final field lengths depend on Megan’s actual copy; review the filled band before rollout.
Selected Visual Work can use a shorter factual introduction rather than forcing an artificial challenge/outcome narrative.

## Components
### Navbar
Retain shared/navbar.css and shared/navbar.js: name links to homepage, Work goes to appropriate work links, Contact opens email. Retain the 2px progress line. Utility monospace is a deliberate navigation treatment.
### Section/project navigator
Keep Riley’s slim pale container, thin border and black active state. Numbers are navigation, never decorative headings. Generate the count from the page’s sections: five on Selected Visual Work, eight on Riley as currently structured.
Use links with visible focus and aria-current for the active destination. Track the section at the header offset; smooth-scroll with that offset. Disable motion for reduced-motion users. On mobile place a compact control in reserved space rather than over artwork.
### Buttons and text links
Outlined, square-corner controls, minimum 44px high, ink border. Black fill on hover with light text. Underlined text links for secondary actions; no new button family for every page.
Existing project destinations retain the agreed copy:
- Ashen: “Explore the creation of this brand”
- VeUP AI: “Explore the AI creative system for this brand”
Use sentence case, except proper names and acronyms.
### Media and galleries
Default artwork presentation has no added shadow, rounding or card wrapper.
Framing is purposeful: the Kinvara motion inset uses 16px rounding and one subtle shadow.
Keep original images, video framing, aspect ratios, captions and project-specific compositions unless that section is being revised.
Gallery wheel, trackpad, drag, arrow and keyboard behaviour remain a separate interaction requirement. Do not rebuild their controllers during a typography migration.
### Footer
Case studies: compact shared footer, name links home, relevant other projects and email action. Omit the current project.
Homepage: retain its existing contact invitation, discreet role availability and email. Do not repeat all project links.
Use the shared paragraph/link tokens in any future footer revision; do not add a new title scale.

## Migration plan
1. Review this reference first.
2. Start with Riley’s at-a-glance band using Megan’s actual five-field copy.
3. Revise one section or page at a time. Check heading/body relationship and real copy at desktop and mobile sizes.
4. Apply only explicitly opted-in classes, removing conflicting old rules for that component once reviewed.
5. Preserve all assets, anchors, navigation, current footer logic and gallery behaviour.
6. Keep each page migration in its own reversible commit.
7. Verify keyboard focus, anchor offsets, readable contrast, heading order, responsive wrapping and media interactions.
8. Update this guide only when a new rule has a clear purpose. A different page is not a reason to add a style.

## Files
- tokens.css: namespaced tokens and opt-in typography, layout, summary, media and control classes.
- index.html: visual specimen with clearly identified example copy.
- specimen.css / specimen.js: reference-page-only presentation and navigator demo.
- README.md: this guide and source audit.
