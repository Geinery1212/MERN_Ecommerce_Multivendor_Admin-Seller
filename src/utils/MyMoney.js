import { dinero, toDecimal, subtract, allocate, toSnapshot } from 'dinero.js';
import { USD } from '@dinero.js/currencies';
//doc of Dinero.js: 
class MyMoney {
    LOCATE = 'en-US';
    CURRENCY = 'USD';
    /**
     * Converts a Dinero object to a formatted currency string.
     * 
     * @param {Object} dineroObject - The Dinero object with properties { amount, currency }.
     * @returns {string} - The price in the original currency as a string formatted to the specified decimal places.
     * @throws {Error} - Throws an error if the input does not match the expected Dinero object structure.
     */
    dineroObjectToFomattedCurrency = (dineroObject) => {
        if (!dineroObject || typeof dineroObject.amount !== 'number') {
            throw new Error('Invalid Dinero object structure');
        }

        const dineroInstance = dinero(dineroObject);
        const formatter = new Intl.NumberFormat(this.LOCATE, {
            style: 'currency',
            currency: this.CURRENCY,
        });

        return formatter.format(toDecimal(dineroInstance));
    }

    /**
  * Converts a value in cents to a Dinero.js object.
  * 
  * @param {number} cents - The monetary value in cents.
  * @param {number} scale - The scale for the Dinero object, which determines the precision (e.g., 2 for cents).
  * @returns {object} - A json object representing the monetary value.
  */
    centsToDineroObject = (cents, scale) => {
        console.log(cents);
        const intCents = parseInt(cents, 10);
        return { amount: intCents, currency: USD, scale: scale };
    }


    /**
 * Formats a decimal number into a USD currency string.
 * 
 * @param {number} decimalMoney - The decimal number representing money to be formatted.
 * @returns {string} - The formatted currency string in USD.
 * @throws {Error} - Throws an error if the input is not a valid number.
 */
    decimalToFormattedCurrency = (decimalMoney) => {
        let a = parseFloat(decimalMoney);
        if (typeof a !== 'number' || isNaN(a)) {
            throw new Error('Invalid input: decimalMoney must be a valid number.');
        }
        const formatter = new Intl.NumberFormat(this.LOCATE, {
            style: 'currency',
            currency: this.CURRENCY
        });

        return formatter.format(a);
    }

    /**
* Converts a price from cents to the original currency value.
* 
* @param {number} cents - The price in cents as an integer.
* @param {number} [fractionDigits=2] - The number of decimal places to use in the output (default is 2).
* @returns {string} - The price in the original currency as a string formatted to the specified decimal places.
* @throws {Error} - Throws an error if the input is not a valid integer.
*/
    centsToFomattedCurrency(cents, fractionDigits = 2) {
        // Ensure the cents value is a valid integer
        if (!Number.isInteger(cents)) {
            cents = 0;
            // throw new Error("Invalid cents input. Please provide a valid integer.");
        }

        let currency = cents / 100;

        const formatter = new Intl.NumberFormat(this.LOCATE, {
            style: 'currency',
            currency: this.CURRENCY,
            maximumFractionDigits: fractionDigits
        });

        return formatter.format(currency);
    }

    /**
 * Applies a commission discount to the given price.
 * 
 * @param {number} pri - The the original price in cets.
 * @param {number} discount - The discount percentage to apply.
 * @returns {String} - The price after the discount is applied as a string formatted.
 */
    applyDiscountToFormattedCurrency = (pri, discount) => {
        const d1 = dinero({ amount: pri, currency: USD, scale: 2 });
        if (typeof discount !== 'number' || discount < 0 || discount > 100) {
            throw new Error('Invalid discount: must be a number between 0 and 100.');
        }

        const withoutDiscount = 100 - discount;
        const [discountAmount, remainingAmount] = allocate(d1, [discount, withoutDiscount]);

        const formatter = new Intl.NumberFormat(this.LOCATE, {
            style: 'currency',
            currency: this.CURRENCY,
        });

        const d2 = subtract(d1, discountAmount);
        return formatter.format(toDecimal(d2));
    }


    /**
* Applies a commission discount to the given price.
* 
* @param {number} pri - The the original price in cets.
* @param {number} discount - The discount percentage to apply.
* @returns {int} - The price after the discount is applied as an int.
*/
    applyDiscountToCents = (pri, discount) => {
        const d1 = dinero({ amount: pri, currency: USD, scale: 2 });
        if (typeof discount !== 'number' || discount < 0 || discount > 100) {
            throw new Error('Invalid discount: must be a number between 0 and 100.');
        }

        const withoutDiscount = 100 - discount;
        const [discountAmount, remainingAmount] = allocate(d1, [discount, withoutDiscount]);
        return toSnapshot(remainingAmount).amount;
    }

}
export default MyMoney;