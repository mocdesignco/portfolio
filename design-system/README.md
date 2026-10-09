# Megan O’Connor portfolio design system
Version 2 · 9 October 2026 · Reference for page-by-page revisions

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
| Summary band | Four fields; different fact/impact structures on other pages | Five fields in one aligned desktop row |
| Navigation/footer | Already shared components | Locked existing components; no restyling |

## Typography
Font: Arial, Helvetica, sans-serif. Existing navbar keeps its monospace utility style.

| Role | Desktop/mobile range | Weight | Line height | Use |
| --- | --- | --- | --- | --- |
| H1 | clamp(40px, 6vw, 96px) | 500 | 1.04 | One page title |
| H2 | clamp(30px, 3.6vw, 60px) | 500 | 1.08 | Main sections |
| H3 | 18px | 600 | 1.3 | Genuine subsections |
| Paragraph | 16px | 400 | 1.68 | All narrative, including introduction |
| Label | 11px | 400 | 1.5 | Muted uppercase section/field labels |
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
- One desktop row: My role / Challenge / Scope / Team and stakeholders / Key outcomes.
- Five columns share one top alignment, with thin internal dividers. Challenge and outcomes get slightly more width.
- Let the row grow taller for the copy. Do not add a second differently proportioned row or make narrative text horizontally scroll.
- Aim for one concise sentence per field. Keep the supporting evidence in the case study.
- Below 1100px: two columns. Below 600px: one column. This is a responsive adaptation, not a desktop reading carousel.
- Same 16px paragraph style; left aligned because these are short factual summaries.
- Copy should state ownership, problem, breadth, collaboration and evidence.
- No invented metrics, collaborators or results. Missing information stays in draft notes, never as a live placeholder.
- Keep outcomes factual and separate personal contribution from team delivery.
- Final field lengths depend on Megan’s actual copy; review the filled band before rollout.
Selected Visual Work can use a shorter factual introduction rather than forcing an artificial challenge/outcome narrative.

## Components
### Navbar, progress and footers: fixed decisions
Megan explicitly approved these existing components. Do not change their styling, content, positioning or behaviour during page revisions. The homepage and case-study footer treatments remain distinct.

### Navbar
Retain shared/navbar.css and shared/navbar.js: name links to homepage, Work goes to appropriate work links, Contact opens email. Retain the 2px progress line. Utility monospace is a deliberate navigation treatment.
### Section/project navigator
Make the floating section navigator a constant across the website, including pages currently missing it. Keep Riley’s slim pale container, thin border and black active state. Numbers are navigation, never decorative headings. Generate the count from the page’s sections: five on Selected Visual Work, eight on Riley as currently structured.
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
The existing footer is explicitly approved. Do not migrate or restyle it as part of this system.

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

## Why the summary and supplied cards needed refinement
The first summary mixed a three-column row and a two-column row, causing different widths and a second starting point. Unequal copy lengths amplified this. Version 2 uses one desktop row with consistent alignment.
The supplied results screenshot gives an entire three-card region a black background, oversized numbers and large empty areas. Its smaller context and separate workstream strip feel secondary and detached.
The before/after route adds several nested borders, eight narrow step cells and a separate dark theme. Different text scales and several hidden fields make scanning harder.
These are our design critiques of the supplied screenshot and inspected source, not an attributed Flux verdict.

## Background choreography
Choose surfaces by chapter rather than random decoration. A recommended starting sequence:
| Chapter | Surface | Reason |
| --- | --- | --- |
| Hero and at-a-glance | Background | Establish identity and responsibility calmly |
| Context and challenge | Paper | A slight change for the first content chapter |
| Insight and strategy | Background | Return to the main reading surface |
| Execution and evidence | Warm | Distinguish a substantial new chapter |
| Major outcome or defining conclusion | Dark, if warranted | Deliberate highest emphasis |
| Reflection and next work | Background | Return to the usual reading flow |

- This is a template to adapt to the actual narrative, not an automatic alternating CSS rule.
- Generally alternate Background with Paper or Warm at major chapter boundaries.
- Soft can replace Warm for a quieter chapter, or group a supporting panel.
- Connected subsections inherit their chapter colour. Separate them with spacing or one thin divider.
- Use at most one substantial dark section per case study as the default. No dark section is also valid.
- Black remains appropriate for the existing navigation active state and button hover; that does not mean black cards everywhere.
- An ordinary metric, workflow or tool screenshot is not automatically a dark section.
- Background sections: cards can use Paper. On Paper sections: cards can stay transparent. Inside Dark: use the inherited dark surface and light rules, not a white-card patchwork.
- No colour is assigned permanently to a client. Keep the interface neutral while artwork supplies brand colour.

