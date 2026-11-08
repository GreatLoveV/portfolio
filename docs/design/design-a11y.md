# WCAG 2.1 Contrast Check

Thresholds: **AA normal** ≥ 4.5:1 · **AA large** ≥ 3:1 · **AAA normal** ≥ 7:1 · **AAA large** ≥ 4.5:1

| Pair                     | FG        | BG        | Ratio   | AA normal | AA large | AAA normal | AAA large |
| ------------------------ | --------- | --------- | ------- | --------- | -------- | ---------- | --------- |
| text on ground           | `#E5D8C6` | `#16100C` | 13.44:1 | ✅        | ✅       | ✅         | ✅        |
| text on raised           | `#E5D8C6` | `#211A14` | 12.24:1 | ✅        | ✅       | ✅         | ✅        |
| muted on ground          | `#B8A692` | `#16100C` | 8.0:1   | ✅        | ✅       | ✅         | ✅        |
| muted on raised          | `#B8A692` | `#211A14` | 7.29:1  | ✅        | ✅       | ✅         | ✅        |
| accent on ground         | `#D5AF41` | `#16100C` | 9.01:1  | ✅        | ✅       | ✅         | ✅        |
| accent on raised         | `#D5AF41` | `#211A14` | 8.21:1  | ✅        | ✅       | ✅         | ✅        |
| ink on accent            | `#16100C` | `#D5AF41` | 9.01:1  | ✅        | ✅       | ✅         | ✅        |
| control border on ground | `#7A6A58` | `#16100C` | 3.62:1  | ❌        | ✅       | ❌         | ❌        |
| error on ground          | `#E8957F` | `#16100C` | 8.12:1  | ✅        | ✅       | ✅         | ✅        |
| success on ground        | `#AEB886` | `#16100C` | 8.98:1  | ✅        | ✅       | ✅         | ✅        |
