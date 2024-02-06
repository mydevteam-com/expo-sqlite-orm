const defaultOptions = {
    columns: ['*'],
    page: null,
    limit: null,
    where: {},
    order: { id: 'DESC' }
};
// Creates the "SELECT" sql statement for find one record
export function find(tableName) {
    return `SELECT * FROM ${tableName} WHERE id = ? LIMIT 1;`;
}
/* Creates the "SELECT" sql statement for query records
 * Ex: qb.query({
 *   columns: ['id', 'name', 'status'],
 *   where: { status: { equals: 'finished' }}
 * })
 */
export function query(tableName, options = {}) {
    const { columns, page, limit, where, order } = {
        ...defaultOptions,
        ...options
    };
    const whereStatement = queryWhere(where);
    let sqlParts = [
        'SELECT',
        columns.join(', '),
        'FROM',
        tableName,
        whereStatement,
        'ORDER BY',
        Object.entries(order).map(p => p.join(' ')).join(', ')
    ];
    if (limit !== null) {
        sqlParts.push(...[
            'LIMIT',
            `${limit}`,
        ]);
        if (page !== null) {
            sqlParts.push(...[
                'OFFSET',
                `${limit * (page - 1)}`
            ]);
        }
    }
    return sqlParts.filter(p => p !== '').join(' ');
}
function getParameterStatement(option, value) {
    if (Array.isArray(value) && ['in', 'notIn'].includes(option)) {
        return `(${'?'.repeat(value.length).split('').join(', ')})`;
    }
    return '?';
}
// Convert operators to database syntax
export function propertyOperation(property, options) {
    const operations = {
        equals: '=',
        notEquals: '<>',
        lt: '<',
        lte: '<=',
        gt: '>',
        gte: '>=',
        contains: 'LIKE',
        in: 'IN',
        notIn: 'NOT IN'
    };
    return Object.keys(options).map((option) => {
        if (!operations[option]) {
            throw new Error(`Operation not found, use (${Object.keys(operations).join(', ')})`);
        }
        return `${String(property)} ${operations[option]} ${getParameterStatement(option, options[option])}`;
    }).join(' AND ');
}
// Build where query
export function queryWhere(options) {
    const list = Object.entries(options).map(([property, conditions]) => {
        // Ignore empty or undefined fields
        conditions = Object.keys(conditions).reduce((acc, key) => {
            if (conditions[key] !== undefined)
                acc[key] = conditions[key];
            return acc;
        }, {});
        return `${propertyOperation(property, conditions)}`;
    }).filter((item) => Object.values(item).length > 0);
    return list.length > 0 ? `WHERE ${list.join(' AND ')}` : '';
}
export default { find, query };
