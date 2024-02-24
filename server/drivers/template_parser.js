/**
 * @author Herlangga Sefani {@link https://github.com/gaibz}
 * @date 2024-Feb-24/02/24
 * @package exsvel
 * @path server/drivers/template_parser.js
 */

const fs = require('fs');

/**
 * Fungsi untuk mengganti nilai variabel dalam template
 * @param {string} template - Template yang akan diubah
 * @param {Object} replacements - Objek yang berisi variabel dan nilainya
 */
function parseTemplate(template, replacements) {
    let result = template;
    for (const [key, value] of Object.entries(replacements)) {
        result = result.replace(new RegExp('\\$\\{' + key + '\\}', 'g'), value);
    }
    return result;
}

/**
 * Auto Create file from template
 * @param {String} from_file - File template
 * @param {String} to_file - Output file
 * @param {Object} replacements - Object key value to replace
 * @example :
 * autoCreate('template.js', 'user.js', {
 *    model_name: 'User',
 * })
 */
function autoCreate(from_file, to_file, replacements) {
    let template = fs.readFileSync(from_file, 'utf8');
    let result = parseTemplate(template, replacements);
    fs.writeFileSync(to_file, result);
}


module.exports = {
    parseTemplate,
    autoCreate
}