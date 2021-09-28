This is the first iteration of the package that can take in a file with sensor readings and reference readings and classify the sensors, based on their type, into several categories according to how precise they are and whether they should be kept or discarded.

The **evaluateLogFile** function specified in the solution design is exported from **index.js**.

On top of that, this current version is able to handle files with some irregularities in the data – in particular, files which do not start with the row with the reference readings and have insifficient data or no data for some sensors. Specifically, any sensor with exactly 1 reading will be put in the "not enough data" category.

In the future versions of this package several improvements could be made:

- It is currently assumed that rows of data are separated by the new line character (**\n**). This could change and the relevant regular expression could be put into a separate function and made more flexible.
- In the same way, some assumptions are currently made about the way the various rows of data are formatted (e.g. **<type><name>** for lines that identify sensors). This could change as well and so the relevant regular expressions could become more flexible.
- The handling of insufficient data should be extracted to a separate method to avoid code duplication.
- A package like **rewire** could be introduced to test the functions not exported by the package and so improve the testing coverage and developer experience.
- **TypeScript** could and probably should be used to make the code more readable and improve the developer experience, especially as it is dealing with arrays and objects with currently unspecified proeprties.