## Interaction principles
Keep the point visible; progressively disclose optional depth. A recruiter should understand the contribution without finding every hover target.
All repeated components share the same 16px narrative, 14px utility text, 24px padding, thin divider and regular muted label.
Never use a fixed max-height to truncate revealed content. Native details keep complete text in the document and available without JavaScript.

### Card styles and states
| Kind | Appearance | Initially visible | Optional depth |
| --- | --- | --- | --- |
| Context card | Paper or transparent, thin border, 24px padding, square corners | Label, 18px title, one short explanation | Native details disclosure |
| Evidence/result card | Same surface and border | Metric and its definition/qualification | Measurement scope or evidence |
| Workflow step | Open ruled list or one rail, not a box inside a box | Step name, time if relevant | Longer explanation |
| Image tile | Unframed image, caption below | Image and caption | Open original or accessible viewer |
| Interactive tab | Regular 16px title, thin underline for active state | Selected point and evidence | Other points selected on click/key |

Metric text is a dedicated data role, 24–32px / 1.2 / weight 500. It is not a new paragraph style. Avoid giant data typography that competes with the page H1.
Hover/focus should have a visible affordance, such as a stronger border or underline. Static cards must not look like buttons.

### Disclosure contract
- A clear summary and plus/minus affordance remain visible.
- Fine mouse hover or keyboard focus may preview optional detail.
- Click/tap or Enter/Space pins it open. A second activation closes it.
- Moving away dismisses an unpinned preview. Do not dismiss detail while the pointer or keyboard focus is still inside.
- Support touch and keyboard; never require hover alone.
- No essential outcome, estimate label or methodology qualification is hidden.
- Allow revealed content to take its natural height; do not crop it to an arbitrary 72px or 100px.
- Whole sections are not hidden until an animation runs. Scroll entry can introduce a card once with a subtle surface/border cue.
- Auto-revealing text on entry is optional only for short secondary content; no auto-collapse as it leaves view.
- Hover, focus and pinned detail all stay inside the original card. The card grows vertically to show the complete text, with no extra box or overlay.
- Neighbouring cards remain at their own natural height. Keep short closed-card descriptions aligned, but do not stretch every card to the expanded card’s height.
- Disclosure icons have 12px of extra internal space to their right. Workflow columns additionally retain a 32px gutter before the divider.
- Label-to-H3 gap: 16px, including the evidence tab’s label and heading.
- No-JS fallback: native details remains usable; tab content is visible sequentially.

### Evidence tabs
Use creative ops’ useful pattern of one point, one explanation and its image. Refine its appearance:
- Light background and an underline active state, rather than black filled tab boxes.
- One shared evidence stage; no accumulating boxes around heading, paragraph and image.
- Title and concise 16px paragraph opposite the image. A caption identifies the evidence.
- Selecting a tab changes that point’s copy and image together.
- Buttons have role=tab, aria-selected and aria-controls; panels have role=tabpanel and aria-labelledby.
- Roving keyboard focus. Left/Right, Home/End navigate; Enter/Space activates when using manual activation. The specimen uses automatic activation for the already-loaded, small tab set.
- Do not change tabs on hover, auto-cycle, or animate the image across the screen.
- Mobile tab labels wrap to lines if necessary; never shrink them to tiny type.
- Open the image in its original size on a deliberate action.
- A full image modal additionally needs focus containment, Escape to close and focus return.

### Horizontal galleries
Reference: Selected Visual Work’s wheel, trackpad, drag and arrow handling, with Riley’s larger image formats for quieter series.
- Use a gallery when several images show distinct formats, stages or applications.
- Native horizontal trackpad and touch swipes; mouse drag with a threshold so normal image clicks remain reliable.
- Visible Previous/Next controls, keyboard Left/Right, and a position/count indicator.
- Continuous wheel/drag updates use animation frames, not a stack of queued smooth-scroll calls.
- Smooth motion for deliberate arrow actions. Reduced-motion preference uses immediate movement.
- Do not turn every vertical wheel over a page into a permanent scroll trap.
- The reference adopts Selected Visual Work’s looping controller: vertical wheel over the gallery, horizontal trackpad, mouse drag and arrows all move the image rail. Wheel deltas are batched per animation frame. Outside the gallery, page scrolling remains normal.
- The existing Selected Visual Work looping controller remains untouched. During its own review, check interaction at edges, clone accessibility and click suppression after dragging.
- Finite galleries disable navigation at boundaries. Looping galleries hide cloned items from assistive technology.
- Show a glimpse of the next image to make the series discoverable.
- Preserve each image’s intrinsic aspect ratio at a shared display height. Figures follow the actual image width, with captions aligned to the image’s left edge, not a wider minimum-width cell. Use a 16px gap above media captions. Intentional photographic crops must be reviewed individually.
- Motion media loads/plays only when visible and pauses when offscreen, in a modal or in a hidden tab. Honour reduced motion and never autoplay audio.

