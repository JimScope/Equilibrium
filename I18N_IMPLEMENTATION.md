# Internationalization Implementation

## Overview
Successfully implemented internationalization (i18n) support for the Chemical Equation Balancer project with the following languages:
- **English (en)** - Default language
- **Spanish (es)**
- **Portuguese (pt)**
- **Chinese (zh)**

## Implementation Details

### 1. Dependencies Installed
```bash
npm install i18next react-i18next i18next-browser-languagedetector
```

### 2. File Structure
```
frontend/src/
├── i18n.ts                           # i18n configuration
├── locales/
│   ├── en/translation.json           # English translations
│   ├── es/translation.json           # Spanish translations
│   ├── pt/translation.json           # Portuguese translations
│   └── zh/translation.json           # Chinese translations
└── components/
    └── LanguageSelector.tsx          # Language switcher component
```

### 3. Configuration
The i18n configuration (`src/i18n.ts`) includes:
- **Language Detection**: Automatically detects user's browser language
- **Fallback Language**: English (en) as the default fallback
- **Resources**: All translation files for supported languages

### 4. Translation Keys

#### App Level (`app.*`)
- `title`: Application title
- `donate`: Donate button
- `help`: Help button
- `system_operational`: Backend status message
- `backend_hibernating`: Backend hibernating message
- `backend_ready`: Backend ready message
- `backend_sleeping`: Backend sleeping message

#### Balancer Component (`balancer.*`)
- `title`: Main heading
- `subtitle`: Subtitle description
- `error_generic`: Generic error message
- `error_server`: Server connection error
- `input_label`: Input field label
- `input_placeholder`: Input placeholder text
- `button_balance`: Balance button text
- `formatted_input_title`: Formatted input section title
- `formatted_input_placeholder`: Placeholder for formatted input
- `balanced_result_title`: Results section title
- `balanced_result_placeholder`: Placeholder for results
- `fractional_toggle_label`: Fractional coefficients toggle label
- `copy_success_equation`: Toast message for equation copy
- `copy_success_result`: Toast message for result copy
- `copy_title_equation`: Tooltip for equation copy button
- `copy_title_result`: Tooltip for result copy button

### 5. Updated Components

#### Components with i18n support:
- `App.tsx` - Main application header and messages
- `ChemicalEquationBalancer.tsx` - Main balancer component
- `EquationInputForm.tsx` - Input form labels and placeholders
- `FormattedInputDisplay.tsx` - Formatted equation display
- `BalancedResultDisplay.tsx` - Results display and toggle labels
- `LanguageSelector.tsx` - **NEW** - Language switcher in header

### 6. Language Selector
A dropdown component in the header allows users to switch between languages:
- Displays current language with flag emoji
- Hover to reveal language options
- Click to change language instantly
- Responsive design (shows only flag on mobile)

## Usage

### Accessing translations in components:
```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  
  return <h1>{t('app.title')}</h1>;
}
```

### Changing language programmatically:
```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { i18n } = useTranslation();
  
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };
}
```

## Browser Language Detection
The application automatically detects the user's browser language and displays content in that language if supported. Otherwise, it defaults to English.

## Future Enhancements
To add more languages:
1. Create new translation file in `src/locales/{language-code}/translation.json`
2. Add all translation keys with appropriate translations
3. Import the file in `src/i18n.ts`
4. Add the language to resources configuration
5. Add the language option to `LanguageSelector.tsx`

## Testing
Test different languages by:
1. Using the language selector in the header
2. Changing browser language settings
3. Using browser console: `i18n.changeLanguage('es')`
