# v1.0.2 (Fri Dec 26 2025)

### Release Notes

#### fix nested slottables for render prop pattern [#33](https://github.com/jjenzz/slot-jsx-pragma/pull/33) ([@jjenzz](https://github.com/jjenzz))

🔥 BREAKING CHANGE: removes children-as-function API for nested slottables. this reintroduces the traversal method for finding `Slottable` in tree to enable nested slotting with the `render` prop pattern, while keeping a simple API surface. this has been released as a patch while api is stabilizing.

#### 🐛 Bug Fix

- fix nested slottables for render prop pattern [#33](https://github.com/jjenzz/slot-jsx-pragma/pull/33) ([@jjenzz](https://github.com/jjenzz))

#### Authors: 1

- Jenna Smith ([@jjenzz](https://github.com/jjenzz))

---

# v1.0.1 (Mon Dec 15 2025)

#### 🏠 Housekeeping

- add playwright tests for some initial coverage [#30](https://github.com/jjenzz/slot-jsx-pragma/pull/30) ([@jjenzz](https://github.com/jjenzz))

#### 📝 Documentation

- simplify nested slottable docs by using sibling slottable [#32](https://github.com/jjenzz/slot-jsx-pragma/pull/32) ([@jjenzz](https://github.com/jjenzz))
- small docs tweaks [#31](https://github.com/jjenzz/slot-jsx-pragma/pull/31) ([@jjenzz](https://github.com/jjenzz))

#### Authors: 1

- Jenna Smith ([@jjenzz](https://github.com/jjenzz))

---

# v1.0.0 (Sun Dec 14 2025)

#### 💥 Breaking Change

- avoid tree traversal for nested slottables [#29](https://github.com/jjenzz/slot-jsx-pragma/pull/29) ([@jjenzz](https://github.com/jjenzz))

#### 📝 Documentation

- Follow Base UI brand name [#27](https://github.com/jjenzz/slot-jsx-pragma/pull/27) ([@oliviertassinari](https://github.com/oliviertassinari))
- update note in docs about render function constraints [#28](https://github.com/jjenzz/slot-jsx-pragma/pull/28) ([@jjenzz](https://github.com/jjenzz))
- add note to docs about render function constraints [#26](https://github.com/jjenzz/slot-jsx-pragma/pull/26) ([@jjenzz](https://github.com/jjenzz))

#### Authors: 2

- Jenna Smith ([@jjenzz](https://github.com/jjenzz))
- Olivier Tassinari ([@oliviertassinari](https://github.com/oliviertassinari))

---

# v0.2.1 (Sat Dec 13 2025)

#### 🐛 Bug Fix

- simplify render prop API and fix prop merging [#25](https://github.com/jjenzz/slot-jsx-pragma/pull/25) ([@jjenzz](https://github.com/jjenzz))

#### Authors: 1

- Jenna Smith ([@jjenzz](https://github.com/jjenzz))

---

# v0.2.0 (Sat Dec 13 2025)

#### 🚀 Enhancement

- allow ejecting pragma to add custom `mergeProps` behaviour [#24](https://github.com/jjenzz/slot-jsx-pragma/pull/24) ([@jjenzz](https://github.com/jjenzz))
- add ability to support render prop pattern [#22](https://github.com/jjenzz/slot-jsx-pragma/pull/22) ([@jjenzz](https://github.com/jjenzz))

#### Authors: 1

- Jenna Smith ([@jjenzz](https://github.com/jjenzz))

---

# v0.1.4 (Fri Dec 12 2025)

#### 🏠 Housekeeping

- add MIT license [#21](https://github.com/jjenzz/slot-jsx-pragma/pull/21) ([@jjenzz](https://github.com/jjenzz))
- initial ai review clean up [#19](https://github.com/jjenzz/slot-jsx-pragma/pull/19) ([@jjenzz](https://github.com/jjenzz))
- reduce `any` types from ai output [#18](https://github.com/jjenzz/slot-jsx-pragma/pull/18) ([@jjenzz](https://github.com/jjenzz))

#### 📝 Documentation

- fix nested slottable examples [#20](https://github.com/jjenzz/slot-jsx-pragma/pull/20) ([@jjenzz](https://github.com/jjenzz))

#### Authors: 1

- Jenna Smith ([@jjenzz](https://github.com/jjenzz))

---

# v0.1.3 (Tue Dec 09 2025)

#### 🐛 Bug Fix

- add composable refs support (React 17+) [#14](https://github.com/jjenzz/slot-jsx-pragma/pull/14) ([@jjenzz](https://github.com/jjenzz))
- allow slotted child to prevent slot events [#12](https://github.com/jjenzz/slot-jsx-pragma/pull/12) ([@jjenzz](https://github.com/jjenzz))

#### 🏠 Housekeeping

- update pnpm version [#17](https://github.com/jjenzz/slot-jsx-pragma/pull/17) ([@jjenzz](https://github.com/jjenzz))
- freeze lockfile during ci [#16](https://github.com/jjenzz/slot-jsx-pragma/pull/16) ([@jjenzz](https://github.com/jjenzz))
- update changelog versioning [#11](https://github.com/jjenzz/slot-jsx-pragma/pull/11) ([@jjenzz](https://github.com/jjenzz))

#### 📝 Documentation

- fix readme demo link [#15](https://github.com/jjenzz/slot-jsx-pragma/pull/15) ([@jjenzz](https://github.com/jjenzz))

#### Authors: 1

- Jenna Smith ([@jjenzz](https://github.com/jjenzz))

---

# v0.1.2 (Sun Dec 07 2025)

#### 🏎 Performance

- reduce unnecessary recursion in pragma [#10](https://github.com/jjenzz/slot-jsx-pragma/pull/10) ([@jjenzz](https://github.com/jjenzz))

#### 🏠 Housekeeping

- separate error examples from working examples in nextjs project [#8](https://github.com/jjenzz/slot-jsx-pragma/pull/8) ([@jjenzz](https://github.com/jjenzz))

#### Authors: 1

- Jenna Smith ([@jjenzz](https://github.com/jjenzz))

---

# v0.1.0 (Sun Dec 07 2025)

#### 🚀 Enhancement

- automate release process [#7](https://github.com/jjenzz/slot-jsx-pragma/pull/7) ([@jjenzz](https://github.com/jjenzz))

#### ⚠️ Pushed to `main`

- add slot-jsx-pragma ([@jjenzz](https://github.com/jjenzz))
- initial ([@jjenzz](https://github.com/jjenzz))

#### Authors: 1

- Jenna Smith ([@jjenzz](https://github.com/jjenzz))
