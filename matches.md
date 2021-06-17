### `^(click|dblclick|main|auxiliar|secondary|left|right)\$`

- click
- dblclick
- main
- auxiliar
- secondary
- left
- right

### `^(ctrl|alt|shift|meta)\.(aux|sec)\$`

- ctrl.aux
- ctrl.sec
- alt.aux
- alt.sec
- shift.aux
- shift.sec
- meta.aux
- meta.sec

### `^((ctrl|alt|shift|meta)\.)?(main|auxiliar|secondary|left|right)\$`

### `^(click|dblclick)(\.(ctrl|alt|shift|meta))?(\.(main|auxiliar|secondary|left|right|aux|sec))?\$`

|           | `void`      | ctrl             | alt             | shift             | meta             |
| --------- | ----------- | ---------------- | --------------- | ----------------- | ---------------- |
| main      | `main`      | `ctrl.main`      | `alt.main`      | `shift.main`      | `meta.main`      |
| auxiliar  | `auxiliar`  | `ctrl.auxiliar`  | `alt.auxiliar`  | `shift.auxiliar`  | `meta.auxiliar`  |
| secondary | `secondary` | `ctrl.secondary` | `alt.secondary` | `shift.secondary` | `meta.secondary` |
| left      | `left`      | `ctrl.left`      | `alt.left`      | `shift.left`      | `meta.left`      |
| right     | `right`     | `ctrl.right`     | `alt.right`     | `shift.right`     | `meta.right`     |
