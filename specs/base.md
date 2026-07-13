# Base Glob Pattern Specification

## Keywords

- `MUST`: implementation is required to follow requirement
- `SHOULD`: implementation is not required but encouraged to follow requirement _(use `MUST` or `MAY` instead)_
- `MAY`: implementation is not required to follow requirement, but must not implement contradicting functionality
- `PENDING DECISION`: there is an open issue for discussing this requirement
- `CANDIDATE`: indicates that the requirement should possibly be moved to or changed in a specification extension
- `LOOSENED BY {link}`: the requirement is loosened in a specification extension
- `MODIFIED BY {link}`: the requirement is modified in a specification extension

Prior art:

- [https://man7.org/linux/man-pages/man7/glob.7.html](https://man7.org/linux/man-pages/man7/glob.7.html)
- [https://man7.org/linux/man-pages/man3/glob.3.html](https://man7.org/linux/man-pages/man7/glob.7.html)

## Definitions

### Pattern

A **pattern** is a string composed of literal characters and one or more
wildcard metacharacters used to match pathnames.

### Path segment

A **path segment** is a substring of a pattern delimited by the [path separator](#glob-pattern.separator).

### Sections (name tbd) (`static` and `dynamic`)

A pattern can be split into parts described as `static` or `dynamic`, depending on whether it contains any unescaped metacharacters.

A sequence of path segments without any glob metacharacters are a `static` section. (TODO: move/copy to requirement)

If a segment contains any unescaped metacharacters it and any following segments are part of a `dynamic` section. (TODO: move/copy to requirement)

### Metacharacters

Certain characters are defined as metacharacters: `*?{}[]`

## Glob Pattern

glob[pattern.separator]
The forward slash character (`/`) is the recognized path segment separator.

> glob[pattern.separator.no-windows-slashes]
>
> A Pattern MUST NOT contain any Windows-style path separators (`\`).
>
> The backslash character is instead used for escaping (see
> [Escaping](#base-glob-pattern-specification--glob-pattern--escaping)).
>
> PENDING DECISION [#5](https://github.com/43081j/standardglob/issues/5)

> glob[pattern.no-tilde-home]
>
> `~` MUST be read literally.
>
> CANDIDATE for potential glob-cli spec

### Wildcard (`*`)

glob[pattern.wildcard]
`*` MUST match any sequence of characters, including no characters, EXCEPT path separators.

References:

[bash.glob.1](https://man7.org/linux/man-pages/man7/glob.7.html#:~:text=A%20%27%2A%27%20%28not%20between%20brackets%29%20matches%20any%20string%2C%20including%20the%20empty%20string%2E)
[bash.glob.2](https://man7.org/linux/man-pages/man7/glob.7.html#:~:text=A%20%27%2F%27%20in%20a%20pathname%20cannot%20be%20matched%20by%20a%20%27%3F%27%20or%20%27%2A%27%20wildcard)
[js.picomatch](https://github.com/micromatch/picomatch#:~:text=Matches%20any%20character%20zero%20or%20more%20times%2C%20excluding%20path%20separators%2E)
[js.zeptomatch](https://github.com/fabiospampinato/zeptomatch/tree/eff2888a08e2ccc525738405c618a94e60e9d036#:~:text=Matches%20any%20character%2C%20except%20for%20the%20path%20separator%2C%20zero%20or%20more%20times)
[rust.glob](https://docs.rs/glob/latest/glob/struct.Pattern.html#:~:text=%2A%20matches%20any%20%28possibly%20empty%29%20sequence%20of%20characters)

### Drill Wildcard (TODO: naming) (`**`)

PENDING DECISION [#4](https://github.com/43081j/standardglob/issues/4)

glob[pattern.drill-wildcard]
`**` MUST match any sequence of characters, including no characters and path separators, ONLY if they are the only characters in a Segment.

glob[pattern.drill-wildcard.mixed-characters-segment]
`**` MUST be treated as `*` if there are other characters in the Segment.

glob[pattern.drill-wildcard.extra-stars]
Any extra stars immediately following `**` (e.g. `***`, `******`) MUST collapse into a single `*`. (TODO: check how this should behave)

glob[pattern.drill-wildcard.no-files]
`**` MUST NOT match any files.

References:

[bash.glob](https://man7.org/linux/man-pages/man7/glob.7.html#:~:text=A%20%27%2A%27%20%28not%20between%20brackets%29%20matches%20any%20string%2C%20including%20the%20empty%20string%2E)
[js.zeptomatch](https://github.com/fabiospampinato/zeptomatch/tree/eff2888a08e2ccc525738405c618a94e60e9d036#:~:text=Matches%20any%20character%2C%20except%20for%20the%20path%20separator%2C%20zero%20or%20more%20times)
[rust.glob](https://docs.rs/glob/latest/glob/struct.Pattern.html#:~:text=%2A%20matches%20any%20%28possibly%20empty%29%20sequence%20of%20characters)

### Single Wildcard (`?`)

glob[pattern.single-wildcard]
`?` MUST match any single character, EXCEPT path separators.

References:

[rust.glob](https://docs.rs/glob/latest/glob/struct.Pattern.html#:~:text=%3F%20matches%20any%20single%20character)

### Escaping

glob[pattern.escaping]
`\` MUST remove any Pattern-specific meaning of the next character, leaving it to be interpreted literally.

glob[pattern.escaping.self]
`\\` MUST be interpreted as the character `\`.

## Pattern Matching

_how a pattern should be matched against paths_

glob[match.full-path]
A Pattern MUST match a Path even if the Path contains segments prior to the Pattern's start.

## Pattern Expansion

_how to expand a glob pattern into its potential paths_

_e.g. `src/{foo,bar}/biz` -> `src/foo/biz, src/bar/biz`_

glob[expansion.no-infinite]
Expanding a Pattern with a Wildcard or Single Wildcard segments MUST return an error.