### Fewer images within a narrative section
Reference: Riley’s colour/typography pair and packaging composition.
- If one to three visuals explain the point, show a hero image with one or two supporting views.
- Use a simple two-column pair or a full-width image, with captions and no extra card chrome. Riley’s subtle image-only hover expansion is optional.
- Stack on mobile; preserve the reading order.
- Do not force a carousel or tabs onto two images that need comparison.
- A rounded frame and shadow are reserved for the approved Kinvara video inset; other artwork stays unframed.

### Documents and PDFs within a page
Important distinction: Riley’s current brand-guideline viewer uses rendered page images, not a PDF iframe.
Use the rendered-page approach for a predictable branded presentation; a native PDF embed is appropriate when the actual file needs its own viewer.
- A visible toolbar names the document and offers Expand/Open original or download.
- Desktop inner reading window up to 560px high; mobile around 420px. Visible scrollbar and concise instruction.
- Focusable, labelled scrolling region; native keyboard/wheel behaviour.
- Allow scrolling to return to the surrounding page at the boundary. Do not trap page scrolling indefinitely.
- Expand may remove the inner height constraint and show pages in normal document flow.
- Preserve aspect ratios. Lazy-load later page images.
- Native PDF iframe: meaningful title, browser scrolling/zoom and a visible Open PDF link for unsupported browsers.
- Load heavy PDF content on request. No autoplay, artificial slide changes or inaccessible canvas-only rendering.
- If a PDF needs visual consistency across devices, render its pages and keep the original file available.

## Version 2 reference demonstrations
The reference contains the revised five-column band, colour sequence, lighter result disclosures, open workflow comparison, three evidence tabs, horizontal image gallery, two-image comparison, rendered guideline viewer and optional native PDF preview.
Figures and visuals are reused from current case studies and are labelled as existing evidence. Summary fields remain prompts until Megan supplies actual copy.
The design-system examples do not restyle the existing case studies. Only the missing navigators are introduced as a separate component; navbar, progress and footers remain unchanged.

## Approved constants and rollout
- Keep the navbar, reading progress bar and both footer components exactly as currently approved.
- The shared section navigator is added to the homepage, Ashen & Cloud and the three VeUP case studies. Each page’s number count follows its meaningful chapters; it is not decorative typography.
- Keep the existing Riley and Selected Visual Work navigators intact until their page is specifically reviewed.
- Introduce missing navigators as a narrow, separate change, preserving the page’s typography, media, header and footer.
- Apply the revised cards, tab styling and background rhythm only during the relevant page-by-page review.

## Spacing refinement · 9 October 2026
Cards expand in place for hover, focus and tap detail. Remove floating detail panels. Plus/minus controls have a 12px internal right inset, workflow content has a 32px gutter before the column divider, and evidence labels have 16px before the H3.

Evidence-tab captions have a 16px image gap. The horizontal gallery uses intrinsic image widths and Selected Visual Work’s looping wheel/drag/arrow controller.

## Riley narrative media patterns
- Preserve three distinct options: a full content-width image, two images across the content width, and a near-full-width horizontal image. Captions sit beneath, aligned to their images, with 16px separation.
- Fine-pointer hover may enlarge the image subtly by 1.012, matching Riley. Captions stay still. Disable this motion for reduced-motion preferences and do not rely on hover to reveal information.
- The remembered scroll-over effect is a sticky layering pattern rather than necessarily parallax. Current Riley source retains media layers but overrides its sticky narrative heading to static. For a future page review, use an optional sticky heading behind advancing images, with appropriate opaque surfaces and stacking order; keep captions with their images. Do not restore it globally without reviewing the section.
- Reserve sticky layering for image-led storytelling, with ordinary stacked flow on mobile and reduced-motion settings. Recruiter-facing narrative and outcomes remain readable in normal flow.
