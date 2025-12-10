# Frontend Architecture Guidelines - Multi-Step Quiz Project

## Architectural Overview

This project follows **Feature Sliced Design (FSD)** architecture combined with **SOLID principles** to create a clean, maintainable, and scalable frontend application for a multi-step quiz system.

## Core Principles

- **Clean Architecture**: Separation of concerns with clear layer boundaries
- **SOLID Principles**: Especially Single Responsibility and Dependency Inversion
- **KISS & DRY**: Keep it simple, don't repeat yourself
- **Feature Sliced Design**: Organized by features and business logic
- **Reusability**: Create reusable components and utilities in shared layer

## Project Structure

```
src/
├── app/                    # Application root and routing
├── views/                  # Page-level components (minimal logic)
├── widgets/                # Complex UI blocks combining features/entities
├── features/               # Business features (feature/quiz/start-quiz)
├── entities/               # Business entities (models, APIs, UI)
└── shared/                 # Reusable utilities and components
```

## Layer Guidelines

### 1. App Layer (`/app`)

**Purpose**: Application root, routing, and global configuration

**Structure**:

```
app/
├── _layout/               # Layout components
│   ├── basic/            # Basic layouts
│   └── dashboard/        # Dashboard layouts
├── _providers/           # Global providers (Redux, Theme, etc.)
├── (auth)/              # Route groups
│   ├── auth/
│   └── layout.tsx
├── (dashboard)/         # Protected routes
│   ├── quiz/
│   ├── results/
│   └── layout.tsx
├── globals.css
└── store.ts             # Global state configuration
```

**Rules**:

- Contains only routing and global configuration
- No business logic
- Layout components should be minimal and reusable

### 2. Views Layer (`/views`)

**Purpose**: Page-level components with minimal logic

**Structure**:

```
views/
├── quiz-page/
│   ├── index.ts         # Public API
│   └── ui/
│       └── quiz-page.tsx
├── results-page/
│   ├── index.ts
│   └── ui/
│       └── results-page.tsx
└── landing-page/
    ├── index.ts
    └── ui/
        └── landing-page.tsx
```

**Rules**:

- Minimal logic, mostly composition
- Import widgets and features
- Handle page-level state only
- Export through index.ts for clean imports

### 3. Widgets Layer (`/widgets`)

**Purpose**: Complex UI blocks that combine multiple features/entities

**Structure**:

```
widgets/
├── quiz-progress/
│   ├── index.ts
│   └── ui/
│       └── quiz-progress-widget.tsx
├── quiz-navigation/
│   ├── index.ts
│   └── ui/
│       └── quiz-navigation-widget.tsx
└── results-summary/
    ├── index.ts
    └── ui/
        └── results-summary-widget.tsx
```

**Rules**:

- Use only when combining multiple features/entities
- Should be self-contained
- Can import from features and entities
- Export through index.ts

### 4. Features Layer (`/features`)

**Purpose**: Business features organized by domain

**Structure**:

```
features/
├── quiz/
│   ├── start-quiz/
│   │   ├── index.ts
│   │   ├── ui/
│   │   │   └── start-quiz-form.tsx
│   │   └── hooks/
│   │       └── use-start-quiz.tsx
│   ├── answer-question/
│   │   ├── index.ts
│   │   ├── ui/
│   │   │   └── answer-question-form.tsx
│   │   └── hooks/
│   │       └── use-answer-question.tsx
│   ├── submit-quiz/
│   │   ├── index.ts
│   │   ├── ui/
│   │   │   └── submit-quiz-button.tsx
│   │   └── hooks/
│   │       └── use-submit-quiz.tsx
│   └── index.ts
├── results/
│   ├── view-results/
│   │   ├── index.ts
│   │   └── ui/
│   │       └── view-results.tsx
│   └── index.ts
└── auth/
    ├── login/
    ├── register/
    └── index.ts
```

**Rules**:

- Feature folders named as `feature/domain/specific-feature`
- Each feature should be self-contained
- Can import from entities and shared
- Export through index.ts
- Use hooks for business logic
- Keep UI components focused on presentation

### 5. Entities Layer (`/entities`)

**Purpose**: Business entities with models, APIs, and UI components

**Structure**:

```
entities/
├── quiz/
│   ├── api/
│   │   └── client/
│   │       └── quiz.api.ts
│   ├── model/
│   │   ├── quiz.types.ts
│   │   ├── quiz.interface.ts
│   │   └── use-quiz-service.tsx
│   ├── ui/
│   │   ├── quiz-card.tsx
│   │   ├── question-card.tsx
│   │   └── answer-option.tsx
│   └── index.ts
├── user/
│   ├── api/
│   │   └── client/
│   │       └── user.api.ts
│   ├── model/
│   │   ├── user.types.ts
│   │   └── use-user-service.tsx
│   ├── ui/
│   │   └── user-avatar.tsx
│   └── index.ts
└── question/
    ├── api/
    ├── model/
    ├── ui/
    └── index.ts
```

**Rules**:

- Each entity should be self-contained
- Keep entities simple - no complex business logic
- Use interfaces for type definitions
- API clients should be focused on data fetching
- UI components should be reusable
- Export everything through index.ts

### 6. Shared Layer (`/shared`)

**Purpose**: Reusable utilities, components, and configurations

**Structure**:

