# Contributing Guidelines

This repository follows these guidelines:

- [Coding Rules](#coding-rules)
- [Commit Message Rules](#commit-message-rules)

## <a name="coding-rules"></a> Coding Rules

- All features or fixes **must be tested** by one or more unit tests.
- All public API methods **must be documented**.
- Follow [Google JavaScript Style Guide][google-javascript-style-guide].
- Use [prettier][prettier] + [eslint][eslint] to format codes automatically.
- Use [eslint-config-google][eslint-config-google] to configure eslint.

## <a name="commit-message-rules"></a> Commit Message Rules

- Follow [Angular's Commit Message Guidelines][angular-commit-message-guidelines].
- Use [commitlint][commitlint] to format commit messages.
- Use [config-angular][config-angular] to configure commitlint.

[google-javascript-style-guide]: https://google.github.io/styleguide/jsguide.html
[prettier]: https://github.com/prettier/prettier
[eslint]: https://github.com/eslint/eslint
[eslint-config-google]: https://github.com/google/eslint-config-google
[angular-commit-message-guidelines]: https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-guidelines
[commitlint]: https://github.com/conventional-changelog/commitlint
[config-angular]: https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-angular
