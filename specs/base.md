# Base Glob Pattern Specification

Prior art:
- [https://man7.org/linux/man-pages/man7/glob.7.html](https://man7.org/linux/man-pages/man7/glob.7.html)
- [https://man7.org/linux/man-pages/man3/glob.3.html](https://man7.org/linux/man-pages/man7/glob.7.html)

## Definitions

### Pattern

A **pattern** is a string composed of literal characters and one or more
wildcard metacharacters used to match pathnames.

### Path segment

A **path segment** is a substring of a pattern delimited by the forward
slash (`/`) path separator.

### Sections (name tbd) (`static` and `dynamic`)

A pattern can be split into parts described as `static` or `dynamic`.

A sequence of path segments without any glob metacharacters are a `static` section.

If a segment contains any glob metacharacters it and any following segments are part of a `dynamic` section.

## Glob Pattern

TODO: decide what to do with windows slashes.

> glob[pattern.separator]
>
> The forward slash character (`/`) is the only path separator recognised by
> a pattern.
>
> Globbing MUST be applied to each path segment separately.
>
> A `/` in a pathname MUST NOT be matched by a `?` or `*` wildcard, nor by a character class range.

> glob[pattern.separator.no-windows-slashes]
>
> A pattern MUST NOT contain any Windows-style path separators (`\`).
>
> The backslash character is used as an escape character instead (see
> [Escape Sequences](#escape-sequences)).
