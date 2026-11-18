# SVG Document Viewer service pages

Static service pages for the SVG Document Viewer Chrome extension.

- [Welcome](https://anastasialekasova-hub.github.io/svg-document-viewer-pages/welcome/)
- [Uninstall feedback](https://anastasialekasova-hub.github.io/svg-document-viewer-pages/uninstall/)
- [Product feedback](https://anastasialekasova-hub.github.io/svg-document-viewer-pages/feedback/)
- [Privacy policy](https://pinwisp.com/svg-document-viewer/privacy/)

The site uses a blue accent and follows the system light/dark theme. The welcome illustration explains the Chrome toolbar and popup; it is a labelled illustration, not an extension screenshot.

The three service pages include Umami page analytics. Optional feedback submissions are handled by Google Forms. The forms preserve entered text on a network error. The forms do not request an email address or attach SVG files, file paths or page URLs.

These web pages are separate from the extension's local SVG viewing controls. The privacy policy is hosted on pinwisp.com, not in this repository.

The `sample/` folder holds three self-contained SVG drawings with no scripts, external links or web fonts. The welcome page links to them, so a new user can try the viewer on a direct HTTPS link.

GitHub Pages serves the static files from the root of the `main` branch. No build step or runtime application server is required.
