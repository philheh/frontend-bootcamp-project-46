import _ from 'lodash';

const objectComparator = (data1, data2) => {
  const keys = _.union(_.keys(data1), _.keys(data2)).sort();
  const comparedObjects = keys.map((key) => {
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return {
        key,
        value: objectComparator(data1[key], data2[key]),
        status: 'nested',
      };
    }
    if (!_.has(data2, key)) {
      return {
        key,
        value: data1[key],
        status: 'removed',
      };
    }
    if (!_.has(data1, key)) {
      return {
        key,
        value: data2[key],
        status: 'added',
      };
    }
    if (!_.isEqual(data1[key], data2[key])) {
      return {
        key,
        oldValue: data1[key],
        newValue: data2[key],
        status: 'changed',
      };
    }
    return {
      key,
      value: data1[key],
      status: 'unchanged',
    };
  });
  return comparedObjects;
};

export default objectComparator;
