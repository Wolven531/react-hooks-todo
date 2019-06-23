const MONEY_FORMAT_OPTIONS: Intl.NumberFormatOptions = { currency: 'USD', maximumFractionDigits: 0, minimumFractionDigits: 0, style: 'currency' }

/*
	@param number amount - The numeric money amount
	@returns string - The formatted version of the money
 */
const monify = (amount: number): string => amount.toLocaleString('en-US', MONEY_FORMAT_OPTIONS)

export { monify }
