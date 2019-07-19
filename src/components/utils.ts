const DATE_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
	// day: 'numeric',
	hour: 'numeric',
	minute: 'numeric',
	// month: 'long',
	second: 'numeric',
	timeZone: 'UTC',
	timeZoneName: 'short',
	// weekday: 'long',
	// year: 'numeric'
}
const DATE_FORMATTER = new Intl.DateTimeFormat('en-US', DATE_FORMAT_OPTIONS)

// const rtf = new Intl.RelativeTimeFormat('en', {
// 	localeMatcher: 'best fit',// other values: 'lookup'
// 	numeric: 'always',// other values: 'auto'
// 	style: 'long'// other values: 'short' or 'narrow'
// })

/*
	@param number timestamp - The numeric timestamp to convert
	@returns string - The formatted version of the timestamp using DATE_FORMATTER
 */
const prettifyTimestamp = (timestamp: number): string => DATE_FORMATTER.format(timestamp)

export { prettifyTimestamp }
