/**
 * @author Herlangga Sefani {@link https://github.com/gaibz}
 * @date 2024-Feb-25
 * @package exsvel
 * @path tests/queryparser.test.js
 */

const {parseIntoModelQuery, parseQueryString} = require('../server/drivers/QueryParser');
const {Op} = require('sequelize');

describe('QueryParser Testing', () => {
    test('parseIntoModelQuery', () => {
        let url = "http://localhost:3000/api/v1/someaction?page=1&per_page=10&sort_by=id:desc&search=hello+world&filter[field]=value&filter[another_field]=another_value,another_value2&fields=field,another_field&filter[greater_than_field]=:gt:10&filter[less_than_field]=:lt:10&filter[greater_than_or_equal_field]=:gte:10&filter[less_than_or_equal_field]=:lte:10&filter[like_field]=:like:hello";
        let result = parseIntoModelQuery(url);

        expect(result).toBeInstanceOf(Object);
        expect(result).toHaveProperty('where.field');
        expect(result).toHaveProperty('where.another_field');
        expect(result).toHaveProperty('where.greater_than_field');
        expect(result).toHaveProperty('where.less_than_field');
        expect(result).toHaveProperty('where.greater_than_or_equal_field');
        expect(result).toHaveProperty('where.less_than_or_equal_field');
        expect(result).toHaveProperty('where.like_field');
        expect(result).toHaveProperty('order');
        expect(result).toHaveProperty('limit');
        expect(result).toHaveProperty('offset');

        expect(result.where.field).toBe('value');
        expect(result.where.another_field).toBeInstanceOf(Object);
        expect(result.where.another_field[Op.in]).toBeInstanceOf(Array);
        expect(result.where.another_field[Op.in][0]).toBe('another_value');
        expect(result.where.another_field[Op.in][1]).toBe('another_value2');
        expect(result.where.greater_than_field).toBeInstanceOf(Object);
        expect(result.where.greater_than_field[Op.gt]).toBe('10');
        expect(result.where.less_than_field).toBeInstanceOf(Object);
        expect(result.where.less_than_field[Op.lt]).toBe('10');
        expect(result.where.greater_than_or_equal_field).toBeInstanceOf(Object);
        expect(result.where.greater_than_or_equal_field[Op.gte]).toBe('10');
        expect(result.where.less_than_or_equal_field).toBeInstanceOf(Object);
        expect(result.where.less_than_or_equal_field[Op.lte]).toBe('10');
        expect(result.where.like_field).toBeInstanceOf(Object);
        expect(result.where.like_field[Op.like]).toBe('%hello%');
        expect(result.order).toBeInstanceOf(Array);
        expect(result.order[0]).toBeInstanceOf(Array);
        expect(result.order[0][0]).toBe('id');
        expect(result.order[0][1]).toBe('desc');
        expect(result.limit).toBe(10);
        expect(result.offset).toBe(0);

    });
});