// eslint.config.js
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default [
    // Ignoriere Build-/Infra-Kram
    { ignores: ['dist/**', 'coverage/**', 'node_modules/**', 'etc/**', '.github/**'] },

    // JS-Basisregeln
    js.configs.recommended,

    // TypeScript-Empfehlungen (ohne Type-Checking -> schnell & robust in CI)
    ...tseslint.configs.recommended,

    // TS-spezifische Settings/Regeln
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: { ...globals.node },
        },
        rules: {
            // Dein Projektstil:
            'no-console': 'off',
        },
    },

    // Test-Dateien: Vitest-Globals erlauben
    {
        files: ['**/*.test.ts', 'test/**/*.ts'],
        languageOptions: {
            globals: {
                ...globals.node,
                describe: 'readonly',
                it: 'readonly',
                expect: 'readonly',
                beforeAll: 'readonly',
                afterAll: 'readonly',
                afterEach: 'readonly',
            },
        },
        rules: {},
    },

    // Kollisionen mit Prettier vermeiden
    {
        rules: {
            ...{ }, // hier nichts nötig – config-prettier reicht
        },
    },
];
