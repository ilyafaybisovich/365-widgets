This is the first iteration of the package that can take in a file with sensor readings and reference readings and classify the sensors, based on their type, into several categories according to how precise they are and whether they should be kept or discarded.

The **evaluateLogFile** function specified in the solution design is exported from **index.js**.

The basic logic is the following. First, the input string is split into rows of data, each of which is handled in a particular way. The single reference data row is split into indvidual reference readings. For the other 2 types an intermediate object is created. The lines identifying individual sensors are used to add new properties to this object – the sensor name becomes a key in this intermediate object while the sensor type becomes a property on the object representing the value of that key. The lines containing readings for the sensors are used to store these data against the key representing that sensor. Finally, a result object is populated with sensor names as keys and their classification as values (computed based on the sensor's type and the readings – **mathjs** package is used to take care of the relevant calculations).

On top of that, this current version is able to handle files with some irregularities in the data – in particular, files which **do not start with the row with the reference readings** and have **insufficient data** or **no data** for some sensors. Specifically, any sensor with exactly 1 reading will be put in the "not enough data" category – this of course can and should change and this threshold is chosen for illustration purposes.

In the future versions of this package several improvements could be made:

- It is currently assumed that rows of data are separated by the new line character (**\n**). This could change and the relevant regular expression could be put into a separate function and made more flexible.
- In the same way, some assumptions are currently made about the way the various rows of data are formatted (e.g. **<type><name>** for lines that identify sensors). This could change as well and so the relevant regular expressions could become more flexible.
- The handling of insufficient data should be extracted to a separate method to avoid code duplication.
- A package like **rewire** could be introduced to test the functions not exported by the package and so improve the testing coverage and developer experience.
- **TypeScript** could and probably should be used to make the code more readable and improve the developer experience, especially as it is dealing with arrays and objects with currently unspecified proeprties.
