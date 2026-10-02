# Visual redesign notes

The single portfolio route at `/` uses a full-width editorial composition. It reads the API or reviewed content snapshot and shares the same contact flow. The CV remains available at `/cv` and as a PDF.

## Theme and motion

- Dark and light colors use CSS tokens. A saved choice takes precedence over the operating system preference. The toggle applies its change directly, including when browser storage is unavailable.
- Eight expertise icons automatically travel around the avatar on two rings. Hover, focus, or tap pauses the orbit and shows the companies associated with that technology in the career data. Reduced-motion preferences stop the travel.
- The career line follows scroll progress. Every entry stays readable and can expand to show contributions.

## Public visual sources

- Avatar: [SamanAziziSiyan's public GitHub profile](https://github.com/SamanAziziSiyan), served locally as an optimized 480px WebP. It is a real profile photograph, not a generated portrait.
- Webilia mark: [official Webilia favicon](https://webilia.com/wp-content/uploads/2023/08/Webilia-Sign.svg), converted to WebP.
- RTL Theme mark: [official RTL Theme favicon](https://www.rtl-theme.com/wp-content/themes/rtl-theme/assets/images/logos/favicon.png), converted to WebP.
- Panjere Studio mark: [official site favicon](https://www.panjerestudio.com/wp-content/themes/StudioPanjere/assets/images/favicon.ico), converted to WebP.
- Dalga, iGame, AKAF System, Independent work, and Radiscar use artwork supplied by the portfolio owner, converted to WebP. Backgrounds were removed from the first four. The transparent blue Radiscar wordmark is shown at its full aspect ratio on a light chip for legibility. Product screenshots retain their existing source and rights notes in `content-audit.md`.

Review use of all external brand and product imagery before public deployment. None of these visual assets implies an employer endorsement.
