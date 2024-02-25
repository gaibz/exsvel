/**
 * @author Herlangga Sefani {@link https://github.com/gaibz}
 * @date 2024-Feb-25
 * @package exsvel
 * @path server/drivers/QueryParser.js
 */

const {Op} = require("sequelize");


function toSnakeCase(str) {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}

function toCamelCase(str) {
    return str.replace(/_./g, letter => letter[1].toUpperCase());
}

/**
 * Parse query string to object
 * @param {String} queryString
 * @returns {{filter: {}, sort_by: {}, search: string, page: string, per_page: string, fields: []}}
 */
function parseQueryString(queryString) {

    let params = {
        filter : {},
        // page: '1',
        // per_page: '10',
        // sort_by: {},
        // search: '',
        // fields: []
    };

    queryString.substr(1).split('&').forEach(pair => {
        const [key, value] = pair.split('=');
        const decodedKey = key;
        let decodedValue = decodeURIComponent(value || '');

        if (decodedKey.includes('[') && decodedKey.includes(']') && decodedKey.includes('filter')) {
            // Jika kunci berada di dalam tanda kurung siku (seperti pada filter[another_field]),
            // maka pecah kunci dan buat objek untuk menyimpannya
            const regex = /\[(.*?)\]/;
            const match = regex.exec(decodedKey);
            if (decodedValue.includes(',')) {
                decodedValue = decodedValue.split(',');
            }
            if (match) {
                const innerKey = match[1];
                if (params.filter[innerKey]) {
                    // Jika kunci sudah ada sebelumnya, ubah nilai menjadi array
                    if (!Array.isArray(params.filter[innerKey])) {
                        params.filter[innerKey] = [params.filter[innerKey]];
                    }
                    params.filter[innerKey].push(decodedValue);
                } else {
                    params.filter[innerKey] = decodedValue;
                }

                return; // Lanjutkan ke pair selanjutnya
            }
        }

        // Jika bukan kunci dalam tanda kurung siku, proses seperti biasa
        if (decodedValue.includes(':')) {
            // Jika nilai berisi tanda ":" (seperti pada sort_by=id:desc),
            // maka pecah nilai berdasarkan tanda ":" dan buat objek untuk menyimpannya
            const [innerKey, innerValue] = decodedValue.split(':');
            decodedValue = { [innerKey]: innerValue };
        } else if (decodedValue.includes('[') && decodedValue.includes(']')) {
            // Jika nilai berada di dalam tanda kurung siku (seperti pada filter[another_field]=[another_value,another_value2]),
            // maka pecah nilai dan ubah menjadi array
            const regex = /\[(.*?)\]/;
            const match = regex.exec(decodedValue);
            if (match) {
                decodedValue = match[1].split(',');
            }
        } else if (decodedValue.includes(',')) {
            decodedValue = decodedValue.split(',');
        }

        if (params[decodedKey]) {
            // Jika kunci sudah ada sebelumnya, ubah nilai menjadi array
            if (!Array.isArray(params[decodedKey])) {
                params[decodedKey] = [params[decodedKey]];
            }
            params[decodedKey].push(decodedValue);
        } else {
            params[decodedKey] = decodedValue;
        }
    });

    return {
        filter: params.filter || {},
        page: params.page || '1',
        per_page: params.per_page || '10',
        sort_by: params.sort_by || {},
        search: params.search || '',
        fields: params.fields || []
    };
}


/**
 * Parse query string into model query
 * @param {String} query_string
 * @param {Array} searchable_columns
 * @param {Object} append_where
 * @returns {{offset: number, limit: number, where: {}, order: *[]}}
 */
function parseIntoModelQuery(query_string, searchable_columns = [], append_where = {}) {
    let params = parseQueryString(query_string);
    let modelQuery = {
        where: {},
        limit: 10,
        offset: 0,
        order: []
    };

    let where = {};

    if(params.filter) {
        // since filter is with customized key value pairs, then we need to loop through it
        Object.entries(params.filter).forEach(([key, value]) => {
            if(typeof value === 'object') {
                where[key] = {[Op.in]: value};
            }
            else if(value.includes(':gt:')) {
                where[key] = {[Op.gt]: value.split(':gt:')[1]};
            }
            else if(value.includes(':lt:')) {
                where[key] = {[Op.lt]: value.split(':lt:')[1]};
            }
            else if(value.includes(':gte:')) {
                where[key] = {[Op.gte]: value.split(':gte:')[1]};
            }
            else if(value.includes(':lte:')) {
                where[key] = {[Op.lte]: value.split(':lte:')[1]};
            }
            else if(value.includes(':like:')) {
                where[key] = {[Op.like]: `%${value.split(':like:')[1]}%`};
            }
            else if(value) {
                where[key] = value;
            }
        });
    }

    if(params.search) {
        where[Op.or] = searchable_columns.map(column => {
            return {column : {
                [Op.like]: `%${params.search}%`
            }};
        });
    }

    if(Object.keys(append_where).length > 0) {
        Object.entries(append_where).forEach(([key, value]) => {
            where[key] = value;
        });
    }

    if(Object.keys(where).length > 0) {
        modelQuery.where = where;
    }

    if(params.page) {
        modelQuery.offset = (parseInt(params.page) - 1) * parseInt(params.per_page);
    }

    if(params.per_page) {
        modelQuery.limit = parseInt(params.per_page);
    }

    if(params.sort_by) {
        Object.entries(params.sort_by).forEach(([key, value]) => {
            modelQuery.order.push([toSnakeCase(key), value]);
        });
    }

    return modelQuery;
}


module.exports = {
    parseQueryString,
    parseIntoModelQuery
}