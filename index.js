const math = require("mathjs");

const handleThermometer = (thermometerReference, data) => {
  if (data.length === 0) return "no data";
  if (data.length === 1) return "not enough data";

  const mean = math.mean(data);
  const standardDeviation = math.std(data);

  if (math.abs(mean - thermometerReference) < 0.5) {
    if (standardDeviation < 3) {
      return "ultra precise";
    } else if (standardDeviation < 5) {
      return "very precise";
    }
  }
  return "precise";
};

const handleHumiditySensor = (humidityReference, data) => {
  if (data.length === 0) return "no data";
  if (data.length === 1) return "not enough data";

  return data.some((x) => math.abs(x - humidityReference) > 1)
    ? "discard"
    : "keep";
};

const handleMonoxideDetector = (monoxideReference, data) => {
  if (data.length === 0) return "no data";
  if (data.length === 1) return "not enough data";

  return data.some((x) => math.abs(x - monoxideReference) > 3)
    ? "discard"
    : "keep";
};

const isInstrumentNameRow = (row) => {
  return row.match(/^[a-z]+\s[a-z]+-\d*$/);
};

const isInstrumentReadingsRow = (row) => {
  return row.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}\s{1}\d*\.*\d*$/);
};

const isReferenceReadingsRow = (row) => {
  return row.match(/^reference/);
};

const [THERMOMETER, HUMIDITY, MONOXIDE] = [
  "thermometer",
  "humidity",
  "monoxide",
];

const evalateLogFile = (logContentStr) => {
  let instrumentsWithReadings = {};
  let output = {};
  let currentInstrumentName;
  let [thermometerReference, humidityReference, monoxideReference] = [, ,];

  const rowsOfData = logContentStr.split("\n");

  rowsOfData.forEach((row) => {
    if (isReferenceReadingsRow(row)) {
      [
        ,
        thermometerReference,
        humidityReference,
        monoxideReference,
      ] = row.split(" ").map(parseFloat);
    } else if (isInstrumentReadingsRow(row)) {
      instrumentsWithReadings[currentInstrumentName].data.push(
        parseFloat(row.split(" ")[1])
      );
    } else if (isInstrumentNameRow(row)) {
      [type, currentInstrumentName] = row.split(" ");
      if (
        !Object.keys(instrumentsWithReadings).includes(currentInstrumentName)
      ) {
        instrumentsWithReadings[currentInstrumentName] = {
          type,
          data: [],
        };
      }
    }
  });

  Object.keys(instrumentsWithReadings).forEach((instrument) => {
    const { type, data } = instrumentsWithReadings[instrument];
    switch (type) {
      case THERMOMETER:
        output[instrument] = handleThermometer(thermometerReference, data);
        break;
      case HUMIDITY:
        output[instrument] = handleHumiditySensor(humidityReference, data);
        break;
      case MONOXIDE:
        output[instrument] = handleMonoxideDetector(monoxideReference, data);
        break;
    }
  });

  return output;
};

module.exports = evalateLogFile;