```
shared/
├── api/
│   ├── axios.ts
│   ├── base-query.ts
│   └── error-codes.ts
├── components/
│   ├── button.tsx
│   ├── input.tsx
│   ├── modal.tsx
│   └── loading-spinner.tsx
├── hooks/
│   ├── use-local-storage.ts
│   ├── use-debounce.ts
│   └── use-quiz-timer.ts
├── lib/
│   ├── utils.ts
│   ├── validations.ts
│   └── constants.ts
├── types/
│   ├── common.types.ts
│   └── api.types.ts
└── ui/
    └── [shadcn/ui components]
```

**Rules**:

- Should be framework-agnostic when possible
- No business logic
- Highly reusable
- Well-documented
- Tested thoroughly

## File Naming Conventions

### Components

- **PascalCase** for component files: `QuizCard.tsx`
- **kebab-case** for directories: `quiz-card/`
- **index.ts** for public API exports

### Hooks

- **camelCase** with `use-` prefix: `use-quiz-timer.tsx`
- **kebab-case** for directories: `use-quiz-timer/`

### Types/Interfaces

- **camelCase** with descriptive suffix: `quiz.types.ts`, `user.interface.ts`
- **PascalCase** for type names: `QuizQuestion`, `UserProfile`

### API Files

- **camelCase** with `.api.ts` suffix: `quiz.api.ts`
- **kebab-case** for directories: `quiz-api/`

## Import/Export Patterns

### Public API Pattern

Each layer should export through `index.ts`:

```typescript
// entities/quiz/index.ts
export type { Quiz, Question } from './model/quiz.interface'
```

### Import Order

```typescript
// 1. External libraries
// 3. Internal - entities
import React from 'react'

import { useQuery } from '@tanstack/react-query'

import { Question, Quiz } from '@/entities/quiz'
// 4. Internal - features
import { useStartQuiz } from '@/features/quiz/start-quiz'
// 2. Internal - shared
import { Button } from '@/shared/components'
import { cn } from '@/shared/lib/utils'
// 6. Internal - views
import { QuizPage } from '@/views/quiz-page'
// 5. Internal - widgets
import { QuizProgress } from '@/widgets/quiz-progress'
```

## State Management

### Redux Toolkit Query (RTK Query)

- Use for server state management
- Create API slices in entities
- Use hooks in components

```typescript
// entities/quiz/api/client/quiz.api.ts
export const quizApi = createApi({
    reducerPath: 'quizApi',
    baseQuery,
    endpoints: (builder) => ({
        getQuiz: builder.query<Quiz, string>({
            query: (id) => `/quiz/${id}`,
        }),
    }),
})

export const { useGetQuizQuery } = quizApi
```

### Local State

- Use React hooks for component state
- Use custom hooks for complex logic
- Keep state close to where it's used

## Error Handling

### API Errors

- Handle in API layer with proper error types
- Use error boundaries for component errors
- Provide user-friendly error messages

### Validation

- Use Zod for form validation
- Validate on both client and server
- Provide clear validation messages

## Testing Strategy

### Unit Tests

- Test individual functions and hooks
- Mock external dependencies
- Focus on business logic

### Integration Tests

- Test feature interactions
- Test API integrations
- Test user workflows

### Component Tests

- Test component rendering
- Test user interactions
- Test accessibility

## Performance Considerations

### Code Splitting

- Use dynamic imports for large components
- Split by routes and features
- Lazy load non-critical components

### Memoization

- Use React.memo for expensive components
- Use useMemo and useCallback appropriately
- Avoid unnecessary re-renders

### Bundle Optimization

- Tree shake unused code
- Optimize images and assets
- Use proper import paths

## Accessibility Guidelines

### Semantic HTML

- Use proper HTML elements
- Provide ARIA labels where needed
- Ensure keyboard navigation

### Focus Management

- Manage focus in modals and forms
- Provide skip links
- Ensure proper tab order

## Development Workflow

### Feature Development

1. Create entity if needed
2. Create feature structure
3. Implement UI components
4. Add business logic hooks
5. Create tests
6. Update documentation

### Code Review Checklist

- [ ] Follows naming conventions
- [ ] Proper error handling
- [ ] Accessibility considerations
- [ ] Performance optimizations
- [ ] Test coverage
- [ ] Documentation updates

## Common Patterns

### Custom Hooks Pattern

```typescript
// features/quiz/start-quiz/hooks/use-start-quiz.tsx
export const useStartQuiz = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const startQuiz = async (quizId: string) => {
        // Implementation
    }

    return { startQuiz, isLoading, error }
}
```

### API Service Pattern

```typescript
// entities/quiz/api/client/quiz.api.ts
export const quizApi = createApi({
    reducerPath: 'quizApi',
    baseQuery,
    endpoints: (builder) => ({
        getQuiz: builder.query<Quiz, string>({
            query: (id) => `/quiz/${id}`,
        }),
        startQuiz: builder.mutation<QuizSession, string>({
            query: (id) => ({
                url: `/quiz/${id}/start`,
                method: 'POST',
            }),
        }),
    }),
})
```

### Component Composition Pattern

```typescript
// widgets/quiz-progress/ui/quiz-progress-widget.tsx
export const QuizProgressWidget = () => {
  return (
    <div className="quiz-progress">
      <ProgressBar />
      <QuestionCounter />
      <Timer />
    </div>
  )
}
```

This architecture ensures your multi-step quiz application is maintainable, scalable, and follows industry best practices while keeping the code clean and organized.
