# SkillMatch (Java backend + website)

## Run
Requires JDK 17+ and Maven.

    mvn package
    java -jar target/skillmatch-1.0.jar          # then open http://localhost:8080

Optional, enables Claude (resume reading, explanations, learning tips):

    export ANTHROPIC_API_KEY=sk-ant-...          # optional: CLAUDE_MODEL (default claude-sonnet-5-5), PORT
Without a key the app uses keyword matching and template text (the documented fallback).

## Resume fallback
Resumes that are not one column (2-column / sidebar / text boxes / layout tables), scanned, password-protected,
corrupt, .doc, too large, or without standard sections (Skills, Experience, Education...) are rejected with a clear
message and a download link to `/templates/skillmatch-resume-template.docx`, which passes the same checks.

## API
- GET  /api/locations
- POST /api/analyze  (multipart: `location`, `resume`)  ->  200 results JSON, or 4xx `{error:{code,message,template?}}`

## Tests (no JUnit needed)
    mvn compile test-compile
    java -cp target/classes:target/test-classes skillmatch.Tests      # run from the project root

## Layout
`src/main/java/skillmatch` classes follow the two UML diagrams. `src/main/resources`: `opportunities.json`
(fictional sample data) and `web/` (the pages). PDF reading uses PDFBox in `PdfBoxReader.java`.
