# Q4 Inc. Front End Developer Test

## Specific Notes

By default the implementation uses the layout shown in the demo screenshot and the original dataset file.

One of the evaluation criterias is how the implementation will 'scale as more reports are added over time.' I've created three other versions of the page which can be seen by editing the call to `reportsWidget.init()` and the source data file.

Import `datasetLarge.js` instead of `dataset.js` in `index.html` to see how the view looks with a larger number of reports.

And modify `mode` in `reportsWidget.init(data: Object, mode: String)` to see the different variations. 

Mode can be:
- `null`: Uses the standard layout shown in the test screenshot provided by Q4.
- `'byDecade'`: Provides headers seperating previous decades from the current decade. This doesn't make the page shorter, but it does allow for better scannability when users are scrolling. Is dependent on data providing year and in a sorted format.
- `'byRecency'`: Will show the first six annual reports in a grid, showing the remaining reports in a list format to save on visual space.
- `'byShowMore'`: Will show a Show More button that reveals more annual reports upon clicking.

In all of these cases, the goal was to provide an alternative that still kept to the spirit of the exercise which was to present the annual reports in a grid format.
