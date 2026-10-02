# Visual redesign notes

The `/` route is full-width and editorial. `/demo-2` is an alternate framed composition with a visual-first identity panel, inset sections, boxed career entries, and horizontal project rows. Both routes read the same API/snapshot content and use the same contact flow. No experience or project records were changed for this redesign. The alternate route points its canonical URL at `/` and is excluded from search indexing to avoid duplicate portfolio content.

## Theme and motion

- Dark tokens are the HTML/CSS default. With no saved choice, the startup script and provider follow `prefers-color-scheme`; a saved light/dark choice takes precedence on both routes.
- The orbit uses CSS transforms with a reduced-motion stop. The career line uses one passive scroll listener, scheduled through `requestAnimationFrame`, and updates one CSS custom property. The visible career entry is emphasized while every entry stays readable.
- The layout uses Tailwind flex/grid/gap utilities for most component relationships. CSS handles tokens, ornament, timeline progress, responsive orbit geometry, and the two route compositions.

## Public visual sources

- Avatar: [SamanAziziSiyan's public GitHub profile](https://github.com/SamanAziziSiyan), served locally as an optimized 480px WebP. It is a real profile photograph, not a generated portrait.
- Webilia mark: [official Webilia favicon](https://webilia.com/wp-content/uploads/2023/08/Webilia-Sign.svg), converted to WebP.
- RTL Theme mark: [official RTL Theme favicon](https://www.rtl-theme.com/wp-content/themes/rtl-theme/assets/images/logos/favicon.png), converted to WebP.
- Panjere Studio mark: [official site favicon](https://www.panjerestudio.com/wp-content/themes/StudioPanjere/assets/images/favicon.ico), converted to WebP.
- Other employers use initials because no matching logo was verified. Product screenshots retain their existing source and rights notes in `content-audit.md`.

Review use of all external brand and product imagery before public deployment. None of these visual assets implies an employer endorsement.
