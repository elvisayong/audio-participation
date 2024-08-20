
**GERMAN BELOW**

# Audio Participation Project


Welcome to the Audio Participation Project! This is a web-based application I designed to facilitate citizen participation in urban planning by allowing users to submit voice opinions through audio recordings on various development plans.

## Project Overview

This application allows users to:

- View urban planning projects and submit their voice opinions.
- Admins can manage these projects and respond to the submitted opinions.
- Users can also check the status of their submitted opinions.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Django REST Framework
- **Database**: SQLite (for development)
- **Testing Frameworks**: Cypress, Playwright, Postman
- **CI/CD**: GitHub Actions

## Testing Focus

### Goal

My primary goal with this project is to carry out comprehensive end-to-end (E2E) tests using different technologies, such as Cypress and Playwright, and to integrate these tests seamlessly into the development process. I have also written API tests for user authentication using Postman and integrated them into the project.

### 1. Cypress E2E Tests (POM Model)

I have implemented Cypress E2E tests using the Page Object Model (POM) to ensure clean, maintainable, and reusable test code. These tests cover essential user flows, including:

- User login, logout, and registration.
- Navigating the dashboard.
- Submitting and managing opinions.
- Admin actions like replying to opinions.

### 2. Playwright Tests

In addition to Cypress, I use Playwright for cross-browser testing. Playwright ensures that the application functions correctly across different browsers, adding robustness to the testing process and ensuring a consistent user experience.

### 3. API Tests with Postman

I have also written two API tests for user authentication using Postman. These tests verify that the authentication endpoints work correctly, and I have exported the Postman collection into the project repository for easy integration and reuse.

### 4. CI/CD Pipeline Integration

I have set up a CI/CD pipeline using GitHub Actions to maintain code quality and automate the execution of Cypress tests with every pull request (PR). The pipeline is configured to:

- **Run Cypress Tests**:
  - Automatically executes Cypress E2E tests for every PR, ensuring that any code changes do not break the application's core functionalities.

- **Feedback in Pull Requests**:
  - The pipeline provides direct feedback in the PR, ensuring that all Cypress tests pass before any code is merged into the main branch.

## Future Plans

I plan to further enhance the testing and deployment process by:

- **Automated Deployment**:
  - After successful tests, I aim to automate the deployment of the application to a Kubernetes cluster using Docker. This will ensure that the latest version of the application is always live in the testing environment.

- **Integration of Other Tests**:
  - In the future, I plan to integrate Playwright and Postman API tests into the CI/CD pipeline to ensure comprehensive automated testing across all layers of the application.

## Project Structure

- **`audio-participation-frontend/`**: Contains the React frontend code.
- **`audio_participation_backend/`**: Contains the Django backend code.
- **`.github/workflows/`**: Contains GitHub Actions workflows for the CI/CD pipeline.
- **`cypress/`**: Contains Cypress tests and configuration files (POM model).
- **`playwright/`**: Contains Playwright tests and configuration files.
- **`postman/`**: Contains the exported Postman collection for API testing.

# Audio-Beteiligungsprojekt

Willkommen beim Audio-Beteiligungsprojekt! Diese webbasierte App habe ich entwickelt, um Bürgerbeteiligung an der Stadtplanung einfacher zu machen. Nutzer können hier ihre Meinung zu verschiedenen Bauprojekten als Sprachnachrichten abgeben.

## Projektübersicht

Diese Anwendung ermöglicht es Nutzern:

- Stadtplanungsprojekte anzusehen und ihre Meinung als Sprachnachricht abzugeben.
- Admins können diese Projekte verwalten und auf die eingegangenen Meinungen antworten.
- Nutzer können den Status ihrer abgegebenen Meinungen einsehen.

## Verwendete Technologien

- **Frontend**: React.js
- **Backend**: Django REST Framework
- **Datenbank**: SQLite (für die Entwicklung)
- **Test-Frameworks**: Cypress, Playwright, Postman
- **CI/CD**: GitHub Actions

## Fokus auf Tests

### Ziel

Mein Hauptziel mit diesem Projekt ist es, umfassende End-to-End-Tests (E2E) mit verschiedenen Technologien wie Cypress und Playwright durchzuführen und diese Tests  in den Entwicklungsprozess zu integrieren. Außerdem habe ich API-Tests für die User-Authentifizierung mit Postman geschrieben und in das Projekt eingebunden.

### 1. Cypress E2E Tests (POM-Modell)

Ich habe Cypress E2E-Tests mit dem Page Object Model (POM) implementiert, reusable Testcode zu gewährleisten. Diese Tests decken wichtige Userabläufe ab, wie zum Beispiel:

- Anmeldung, Abmeldung und Registrierung.
- Navigation durch das Dashboard.
- Abgabe und Verwaltung von Meinungen.
- Admin-Aktionen wie das Antworten auf Meinungen.

### 2. Playwright Tests

Zusätzlich zu Cypress nutze ich Playwright, um die Anwendung in verschiedenen Browsern zu testen. Das stellt sicher, dass die Anwendung überall richtig funktioniert und bietet zusätzliche Sicherheit.

### 3. API-Tests mit Postman

Ich habe auch zwei API-Tests für die User-Authentifizierung mit Postman geschrieben. Diese Tests prüfen, ob die Authentifizierungs-Endpoints korrekt funktionieren. Die Postman-Collection habe ich ins Projekt eingebunden.

### 4. CI/CD-Pipeline-Integration

Ich habe eine CI/CD-Pipeline mit GitHub Actions eingerichtet, um die Codequalität zu sichern und Tests automatisch bei jedem neuen Pull Request durchzuführen. Die Pipeline ist so konfiguriert, dass sie:

- **Cypress-Tests ausführt**:
  - Führt automatisch Cypress E2E-Tests für jeden PR aus und stellt sicher, dass Codeänderungen die Hauptfunktionen der Anwendung nicht beeinträchtigen.

- **Feedback in Pull Requests**:
  - Die Pipeline gibt direktes Feedback im PR, um sicherzustellen, dass alle Cypress-Tests bestanden sind, bevor Code in den Hauptzweig gemerged wird.

## Zukünftige Pläne

Ich plane, den Test- und Deployment weiter zu verbessern durch:

- **Automatisierte Bereitstellung**:
  - Nach erfolgreichen Tests möchte ich die Anwendung automatisch in einem Kubernetes-Cluster mit Docker bereitstellen. Dies stellt sicher, dass immer die neueste Version der Anwendung in der Testumgebung verfügbar ist.

- **Integration weiterer Tests**:
  - In Zukunft plane ich, die Playwright- und Postman API-Tests in die CI/CD-Pipeline zu integrieren, um eine umfassende automatisierte Testabdeckung der gesamten Anwendung zu gewährleisten.

## Projektstruktur

- **`audio-participation-frontend/`**: Enthält den React-Frontend-Code.
- **`audio_participation_backend/`**: Enthält den Django-Backend-Code.
- **`.github/workflows/`**: Enthält GitHub Actions Workflows für die CI/CD-Pipeline.
- **`cypress/`**: Enthält Cypress-Tests und Konfigurationsdateien (POM-Modell).
- **`playwright/`**: Enthält Playwright-Tests und Konfigurationsdateien.
- **`postman/`**: Enthält die exportierte Postman-Collection für API-Tests.


