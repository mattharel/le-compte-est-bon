const possibilites = require("../util/combinaison");
const testPossible = require("../util/combinaison");
/* test("1 et 2 donne 3, -2, 2", () => {
  expect(possibilites(1, 2)).toStrictEqual([3, -1, 2]);
}); */

test("affichage", () => {
  expect(testPossible()).toBeCalled();
});
