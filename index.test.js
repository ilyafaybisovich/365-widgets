const evaluateLogFile = require("./index");
const {
  data,
  dataWithReferenceStringInTheMiddle,
  output,
  dataWithMultipleSetsOfReadingsPerInstrument,
  outputForMultipleSetsOfReadingsPerInstrument,
  dataWithInstrumentsWithNoData,
  outputForInstrumentsWithNoData,
  dataWithInstrumentsWithInsufficientData,
  outputForInstrumentsWithInsufficientData,
} = require("./sampleData");

describe("evaluateLogFile", () => {
  it("evaluates correctly for the initial data", () => {
    expect(evaluateLogFile(data)).toStrictEqual(output);
  });
  it("evaluates correctly for data with reference string in the middle of the file", () => {
    expect(evaluateLogFile(dataWithReferenceStringInTheMiddle)).toStrictEqual(
      output
    );
  });
  it("evaluates correctly for data with multiple sets of readings for the same instrument", () => {
    expect(
      evaluateLogFile(dataWithMultipleSetsOfReadingsPerInstrument)
    ).toStrictEqual(outputForMultipleSetsOfReadingsPerInstrument);
  });
  it("evaluates correctly when some instruments have no data", () => {
    expect(evaluateLogFile(dataWithInstrumentsWithNoData)).toStrictEqual(
      outputForInstrumentsWithNoData
    );
  });

  it("evaluates correctly when some instruments have insufficient number of readings", () => {
    expect(
      evaluateLogFile(dataWithInstrumentsWithInsufficientData)
    ).toStrictEqual(outputForInstrumentsWithInsufficientData);
  });
});
