const evaluateLogFile = require("./index");
const { data, output } = require("./sampleData");

test("evaluates correctly for the initial data", () => {
  expect(evaluateLogFile(data)).toStrictEqual(output);
});
