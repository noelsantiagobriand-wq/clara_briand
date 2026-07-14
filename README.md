# Academic Website Template

A fully static academic website template designed for mathematicians.
The website is built with **HTML**, **CSS**, and **JavaScript**, making it easy to host on **GitHub**. Almost all personal information is stored in JSON files, allowing the website to be reused by simply replacing the data in the files.

## Website Structure

```text
.
├── .github/
│   └── workflows
│       └── build.yml
├── css/
│   └── style.css
│
├── data/
│   ├── profile.json
│   ├── papers.json
│   ├── collaborators.json
│   └── site.json
│
├── images/
│   ├── ninja.jpg
│
├── js/
│   ├── profile.js
│   ├── papers.js
│   └── collaborators.js
│
├── index.html
├── papers.html
├── collaborators.html
├── contact.html
│
├── robots.txt
├── sitemap.template.xml
├── sitemap.xml
└── README.md
```
## Quick Start

### 1. Duplicate the GitHub repository

Create a new repository.

For a personal GitHub Pages website, name it:

```text
username.github.io
```

or use any repository name if you prefer using:

```text
https://username.github.io/repository-name/
```

---

### 2. Enable GitHub Pages

Open

```text
Settings
→ Pages
```

Select

```text
Deploy from a branch
```

Choose

```text
Branch: main
Folder: / (root)
```

Save.

---

### 3. Replace the data files

Everything is designed so that most customization happens in the `data` folder.

---

## profile.json

Contains all personal information.

Examples include:

* Name
* Academic title
* Department
* University
* Email
* Office
* Biography
* Research interests
* Social links (ORCID, Google Scholar, etc.)

---

## papers.json

Contains every publication.

Each paper stores information such as:

* Title
* Authors
* Year
* Publication type
* Journal or conference
* PDF
* DOI
* arXiv
* BibTeX

Adding a paper only requires adding another JSON object.

---

## collaborators.json

Contains research collaborators.

Typical information includes:

* Name
* Institution
* Country
* Website
* ORCID
* Research areas

---

## site.json

Contains website-wide settings.

Example:

```json
{
    "siteTitle": "Jane Doe",
    "baseUrl": "https://janedoe.github.io",
    "description": "Personal academic website"
}
```
Change the title with your name, change the url, and, if you want, change the description.
---

## Images

Replace the image inside

```text
images/
```

with your own image.

---

## Customizing the Website

Most users will only edit the four JSON files.

The HTML pages normally do not need to be modified.

If desired, you can also customize:

* Fonts
* Colours
* Layout
* Navigation
* Sidebar

inside

```text
css/style.css
```

---

## GitHub Pages

The website works directly with GitHub Pages.

No installation, package manager, build step, or server is required.

Simply push your changes to GitHub.
