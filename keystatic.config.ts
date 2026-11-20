import { config, fields, singleton } from "@keystatic/core";

// ─────────────────────────────────────────────────────────────
// The editor at stonesoup.cc/keystatic
// Locally (npm run dev) it edits files on disk; on the live site it
// saves through Keystatic Cloud, which commits to GitHub → Vercel redeploys.
// ─────────────────────────────────────────────────────────────

// Keystatic Cloud project, in the form "team-name/project-name".
const CLOUD_PROJECT = "stone-soupstonesoup/filmmaker-portfolio";

const roleOptions = [
  { label: "Director", value: "Director" },
  { label: "Producer", value: "Producer" },
  { label: "Creative", value: "Creative" },
  { label: "Assistant Director", value: "Assistant Director" },
  { label: "DP / Camera", value: "DP" },
  { label: "Editor", value: "Editor" },
  { label: "Colourist", value: "Colourist" },
] as const;

export default config({
  storage:
    process.env.NODE_ENV === "development"
      ? { kind: "local" }
      : { kind: "cloud" },
  cloud: { project: CLOUD_PROJECT },
  ui: {
    brand: { name: "Stone Soup" },
  },
  singletons: {
    portfolio: singleton({
      label: "Portfolio (projects)",
      path: "content/portfolio",
      format: { data: "yaml" },
      schema: {
        projects: fields.array(
          fields.object({
            title: fields.slug({
              name: { label: "Title", validation: { length: { min: 1 } } },
              slug: {
                label: "Page address",
                description: "The end of this project's link, e.g. baltek → stonesoup.cc/work/baltek",
              },
            }),
            url: fields.url({
              label: "Video link",
              description: "YouTube, Vimeo or Instagram reel link",
              validation: { isRequired: true },
            }),
            thumbnail: fields.image({
              label: "Cover image",
              description:
                "Cover image for the tile. Needed for Instagram reels — for YouTube, the video's own thumbnail is used if you leave this empty.",
              directory: "public/images/projects",
              publicPath: "/images/projects/",
            }),
            client: fields.text({ label: "Client" }),
            location: fields.text({ label: "Where it was shot", description: "e.g. Singapore + Vietnam" }),
            year: fields.integer({ label: "Year" }),
            category: fields.select({
              label: "Type",
              options: [
                { label: "Commercial", value: "Commercial" },
                { label: "Documentary", value: "Documentary" },
                { label: "Corporate", value: "Corporate" },
                { label: "Other", value: "Other" },
              ],
              defaultValue: "Commercial",
            }),
            format: fields.text({ label: "Format", description: "Short label, e.g. Brand spot, Regional campaign" }),
            roles: fields.multiselect({ label: "My roles", options: [...roleOptions] }),
            description: fields.text({ label: "Description", multiline: true }),
            stills: fields.array(
              fields.image({
                label: "Still",
                directory: "public/images/projects",
                publicPath: "/images/projects/",
              }),
              {
                label: "Stills — gallery on the project page",
                itemLabel: (props) => props.value?.filename ?? "Still",
              }
            ),
            stats: fields.array(
              fields.object({
                value: fields.text({ label: "Number", description: "e.g. 18, 2, 1.2M" }),
                label: fields.text({ label: "Caption", description: "e.g. Crew, Shoot days, Views" }),
              }),
              {
                label: "Quick facts — e.g. 18 Crew · 6 Cast · 2 Shoot days",
                itemLabel: (props) =>
                  [props.fields.value.value, props.fields.label.value].filter(Boolean).join(" ") || "New fact",
              }
            ),
            awards: fields.array(fields.text({ label: "Award or festival selection" }), {
              label: "Awards & festival selections",
              itemLabel: (props) => props.value || "New award",
            }),
            slide: fields.conditional(
              fields.checkbox({ label: "Show in the opening slider", defaultValue: false }),
              {
                true: fields.object({
                  left: fields.text({ label: "Big title — left side", description: "e.g. Brewmaster" }),
                  right: fields.text({ label: "Big title — right side (italic)", description: "e.g. Carlsberg × Grab" }),
                  label: fields.text({ label: "Small label above the frame", description: "e.g. Commercial" }),
                }),
                false: fields.empty(),
              }
            ),
            caseStudy: fields.conditional(
              fields.checkbox({ label: "Add brief, approach & quote", defaultValue: false }),
              {
                true: fields.object({
                  quote: fields.text({ label: "One-line quote" }),
                  brief: fields.text({ label: "The brief", multiline: true }),
                  approach: fields.text({ label: "The approach", multiline: true }),
                }),
                false: fields.empty(),
              }
            ),
          }),
          {
            label: "Projects — drag to reorder (top = first on the site)",
            slugField: "title",
            itemLabel: (props) => props.fields.title.value.name || "New project",
          }
        ),
      },
    }),
    site: singleton({
      label: "About & contact",
      path: "content/site",
      format: { data: "yaml" },
      schema: {
        tagline: fields.text({ label: "Tagline under your name", defaultValue: "Director / Producer" }),
        aboutHeadline: fields.text({ label: "About — headline", multiline: true }),
        aboutText: fields.text({ label: "About — paragraph", multiline: true }),
        yearsExperience: fields.text({ label: "Years of experience (optional)", description: "e.g. 6+ — leave empty to hide" }),
        email: fields.text({ label: "Contact email" }),
        instagram: fields.url({ label: "Instagram link" }),
      },
    }),
  },
});
