## 0.5: Single Page App, Sequence Diagram

```mermaid
---
title: Sequence Diagram, Single Page App
---
sequenceDiagram
    participant browser
    participant server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: the HTML document, 200 OK
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the CSS file, 200 OK
    deactivate server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: the JavaScript file, 200 OK
    deactivate server
    
    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "Saludos desde Chile!", "date": "2024-09-05T20:31:55.325Z" }, ... ], 200 OK
    deactivate server    

    Note right of browser: The browser executes the callback function that renders the notes 
```