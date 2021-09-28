const evaluateLogFile = require("./index");
const {
  data,
  dataWithReferenceStringInTheMiddle,
  output,
  dataWithMultipleSetsOfReadingsPerSensor,
  outputForMultipleSetsOfReadingsPerSensor,
  dataWithSensorsWithNoData,
  outputForSensorsWithNoData,
  dataWithSensorsWithInsufficientData,
  outputForSensorsWithInsufficientData,
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

  it("evaluates correctly for data with multiple sets of readings for the same sensor", () => {
    expect(
      evaluateLogFile(dataWithMultipleSetsOfReadingsPerSensor)
    ).toStrictEqual(outputForMultipleSetsOfReadingsPerSensor);
  });

  it("evaluates correctly when some sensors have no data", () => {
    expect(evaluateLogFile(dataWithSensorsWithNoData)).toStrictEqual(
      outputForSensorsWithNoData
    );
  });

  it("evaluates correctly when some sensors have insufficient number of readings", () => {
    expect(evaluateLogFile(dataWithSensorsWithInsufficientData)).toStrictEqual(
      outputForSensorsWithInsufficientData
    );
  });
});
