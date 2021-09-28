const math = require("mathjs");

const MINIMUM_NUMBER_OF_DATA_POINTS = 2;

const [THERMOMETER, HUMIDITY, MONOXIDE] = [
  "thermometer",
  "humidity",
  "monoxide",
];

const [
  ULTRA_PRECISE,
  VERY_PRECISE,
  PRECISE,
  KEEP,
  DISCARD,
  NOT_ENOUGH_DATA,
  NO_DATA,
] = [
  "ultra precise",
  "very precise",
  "precise",
  "keep",
  "discard",
  "not enough data",
  "no data",
];

const handleThermometer = (thermometerReference, data) => {
  if (data.length === 0) return NO_DATA;
  if (data.length < MINIMUM_NUMBER_OF_DATA_POINTS) return NOT_ENOUGH_DATA;

  const mean = math.mean(data);
  const standardDeviation = math.std(data);

  if (math.abs(mean - thermometerReference) <= 0.5) {
    if (standardDeviation < 3) {
      return ULTRA_PRECISE;
    } else if (standardDeviation < 5) {
      return VERY_PRECISE;
    }
  }
  return PRECISE;
};

const handleHumiditySensor = (humidityReference, data) => {
  if (data.length === 0) return NO_DATA;
  if (data.length < MINIMUM_NUMBER_OF_DATA_POINTS) return NOT_ENOUGH_DATA;

  return data.some((x) => math.abs(x - humidityReference) > 1) ? DISCARD : KEEP;
};

const handleMonoxideDetector = (monoxideReference, data) => {
  if (data.length === 0) return NO_DATA;
  if (data.length < MINIMUM_NUMBER_OF_DATA_POINTS) return NOT_ENOUGH_DATA;

  return data.some((x) => math.abs(x - monoxideReference) > 3) ? DISCARD : KEEP;
};

const isSensorNameRow = (row) => {
  return row.match(/^[a-z]+\s[a-z]+-\d*$/);
};

const isSensorReadingsRow = (row) => {
  return row.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}\s{1}\d*\.*\d*$/);
};

const isReferenceReadingsRow = (row) => {
  return row.match(/^reference/);
};

const evalateLogFile = (logContentStr) => {
  let sensorsWithReadings = {};
  let output = {};
  let currentsensorName;
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
    } else if (isSensorReadingsRow(row)) {
      sensorsWithReadings[currentsensorName].data.push(
        parseFloat(row.split(" ")[1])
      );
    } else if (isSensorNameRow(row)) {
      [type, currentsensorName] = row.split(" ");
      if (!Object.keys(sensorsWithReadings).includes(currentsensorName)) {
        sensorsWithReadings[currentsensorName] = {
          type,
          data: [],
        };
      }
    }
  });

  Object.keys(sensorsWithReadings).forEach((sensor) => {
    const { type, data } = sensorsWithReadings[sensor];
    switch (type) {
      case THERMOMETER:
        output[sensor] = handleThermometer(thermometerReference, data);
        break;
      case HUMIDITY:
        output[sensor] = handleHumiditySensor(humidityReference, data);
        break;
      case MONOXIDE:
        output[sensor] = handleMonoxideDetector(monoxideReference, data);
        break;
    }
  });
  console.log(output);
  return output;
};

module.exports = evalateLogFile;
